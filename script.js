const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const calculateBtn = document.getElementById('calculateBtn');
const result = document.getElementById('result');

let nodes = [];
let edges = [];
let isDragging = false;
let selectedNode = null;

// Add event listeners for drawing on the canvas
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);

// Draw nodes and edges
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw edges
    edges.forEach(edge => {
        const [from, to] = edge;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = '#000';
        ctx.stroke();
    });
    
    // Draw nodes
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#0078D7';
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.fillStyle = '#FFF';
        ctx.fillText(node.id, node.x - 5, node.y + 5);
    });
}

// Add a new node
function addNode(x, y) {
    const id = nodes.length + 1;
    nodes.push({ id, x, y });
    draw();
}

// Find a node by position
function findNode(x, y) {
    return nodes.find(node => Math.hypot(node.x - x, node.y - y) < 20);
}

// Mouse down event
function onMouseDown(e) {
    const { offsetX: x, offsetY: y } = e;
    const node = findNode(x, y);
    if (node) {
        selectedNode = node;
        isDragging = true;
    } else {
        addNode(x, y);
    }
}

// Mouse move event
function onMouseMove(e) {
    if (isDragging && selectedNode) {
        const { offsetX: x, offsetY: y } = e;
        selectedNode.x = x;
        selectedNode.y = y;
        draw();
    }
}

// Mouse up event
function onMouseUp(e) {
    isDragging = false;
    selectedNode = null;
}

// Add edge between nodes
canvas.addEventListener('dblclick', (e) => {
    const { offsetX: x, offsetY: y } = e;
    const node = findNode(x, y);
    if (node && selectedNode && node !== selectedNode) {
        edges.push([selectedNode, node]);
        selectedNode = null;
        draw();
    }
});

// Calculate optimal Durchlaufanzahl
calculateBtn.addEventListener('click', () => {
    // Placeholder: Simple calculation based on node count (replace with PCS logic)
    const stepCount = nodes.length;
    result.textContent = `Minimale Durchlaufanzahl: ${stepCount}`;
});
