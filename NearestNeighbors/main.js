let velFactor = 128;
let numPoints = 200;
let closenessRank = 1;
const points = [];
let canvas, context;
let stepNum = 0;

function onLoad() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	for (let i = 0; i < numPoints; i++) {
		points.push({
			x: Math.random(),
			y: Math.random(),
			xVel: (Math.random() - 0.5) / velFactor,
			yVel: (Math.random() - 0.5) / velFactor,
		});
	}

	step();
}

function step() {
	// this clears the canvas, somehow
	canvas.width = canvas.width;

	context.fillStyle = "#000000";
	context.stroketyle = "#000000";
	const closestPoints = [];
	for (const point of points) {
		closestPoints.push(point);
	}
	for (const point of points) {
		closestPoints.sort((p1, p2) => {
			return distanceSq(point, p1) < distanceSq(point, p2) ? -1 : 1;
		});

		context.beginPath();
		context.moveTo(point.x * canvas.width, point.y * canvas.height);
		const closestPoint = closestPoints[closenessRank];
		context.lineTo(closestPoint.x * canvas.width, closestPoint.y * canvas.height);
		context.stroke();
	}

	if (stepNum % 100 == 0) {
		closenessRank++;
		if (closenessRank >= points.length) {
			closenessRank = 1;
		}
	}

	for (const point of points) {
		point.x += point.xVel;
		point.y += point.yVel;
		if (point.x > 1) {
			point.x = 2 - point.x;
			point.xVel *= -1;
		} else if (point.x < 0) {
			point.x *= -1;
			point.xVel *= -1;
		}
		if (point.y > 1) {
			point.y = 2 - point.y;
			point.yVel *= -1;
		} else if (point.y < 0) {
			point.y *= -1;
			point.yVel *= -1;
		}
		// context.beginPath();
		// context.arc(point.x * canvas.width, point.y * canvas.height, 2, 0, 2 * Math.PI);
		// context.fill();
	}
	stepNum++;
	window.requestAnimationFrame(step);
}

function distanceSq(p1, p2) {
	return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}
