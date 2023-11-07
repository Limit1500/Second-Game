import { c, canvas, character_img } from "../js/script.js";
import { mouseX, mouseY } from "../js/projectile.js";

export let character = {
  hp: 20,
  raza: 20,
  x: window.innerWidth / 2 - 20,
  y: window.innerHeight / 2 - 20,
  xm: 0,
  ym: 0,
  speedAdd: 0.35,
  width: 82,
  height: 36,
};

export let holdingKeys = [];
window.addEventListener("keydown", (event) => {
  if (!holdingKeys.includes(event.key)) holdingKeys.push(event.key);
});
window.addEventListener("keyup", (event) => {
  for (let i = holdingKeys.length - 1; i >= 0; i--) {
    if (holdingKeys[i] === event.key) {
      holdingKeys.splice(i, 1);
    }
  }
});

export function checkCharacterBorder() {
  if (character.x + character.xm > window.innerWidth - 24) {
    character.xm = 0;
    character.x = window.innerWidth - 24;
  } else if (character.x + character.xm < 20) {
    character.xm = 0;
    character.x = 20;
  }
  if (character.y + character.ym > window.innerHeight - 24) {
    character.ym = 0;
    character.y = window.innerHeight - 24;
  } else if (character.y + character.ym < 20) {
    character.ym = 0;
    character.y = 20;
  }
}

export function drawCharacterCircle() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  c.arc(
    character.x + character.xm,
    character.y + character.ym,
    character.raza,
    0,
    Math.PI * 2,
    false
  );
}

export function drawAnimateCharacter() {
  c.save();
  c.translate(character.x, character.y); // atentie pt ca coordonatele se pun din punctul asta la desenat de ai coordonatele sunt negative la desenat
  c.rotate(
    (Math.atan2(mouseY - character.y, mouseX - character.x) * (180 / Math.PI) +
      (Math.atan2(mouseY - character.y, mouseX - character.x) *
        (180 / Math.PI)) /
        20) /
      60
  );
  c.drawImage(
    character_img,
    -character.width / 2,
    -character.height / 2,
    character.width,
    character.height
  );
  c.restore();
}

export function adjustCharacterDirection() {
  let cornerSpeed = character.speedAdd * 0.65;
  if (
    holdingKeys.includes("a") &&
    holdingKeys.includes("s") &&
    holdingKeys.includes("d") &&
    holdingKeys.includes("w")
  )
    holdingKeys = holdingKeys;
  else if (
    holdingKeys.includes("a") &&
    holdingKeys.includes("s") &&
    holdingKeys.includes("d")
  )
    character.ym += character.speedAdd;
  else if (
    holdingKeys.includes("w") &&
    holdingKeys.includes("s") &&
    holdingKeys.includes("d")
  )
    character.xm += character.speedAdd;
  else if (
    holdingKeys.includes("a") &&
    holdingKeys.includes("w") &&
    holdingKeys.includes("d")
  )
    character.ym -= character.speedAdd;
  else if (
    holdingKeys.includes("a") &&
    holdingKeys.includes("s") &&
    holdingKeys.includes("w")
  )
    character.xm -= character.speedAdd;
  else if (holdingKeys.includes("w") && holdingKeys.includes("s"))
    holdingKeys = holdingKeys;
  else if (holdingKeys.includes("a") && holdingKeys.includes("d"))
    holdingKeys = holdingKeys;
  else if (holdingKeys.includes("s") && holdingKeys.includes("d")) {
    character.ym += cornerSpeed;
    character.xm += cornerSpeed;
  } else if (holdingKeys.includes("d") && holdingKeys.includes("w")) {
    character.ym -= cornerSpeed;
    character.xm += cornerSpeed;
  } else if (holdingKeys.includes("w") && holdingKeys.includes("a")) {
    character.ym -= cornerSpeed;
    character.xm -= cornerSpeed;
  } else if (holdingKeys.includes("a") && holdingKeys.includes("s")) {
    character.ym += cornerSpeed;
    character.xm -= cornerSpeed;
  } else if (holdingKeys.includes("w")) character.ym -= character.speedAdd;
  else if (holdingKeys.includes("a")) character.xm -= character.speedAdd;
  else if (holdingKeys.includes("s")) character.ym += character.speedAdd;
  else if (holdingKeys.includes("d")) character.xm += character.speedAdd;

  character.xm = (character.xm / 100) * 93;
  character.ym = (character.ym / 100) * 93;

  character.x += character.xm;
  character.y += character.ym;
}
