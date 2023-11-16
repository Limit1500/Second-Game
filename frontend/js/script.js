// AUDIOS
const gameMusic = new Audio("../audios/game-music-loop-7-145285.mp3");
const gameOverAudio = new Audio("../audios/loseEfect.mp3");
gameMusic.loop = true;
window.addEventListener("load", () => {
  gameMusic.play();
});
gameMusic.addEventListener("timeupdate", () => {
  if (gameMusic.currentTime >= gameMusic.duration - 3) {
    gameMusic.currentTime = 0;
  }
});
// IMAGES
export let character_img = document.querySelector("#character_img");
export let bullet_img = document.querySelector("#bullet_img");
export let enemy1_img = document.querySelector("#enemy1_img");
export let enemy2_img = document.querySelector("#enemy2_img");
export let enemy3_img = document.querySelector("#enemy3_img");
export let enemy4_img = document.querySelector("#enemy4_img");
export let bila_img = document.querySelector("#bila_img");
export let focmic_img = document.querySelector("#focmic_img");
export let focmare_img = document.querySelector("#focmare_img");
export let fullHeart_img = document.querySelector("#fullHeart_img");
export let emptyHeart_img = document.querySelector("#emptyHeart_img");
// CANVAS
export let canvas = document.querySelector("canvas");
export let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

import {
  character,
  holdingKeys,
  checkCharacterBorder,
  drawCharacterCircle,
  drawAnimateCharacter,
  adjustCharacterDirection,
} from "../js/character.js";
import {
  projectileArray,
  projectileType,
  mouseX,
  mouseY,
  checkCharacterColision,
  adjustProjectileSpeed,
  drawProjectileImage,
} from "../js/projectile.js";
import {
  enemyArray,
  spawnEnemyTime,
  addWaves,
  checkColisionCharacter,
  drawEnemyCircle,
  checkProjectileColosion,
  addEnemyBullet,
  checkEnemyBulletCharacterColision,
  animateEnemyBullets,
  enemyBulletArray,
} from "../js/enemy.js";

let gameOver,
  wave = 0;
export let score = 0;

function animate() {
  if (gameOver == 1) {
    gameOverAudio.play();
    window.location.href = "../tryAgain.html";
    c.clearRect(0, 0, canvas.width, canvas.height);
    return 0;
  }
  requestAnimationFrame(animate);

  checkCharacterBorder();
  drawCharacterCircle();
  drawAnimateCharacter();
  adjustCharacterDirection();

  c.font = "30px Roboto";
  c.fillStyle = "white";
  c.fillText("SCORE:", 20, 50);
  c.fillText(score, 140, 50);

  c.font = "30px Roboto";
  c.fillStyle = "white";
  c.fillText("WAVE:", 300, 50);
  c.fillText(wave, 400, 50);

  let i;
  let hearts = Math.round(character.hp / 2);
  console.log(hearts + " " + character.hp);
  for (i = 0; i <= 10 * 40; i += 40) {
    if (i <= hearts * 40)
      c.drawImage(
        fullHeart_img,
        i - 200 + window.innerWidth / 2,
        window.innerHeight - 30,
        30,
        30
      );
    else
      c.drawImage(
        emptyHeart_img,
        i - 200 + window.innerWidth / 2,
        window.innerHeight - 30,
        30,
        30
      );
  }
  projectileArray.forEach((projectile) => {
    checkCharacterColision(projectile);
    adjustProjectileSpeed(projectileArray.indexOf(projectile));
    drawProjectileImage(projectile);
  });

  if (enemyArray.length == 0) {
    wave++;
    addWaves(wave);
  }
  enemyArray.forEach((enemy) => {
    enemy.xm = character.x - enemy.x;
    enemy.ym = character.y - enemy.y;

    let imp2 = checkColisionCharacter(enemy);
    if (imp2 == -1) gameOver = 1;
    score += checkProjectileColosion(enemy);
    localStorage.setItem("score", score);
    let enemyType = drawEnemyCircle(enemy, imp2);

    if (enemy.frame % (50 * enemyType.bulletSpeed) == 0) {
      addEnemyBullet(enemy, enemyType);
    }
    enemyBulletArray.forEach((projectile) => {
      animateEnemyBullets(projectile, enemyType, enemy, imp2);
      if (checkEnemyBulletCharacterColision(projectile, enemyType) == 1)
        gameOver = 1;
    });
  });
}

animate();
