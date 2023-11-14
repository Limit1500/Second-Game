import { character } from "../js/character.js";
import { c } from "../js/script.js";
import { projectileArray, projectileType } from "../js/projectile.js";

export let enemyArray = [];
export let spawnEnemyTime = 333;
export let enemyType1 = {
  width: 70,
  damage: 1,
  bodySpeed: 1,
  weapons: 2,
  fireRate: 333, // nu face nimic
  bulletSpeed: 1, // aparent este fire rate
  bulletWidth: 10, // e bun
  type: 1,
  hp: 5,
};
export let enemyType2 = {
  width: 70,
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
  width: 70,
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
  width: 70,
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

  enemyArray.push({
    x: X,
    y: Y,
    xm: 0,
    ym: 0,
    type: enemyType.type,
    width: enemyType.width,
    damage: enemyType.damage,
    hp: enemyType.hp,
    speed: enemyType.bodySpeed,
    lastRotation: 0,
    frame: 0,
    randomX: Math.random() * enemyType.bodySpeed,
    randomY: Math.random() * enemyType.bodySpeed,
    angle: 0,
  });

  if (nrEnemyes > 1)
    setTimeout(() => {
      addEnemy(nrEnemyes - 1, enemyType);
    }, spawnEnemyTime);
}

export function checkColisionCharacter(enemy) {
  let pozXm,
    pozYm,
    addScore = 0;
  let enemyType = {};
  if (enemy.type == 1) enemyType = enemyType1;
  else if (enemy.type == 2) enemyType = enemyType2;
  else if (enemy.type == 3) enemyType = enemyType3;
  else if (enemy.type == 4) enemyType = enemyType4;
  if (enemy.xm < 0) pozXm = enemy.xm * -1;
  else pozXm = enemy.xm;
  if (enemy.ym < 0) pozYm = enemy.ym * -1;
  else pozYm = enemy.ym;
  let max = Math.max(pozXm, pozYm);
  let imp2 = max / enemyType.bodySpeed;
  if (imp2 < 0) imp2 *= -1;

  if (pozXm < 40 && pozYm < 40) {
    character.hp -= enemy.damage;
    addScore++;
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
  let img, x;
  if (enemy.type == 1) {
    img = enemy1_img;
    type = enemyType1;
    x = 1.57079633;
  } else if (enemy.type == 2) {
    img = enemy2_img;
    type = enemyType2;
    x = 3 * 1.57079633;
  } else if (enemy.type == 3) {
    img = enemy3_img;
    type = enemyType3;
    x = 3 * 1.57079633;
  } else if (enemy.type == 4) {
    img = enemy4_img;
    type = enemyType4;
    x = 3 * 1.57079633;
  }

  if (type.type == 1 || type.type == 3) {
    if (enemy.frame < 500) {
      enemy.frame++;
      enemy.x += type.bodySpeed * (enemy.xm / imp2);
      enemy.y += type.bodySpeed * (enemy.ym / imp2);
    } else {
      enemy.frame++;
      enemy.x += enemy.randomX;
      enemy.y += enemy.randomY;
    }

    if (enemy.x > window.innerWidth - 24) {
      enemy.x = window.innerWidth - 24;
      enemy.randomX *= -1;
      enemy.randomY *= -1;
    } else if (enemy.x < 20) {
      enemy.x = 20;
      enemy.randomX *= -1;
      enemy.randomY *= -1;
    }
    if (enemy.y > window.innerHeight - 24) {
      enemy.y = window.innerHeight - 24;
      enemy.randomX *= -1;
      enemy.randomY *= -1;
    } else if (enemy.y < 20) {
      enemy.y = 20;
      enemy.randomX *= -1;
      enemy.randomY *= -1;
    }
  } else if (type.type == 2) {
    if (enemy.frame < 250) {
      enemy.frame++;
      enemy.x += type.bodySpeed * (enemy.xm / imp2);
      enemy.y += type.bodySpeed * (enemy.ym / imp2);
    } else {
      enemy.frame++;
      enemy.x += enemy.randomX;
      enemy.y += enemy.randomY;
    }

    if (enemy.x > window.innerWidth - 24) {
      enemy.x = window.innerWidth - 24;
      enemy.randomX *= -1;
      enemy.randomY *= -1;
    } else if (enemy.x < 20) {
      enemy.x = 20;
      enemy.randomX *= -1;
      enemy.randomY *= -1;
    }
    if (enemy.y > window.innerHeight - 24) {
      enemy.y = window.innerHeight - 24;
      enemy.randomX *= -1;
      enemy.randomY *= -1;
    } else if (enemy.y < 20) {
      enemy.y = 20;
      enemy.randomX *= -1;
      enemy.randomY *= -1;
    }
  } else if (type.type == 4) {
    enemy.frame++;
    enemy.x += type.bodySpeed * (enemy.xm / imp2);
    enemy.y += type.bodySpeed * (enemy.ym / imp2);
  }

  c.beginPath();
  c.arc(enemy.x, enemy.y, type.width / 2, 0, Math.PI * 2, false);

  let newRotation = Math.atan2(character.y - enemy.y, character.x - enemy.x);

  c.save();
  c.translate(enemy.x, enemy.y);

  enemy.lastRotation += newRotation - enemy.lastRotation;

  c.rotate(enemy.lastRotation - x);
  enemy.angle = enemy.lastRotation - x;

  enemy.lastRotation = newRotation;
  c.drawImage(
    img,
    -type.width + type.width / 2,
    -type.width + type.width / 2,
    type.width,
    type.width
  );

  c.restore();

  return type;
}

export let enemyBulletArray = [];

export function addEnemyBullet(enemy, enemyType) {
  let xm = character.x - enemy.x;
  let ym = character.y - enemy.y;

  let imp = Math.sqrt(xm * xm + ym * ym);

  enemyBulletArray.push({
    x: enemy.x,
    y: enemy.y,
    width: enemyType.bulletWidth,
    xm: xm / imp,
    ym: ym / imp,
    damage: enemyType.damage,
    angle: Math.atan2(ym, xm) + Math.PI / 2,
  });
}

export function animateEnemyBullets(projectile, enemyType, enemy, imp) {
  projectile.x += enemyType.bulletSpeed * projectile.xm;
  projectile.y += enemyType.bulletSpeed * projectile.ym;

  c.save();
  c.translate(projectile.x, projectile.y);
  c.rotate(projectile.angle);
  c.drawImage(
    bullet_img,
    -projectile.width / 2,
    -projectile.width / 2,
    projectile.width * 1.2,
    projectile.width * 1.5
  );
  c.restore();
}

export function checkEnemyBulletCharacterColision(projectile, enemyType) {
  let diffX = projectile.y - character.y,
    diffY = projectile.x - character.x;
  if (diffX < 0) diffX *= -1;
  if (diffY < 0) diffY *= -1;

  if (diffX < character.width / 5 && diffY < character.width / 5) {
    enemyBulletArray.splice(enemyBulletArray.indexOf(projectile), 1);
    character.hp -= enemyType.damage;
  }
}
