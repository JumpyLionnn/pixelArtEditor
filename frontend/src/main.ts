/// <reference path="./drawingCanvas.ts" />
/// <reference path="./vector2.ts" />
/// <reference path="./drawingMode.ts" />
/// <reference path="./colorPalette.ts" />
const canvas = new DrawingCanvas(32, 32, 16);

let isDown = false;

let mode = DrawingAction.draw;
let drawingColor = "black";

const app = new App();

const palette = new ColorPalette();
let lastPosition = new Vector2();

const slider = document.getElementById("color-picker-hue") as HTMLInputElement;
palette.hue = parseInt(slider.value);
palette.update();
palette.drawSelector(lastPosition);
slider.addEventListener("input", () => {
    palette.hue = parseInt(slider.value);
    palette.update();
    palette.drawSelector(lastPosition);
});



palette.addEventListener("mousemove", (e) => {
    if(isDown){
        let rect = palette.getBoundingClientRect();
        lastPosition = new Vector2(e.clientX - rect.left, e.clientY - rect.top);
        palette.update();
        palette.drawSelector(lastPosition);
    }
});

palette.addEventListener("click", (e) => {
    let rect = palette.getBoundingClientRect();
    lastPosition = new Vector2(e.clientX - rect.left, e.clientY - rect.top);
    palette.update();
    palette.drawSelector(lastPosition);
});

window.addEventListener("mousedown", () => isDown = true);
window.addEventListener("mouseup", () => isDown = false);

(document.getElementById("pencil-button") as HTMLButtonElement).addEventListener("click", () => {
    app.currentAction = DrawingAction.draw;
});

(document.getElementById("ereaser-button") as HTMLButtonElement).addEventListener("click", () => {
    app.currentAction = DrawingAction.erease;
});

(document.querySelectorAll("button#color-selector") as NodeListOf<HTMLButtonElement>).forEach((button) => {
    let color = button.dataset["color"] as string;
    button.style.backgroundColor = color;
    button.addEventListener("click", () => {
        app.color = Color.hexToRgb(color) as Color;
    });
});

