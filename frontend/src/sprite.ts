class Sprite {
    public name: string;
    public width: number;
    public height: number;
    public painting: Layer = new Layer();
    constructor(name: string, width: number, height: number) {
        this.name = name;
        this.width = width;
        this.height = height;
    }

    public drawPixel(position: Vector2, color: Color): void{
        this.painting.setPixel(position, color);
    }
}