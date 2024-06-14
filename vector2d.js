//Jacob H 2023

function deg2Rad(deg) {
	return deg * Math.PI / 180;
}

function rad2Deg(rad)
{
	return rad * 180/Math.PI;
}

class vector2d {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(other) {
		return new vector2d(this.x + other.x, this.y + other.y);
	}

	sub(other) {
		return new vector2d(this.x - other.x, this.y - other.y);
	}

	mult(scalar) {
		return new vector2d(this.x * scalar, this.y * scalar);
	}

	mag() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	dot(other) {
		return other.x * this.x + other.y * this.y;
	}

	copy() {
		return new vector2d(this.x, this.y);
	}

	div(scalar) {
		return new vector2d(this.x / scalar, this.y / scalar);
	}

}

//angle unit in radians
//construct a vector from angle and magnitude
function vector2dFromAngle(angle, mag) {
	return new vector2d(mag * Math.cos(angle), mag * Math.sin(angle));
}

function angleBetween(a, b) {
	return Math.acos((a.dot(b)) / (a.mag() * b.mag()));
}