//Jacob H 2023

let camera = null;


function boxInCamera(b)
{
	const worldCam = camera.copy();
	worldCam.pos = worldCam.pos.div(meter);
	worldCam.size = worldCam.size.div(meter);
	return worldCam.boxIntersects(b);
}

function pointInCamera(p)
{
	const worldCam = camera.copy();
	worldCam.pos = worldCam.pos.div(meter);
	worldCam.size = worldCam.size.div(meter);
	return worldCam.pointInBox(p);
}


function initCamera()
{
	camera = new box(-(window.innerWidth/2), 0, window.innerWidth, 	window.innerHeight);
	let mouseBegin = null;
	let cameraBegin = null;
	let cameraDrag = false;
	canvas.addEventListener("mousedown", function(event)
	{
		switch(event.button)
		{
			case 0: //lmb
				document.body.style.cursor = "default";
				cameraDrag = false;
				handleMouseSelect(event);
				break;
			case 2: //rmb
				document.body.style.cursor = "grab";
				mouseBegin = new vector2d(event.clientX, event.clientY);
				cameraBegin = camera.pos.copy();
				cameraDrag = true;
				break;
			default:
				return;
		}
		
	});

	document.addEventListener("mousemove", function(event){
		if (cameraDrag && mouseBegin != null){
			camera.pos = cameraBegin.add(mouseBegin.sub(new vector2d(event.clientX, event.clientY)));
		}
	});
	
	document.addEventListener("mouseup", function(event)
	{
		if (event.button == 2)
		{
			document.body.style.cursor = "default";
			cameraDrag = false;
		}
	});
}