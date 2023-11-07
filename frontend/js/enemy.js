import { character } from "../js/character.js";
import { c } from "../js/script.js";
import { projectileArray, projectileType } from "../js/projectile.js";

export let enemyArray = [];
export let spawnEnemyTime = 333;
export let enemyType1 = {
  width: 20,
  damage: 1,
  bodySpeed: 1,
  weapons: 2,
  fireRate: 333,
  bulletSpeed: 2,
  bulletWidth: 10,
  type: 1,
  hp: 5,
};
export let enemyType2 = {
  width: 20,
  damage: 5,
  bodySpeed: 1,
  weapons: 1,
  fireRate: 1000,
  bulletSpeed: 4,
  bulletWidth: 10,
  type: 2,
  hp: 3,
};
export let enemyType3 = {
  width: 20,
  damage: 2,
  bodySpeed: 1,
  weapons: 1,
  fireRate: 333,
  bulletSpeed: 2,
  bulletWidth: 10,
  type: 3,
  hp: 5,
};
export let enemyType4 = {
  width: 20,
  damage: 3,
  bodySpeed: 1,
  weapons: 1,
  fireRate: 500,
  bulletSpeed: 1,
  bulletWidth: 20,
  type: 4,
  hp: 7,
};

let spawnEnemy1 = 0,
  spawnEnemy2 = 0,
  spawnEnemy3 = 0,
  spawnEnemy4 = 0;
export function addWaves(wave) {
  let totEnemy = -1;
  if (wave % 10 == 1 || wave % 10 == 2 || wave % 10 == 3) {
    spawnEnemy1++;
    spawnEnemy3++;
  } else if (wave % 10 == 4 || wave % 10 == 6) spawnEnemy2 += 2;
  else if (wave % 10 == 5 || wave % 10 == 7) spawnEnemy4 += 2;
  else if (wave % 10 == 8) {
    totEnemy = 0;
    totEnemy += spawnEnemy1;
    totEnemy += spawnEnemy2;
    totEnemy += spawnEnemy3;
    totEnemy += spawnEnemy4;
  } else if (wave % 10 == 9) {
    totEnemy = 0;
    totEnemy += spawnEnemy1;
    totEnemy += spawnEnemy2;
    totEnemy += spawnEnemy3;
    totEnemy += spawnEnemy4;
  } else if (wave % 10 == 0) {
    enemyType1.damage *= 1.5;
    enemyType1.hp *= 1.5;
    enemyType2.damage *= 1.5;
    enemyType2.hp *= 1.5;
    enemyType3.damage *= 1.5;
    enemyType3.hp *= 1.5;
    enemyType4.damage *= 1.5;
    enemyType4.hp *= 1.5;
  }
  let currentType = {};
  if (totEnemy != -1) {
    if (wave % 10 == 8) currentType = enemyType4;
    else if (wave % 10 == 9) currentType = enemyType2;
    if (totEnemy > 0) addEnemy(totEnemy, currentType);
  } else {
    if (spawnEnemy1 > 0) addEnemy(spawnEnemy1, enemyType1);
    if (spawnEnemy2 > 0) addEnemy(spawnEnemy2, enemyType2);
    if (spawnEnemy3 > 0) addEnemy(spawnEnemy3, enemyType3);
    if (spawnEnemy4 > 0) addEnemy(spawnEnemy4, enemyType4);
  }
}

function addEnemy(nrEnemyes, enemyType) {
  let X, Y;
  if (Math.round(Math.random()) == 1) {
    if (Math.round(Math.random()) == 1) X = -60;
    else X = window.innerWidth + 60;
    Y = Math.round(Math.random() * window.innerHeight);
  } else {
    if (Math.round(Math.random()) == 1) Y = -60;
    else Y = window.innerHeight + 60;
    X = Math.round(Math.random() * window.innerWidth);
  }

  let values = {
    x: X,
    y: Y,
    xm: 0,
    ym: 0,
    type: enemyType.type,
    width: enemyType.width,
    damage: enemyType.damage,
    hp: enemyType.hp,
    speed: enemyType.bodySpeed,
  };

  enemyArray.push({
    x: values.x,
    y: values.y,
    xm: values.xm,
    ym: values.xm,
    type: enemyType.type,
    width: enemyType.width,
    damage: enemyType.damage,
    hp: enemyType.hp,
    speed: enemyType.bodySpeed,
  });

  console.log(enemyArray[enemyArray.length - 1]);
  console.log(values);

  if (nrEnemyes > 1)
    setTimeout(() => {
      addEnemy(nrEnemyes - 1, enemyType);
    }, spawnEnemyTime);
}

export function checkColisionCharacter(enemy) {
  let pozXm,
    pozYm,
    addScore = 0;
  if (enemy.xm < 0) pozXm = enemy.xm * -1;
  else pozXm = enemy.xm;
  if (enemy.ym < 0) pozYm = enemy.ym * -1;
  else pozYm = enemy.ym;
  let max = Math.max(pozXm, pozYm);
  let imp2 = max / enemyType1.speed;
  if (imp2 < 0) imp2 *= -1;

  if (pozXm < 40 && pozYm < 40) {
    character.hp -= enemy.damage;
    addScore++;
    if (character.hp < 1) imp2 = -1;
    enemyArray.splice(enemyArray.indexOf(enemy), 1);
  }

  return imp2;
}

export function checkProjectileColosion(enemy) {
  let addScore = 0;
  projectileArray.forEach((projectile) => {
    let xDif, yDif;
    xDif = enemy.x - projectile.x;
    yDif = enemy.y - projectile.y;
    if (xDif < 0) xDif *= -1;
    if (yDif < 0) yDif *= -1;
    if (xDif < 40 && yDif < 40) {
      enemy.hp -= projectileType.damage;
      if (enemy.hp < 1) {
        enemyArray.splice(enemyArray.indexOf(enemy), 1);
        addScore++;
      }
      projectileArray.splice(projectileArray.indexOf(projectile), 1);
    }
  });
  return addScore;
}

export function drawEnemyCircle(enemy, imp2) {
  let type = {};
  let img;
  if (enemy.type == 1) {
    img = enemy1_img;
    type = enemyType1;
  } else if (enemy.type == 2) {
    img = enemy2_img;
    type = enemyType2;
  } else if (enemy.type == 3) {
    img = enemy3_img;
    type = enemyType3;
  } else if (enemy.type == 4) {
    img = enemy4_img;
    type = enemyType4;
  }

  enemy.x += type.speed * (enemy.xm / imp2);
  enemy.y += type.speed * (enemy.ym / imp2);
  c.beginPath();
  c.arc(enemy.x, enemy.y, enemy.width, 0, Math.PI * 2, false);
  c.fillStyle = "red";
  c.fill();

  c.save();
  c.translate(enemy.x, enemy.y);
  c.rotate(0);

  c.drawImage(img, -enemy.width / 2, -enemy.height / 2);

  c.restore();
}
