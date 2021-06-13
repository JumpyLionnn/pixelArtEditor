class Color {
    public red: number;
    public green: number;
    public blue: number;
    public alpha: number;
    constructor(red: number, green: number, blue: number, alpha: number = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    public toArray(): number[]{
        return [this.red, this.green, this.blue, this.alpha];
    }

    public toString(): string{
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
    
    public static hsvToRgb(hue: number, saturation: number, value: number): Color{
        saturation = saturation / 100;  
        value = value / 100;                        
        let func = (n: number, k = (n + hue / 60 ) % 6) => {
            return (value - value * saturation * Math.max(Math.min(k, 4 - k, 1), 0)) * 255;
            };
        return new Color(func(5),func(3),func(1));       
    }


    public static hexToRgb(hex: string): Color | null {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : null;
    }
      



    public static black(): Color{
        return new Color(255, 255, 255);
    }

    public static white(): Color{
        return new Color(0, 0, 0);
    }
}