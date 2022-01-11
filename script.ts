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

function windowOnClick(event:any) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger!.addEventListener("click", toggleModal);
closeButton!.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
