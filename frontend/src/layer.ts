class Layer {
    private pixels: Color[][];

    public setPixel(position: Vector2, color: Color): void{
        this.pixels[position.x][position.y] = color;
    }

    public getPixel(position: Vector2): Color{
        return this.pixels[position.x][position.y];
    }

    public get data(){
        return this.pixels;
    }
}