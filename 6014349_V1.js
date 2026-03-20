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

function drawPoint(ctx,x,y,size){
ctx.fillRect(x-size/2,y-size/2,size,size)
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

drawPoint(ctx,Math.round(x),Math.round(y),size)

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

while(true){

drawPoint(ctx,x1,y1,size)

if(x1===x2 && y1===y2) break

let e2=2*err

if(e2>-dy){
err-=dy
x1+=sx
}

if(e2<dx){
err+=dx
y1+=sy
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

limpiar()

let x1=parseInt(document.getElementById("x1").value)
let y1=parseInt(document.getElementById("y1").value)

let x2=parseInt(document.getElementById("x2").value)
let y2=parseInt(document.getElementById("y2").value)

let x3=parseInt(document.getElementById("x3").value)
let y3=parseInt(document.getElementById("y3").value)

if(!esTriangulo(x1,y1,x2,y2,x3,y3)){
document.getElementById("mensaje").innerText="Los puntos son colineales: NO forman triángulo"
return
}

document.getElementById("mensaje").innerText="Los puntos forman un triángulo"

x1*=zoom
y1*=zoom
x2*=zoom
y2*=zoom
x3*=zoom
y3*=zoom

drawLine(ctxDDA,x1,y1,x2,y2,size,"dda")
drawLine(ctxDDA,x2,y2,x3,y3,size,"dda")
drawLine(ctxDDA,x3,y3,x1,y1,size,"dda")

drawLine(ctxB,x1,y1,x2,y2,size,"bresenham")
drawLine(ctxB,x2,y2,x3,y3,size,"bresenham")
drawLine(ctxB,x3,y3,x1,y1,size,"bresenham")

}

function limpiar(){

ctxDDA.clearRect(0,0,500,500)
ctxB.clearRect(0,0,500,500)

}