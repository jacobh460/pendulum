//Jacob H 2023
function w2s(pos)
{
	return pos.mult(meter).sub(camera.pos);
}

function s2w(pos)
{
	return pos.add(camera.pos).div(meter);
}

function screenScale(size)
{
	return size.mult(meter);
}

function translate(pos)
{
	const p = w2s(pos);
	ctx.translate(p.x, p.y);
}

function line(start, finish)
{
	const begin = w2s(start);
	const end = w2s(finish);
	ctx.moveTo(begin.x, begin.y);
	ctx.lineTo(end.x, end.y);
}

function rect(begin, size)
{
	ctx.beginPath();
	const screenStart = w2s(begin);
	const screenSize = screenScale(size);
	ctx.rect(screenStart.x, screenStart.y, screenSize.x, screenSize.y)
	ctx.stroke();
}