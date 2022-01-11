"use strict"

class Vector {
    constructor(public x: number, public y: number) { }
    static calcHypo(adjacent: number, opposite: number) {
        return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
    }
    static distanceBetween(a: Vector, b: Vector) {
        return this.calcHypo(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
    }
}
class Circle {
    constructor(public radius: number, public cx: number, public cy: number, public id: number) { }
    addCircle() {
        const svgns = "http://www.w3.org/2000/svg"
        let circle: SVGCircleElement = document.createElementNS(svgns, "circle")
        const svg = $("svg")
        circle.setAttribute("cx", this.cx.toString())
        circle.setAttribute("cy", this.cy.toString())
        circle.setAttribute("r", this.radius.toString())
        circle.setAttribute("stroke", "black")
        circle.setAttribute("stroke-width", "2")
        circle.setAttribute("fill", "none")
        circle.setAttribute("id", this.id.toString())
        circle.classList.add("circle")
        svg.appendChild(circle)
    }
}
let isDown = true
let currentMousePosition = new Vector(0, 0)
let clickedMousePosition1 = new Vector(0, 0)
let clickedMousePosition2 = new Vector(0, 0)
let clickCount = 0
let circles: any[] = []

// circles = JSON.parse(localStorage.getItem("circles")!);
// if (circles == null) {
//     createCircle("5", "1", "2")
//     saveCircles()
// }

function $(id: string): HTMLElement {
    let e = document.getElementById(id) //QuerySelector / QuerySelectorAll
    if (e == null) {
        alert('not such a element ${id}')
    }
    return e!
}

function randomNumber() {
    return Math.floor(Math.random() * 50)
}
let id = 0
function mouseDown(e: any) {
    isDown = true
    id++
    clickedMousePosition1 = new Vector(e.clientX, e.clientY)
    circles.push(new Circle(2, clickedMousePosition1.x, clickedMousePosition1.y, id))
    for (let i = 0; i < circles.length; i++) {
        circles[i].addCircle()
    }
    ukMapContainer.addEventListener("mousemove", mouseMove)
}

function mouseMove(e: any) {
    if (isDown == true) {
        currentMousePosition = new Vector(e.clientX, e.clientY)
        let currentRad = Vector.distanceBetween(clickedMousePosition1, currentMousePosition)
        circles[circles.length - 1].radius = currentRad
        for (let i = 0; i < circles.length; i++) {
            $(circles[i].id).remove()
            circles[i].addCircle()
            ukMapContainer.addEventListener("mouseup", mouseUp)
        }
    }
}

function mouseUp() {
    isDown = false
}

let ukMap = $("ukMap")
let ukMapContainer = $("ukMapContainer")

ukMapContainer.addEventListener("mousedown", mouseDown)



