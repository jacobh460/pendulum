

class selectionBox extends box
{
	constructor(x, y, width, height)
	{
		let newWidth = 0;
		let newHeight = 0;
		if (width >= 0 && width < 1) newWidth = 1;
		else if (width <= 0 && width > -1) newWidth = -1;
		if (height >= 0 && height < 1) newHeight = 1;
		else if (height <= 0 && height > -1) newHeight = -1;

		if (newWidth != 0)
		{
			const deltaWidth = newWidth - width;
			x -= deltaWidth/2;
			width = newWidth;
		}
		if (newHeight != 0)
		{
			const deltaHeight = newHeight - height;
			y -= deltaHeight/2;
			height = newHeight;
		}
		super(x, y, width, height);
	}
}