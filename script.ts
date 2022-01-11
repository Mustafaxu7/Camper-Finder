"use strict"

class Van {
    constructor(public make: string, public model: string, public picture: string, public price: number, public colour: string, public mileage: number, public location: object, public features: string) { }
}
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
    constructor(public radius: number, public cx: number, public cy: number, public id: string) { }
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
        circle.classList.add("circle")
        svg.appendChild(circle)
    }
}
let isDown = false
let currentMousePosition = new Vector(0, 0)
let clickedMousePosition1 = new Vector(0, 0)
let clickedMousePosition2 = new Vector(0, 0)
let clickCount = 0
let circles: Circle[] = []

let colours = "red,orange,yellow,green,blue,violet,black,white,gray".split(",")
let makes: any = {}
let features = ["Fixed Roof", "Pop-Up Roof", "Fridge", "Propane Gas Cooktop", "Electric Cooktop", "Grill", "Propane Gas Powered Water Heater", "Kitchen", "AC", "Bed", "Portable Toilet", "Internal Power System", "USB Charging Points", "Folding Dining Table", "Manual", "Automatic", "Travel Seats"]
makes.Volkswagen = "Caddy, California, Classic, Kombi, Trendline".split(",")
makes.Ford = "Transit, Tourneo, errier, Panama, Kombi".split(",")
makes.Vauxhall = "Bedford, Midi, Movano, Turbo, Vivaro".split(",")
makes.Fiat = "Ducato, Randger, Swift, Talento, Trigano".split(",")
makes.Nissan = "NV200, ENV200, Primastar, Elgrand, Elgrande".split(",")

let vans: Van[] = []
//localStorage.removeItem("vans")

vans = JSON.parse(localStorage.getItem("vans")!);
if (vans == null) {
    vans = generateRandomVans(makes, 5)
    saveVans()
}

// circles = JSON.parse(localStorage.getItem("circles")!);
// if (circles == null) {
//     createCircle("5", "1", "2")
//     saveCircles()
// }

//cars.sort((a,b)=>a.price-b.price) 

let holder: HTMLElement = document.getElementById("holder")!

renderVans(vans)

function saveVans() {
    let vansString = JSON.stringify(vans)  //Converts our 'complex' array of car objects into a single string 
    localStorage.setItem("vans", vansString)  //permanently save (so the user can close their browser, or even swtich off - and come back to the came cars)
}

// function saveCircles() {
//     let circlesString = JSON.stringify(circles)  //Converts our 'complex' array of car objects into a single string 
//     localStorage.setItem("circles", circlesString)  //permanently save (so the user can close their browser, or even swtich off - and come back to the came cars)
// }

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
        alert('not such a element ${id}')
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
        vans.push(new Van(make, model, pickName, Math.round(Math.random() * 10000), colours[Math.floor(Math.random() * colours.length)], Math.floor(Math.random() * 10000), { x: 10, y: 20 }, features[Math.random() * features.length]))
    }
    return vans  //send back the 'complete' list of Vans
}


// a generic function to return a random selection from ANY array (i choose to pass it)
function pickFrom(list: string[]) {
    let r = Math.floor(Math.random() * list.length)  // generate a random number between 0 and the list length (-1)
    return list[r]  //return the chosen item
}
function randomInteger(max: number) {
    return Math.floor(Math.random() * max) + 1
}

// filters functions 

function filterBycolour(colour: string) {
    vans = vans.filter((v) => v.colour == colour)
    renderVans(vans)
}
function filterByPrice() {
    $('priceText').innerText = ((<HTMLInputElement>$('what-Price')).value)
    vans = vans.filter((v) => v.price <= parseInt((<HTMLInputElement>$('what-Price')).value))

    renderVans(vans)
}

function filterByFeature(feature: string) {
    vans = vans.filter((v) => (v.features == feature))

}

function img(fileName: string): HTMLImageElement {
    let img = document.createElement("img");
    img.src = fileName;
    return img;
}

// At the moment circles are appending as long as we are moving the mouse 

function mouseDown(e: any) {
    clickedMousePosition1 = new Vector(e.clientX, e.clientY)
    circles.push(new Circle(2, clickedMousePosition1.x, clickedMousePosition1.y, "London"))
    isDown = true
}
function mouseMove(e: any) {
    currentMousePosition = new Vector(e.clientX, e.clientY)
    let currentRad = Vector.distanceBetween(clickedMousePosition1, currentMousePosition)
    circles[circles.length - 1].radius = currentRad
    for (let i = 0; i < circles.length; i++) {
        circles[i].addCircle()
    }
}
function mouseUp() {
    isDown = false
    return isDown
}

let ukMap = $("ukMap")
let ukMapContainer = $("ukMapContainer")

// Creating DOM Input Checkbox 

function domColorCheckboxes() {

    for (let i = 0; i < colours.length; i++) {

        let colourDiv = $("colour");

        let colorInput = document.createElement('input');

        colorInput.type = "checkbox"
        colorInput.name = colours[i]
        colorInput.value = colours[i]
        colorInput.classList.add('colorCheckbox')
        colorInput.id = 'whichColor'
        colorInput.addEventListener("click", () => filterBycolour(colours[i]))

        // creating label for colorInput
        let label = document.createElement('label');
        label.htmlFor = colours[i];

        label.appendChild(document.createTextNode(colours[i]));

        colourDiv.appendChild(colorInput);
        colourDiv.appendChild(label);
    }

}

domColorCheckboxes()

ukMapContainer.addEventListener("mousemove", mouseMove)
ukMapContainer.addEventListener("mouseup", () => isDown = false)
ukMapContainer.addEventListener("mousedown", mouseDown)


function domfeatureCheckboxes() {

    for (let i = 0; i < features.length; i++) {

        let featureDiv = $("features");

        let featureInput = document.createElement('input');

        featureInput.type = "checkbox"
        featureInput.name = features[i]
        featureInput.value = features[i]
        featureInput.classList.add('featuresCheckbox')
        featureInput.id = 'whichFeature'
        featureInput.addEventListener("click", () => filterBycolour(features[i]))

        // creating label for featureInput
        let label = document.createElement('label');
        label.htmlFor = features[i];

        label.appendChild(document.createTextNode(features[i]));

        featureDiv.appendChild(featureInput);
        featureDiv.appendChild(label);
    }

}

domfeatureCheckboxes()




// $("whichPrice").addEventListener("input", (e) => { $("priceValue").innerText = (<any>e).target.value; filterByPrice })
// $('what-Price').addEventListener('change', filterByPrice)


// $("whichPrice").addEventListener("input", (e) => { $("priceValue").innerText = (<any>e).target.value; filterByPrice })
$('what-Price').addEventListener('change', filterByPrice)


