"use strict"

class Van {
    //properties 
    make: string = ""
    model: string = ""
    picture: string = ""
    price: number = 0
    colour: string = ""
    mileage: number = 0
    location: object = {}
    features: string = ""
    constructor(make: string, model: string, picture: string, price: number, colour: string, mileage: number, location: object, features: string) {
        this.make = make
        this.model = model
        this.picture = picture
        this.price = price
        this.colour = colour
        this.mileage = mileage
        this.location = location
        this.features = features
    }
}

let colours = "red,orange,yellow,green,blue,violet,black,white,gray".split(",")
let makes: any = {}
let features = ["Fixed Roof", "Pop-Up Roof", "Fridge", "Propane Gas Cooktop", "Electric Cooktop", "Grill", "Propane Gas Powered Water Heater", "Kitchen", "AC", "Bed", "Portable Toilet", "Internal Power System", "USB Charging Points", "Folding Dining Table", "Manual", "Automatic", "Travel Seats"]

makes.Ford = "Fiesta,Focus,KA,Mondeo,Fusion,B-Max".split(",")
makes.Tesla = "3,Sport,Cybertruck".split(",")
makes.BMW = "3,5,i3,i7,1 Series".split(",")
makes.Vauxhall = "Corsa,Insignia,Movano,Astra,Senator".split(",")
makes.Toyota = "Yaris,Celica,MR2,Avensis,Rav4".split(",")
makes.Nissan = "Leaf,Primera,Juke,Micra".split(",")



let vans: Van[] = []


//localStorage.removeItem("vans")

vans = JSON.parse(localStorage.getItem("vans")!);
if (vans == null) {
    vans = generateRandomVans(makes, 5)
    saveVans()
}


//cars.sort((a,b)=>a.price-b.price) 

let whichColour = $("whichColour") //grabs the dropdown box
whichColour.addEventListener("change", filterByColour)


let holder: HTMLElement = document.getElementById("holder")!
let saveButton = document.getElementById("save")
saveButton!.addEventListener("click", filterVan)

renderVans(vans)

function saveVans() {

    //Store
    //localStorage.setItem("key", "d;'d'lgf;gfd;'fd';;lhgfd';gflSmith");

    let vansString = JSON.stringify(vans)  //Converts our 'complex' array of car objects into a single string 
    localStorage.setItem("vans", vansString)  //permanently save (so the user can close their browser, or even swtich off - and come back to the came cars)

    // Retrieve
    //value  = localStorage.getItem("key");

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
        picture.src = results[i].picture
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

function filterVan() {

    let make = (<HTMLInputElement>$("make")).value
    let model = (<HTMLInputElement>$("model")).value
    let price = parseInt((<HTMLInputElement>$("price")).value)
    let colour = (<HTMLInputElement>$("colour")).value
    let mileage = parseInt((<HTMLInputElement>$("mileage")).value)

    vans.push(<Van>{ make: make, model: model, price: price, colour: colour, picture: randomPic() })
    renderVans(vans)
    saveVans()

}


function randomPic(): string {

    //returns a random van image URL
    let pics = []
    pics.push("https://www.dethleffs.de/fileadmin/_processed_/3/a/csm_GrandAlpa_I7820-2_Frei_weiss_Seite2_ea7b35051d.png")
    pics.push("https://www.pngkit.com/png/detail/350-3501487_vw-asset-l1-vw-kombi.png")
    pics.push("https://randger.com/wp-content/uploads/2019/09/R640-1.png")
    // pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/ford/b-max.png")
    // pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/bmw/1-series.png")
    // pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/nissan/qashqai.png")

    return pickFrom(pics)

}


function generateRandomVans(makes: any, numVans: number) {
    let vans = []
    for (let i = 0; i < numVans; i++) {
        let make = pickFrom(Object.keys(makes))  //Pick a manufacturer from the makes object
        let model = pickFrom(makes[make])
        vans.push(new Van(make, model, randomPic(), Math.random() * 10000, colours[i], Math.random() * 10000, { x: 10, y: 20 }, features[Math.random() * features.length]))
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
    let filteredCars = vans.filter((c) => c.colour == (<HTMLSelectElement>$('whichColour')).value)
    renderVans(filteredCars)
}
// localStorage.clear()