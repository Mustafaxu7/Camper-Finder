"use strict"
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
        circle.classList.add("savedCircles")
        circle.setAttribute("id", this.id.toString())
        circle.classList.add("circle")
        svg.appendChild(circle)
    }
}

class Van {
    constructor(public make: string, public model: string, public picture: string, public price: number, public colour: string, public mileage: number, public location: Vector, public features: string) {
    }
}





// GETTING ALL THE ID'S OF ELEMENTS 
let ukMapContainer = $("ukMapContainer")
let ukMap = $("ukMap")

let holder: HTMLElement = $("holder")!
$('what-Price').addEventListener('change', filterByPrice)

// EMPTY ARRAYS, OBJECTS, BOOLEANS AND VARIABLES
let makes: any = {}
let vans: Van[] = []

let isDown = true
let currentMousePosition = new Vector(0, 0)
let clickedMousePosition1 = new Vector(0, 0)
let clickedMousePosition2 = new Vector(0, 0)
let clickCount = 0
let id = 1

let features: Record<string, string> = {
    A: "Fixed Roof",
    B: 'Pop-Up Roof',
    C: 'Fridge',
    D: "Propane Gas",
    E: "Cooktop",
    F: "Electric Cooktop",
    G: "Grill",
    H: "Kitchen",
    I: "AC",
    J: "Bed",
    K: "Toilet",
    L: "Power System",
    M: "USB Charging",
    N: 'Folding-Table',
    O: 'Manual',
    P: 'Automatic',
    Q: "Travel Seats"
}
// ARRAYS CREATED BY SPLITTING STRINGS

let colours = "Red,Orange,Yellow,Green,Blue,Violet,Black,White,Gray".split(",")
// let features = "Fixed Roof,Pop-Up Roof,Fridge,Propane Gas Cooktop,Electric Cooktop,Grill,Propane Gas Powered Water Heater,Kitchen,AC,Bed,Portable Toilet,Internal Power System,USB Charging Points,Folding Dining Table,Manual,Automatic,Travel Seats".split(",")
makes.Volkswagen = "Caddy, California, Classic, Kombi, Trendline".split(",")
makes.Ford = "Transit, Tourneo, Errier, Panama, Kombi".split(",")
makes.Vauxhall = "Bedford, Midi, Movano, Turbo, Vivaro".split(",")
makes.Fiat = "Ducato, Randger, Swift, Talento, Trigano".split(",")
makes.Nissan = "NV200, ENV200, Primastar, Elgrand, Elgrande".split(",")

// EMPTY VALUES


vans = JSON.parse(localStorage.getItem("vans")!);
if (vans == null) {
    vans = generateRandomVans(makes, 100)
    saveVans()
}
renderVans(vans)

domColorCheckboxes()
domFeatureCheckboxes()


let filters = "price,location,colors,manufacturer,features".split(",")

let modal = document.querySelector(".modal");
// let trigger = document.querySelector(".trigger");
for (let i = 0; i < filters.length; i++) {
    let filterButton = document.createElement("button")
    filterButton.innerHTML = filters[i]
    filterButton.addEventListener("click", () => filterBy(filters[i]))
    $("filters").appendChild(filterButton)
}

function filterBy(type: string) {
    if (type == "features") {
        domFeatureCheckboxes()
    }
    if (type == "colors") {
        domColorCheckboxes();
    }

}

function showModal(section: string) {
    // Show the modal dialog and reveal the appropriate section
    // 
}

let closeButton = document.querySelector(".close-button");

// trigger!.addEventListener("click", toggleModal);
closeButton!.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
if (circles == null) {
    circles = []
}

ukMapContainer.addEventListener("mousedown", mouseDown)


let count = 5

let dots: Circle[] = []

function displayAmountCircles(clickedPosition: Vector, movedPosition: Vector) {
    locationFilteredVans = []
    let radius = Vector.distanceBetween(clickedPosition, movedPosition)
    for (let i = 0; i < vans.length; i++) {

        if (Vector.distanceBetween(clickedPosition, vans[i].location) < radius) {
            locationFilteredVans.push(vans[i])
        }
    }
    renderVans(locationFilteredVans)
}


// displayAmountCircles()



for (let i = 0; i < circles.length; i++) {
    let normalRadius = circles[i].radius
    let squaredRadius = Math.pow(circles[i].radius, 2)
    let x = Math.sqrt((Math.random() * squaredRadius) + normalRadius) * Math.cos(Math.random() * 360)

}
