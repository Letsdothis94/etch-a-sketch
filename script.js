const defaultColor = "black";
const defaultSize = 16;
const defaultMode = "color";

let currentColor = defaultColor;
let currentSize = defaultSize;
let currentMode = defaultMode;

const setCurrentColor = (newColor) => {
    currentColor = newColor;
}

const setCurrentSize = (newSize) => {
    currentSize = newSize;
}

const setCurrentMode = (newMode) => {
    activateBtn(newMode);
    currentMode = newMode;
}

const container = document.getElementById("container");
const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const unicornBtn = document.getElementById("unicornBtn");
const sizeSlider = document.getElementById("sizeSlider");
const clearBtn = document.getElementById('clearBtn')
const sizeValue = document.getElementById("sizeValue");

colorPicker.oninput = (event) => setCurrentColor(event.target.value);
unicornBtn.onclick = () => setCurrentMode("rainbow");
colorBtn.onclick = () => setCurrentMode("color");
sizeSlider.onchange = (event) => changeSize(event.target.value);
sizeSlider.onmousemove = (event) => updateSize(event.target.value);
clearBtn.onclick = () => reloadGrid();

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function updateSize(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function changeSize(value) {
    setCurrentSize(value);
    updateSize(value);
    reloadGrid();
}

function reloadGrid() {
    clearGrid();
    displayGrid(currentSize, currentColor);
}

function clearGrid() {
    container.innerHTML = "";
}

function displayGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i = 0; i < size * size; i++) {
        let gridDiv = document.createElement("div");
        gridDiv.classList.add("grid-div");
        gridDiv.addEventListener("mouseover", changeColor);
        gridDiv.addEventListener("mousedown", changeColor);
        container.appendChild(gridDiv);
    }
}

function changeColor(event) {
    if(event.type === "mouseover" && !mouseDown) return;
    if(currentMode === "rainbow") {
        event.target.style.backgroundColor = randomColor();
    } else if(currentMode === "color") {
        event.target.style.backgroundColor = currentColor;
    }
}

const randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
} 

function activateBtn(newMode) {
    if(currentMode === "rainbow") {
        unicornBtn.classList.remove("active");
    } else if(currentMode === "color") {
        colorBtn.classList.remove("active");
    }
    
    if(newMode === "rainbow") {
        unicornBtn.classList.add("active");
    } else if(newMode === "color") {
        colorBtn.classList.add("active");
    }
}

window.onload = () => {
    displayGrid(defaultSize);
    activateBtn(defaultMode);
}


