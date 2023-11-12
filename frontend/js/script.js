// IMAGES
export let character_img = document.querySelector("#character_img");
export let bullet_img = document.querySelector("#bullet_img");
export let enemy1_img = document.querySelector("#enemy1_img");
export let enemy2_img = document.querySelector("#enemy2_img");
export let enemy3_img = document.querySelector("#enemy3_img");
export let enemy4_img = document.querySelector("#enemy4_img");
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
    /*
    if (enemy.frame % (50 * enemyType.bulletSpeed) == 0) {
      enemy.frame = 0;
      addEnemyBullet(enemy, enemyType);
    }
    enemyBulletArray.forEach((projectile) => {
      checkEnemyBulletCharacterColision(enemy, enemyType);
      animateEnemyBullets(projectile, enemyType, enemy, imp2);
    }); */
  });
}

animate();
