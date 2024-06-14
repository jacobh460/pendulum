//Jacob H 2023

class box
{
	constructor(x, y, width, height)
	{
		if (width < 0)
		{
			x += width;
			width = Math.abs(width);
		}

		if (height < 0)
		{
			y += height;
			height = Math.abs(height);
		}

		this.pos = new vector2d(x, y);
		this.size = new vector2d(width, height);
	}

	boxIntersects(other)
	{
		if (this.pos.x > other.pos.x + other.size.x || other.pos.x > this.pos.x + this.size.x)
			return false;
		if (other.pos.y + other.size.y < this.pos.y || other.pos.y > this.pos.y + this.size.y)
			return false;

		return true;
	}

	pointInBox(point)
	{
		return point.x > this.pos.x && point.x < this.pos.x + this.size.x && point.y > this.pos.y && point.y < this.pos.y + this.size.y;
	}

	show()
	{
		ctx.strokeStyle = "white";
		ctx.lineWidth = 1;
		ctx.beginPath();
		rect(this.pos, this.size);
		ctx.stroke();
	}

	toScreen()
	{
		const p = w2s(this.pos);
		const s = screenScale(this.pos);
		return new box(p.x, p.y, s.x, s.y);
	}


	copy()
	{
		return new box(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
}