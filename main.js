 //Jacob H 2023
const canvas = document.getElementById("renderCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false; //disable antialiasing
document.body.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); } //disable context menu (https://stackoverflow.com/questions/10864249/disabling-right-click-context-menu-on-a-html-canvas)

let screenMiddle = 0;
let gravity = 9.81;

document.addEventListener("keydown", function(e)
{
	if (e.key == "ArrowUp") gravity++;
	else if (e.key == "ArrowDown") gravity = Math.max(gravity - 1, 0);
});

const meter = 50; //size of a meter in px

//this is the step size in euler's method
const precision = 0.001;

let paused = true;
/*
let pendulums = [
	SHMFromAngle(
		4, 
		deg2Rad(0),
		new vector2d(0, 0)
	)
];*/


let pendulums = [];
/*
for (let i = 0; i < 360; i+=1)
{
	pendulums.push(new rotationalPendulum(
		4, //length
		deg2Rad(i * .5), //angle w/ vertical
		new vector2d(i * .05, 0) //position of axis of rotation
	));
	
}*/

function dizzy()
{
	curSelected = null;
	hideOptions();
	pendulums = [];
	for (let i = 0; i < 360; i+=1)
	{
		if (i == 180) continue;
		pendulums.push(new rotationalPendulum(
			4, //length
			deg2Rad(i), //angle w/ vertical
			new vector2d(4 * Math.cos(deg2Rad(-i + 90)), 4 * Math.sin(deg2Rad(-i + 90))) //position of axis of rotation
		));
		
	}
}

function wave()
{
	curSelected = null;
	hideOptions();
	pendulums = [];
	for (let i = 0; i < 360; i+=1)
	{
		pendulums.push(new rotationalPendulum(
			4, //length
			deg2Rad(i * .5), //angle w/ vertical
			new vector2d(i * .1, 0) //position of axis of rotation
		));
		
	}
}

function reset()
{
	curSelected = null;
	hideOptions();
	pendulums = []
	for (let i = 0; i < 18; i+=1)
	{
		pendulums.push(new rotationalPendulum(
			4, //length
			deg2Rad(i * 10), //angle w/ vertical
			new vector2d(i * 4, 0) //position of axis of rotation
		));
		
		pendulums.push(SHMFromAngle(
			4, 
			deg2Rad(i * 10),
			new vector2d(i * 4, 5)
		));
	}
}
reset();


function drawGrid()
{
	ctx.globalAlpha = .7;
	ctx.strokeStyle = "#4f5659";
	ctx.beginPath();
	for (let i = -(camera.pos.x % meter); i < canvas.width; i += meter)
	{
		ctx.moveTo(i, 0);
		ctx.lineTo(i, canvas.height);
	}
	for (let i = -(camera.pos.y % meter); i < canvas.height; i += meter)
	{
		ctx.moveTo(0, i);
		ctx.lineTo(canvas.width, i);
	}

	ctx.stroke();
	ctx.globalAlpha = 1;
}

let lastTime = (new Date()).getTime();

function mainLoop()
{
	let curTime = (new Date()).getTime();
	let deltaTime = Math.min((curTime - lastTime)/1000, 1);
	lastTime = curTime;
	
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	screenMiddle = canvas.width/2;

	camera.size.x = window.innerWidth;
	camera.size.y = window.innerHeight;

	//background
	ctx.fillStyle = "#313338";//stole this color from discord dark mode
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	drawGrid();

	let drawn = 0;
	let ticks = 0;

	if (!paused)
	{
		for (let i = 0; i < pendulums.length; i++)
		{
			let p = pendulums[i];
			if (p.type == 1)
			{
				let remaining = deltaTime;
				while(remaining > 0)
				{
					const change = Math.max(0,Math.min(remaining, precision));
					p.tick(change);
					remaining -= change;
					ticks++;
				}
			}
			else {p.tick(deltaTime); ticks++;}
		}
	}
	for (let i = 0; i < pendulums.length; i++)
	{
		if (pendulums[i].draw()) drawn++;
	}

	ctx.fillStyle = "white";
	logY = 10;
	log(`FPS: ${(1/deltaTime).toFixed(2)}`);
	log(`Frame Time: ${deltaTime}s`);
	log(`${pendulums.length} pendulum(s)`);
	log(`${drawn} rendered`);
	log(`${ticks} ticks/frame`);
	log(`Gravity: ${gravity} m/s²`)
	updateOptions();
	window.requestAnimationFrame(mainLoop);
}
window.onload = function(){
	window.onload = null;//stop function from being called a second time
	initCamera();
	mainLoop();
};


let logY = 10;
function log(input)
{
	ctx.fillText(input, 2, logY);
	logY += 10;
}