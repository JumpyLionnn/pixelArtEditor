abstract class BasicCanvas {
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    constructor(selector: string) {
        this.canvas = document.querySelector(selector) as HTMLCanvasElement;
        let ctx = this.canvas.getContext("2d");
        if(ctx === null){
            throw new Error("Your browser doesn't support html5 canvas");
        }
        this.ctx = ctx;
    }

    public get offsetLeft(){return this.canvas.offsetLeft;}
        public get offsetTop(){return this.canvas.offsetTop;}

    public getBoundingClientRect(){
        return this.canvas.getBoundingClientRect();
    }

    public addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any){
        this.canvas.addEventListener(type, listener);
    }
}