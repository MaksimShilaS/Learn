import { source } from "./src/source.js";
import { rectArray } from "./src/utils.js";

const canvas = document.getElementById("canvas1");
const canvasRect = canvas.getBoundingClientRect();
canvas.width = 600;
canvas.height = 600;
const context = canvas.getContext("2d");

const cellSize = 20;
const xCap = canvas.width / cellSize;
const yCap = canvas.height / cellSize;
let drawMap = rectArray(xCap, yCap, false);

function draw(mouseX, mouseY) {
    if (mouseX < canvasRect.x ||
        mouseX > canvasRect.x + canvas.width ||
        mouseY < canvasRect.y ||
        mouseY > canvasRect.y + canvas.height) {
        return;
    }
    const onCanvasX = mouseX - canvasRect.x;
    const onCanvasY = mouseY - canvasRect.y;
    const x = onCanvasX - (onCanvasX % cellSize);
    const y = onCanvasY - (onCanvasY % cellSize);
    const mapX = x / cellSize;
    const mapY = y / cellSize;
    if (!drawMap[mapX][mapY]) {
        context.fillStyle = "black";
        context.fillRect(x, y, cellSize, cellSize);
        drawMap[mapX][mapY] = true;
    }
}

let mouseDown = false;
window.addEventListener("mousedown", () => mouseDown = true);
window.addEventListener("mouseup", () => mouseDown = false);
window.addEventListener("mousemove", e => mouseDown && draw(e.x, e.y));
window.addEventListener("click", e => draw(e.x, e.y));

function getStoredMap(name) {
    let stored = window.localStorage.getItem(storageKey + name);
    if (!stored) {
        stored = source[name];
    }
    if (!stored) {
        return null;
    }
    const memory = [];
    const storedAr = stored.split(",").map(i => Number(i));
    for (let i = 0; i < xCap; ++i) {
        memory[i] = storedAr.splice(0, xCap);
    }

    return memory;
}

const storageKey = "neuro_web_memory_";
class Neuron {
    constructor(name) {
        this.name = name;
        const stored = getStoredMap(this.name);
        if (stored) {
            this.memory = stored;
            console.log(this.memory);
        } else {
            this.memory = rectArray(xCap, yCap, 0);
        }
        this.output = 0;
    }
}

const neuro_web = [];
for (let i = 0; i < 11; ++i) {
    neuro_web.push(new Neuron(i));
}

const findNumberBtn = document.getElementById("findNumberBtn");
const statusInput = document.getElementById("statusInput");
const clearBtn = document.getElementById("clearBtn");
const answerPane = document.getElementById("answerPane");
const answerPaneSelect = document.getElementById("answerPaneSelect");
const answerPaneConfirmBtn = document.getElementById("answerPaneConfirmBtn");
clearBtn.addEventListener("click", clear);

function clear() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMap = rectArray(xCap, yCap, false);
    statusInput.value = null;
    answerPane.style.display = "none";
    answerPaneSelect.value = 0;
}

findNumberBtn.addEventListener("click", () => {
    let suggestion = -1;
    for (let i = 0; i < 11; ++i) {
        const neuron = neuro_web[i];
        let score = 0;
        for (let x = 0; x < xCap; ++x) {
            for (let y = 0; y < yCap; ++y) {
                const source = drawMap[x][y];
                if (source) {
                    score += neuron.memory[x][y];
                }
            }
        }
        if (score > 1000) {
            suggestion = i;
            break;
        }
    }
    answerPane.style.display = "inline-block";
    if (suggestion == 10) {
        statusInput.value = `Это болт, не иначе`;
        answerPaneSelect.value = suggestion;
    } else if (suggestion != -1) {
        statusInput.value = `Suggested number is ${suggestion}. Is it correct?`;
        answerPaneSelect.value = suggestion;
    } else {
        statusInput.value = `I don't know what number it is. Please help`;
    }
});

answerPaneConfirmBtn.addEventListener("click", () => {
    const number = answerPaneSelect.value;
    const neuron = neuro_web[number];
    for (let x = 0; x < xCap; ++x) {
        for (let y = 0; y < yCap; ++y) {
            const source = drawMap[x][y];
            if (source) {
                if (neuron.memory[x][y] < 900) {
                    neuron.memory[x][y]++;
                }
            }
        }
    }
    window.localStorage.setItem(storageKey + number, neuron.memory);
    clear();
})

const showNumberSelect = document.getElementById("showNumberSelect");
showNumberSelect.addEventListener("change", e => {
    clear();
    const neuron = neuro_web[e.target.value];
    context.fillStyle = "black";
    for (let x = 0; x < xCap; ++x) {
        for (let y = 0; y < yCap; ++y) {
            const score = neuron.memory[x][y];
            if (score > 0) {
                context.fillStyle = `rgba(0,0,0,${score / 900})`;
                context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }

        }
    }
})