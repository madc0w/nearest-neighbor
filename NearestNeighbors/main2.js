let velFactor = 128;
let numPoints = 200;
const points = [];
let canvas, context;
let stepNum = 0;
let closenessRank = 1;
let dClosenessRank = 1;

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

	const closestPoints = [];
	for (const point of points) {
		closestPoints.push(point);
	}
	context.stroketyle = "#000000";
	context.lineWidth = 4;
	context.beginPath();
	for (const point of points) {
		closestPoints.sort((p1, p2) => {
			return distanceSq(point, p1) < distanceSq(point, p2) ? -1 : 1;
		});

		context.moveTo(point.x * canvas.width, point.y * canvas.height);
		context.bezierCurveTo(
			point.x * canvas.width,
			point.y * canvas.height,
			closestPoints[closenessRank].x * canvas.width,
			closestPoints[closenessRank].y * canvas.height,
			closestPoints[closenessRank + 1].x * canvas.width,
			closestPoints[closenessRank + 1].y * canvas.height
		);
	}

	context.stroke();

	// if (stepNum % 4 == 0) {
	// 	closenessRank += dClosenessRank;
	// 	document.getElementById('closeness-rank').innerHTML = closenessRank;
	// 	if (closenessRank >= 12 || closenessRank <= 1) {
	// 		dClosenessRank *= -1;
	// 	}
	// }

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
	}
	stepNum++;
	window.requestAnimationFrame(step);
}


function distanceSq(p1, p2) {
	return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}
