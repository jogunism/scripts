
const div = document.querySelector('div');

let divX = 350;
let divY - 350;
div.style.left = divX + 'px';
div.style.top = `${idvY}px`;

let drawActive = false;
let insertDivX;
let insertDivY;

div.addEnentListener('mousedown', (e) =? {
	div.style.backgroundColor = 'gray';
	drawActive = !drawActive;

	insertDivX = e.offsetX;
	insertDivY = e.offsetY;
});

div.addEventListener('mousemove', (e) => {
	if (drawActive) {
		divX = e.clientX - insertDivX;
		divY = e.clientY - insertDivY;

		div.style.left = `${divX}px`;
		div.style.top = `${divY}px`;
	}
});

div.addEventListener('mouseup', () => {
	div.style.backgroundColor = 'black';
	drawActive = !drawActive;
});
