//Jacob H 2023
const controlPanel = document.getElementById("controlPanel");
const controlPanelDrag = document.getElementById("controlPanelDrag");

let curSelected = null;

let showingOptions = false;



function updateOptions()
{
	if (!showingOptions) return;
	const propertyInputs = document.getElementsByClassName("propertyInput");

	for (let i = 0; i < propertyInputs.length; i++)
	{
		if (propertyInputs[i] == document.activeElement) continue;
		propertyInputs[i].value = curSelected[propertyInputs[i].dataset.get]();
	}
}

function showOptions()
{
	if (showingOptions) return;
	for (const key in curSelected.constructor.options)
	{
		const curOption = curSelected.constructor.options[key];
		/*<div class="controlPanelProperty" >
			<p>Length (m): </p>
			<input class="propertyInput" data-get="getLength" data-set="setLength" type="number">
		</div>*/

		const newDiv = document.createElement("div");
		newDiv.classList.add("controlPanelProperty");
		const name = document.createElement("p");
		name.textContent += key;
		newDiv.appendChild(name);
		const dataInput = document.createElement("input");
		dataInput.classList.add("propertyInput");
		dataInput.dataset.get = curOption.get;
		dataInput.dataset.set = curOption.set;
		newDiv.appendChild(dataInput);
		controlPanel.appendChild(newDiv);

		dataInput.addEventListener("input", function(e)
		{
			const n = Number(e.target.value);
			if (Number.isNaN(n)) return;
			curSelected[e.target.dataset.set](n);
		});
		
	}
	showingOptions = true;
}

function hideOptions()
{
	if (!showingOptions) return;
	for (let i = controlPanel.children.length - 1; i >= 0; i--)
	{
		if (controlPanel.children[i].classList.contains("controlPanelProperty"))
		{	
			controlPanel.children[i].remove();
		}
	}
	showingOptions = false;
}





function handleMouseSelect(event)
{
	const worldPos = s2w(new vector2d(event.clientX, event.clientY));

	let clicked = null;
	//determine which pendulum was clicked
	for (let i = 0; i < pendulums.length; i++)
	{
		const cur = pendulums[i];
		if (cur.selectionBox.pointInBox(worldPos)) 
		{
			clicked = cur; 
			break;
		}
	}

	if (clicked == null) 
	{
		if (curSelected != null)
		{
			curSelected.selected = false;
			curSelected = null;
			hideOptions();
		}
		return;
	}
	if (clicked === curSelected)
	{
		clicked.selected = false;
		curSelected = null;
		hideOptions();
		return;
	}

	if (curSelected != null) curSelected.selected = false;
	curSelected = clicked;
	clicked.selected = true;
	hideOptions();
	showOptions();
	
}


(
function()
{
	
	
	let dragging = false;
	let xOff = 0;
	let yOff = 0;
	
	controlPanel.addEventListener("mouseover", function() {
		controlPanel.style.opacity = "100%";
	});
	controlPanel.addEventListener("mouseleave", function() {
		controlPanel.style.opacity = "60%";
	});
	
	controlPanelDrag.addEventListener("mousedown", function(event) {
		dragging = true;
		xOff = event.clientX - controlPanel.offsetLeft;
		yOff = event.clientY - controlPanel.offsetTop;
	});
	document.addEventListener("mouseup", function() {
		dragging = false;
	});
	
	
	document.addEventListener("mousemove", function(event) {
		if (dragging) {
			//min and max are so control panel cannot be dragged off-screen
			controlPanel.style.left = `${Math.max(Math.min(event.clientX - xOff, window.innerWidth - controlPanel.clientWidth), 0)}px`;
			controlPanel.style.top = `${Math.max(Math.min(event.clientY - yOff, window.innerHeight - controlPanel.clientHeight), 0)}px`;
		}
	}
 );
})()