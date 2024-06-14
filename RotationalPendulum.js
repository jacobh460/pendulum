//Jacob H 2023

//this pendulum is simulated by considering the mass at the end to be a point mass, the rod to have no mass, and using newton's second law for rotational motion
class rotationalPendulum {

	static options = 
	{
		"length (m):": 
		{
			get: "getLength",
			set: "setLength"
		},
		"θ (deg):":
		{
			get: "getAngle",
			set: "setAngle"
		},
		"ω (deg/s)":
		{
			get: "getOmega",
			set: "setOmega"
		}
	};
	constructor(length, angle, base) {
		this.type = 1;
		this.angle = -angle;
		this.length = length;
		this.omega = 0;
		this.base = base;

		this.selectionBox = new box(0, 0, 0, 0);

		this.selected = false;
	}

	getLength()
	{
		return this.length;
	}

	setLength(length)
	{
		this.length = Math.max(length, 0.1);
	}

	getAngle()
	{
		return -rad2Deg(this.angle);
	}

	setAngle(deg)
	{
		this.angle = -deg2Rad(deg);
	}

	getOmega()
	{
		return -rad2Deg(this.omega);
	}

	setOmega(deg)
	{
		this.omega = -deg2Rad(deg);
	}


	tick(deltaTime) {
		this.angle += this.omega * deltaTime;
		this.angle %= 2 * Math.PI;
		let torque = -gravity * Math.sin(this.angle);//gravity is at angle 90 degrees or PI/2

		let a = torque / this.length;
		this.omega += a * deltaTime;

	}

	draw() {
		ctx.strokeStyle = "white";
		ctx.lineWidth = 5;
		ctx.lineCap = "round";
		//determine if you even need to draw
		let hitBox = new box(this.base.x - this.length, this.base.y - this.length, 2 * this.length, 2 * this.length);
		if (!boxInCamera(hitBox)) return false;

		let vec = vector2dFromAngle(this.angle + Math.PI/2, this.length);
		this.selectionBox = new selectionBox(this.base.x, this.base.y, vec.x, vec.y);
		vec = vec.add(this.base);

		ctx.beginPath();
		line(this.base, vec);

		ctx.stroke();

		//draw mass hanging at bottom
		ctx.save();
		translate(vec);
		ctx.rotate(this.angle);
		ctx.fillStyle = "white";
		ctx.fillRect(-15, -15, 30, 30);
		ctx.restore();

		if (this.selected)
			this.selectionBox.show();

		return true;
	}


}