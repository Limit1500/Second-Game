const characterShoot = new Audio("../audios/characterShoot.mp3");

import { character } from "../js/character.js";
import { c, canvas, bullet_img } from "../js/script.js";

export let projectileArray = [];
export let projectileType = {
  width: 5,
  damage: 1,
  speed: 2.5,
};
export let mouseX, mouseY;
window.addEventListener("mousemove", (event) => {
  mouseX = event.x;
  mouseY = event.y;
});
window.addEventListener("click", () => {
  characterShoot.pause();
  characterShoot.play();
  projectileArray.push({
    x: character.x,
    y: character.y,
    width: projectileType.width,
    xm: mouseX - character.x,
    ym: mouseY - character.y,
    damage: projectileType.damage,
    angle:
      Math.atan2(mouseY - character.y, mouseX - character.x) * (180 / Math.PI),
  });
});

export function checkCharacterColision(projectile) {
  if (
    projectile.x > window.innerWidth + 50 ||
    projectile.x < -50 ||
    projectile.y > window.innerHeight + 50 ||
    projectile.y < -50
  ) {
    projectileArray.splice(projectileArray.indexOf(projectile), 1);
  }
}

export function adjustProjectileSpeed(index) {
  let projectile = projectileArray[index];
  let pozXm, pozYm;
  if (projectile != undefined) {
    if (projectile.xm < 0) pozXm = projectile.xm * -1;
    else pozXm = projectile.xm;
    if (projectile.ym < 0) pozYm = projectile.ym * -1;
    else pozYm = projectile.ym;
    let max = Math.max(pozXm, pozYm);
    let imp = max / projectileType.speed;
    if (imp < 0) imp *= -1;
    projectile.x += projectileType.speed * (projectile.xm / imp);
    projectile.y += projectileType.speed * (projectile.ym / imp);
  }
}

export function drawProjectileImage(projectile) {
  c.save(); // salveaza starea canvasului fara a o desena
  c.translate(projectile.x, projectile.y); // centrul de rotatie este mijlocul proiectilului
  c.rotate((projectile.angle + 90) / 60); // rotim proiectilul

  // desenez proiectilul
  c.drawImage(bullet_img, -bullet_img.width / 2, -bullet_img.height / 2);

  c.restore(); // schimbam inapoi la starea initiala a canvasului
}
