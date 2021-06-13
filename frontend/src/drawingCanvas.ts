/// <reference path="./basicCanvas.ts" />

class DrawingCanvas extends BasicCanvas {
    private _pixelSize: number;
    private _width: number;
    private _height: number;

    private _mainDrawingCanvas: HTMLDivElement;
    private _strechedCanvasContainer: HTMLDivElement;
    constructor(width: number, height: number, pixelSize: number) {
        super("#drawing-canvas");
        this._mainDrawingCanvas = (document.getElementById("main-drawing-canvas") as HTMLDivElement);
        this._strechedCanvasContainer = (document.getElementById("streched-canvas-container") as HTMLDivElement);
        this._width = width;
        this._height = height;
        this._pixelSize = pixelSize;
        this.canvas.width = width * pixelSize;
        this.canvas.height = height * pixelSize;
        this.resize();
        this._mainDrawingCanvas.scrollLeft = this._mainDrawingCanvas.clientWidth / 2;
        this._mainDrawingCanvas.scrollTop = this._mainDrawingCanvas.clientHeight / 2;
    }

    private drawRect(x: number, y: number, width: number, height: number){
        this.ctx.fillRect(x * this._pixelSize, y * this._pixelSize, width * this._pixelSize, height * this._pixelSize);
    }

    private clearRect(x: number, y: number, width: number, height: number){
        this.ctx.clearRect(x * this._pixelSize, y * this._pixelSize, width * this._pixelSize, height * this._pixelSize);
    }

    public drawPixel(position: Vector2){
        this.drawRect(position.x, position.y, 1, 1);
    }

    public clearPixel(position: Vector2){
        this.clearRect(position.x, position.y, 1, 1);
    }

    public drawPixelLine(position1: Vector2, position2: Vector2): void{ 
        let xLine = Math.abs(position2.x - position1.x);
        let yLine = Math.abs(position2.y - position1.y);
        
        if(yLine > xLine){  
            let ratio = yLine / xLine;
            // every time I am moving <ratio> times to the y axis I need to move 1 in the x
            for (let i = 0; i < yLine; i++) {
                let xSize = Math.floor(i / ratio);
                this.drawPixel(new Vector2(position1.x + xSize, position1.y + i));
            }
        }
        else{
            let ratio = xLine / yLine;
            // every time I am moving <ratio> times to the x axis I need to move 1 in the y
            for (let i = 0; i < xLine; i++) {
                let ySize = Math.floor(i / ratio);
                this.drawPixel(new Vector2(position1.x + i, position1.y + ySize));
            }
        }
    }

    public color(color: Color){
        this.ctx.fillStyle = color.toString();
    }

    public convertCoordinates(x: number, y: number): Vector2{
        return new Vector2(Math.floor(x / this._pixelSize), Math.floor(y / this._pixelSize));
    }

    public resize(){
        this._strechedCanvasContainer.style.width = this._mainDrawingCanvas.clientWidth * 2 + "px";
        this._strechedCanvasContainer.style.height = this._mainDrawingCanvas.clientHeight * 2 + "px";
    }

    public get canvasSize(){
        return new Vector2(this.canvas.width, this.canvas.height);
    }
}