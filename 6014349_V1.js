const canvasDDA=document.getElementById("canvasDDA")
const canvasB=document.getElementById("canvasB")

const ctxDDA=canvasDDA.getContext("2d")
const ctxB=canvasB.getContext("2d")

let size=4
let zoom=10

function cambiarGrosor(valor){
size=parseInt(valor)
}

function cambiarZoom(valor){
zoom=parseInt(valor)
}

function drawPoint(ctx, x, y, size, color) {
    ctx.fillStyle = color; // <-- Asegúrate de que esta línea exista
    ctx.fillRect(x - size/2, y - size/2, size, size);
}

function drawLine(ctx,x1,y1,x2,y2,size,method){

if(method=="dda"){
drawDDA(ctx,x1,y1,x2,y2,size)
    }

if(method=="bresenham"){
drawBresenham(ctx,x1,y1,x2,y2,size)
    }

}

function drawDDA(ctx,x1,y1,x2,y2,size){

let dx=x2-x1
let dy=y2-y1

let steps=Math.max(Math.abs(dx),Math.abs(dy))

let xInc=dx/steps
let yInc=dy/steps

let x=x1
let y=y1

for(let i=0;i<=steps;i++){

drawPoint(ctx, Math.round(x), Math.round(y), size, "#3498db")

x+=xInc
y+=yInc

    }

}

function drawBresenham(ctx,x1,y1,x2,y2,size){

let dx=Math.abs(x2-x1)
let dy=Math.abs(y2-y1)

let sx=(x1<x2)?1:-1
let sy=(y1<y2)?1:-1

let err=dx-dy

    while (true) {
        // Optimización: Color naranja para identificar Bresenham
        drawPoint(ctx, x1, y1, size, "#e67e22");

        if (x1 === x2 && y1 === y2) break;

        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }
}

function esTriangulo(x1,y1,x2,y2,x3,y3){

let area=x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2)

return area!=0

}
function obtenerCoordenadas(){
    return{
        p1:{x: parseInt(document.getElementById("x1").value || 0, y, parseInt (document.getElementById ("y1").value || 0 ))},
        p2:{x: parseInt(document.getElementById("x2").value || 0, y, parseInt (document.getElementById ("y2").value || 0 ))},
        p3:{x: parseInt(document.getElementById("x3").value || 0, y, parseInt (document.getElementById ("y3").value || 0 ))}
}


function graficar(){
    limpiar();
    const { p1, p2, p3 } = obtenerCoordenadas();

    if(!esTriangulo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)){
        document.getElementById("mensaje").innerText = "⚠️ No forman un triángulo";
        return;
    }

    // Aplicar zoom y preparar líneas
    const pts = [
        { x: p1.x * zoom, y: p1.y * zoom },
        { x: p2.x * zoom, y: p2.y * zoom },
        { x: p3.x * zoom, y: p3.y * zoom }
    ];

    const lineas = [[pts[0], pts[1]], [pts[1], pts[2]], [pts[2], pts[0]]];

    lineas.forEach(l => {
        drawDDA(ctxDDA, l[0].x, l[0].y, l[1].x, l[1].y, size);
        drawBresenham(ctxB, l[0].x, l[0].y, l[1].x, l[1].y, size);
    });
}
}