const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.save();
let trianglePoints = [];

// Draw coordinate grid and axes
function drawGrid() {
    ctx.restore();
    ctx.beginPath();
    for (let i = 0; i <= canvas.width; i += 50) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    ctx.strokeStyle = '#eee';
    ctx.stroke();
}

// Draw labels for coordinate axes
function drawLabels() {
    ctx.restore();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    for (let i = 50; i <= canvas.width; i += 50) {
        ctx.fillText(i, i - 5, canvas.height - 5);
        ctx.fillText(canvas.height - i, 5, i - 5);
    }
}

function drawTriangle() {
    drawGrid();
    drawLabels();
    ctx.save();
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    
    const point1Input = document.getElementById('point1').value.split(',').map(Number);
    const point2Input = document.getElementById('point2').value.split(',').map(Number);
    const height = parseInt(document.getElementById('height').value);

    ctx.beginPath();
    ctx.moveTo(point1Input[0], point1Input[1]);
    ctx.lineTo(point2Input[0], point2Input[1]);
    const baseLength = Math.sqrt((point2Input[0] - point1Input[0]) ** 2 + (point2Input[1] - point1Input[1]) ** 2);
    const topX = point1Input[0] + (point2Input[0] - point1Input[0]) / 2;
    const topY = point1Input[1] + height;
    ctx.lineTo(topX, topY);
    ctx.closePath();

    trianglePoints = [point1Input, point2Input, [topX, topY]];
    
    ctx.strokeStyle = 'blue';  // Original triangle color
    ctx.stroke();
    ctx.restore();
}

function drawLine() {
    ctx.save();
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    const coefficientsInput = document.getElementById('coefficients').value.split(',').map(Number);
    const a = coefficientsInput[0];
    const b = coefficientsInput[1];
    const c = coefficientsInput[2];

    ctx.beginPath();
    ctx.moveTo(0, c / b);
    ctx.lineTo(canvas.width, (-a * canvas.width + c) / b);
    ctx.strokeStyle = 'black';  // Line color
    ctx.stroke();
    ctx.restore();
}

function reflectTriangle() {
    ctx.save();
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    const reflectedTrianglePoints = trianglePoints.map(point => {
        const [x, y] = point;
        const coefficientsInput = document.getElementById('coefficients').value.split(',').map(Number);
        const a = coefficientsInput[0];
        const b = coefficientsInput[1];
        const c = coefficientsInput[2];

        // Calculate the reflection of each point
        const t = (a * x + b * y - c) / (a ** 2 + b ** 2);
        const d = x - 2 * a * t;
        const e = y - 2 * b * t;

        return [d, e];
    });

    // Draw original triangle
    ctx.beginPath();
    ctx.moveTo(...trianglePoints[0]);
    ctx.lineTo(...trianglePoints[1]);
    ctx.lineTo(...trianglePoints[2]);
    ctx.closePath();
    ctx.strokeStyle = 'blue';  // Original triangle color
    ctx.stroke();

    // Draw reflected triangle
    ctx.beginPath();
    ctx.moveTo(...reflectedTrianglePoints[0]);
    ctx.lineTo(...reflectedTrianglePoints[1]);
    ctx.lineTo(...reflectedTrianglePoints[2]);
    ctx.closePath();
    ctx.strokeStyle = 'red';  // Reflected triangle color
    ctx.stroke();
    ctx.restore();
}
