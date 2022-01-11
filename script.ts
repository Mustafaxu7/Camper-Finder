"use strict"

class Van {
    constructor(public make: string, public model: string, public picture: string, public price: number, public colour: string, public mileage: number, public location: object, public features: string) {
    }
}

let colours = "red,orange,yellow,green,blue,violet,black,white,gray".split(",")
let makes: any = {}
let features = ["Fixed Roof", "Pop-Up Roof", "Fridge", "Propane Gas Cooktop", "Electric Cooktop", "Grill", "Propane Gas Powered Water Heater", "Kitchen", "AC", "Bed", "Portable Toilet", "Internal Power System", "USB Charging Points", "Folding Dining Table", "Manual", "Automatic", "Travel Seats"]
makes.Volkswagen = "Caddy, California, Classic, Kombi, Trendline".split(",")
makes.Ford = "Transit, Tourneo, Errier, Panama, Kombi".split(",")
makes.Vauxhall = "Bedford, Midi, Movano, Turbo, Vivaro".split(",")
makes.Fiat = "Ducato, Randger, Swift, Talento, Trigano".split(",")
makes.Nissan = "NV200, ENV200, Primastar, Elgrand, Elgrande".split(",")

let vans: Van[] = []
//localStorage.removeItem("vans")

vans = JSON.parse(localStorage.getItem("vans")!);
if (vans == null) {
    vans = generateRandomVans(makes, 200)
    saveVans()
}


//cars.sort((a,b)=>a.price-b.price) 

let whichColour = $("whichColor") //grabs the dropdown box
whichColour.addEventListener("change", filterByColour)

let holder: HTMLElement = document.getElementById("holder")!

renderVans(vans)

function saveVans() {
    let vansString = JSON.stringify(vans)  //Converts our 'complex' array of car objects into a single string 
    localStorage.setItem("vans", vansString)  //permanently save (so the user can close their browser, or even swtich off - and come back to the came cars)
}

function renderVans(results: Van[]) {

    holder.innerHTML = ''
    for (let i = 0; i < results.length; i++) {

        let card = document.createElement("div")
        card.classList.add("card")
        holder.appendChild(card)

        let heading = document.createElement("h1")
        heading.innerHTML = results[i].make + " " + results[i].model
        card.appendChild(heading)

        let picture = document.createElement("img")
        picture.src = "vanImages/" + results[i].picture
        card.appendChild(picture)
        picture.style.width = "80%"

        let price = document.createElement("p")
        price.innerHTML = "£" + results[i].price
        card.appendChild(price)

        let mileage = document.createElement("p")
        mileage.innerHTML = results[i].mileage + " miles"
        card.appendChild(mileage)

        let color = document.createElement("div")
        color.classList.add("colorSquare")
        card.appendChild(color)
        color.style.backgroundColor = results[i].colour
    }
}

function $(id: string): HTMLElement {
    let e = document.getElementById(id) //QuerySelector / QuerySelectorAll
    if (e == null) {
        alert(`No such element ${id}`)
    }
    return e!
}

function generateRandomVans(make: any, numVans: number) {
    let vanTypes: string[] = "fiat_ducato.png,fiat_randger.png,fiat_swift.png,fiat_talento.png,fiat_trigano.png,ford_kombi.png,ford_panama.png,ford_terrier.jpg,ford_tourneo.jpg,ford_transit.jpg,nissan_elgrand.png,nissan_elgrande.jpg,nissan_env200.png,nissan_nv200.png,nissan_primastar.jpg,vauxhall_bedford.jpg,vauxhall_midi.jpg,vauxhall_movano.jpeg,vauxhall_turbo.jpg,vauxhall_vivaro.png,vw_caddy.png,vw_california.png,vw_classic.jpg,vw_kombi.png,vw_trendline.jpg".split(",")
    let vans = []
    for (let i = 0; i < numVans; i++) {
        let pickName = pickFrom(vanTypes)
        let makeAndModel = pickName.split(".")[0]
        let make = makeAndModel.split("_")[0]
        let model = makeAndModel.split("_")[1]
        vans.push(new Van(make, model, pickName, Math.round(Math.random() * 1000), colours[Math.floor(Math.random() * colours.length)], Math.floor(Math.random() * 10000), { x: 10, y: 20 }, features[Math.random() * features.length]))
    }
    return vans  //send back the 'complete' list of Vans
}


// a generic function to return a random selection from ANY array (i choose to pass it)
function pickFrom(list: string[]) {
    let r = Math.floor(Math.random() * list.length)  // generate a random number between 0 and the list length (-1)
    return list[r]  //return the chosen item
}

function randomInteger(max: number) {  //Returns a number between 1 and max (inclusive)
    return Math.floor(Math.random() * max) + 1
}

function filterByColour() {
    vans = vans.filter((c) => c.colour == (<HTMLSelectElement>$('whichColour')).value)
    renderVans(vans)
}

function filterByPrice() {
    vans = vans.filter((v) => v.price <= parseInt((<HTMLInputElement>$('whichPrice')).value))
    renderVans(vans)
}
function img(fileName: string): HTMLImageElement {
    let img = document.createElement("img");
    img.src = fileName;
    return img;
}

$("whichColor").addEventListener("click", filterByColour)

// $("whichPrice").addEventListener("input", (e) => { $("pl").innerText = (<any>e).target.value; filterByPrice })
// $("whichPrice").addEventListener("input", filterByPrice)

// localStorage.clear()


let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal!.classList.toggle("show-modal");
}

function windowOnClick(event: any) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger!.addEventListener("click", toggleModal);
closeButton!.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

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
        circle.classList.add("savedCircles")
        circle.setAttribute("id", this.id.toString())
        circle.classList.add("circle")
        svg.appendChild(circle)
    }
}

// localStorage.clear()
let ukMapContainer = $("ukMapContainer")
let isDown = true
let currentMousePosition = new Vector(0, 0)
let clickedMousePosition1 = new Vector(0, 0)
let clickedMousePosition2 = new Vector(0, 0)
let clickCount = 0
let circles: any[] = []

function saveCircles() {
    let circlesString = JSON.stringify(circles)  //Converts our 'complex' array of circle objects into a single string
    localStorage.setItem("circles", circlesString) //permanently save (so the user can close their browser, or even swtich off - and come back to the came circles)
    // console.log(circlesString)
}


// circles = JSON.parse(localStorage.getItem("circles")!);
circles = [{ "radius": 10.44030650891055, "cx": 254, "cy": 56, "id": 1 }, { "radius": 4.47213595499958, "cx": 258, "cy": 41, "id": 2 }, { "radius": 10.63014581273465, "cx": 306, "cy": 36, "id": 3 }, { "radius": 14.212670403551895, "cx": 287, "cy": 43, "id": 4 }, { "radius": 20.8806130178211, "cx": 267, "cy": 55, "id": 5 }, { "radius": 5.385164807134504, "cx": 243, "cy": 65, "id": 6 }, { "radius": 38.3275357934736, "cx": 288, "cy": 153, "id": 7 }, { "radius": 15.297058540778355, "cx": 311, "cy": 115, "id": 8 }, { "radius": 9.219544457292887, "cx": 355, "cy": 110, "id": 9 }, { "radius": 7.810249675906654, "cx": 365, "cy": 106, "id": 10 }, { "radius": 20.8806130178211, "cx": 343, "cy": 131, "id": 11 }, { "radius": 6.082762530298219, "cx": 330, "cy": 105, "id": 12 }, { "radius": 18.027756377319946, "cx": 242, "cy": 105, "id": 13 }, { "radius": 6.4031242374328485, "cx": 262, "cy": 88, "id": 14 }, { "radius": 11, "cx": 234, "cy": 140, "id": 15 }, { "radius": 8.06225774829855, "cx": 222, "cy": 160, "id": 16 }, { "radius": 25.495097567963924, "cx": 282, "cy": 200, "id": 17 }, { "radius": 11.40175425099138, "cx": 247, "cy": 194, "id": 18 }, { "radius": 7.211102550927978, "cx": 346, "cy": 237, "id": 19 }, { "radius": 14.317821063276353, "cx": 354, "cy": 254, "id": 20 }, { "radius": 23.345235059857504, "cx": 308, "cy": 256, "id": 21 }, { "radius": 7.280109889280518, "cx": 276, "cy": 232, "id": 22 }, { "radius": 15.231546211727817, "cx": 277, "cy": 248, "id": 23 }, { "radius": 14.866068747318506, "cx": 273, "cy": 283, "id": 24 }, { "radius": 9.899494936611665, "cx": 283, "cy": 301, "id": 25 }, { "radius": 8.602325267042627, "cx": 260, "cy": 304, "id": 26 }, { "radius": 20.808652046684813, "cx": 328, "cy": 277, "id": 27 }, { "radius": 13, "cx": 300, "cy": 283, "id": 28 }, { "radius": 18.027756377319946, "cx": 367, "cy": 280, "id": 29 }, { "radius": 20.8806130178211, "cx": 353, "cy": 307, "id": 30 }, { "radius": 15.811388300841896, "cx": 327, "cy": 331, "id": 31 }, { "radius": 16.401219466856727, "cx": 376, "cy": 318, "id": 32 }, { "radius": 20, "cx": 350, "cy": 342, "id": 33 }, { "radius": 18.35755975068582, "cx": 390, "cy": 344, "id": 34 }, { "radius": 20.396078054371138, "cx": 360, "cy": 372, "id": 35 }, { "radius": 25.553864678361276, "cx": 405, "cy": 360, "id": 36 }, { "radius": 10.44030650891055, "cx": 430, "cy": 373, "id": 37 }, { "radius": 14.142135623730951, "cx": 352, "cy": 390, "id": 38 }, { "radius": 10, "cx": 350, "cy": 406, "id": 39 }, { "radius": 22.090722034374522, "cx": 384, "cy": 401, "id": 40 }, { "radius": 41.340053217188775, "cx": 403, "cy": 426, "id": 41 }, { "radius": 13.341664064126334, "cx": 451, "cy": 430, "id": 42 }, { "radius": 4.47213595499958, "cx": 348, "cy": 427, "id": 43 }, { "radius": 9.055385138137417, "cx": 348, "cy": 436, "id": 44 }, { "radius": 38.07886552931954, "cx": 331, "cy": 481, "id": 45 }, { "radius": 13.45362404707371, "cx": 297, "cy": 443, "id": 46 }, { "radius": 2.23606797749979, "cx": 276, "cy": 431, "id": 47 }, { "radius": 11, "cx": 280, "cy": 518, "id": 48 }, { "radius": 22.825424421026653, "cx": 312, "cy": 527, "id": 49 }, { "radius": 58, "cx": 403, "cy": 515, "id": 50 }, { "radius": 31.38470965295043, "cx": 491, "cy": 492, "id": 51 }, { "radius": 16.278820596099706, "cx": 451, "cy": 475, "id": 52 }, { "radius": 21.18962010041709, "cx": 462, "cy": 570, "id": 53 }, { "radius": 14.866068747318506, "cx": 463, "cy": 525, "id": 54 }, { "radius": 16.76305461424021, "cx": 424, "cy": 578, "id": 55 }, { "radius": 25, "cx": 361, "cy": 580, "id": 56 }, { "radius": 16, "cx": 302, "cy": 595, "id": 57 }, { "radius": 10.198039027185569, "cx": 275, "cy": 608, "id": 58 }, { "radius": 5.0990195135927845, "cx": 278, "cy": 593, "id": 59 }, { "radius": 8.48528137423857, "cx": 292, "cy": 617, "id": 60 }, { "radius": 5.385164807134504, "cx": 253, "cy": 620, "id": 61 }, { "radius": 5.0990195135927845, "cx": 263, "cy": 622, "id": 62 }, { "radius": 8.246211251235321, "cx": 492, "cy": 576, "id": 63 }, { "radius": 21.400934559032695, "cx": 177, "cy": 323, "id": 64 }, { "radius": 6.708203932499369, "cx": 184, "cy": 298, "id": 65 }, { "radius": 7.0710678118654755, "cx": 122, "cy": 312, "id": 66 }, { "radius": 5.0990195135927845, "cx": 116, "cy": 302, "id": 67 }, { "radius": 4, "cx": 111, "cy": 316, "id": 68 }, { "radius": 40.024992192379, "cx": 116, "cy": 416, "id": 69 }, { "radius": 8.246211251235321, "cx": 64, "cy": 375, "id": 70 }, { "radius": 8.06225774829855, "cx": 54, "cy": 364, "id": 71 }, { "radius": 8.06225774829855, "cx": 80, "cy": 370, "id": 72 }, { "radius": 12.041594578792296, "cx": 61, "cy": 403, "id": 73 }, { "radius": 8, "cx": 65, "cy": 413, "id": 74 }, { "radius": 14.422205101855956, "cx": 76, "cy": 385, "id": 75 }, { "radius": 17.88854381999832, "cx": 118, "cy": 367, "id": 76 }, { "radius": 25.238858928247925, "cx": 151, "cy": 378, "id": 77 }, { "radius": 22.67156809750927, "cx": 140, "cy": 340, "id": 78 }, { "radius": 8.602325267042627, "cx": 151, "cy": 314, "id": 79 }, { "radius": 11.40175425099138, "cx": 185, "cy": 350, "id": 80 }, { "radius": 10.63014581273465, "cx": 202, "cy": 341, "id": 81 }, { "radius": 29.410882339705484, "cx": 158, "cy": 447, "id": 82 }, { "radius": 15.620499351813308, "cx": 173, "cy": 408, "id": 83 }, { "radius": 9, "cx": 86, "cy": 454, "id": 84 }, { "radius": 26.248809496813376, "cx": 115, "cy": 478, "id": 85 }, { "radius": 26.419689627245813, "cx": 72, "cy": 507, "id": 86 }, { "radius": 9.055385138137417, "cx": 111, "cy": 513, "id": 87 }, { "radius": 12.165525060596439, "cx": 151, "cy": 490, "id": 88 }, { "radius": 12.041594578792296, "cx": 171, "cy": 482, "id": 89 }, { "radius": 3.1622776601683795, "cx": 68, "cy": 456, "id": 90 }, { "radius": 4, "cx": 33, "cy": 522, "id": 91 }, { "radius": 5, "cx": 66, "cy": 538, "id": 92 }, { "radius": 5.385164807134504, "cx": 176, "cy": 66, "id": 93 }, { "radius": 7.280109889280518, "cx": 175, "cy": 54, "id": 94 }, { "radius": 4.123105625617661, "cx": 166, "cy": 62, "id": 95 }, { "radius": 3.1622776601683795, "cx": 148, "cy": 103, "id": 96 }, { "radius": 9.219544457292887, "cx": 337, "cy": 163, "id": 97 }]

if (circles == null) {
    circles = []
}
console.log(circles)

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
        circles[circles.length - 1].addCircle()
    }
    ukMapContainer.addEventListener("mousemove", mouseMove)
}

function mouseMove(e: any) {
    if (isDown == true) {
        currentMousePosition = new Vector(e.clientX, e.clientY)
        let currentRad = Vector.distanceBetween(clickedMousePosition1, currentMousePosition)
        circles[circles.length - 1].radius = currentRad
        for (let i = 0; i < circles.length; i++) {
            $(circles[circles.length - 1].id).remove()
            circles[circles.length - 1].addCircle()
            ukMapContainer.addEventListener("mouseup", mouseUp)
        }
    }
}

function mouseUp() {
    isDown = false
    // saveCircles()
}

let ukMap = $("ukMap")

ukMapContainer.addEventListener("mousedown", mouseDown)
for (let i = 0; i < circles.length; i++) {
    let normalRadius = circles[i].radius
    let squaredRadius = Math.pow(circles[i].radius, 2)
    let x = Math.sqrt((Math.random() * squaredRadius) + normalRadius) * Math.cos(Math.random() * 360)

}
