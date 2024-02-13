class Draw {
    constructor() {
        this.contextTypes = {
            basic: "tutorialBasic",
            overlap: "tutorialRectangleOverlap",
            triangle: "tutorialTriangle",
            smiley: "tutorialSmiley",
            splitTriangle: "tutorialSplitTriangles",
            arcs: "tutorialArcs",
        }
    }
    initContextById(id) {
        const canvas = document.getElementById(id);
        if(canvas.getContext) {
            const ctx = canvas.getContext("2d");
            console.log(`Created 2d Draw Context For: ${id}`);
            return ctx;
        } else {
            console.error("Failed to get Draw Context");
            return null;
        }
    };

    drawRectangles() {
        const drawContext = this.initContextById(this.contextTypes.basic);
        if(drawContext){
            drawContext.fillStyle = "rgb(200, 0, 0)";
            drawContext.fillRect(10, 10, 50, 50);

            drawContext.fillStyle = "rgba(0, 0, 200, 0.5)";
            drawContext.fillRect(30, 30, 50, 50);
            console.log("Drew Rectangles");
        } else {
            console.err("Failed to draw rectangles");
        }
    };

    drawRectangleCustomFuncs() {
        const drawContext = this.initContextById(this.contextTypes.overlap);
        if(drawContext){
            drawContext.fillRect(55, 55, 100, 100);
            drawContext.clearRect(75, 75, 60, 60);
            drawContext.strokeRect(80, 80, 50, 50);
            
            console.log("Drew rectangles using all funcs");
        } else {
            console.err("Failed to draw rectangles");
        }
    }

    drawTriangle() {
        const drawContext = this.initContextById(this.contextTypes.triangle);
        if(drawContext){
            drawContext.beginPath();
            drawContext.moveTo(75, 50);
            drawContext.lineTo(100, 75);
            drawContext.lineTo(100, 25);
            drawContext.fill();

            console.log("Drew triangle");
        } else {
            console.err("Failed to draw triangle");
        }
    };

    drawSmiley() {
        const drawContext = this.initContextById(this.contextTypes.smiley);
        if(drawContext){
            drawContext.beginPath();
            drawContext.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer Circle
            drawContext.moveTo(110, 75);
            drawContext.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
            drawContext.moveTo(65, 65);
            drawContext.arc(60, 65, 5, 0, Math.PI * 2, true); // Left Eye
            drawContext.moveTo(95, 65);
            drawContext.arc(90, 65, 5, 0, Math.PI * 2, true); // Right Eye
            drawContext.stroke();
        }
    };
    drawSplitTriangles() {
        const drawContext = this.initContextById(this.contextTypes.splitTriangle);
        if(drawContext){
            drawContext.beginPath();
            drawContext.moveTo(25, 25);
            drawContext.lineTo(105, 25);
            drawContext.lineTo(25, 105);
            drawContext.fill();

            drawContext.beginPath();
            drawContext.moveTo(125, 125);
            drawContext.lineTo(125, 45);
            drawContext.lineTo(45, 125);
            drawContext.closePath();
            drawContext.stroke();
        }
    };
    drawArcsList() {
        const drawContext = this.initContextById(this.contextTypes.arcs);
        if(drawContext){
            for(let i = 0; i< 4; i++){
                for(let j = 0; j < 3; j++){
                    drawContext.beginPath();
                    const x = 25 + j * 50; // x coord
                    const y = 25 + i * 50; // y coord
                    const radius = 20; // Arc radius
                    const startAngle = 0; // Circle Starting Point
                    const endAngle = Math.PI + (Math.PI * j) / 2; // Circle End Point
                    const counterclockwise = i % 2 !== 0;

                    drawContext.arc(x, y, radius, startAngle, endAngle, counterclockwise);

                    if(i > 1) {
                        drawContext.fill();
                    } else {
                        drawContext.stroke();
                    }
                }
            }
        }
    };
}

function start() {
    const drawer = new Draw()
    drawer.drawRectangles()
    drawer.drawRectangleCustomFuncs();
    drawer.drawTriangle();
    drawer.drawSmiley();
    drawer.drawSplitTriangles();
    drawer.drawArcsList();
};

start();
