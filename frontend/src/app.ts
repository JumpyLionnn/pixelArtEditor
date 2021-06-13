class App {
    public sprites: Sprite[] = [];
    private _color: Color = Color.black();
    public currentAction: DrawingAction = DrawingAction.draw;
    public drawingCanvas: DrawingCanvas;

    public selectedSprite: number;
    private _isDown: boolean = false;
    private _lastPosition: Vector2 | null = null;
    constructor() {
        this.drawingCanvas = new DrawingCanvas(48, 48, 16);
        window.addEventListener("resize", this.resize.bind(this));
        window.addEventListener("mousedown", this.mouseDown.bind(this));
        window.addEventListener("mouseup", this.mouseUp.bind(this));

        canvas.addEventListener("mousemove", this.mouseMove.bind(this));
        canvas.addEventListener("click", this.click.bind(this));

        //this.drawingCanvas.drawPixelLine(new Vector2(1,1), new Vector2(1,8));
    }

    private mouseUp() {
        this._isDown = false;
        this._lastPosition = null;
    }

    private mouseDown() {
        this._isDown = true;
    }

    public get color(): Color{return this._color;}
    public set color(color: Color){
        this._color = color;
        this.drawingCanvas.color(color);
    }

    private mouseMove(e: MouseEvent){
        if(this._isDown){
            let rect = this.drawingCanvas.getBoundingClientRect();
            let position = canvas.convertCoordinates(e.clientX - rect.left, e.clientY - rect.top);
            if(mode === DrawingAction.draw)
                //this.drawingCanvas.drawPixel(position);
                if(this._lastPosition === null){
                    this.drawingCanvas.drawPixel(position);
                }
                else{
                    this.drawingCanvas.drawPixelLine(this._lastPosition, position);
                }
            else if(mode === DrawingAction.erease){
                this.drawingCanvas.clearPixel(position);
            }
            this._lastPosition = position;
        }
    }


    private click(e: MouseEvent){
        let rect = this.drawingCanvas.getBoundingClientRect();
        let position = canvas.convertCoordinates(e.clientX - rect.left, e.clientY - rect.top);
        if(mode === DrawingAction.draw)
            this.drawingCanvas.drawPixel(position);
        else if(mode === DrawingAction.erease){
            this.drawingCanvas.clearPixel(position);
        }
    }



    private resize(): void{
        this.drawingCanvas.resize();
    }
}