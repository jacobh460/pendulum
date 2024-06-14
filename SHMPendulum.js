class SHMPendulum
{
	static options = 
	{
		"length (m):": 
		{
			get: "getLength",
			set: "setLength"
		},
		"amplitude (m):":
		{
			get: "getAmplitude",
			set: "setAmplitude"
		},
		"period (s):":
		{
			get: "getPeriod",
			set: "setPeriod"
		},
		"time (s)":
		{
			get: "getTime",
			set: "setTime"
		}
	};

	
	constructor(length, amplitude, base)
	{
		this.type = 2;
		this.length = length;
		this.period = Math.sqrt(length/gravity);
		this.inversePeriod = 1/this.period;
		this.period *= Math.PI * 2;
		this.A = amplitude;
		this.t = 0;
		this.base = base;
		this.x = this.A;

		this.selectionBox = new box(0, 0, 0, 0);

		this.selected = false;
	}

	getTime()
	{
		return this.t;
	}

	setTime(s)
	{
		this.t = Math.max(s, 0);
	}

	getPeriod()
	{
		return this.period;
	}

	setPeriod(newT)
	{
		if (newT < 0.1) return;
		const newLen = Math.pow(newT/(Math.PI * 2), 2) * gravity;
		if (newLen < this.A) return;
		this.length = newLen;
		this.period = Math.sqrt(this.length/gravity);
		this.inversePeriod = 1/this.period;
		this.period *= Math.PI * 2;
		this.x = this.A;
		this.t = 0;
	}

	getLength()
	{
		return this.length;
	}

	setLength(length)
	{
		this.length = Math.max(length, 0.1);
		this.A = Math.min(this.length, this.A);
		this.x = this.A;
	}

	getAmplitude()
	{
		return this.A;
	}

	setAmplitude(a)
	{
		this.A = Math.min(a, this.length);
	}

	tick(deltaTime)
	{
		this.t += deltaTime;
		this.period = Math.sqrt(this.length/gravity);
		this.x = this.A * Math.cos(this.t/this.period);
		this.period *= 2 * Math.PI;
	}

	draw()
	{
		ctx.strokeStyle = "#FF7276";
		ctx.lineWidth = 5;
		ctx.lineCap = "round";
		//determine if you even need to draw
		let hitBox = new box(this.base.x - this.length, this.base.y - this.length, 2 * this.length, 2 * this.length);
		if (!boxInCamera(hitBox)) return false;

		const yOff = Math.sqrt(this.length * this.length - this.x * this.x);
		this.selectionBox = new selectionBox(this.base.x, this.base.y, this.x, yOff);
		const end = new vector2d(this.x, yOff).add(this.base);
		ctx.beginPath();
		line(this.base, end);
		ctx.stroke();


		//calculate angle hanging mass needs to be drawn at
		let angle = Math.atan2(yOff, this.x);
		//draw mass hanging at bottom
		ctx.save();
		translate(end);
		ctx.rotate(angle);
		ctx.fillStyle = "#FF7276";
		ctx.fillRect(-15, -15, 30, 30);
		ctx.restore();

		if (this.selected) this.selectionBox.show();

		return true;
	}
}

function SHMFromAngle(length, angle, base)
{
	return new SHMPendulum(length, length * Math.sin(angle), base);
}