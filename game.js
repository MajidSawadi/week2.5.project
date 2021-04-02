

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.getElementById('canvas').appendChild(canvas);

let bg = {};



let hero = { x: canvas.width / 2, y: canvas.height / 2 };
let monsters = [
	{ x: 100, y: 100 },
	{ x: 200, y: 200 },
	{ x: 300, y: 300 },
];

let startTime = Date.now();
const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;

function loadImages() {
	bg.image = new Image();

	bg.image.onload = function () {
		// show the background image
		bg.ready = true;
	};
	bg.image.src = 'images/background.png';
	hero.image = new Image();
	hero.image.onload = function () {
		// show the hero image
		hero.ready = true;
	};
	hero.image.src = 'images/hero.png';

	monsters.forEach((monster, i) => {
		monster.image = new Image();
		monster.image.onload = function () {
			// show the monster image
			monster.ready = true;
		};
		monster.image.src = `images/monster_${i + 1}.png`;
	});
}


let keysPressed = {};
function setupKeyboardListeners() {
	
	document.addEventListener(
		'keydown',
		function (e) {
			keysPressed[e.key] = true;
		},
		false
	);

	document.addEventListener(
		'keyup',
		function (e) {
			keysPressed[e.key] = false;
		},
		false
	);
}


let update = function () {
	
	elapsedTime = Math.floor((Date.now() - startTime) / 1000);

	if (keysPressed['ArrowUp']) {
		hero.y -= 5;
	}
	if (keysPressed['ArrowDown']) {
		hero.y += 5;
	}
	if (keysPressed['ArrowLeft']) {
		hero.x -= 5;
	}
	if (keysPressed['ArrowRight']) {
		hero.x += 5;
	}

	
	monsters.forEach((monster) => {
		if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
			
			monster.x = monster.x + 50;
			monster.y = monster.y + 70;
	
		}
	});
};


function render() {
	if (bg.ready) {
		ctx.drawImage(bg.image, 0, 0);
	}
	if (hero.ready) {
		ctx.drawImage(hero.image, hero.x, hero.y);
	}
	monsters.forEach((monster) => {
		if (monster.ready) {
			ctx.drawImage(monster.image, monster.x, monster.y);
		}
		const monsterCaughtByHero =
hero.x <= monster.x + 32 &&
monster.x <= hero.x + 32 &&
hero.y <= monster.y + 32 &&
monster.y <= hero.y + 32;
if (monsterCaughtByHero) {
monster.x = randomlyPlace("x");
monster.y = randomlyPlace("y");
}
	});
	ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);
}
function randomlyPlace(axis) {
	if (axis === "x") {
	  return Math.floor(Math.random() * canvas.width + 1);
	} else {
	  return Math.floor(Math.random() * canvas.height + 1);
	}
  }
  

function main() {
	update();
	render();
	

	requestAnimationFrame(main);
}


var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


loadImages();
setupKeyboardListeners();
main();
