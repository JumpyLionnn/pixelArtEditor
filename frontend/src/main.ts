/// <reference path="./canvas.ts" />
/// <reference path="./vector2.ts" />

const canvas = new Canvas(32, 32, 16);

let isDown = false;

canvas.addEventListener("mousemove", (e) => {
    if(isDown){
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        canvas.drawPixel(canvas.convertCoordinates(x, y));
    }
});

canvas.addEventListener("mousedown", () => {
    isDown = true;
});

canvas.addEventListener("mouseup", () => {
    isDown = false;
});