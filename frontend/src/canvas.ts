class Canvas {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _pixelSize: number;
    private _width: number;
    private _height: number;
    constructor(width: number, height: number, pixelSize: number) {
        this._width = width;
        this._height = height;
        this._pixelSize = pixelSize;
        this._canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let ctx = this._canvas.getContext("2d");
        if(ctx === null){
            throw new Error("Your browser doesn't support html5 canvas");
        }
        this._ctx = ctx;

        this._canvas.width = width * pixelSize;
        this._canvas.height = height * pixelSize;
        //this._ctx.translate(0, height * pixelSize);
    }

    public get offsetLeft(){return this._canvas.offsetLeft;}
    public get offsetTop(){return this._canvas.offsetTop;}

    public getBoundingClientRect(){
        return this._canvas.getBoundingClientRect();
    }

    private drawRect(x: number, y: number, width: number, height: number){
        this._ctx.fillRect(x * this._pixelSize, y * this._pixelSize, width * this._pixelSize, height * this._pixelSize);
    }

    public drawPixel(position: Vector2){
        this.drawRect(position.x, position.y, 1, 1);
    }

    

    public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any){
        this._canvas.addEventListener(type, listener);
    }

    public convertCoordinates(x: number, y: number): Vector2{
        return new Vector2(Math.floor(x / this._pixelSize), Math.floor(y / this._pixelSize));
    }
}