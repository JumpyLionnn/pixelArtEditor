/// <reference path="./basicCanvas.ts" />
class ColorPalette extends BasicCanvas {
    public hue: number;

    private _width: number;
    private _height: number;
    private _style: HTMLStyleElement;
    constructor() {
        super("#color-palette");
        this.canvas.width = (document.getElementById("color-picker") as HTMLDivElement).clientWidth;
        this.ctx.lineWidth = 3;
        this.hue = 100;
        this._width = this.canvas.width;
        this._height = this.canvas.height;
        this._style = document.createElement("style");
        document.head.appendChild(this._style);
        this.drawGradient();
        this.drawSelector(new Vector2(0, this._height));
        
        
    }

    public clear(){
        this.ctx.clearRect(0, 0, this._width, this._height);
    }

    public drawSelector(position: Vector2){
        
        this.ctx.beginPath();
        const color = hsvToRgb(this.hue, position.x / this._width, 1 - position.y / this._height);
        this.ctx.fillStyle = `rgb(${color.join()})`;
        this.ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.strokeStyle = "white";
        this.ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public drawGradient(){
        let saturationGradient = this.ctx.createLinearGradient(0, 0, this._width, 0);
        saturationGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        saturationGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        let valueGradient = this.ctx.createLinearGradient(0, 0, 0, this._height);
        valueGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        valueGradient.addColorStop(1, "rgba(0, 0, 0, 1)"); 

        const color = hsvToRgb(this.hue, 1, 1);
        this._style.innerHTML = `#color-picker-hue::-webkit-slider-thumb {background-color: rgb(${color.join()});}`;
        this.ctx.fillStyle = `rgb(${color.join()})`;
        this.ctx.fillRect(0, 0, this._width, this._height);
        this.ctx.fillStyle = saturationGradient;
        this.ctx.fillRect(0, 0, this._width, this._height);
        this.ctx.fillStyle = valueGradient;
        this.ctx.fillRect(0, 0, this._width, this._height);
    }

    public update(){
        this.clear();
        this.drawGradient();
    }

    public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any){
        this.canvas.addEventListener(type, listener);
    }


    public resize(){
        this.canvas.width = (document.getElementById("color-picker") as HTMLDivElement).clientWidth;
        this._width = this.canvas.width;
        this.update();
    }
}



function hsvToRgb(hue: number,saturation: number,value: number) 
{                              
  let func = (n: number, k = (n + hue / 60 ) % 6) => {
      return (value - value * saturation * Math.max(Math.min(k, 4 - k, 1), 0)) * 255;
    };     
  return [func(5),func(3),func(1)];       
}   