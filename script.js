let container = document.getElementById("container");
container.style.display = "grid";

let resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
    clearGrid();
    displayGrid(64, "black");
})

let number = 64;

const randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
} 

function displayGrid(number, color) {
    container.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${number}, 1fr)`;
    for(let i = 0; i < number * number; i++) {
        let div = document.createElement("div");
        div.addEventListener("mouseover", () => {
            if(color === "rainbow") {
                div.style.backgroundColor = randomColor();
            } else {
                div.style.backgroundColor = color;
            }
        })
        container.appendChild(div);
    }
}

console.log("loading grid");
displayGrid(number, "rainbow");
console.log("first grid loaded");

function clearGrid() {
    container.innerHTML = "";
    console.log("cleaning grid");
}

let formOne = document.getElementById("main-form");
formOne.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(number);
    number = formOne["sqNumber"].value;
    let num = parseInt(number, 10);
    clearGrid();
    console.log(num);
    displayGrid(num, "rainbow");
    console.log("New Grid loaded successfully");
})


// displayGrid(number);