"use strict"

// ALL ABOUT SAVING IN LOCALSTORAGE

function saveCircles() {
    let circlesString = JSON.stringify(circles)  //Converts our 'complex' array of circle objects into a single string
    localStorage.setItem("circles", circlesString) //permanently save (so the user can close their browser, or even swtich off - and come back to the came circles)
}
function saveVans() {
    let vansString = JSON.stringify(vans)  //Converts our 'complex' array of car objects into a single string
    localStorage.setItem("vans", vansString)  //permanently save (so the user can close their browser, or even swtich off - and come back to the came cars)
}

// USEFUL FUNCTIONS (EVEN FOR OTHER PROJECTS)

function randomInteger(max: number) {  //Returns a number between 1 and max (inclusive)
    return Math.floor(Math.random() * max) + 1
}
function img(fileName: string): HTMLImageElement {
    let img = document.createElement("img");
    img.src = fileName;
    return img;
}
function $(id: string): HTMLElement {
    let e = document.getElementById(id) //QuerySelector / QuerySelectorAll
    if (e == null) {
        alert(`No such element ${id}`)
    }
    return e!
}

// ALL ABOUT USER INTERACTION (MOUSE EVENTS)

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
function pickFrom(list: string[]) {
    let r = Math.floor(Math.random() * list.length)  // generate a random number between 0 and the list length (-1)
    return list[r]  //return the chosen item
}

// ALL ABOUT GENERATING VANS

function generateRandomVans(make: any, numVans: number) {
    let vanTypes: string[] = "fiat_ducato.png,fiat_randger.png,fiat_swift.png,fiat_talento.png,fiat_trigano.png,ford_kombi.png,ford_panama.png,ford_terrier.jpg,ford_tourneo.jpg,ford_transit.jpg,nissan_elgrand.png,nissan_elgrande.jpg,nissan_env200.png,nissan_nv200.png,nissan_primastar.jpg,vauxhall_bedford.jpg,vauxhall_midi.jpg,vauxhall_movano.jpeg,vauxhall_turbo.jpg,vauxhall_vivaro.png,vw_caddy.png,vw_california.png,vw_classic.jpg,vw_kombi.png,vw_trendline.jpg".split(",")
    let vans = []
    for (let i = 0; i < numVans; i++) {
        let pickName = pickFrom(vanTypes)
        let makeAndModel = pickName.split(".")[0]
        let make = makeAndModel.split("_")[0]
        let model = makeAndModel.split("_")[1]
        let keys = Object.keys(features)
        let f = ''
        for (let j=0; j<3; j++){
            f+= keys[Math.floor(Math.random() * keys.length)] + ','
        }
         
        vans.push(new Van(make, model, pickName, Math.round(Math.random() * 10000), colours[Math.floor(Math.random() * colours.length)], Math.floor(Math.random() * 10000), { x: 10, y: 20 }, f ))
    }
    return vans  //send back the 'complete' list of Vans
}

function renderVans(results: Van[]) {

    holder.innerHTML = ''
    for (let i = 0; i < results.length; i++) {

        let card = document.createElement("div")
        card.classList.add("card")
        holder.appendChild(card)

        let heading = document.createElement("h1")
        heading.id = 'van-name'
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

        let featuresDiv = document.createElement('div')
        featuresDiv.classList.add('card-features')
        card.appendChild(featuresDiv)
        let featureKeys = results[i].features.split(',')
        for (let i=0; i<featureKeys.length -1; i++){
            let feature = document.createElement('p')
            feature.innerHTML=  features[featureKeys[i]]
            featuresDiv.appendChild(feature)

        }
        

        let color = document.createElement("div")
        color.classList.add("colorSquare")
        card.appendChild(color)
        color.style.backgroundColor = results[i].colour
    }
}
// ALL ABOUT INCREASING USER EXPERIENCE (USER INTERFACE)

function toggleModal() {
    modal!.classList.toggle("show-modal");
}
function windowOnClick(event: any) {
    if (event.target === modal) {
        toggleModal();
    }
}

// ALL ABOUT CREATING THE ELEMENTS FOR FILTERING AND THE FILTERING SYSTEM

let filteredVans: Van[]= []
let selectedProperties: any = []
  
function filterByColour(colour:string, include: boolean) {
    if(include){
        selectedProperties.push(colour)
    }else{
       let index = selectedProperties.indexOf(colour)
       selectedProperties.splice(index, 1)
    }
     
    filteredVans = vans.filter((v) => selectedProperties.includes(v.colour) )

    renderVans(vans)
    
}

let selectedFeatures: any = []
function filterByFeature(features:string, include:boolean) {
    if(include){
        selectedFeatures.push(features)
    }
    else{
        let index = selectedFeatures.indexOf(features)
        selectedFeatures.splice(index, 1)
    }
    
        for (let i=0; i<vans.length; i++){
            for (let k=0; k<features.length; i++){
               features[vans[i].features[k]]
            }
            



    vans = vans.filter((v) => selectedFeatures.includes( ))
    
    
    
}

function filterByPrice() {
    $('priceText').innerText =((<HTMLInputElement>$('what-Price')).value)  
    vans = vans.filter((v) => v.price <= parseInt((<HTMLInputElement>$('what-Price')).value ))
    
    renderVans(vans)
    
}

$('showBtn').addEventListener('click', () => renderFilteredVans())

function renderFilteredVans (){
    
    renderVans(filteredVans)
}



function domColorCheckboxes() {
    for (let i = 0; i < colours.length; i++) {
        let colourDiv = $("whichColor");
        let colorInput = document.createElement('input');
        colorInput.type = "checkbox"
        colorInput.name = colours[i]
        colorInput.value = colours[i]
        colorInput.classList.add('colorCheckbox')
        colorInput.id = "whichColor"
        colorInput.addEventListener("click", (e) => filterByColour(colours[i], (<any>e.target!).checked))
        let label = document.createElement('label');
        label.htmlFor = colours[i];
        label.appendChild(document.createTextNode(colours[i]));
        let div = document.createElement("div")
        div.appendChild(colorInput)
        div.appendChild(label)
        colourDiv.appendChild(div)
    }
}
function domFeatureCheckboxes() {
    // for (let i = 0; i < features.length; i++) 
    
    for (let k in features){
        
        let featureDiv = $("features");
        let featureInput = document.createElement('input');
        featureInput.type = "checkbox"
        featureInput.name = <any>features[k]
        featureInput.value = features[k]
        featureInput.classList.add('featuresCheckbox')
        featureInput.id = 'whichFeature'
        featureInput.addEventListener("click", (e) => filterByFeature(features[k], (<any>e.target!).checked))
        let div = document.createElement("div")
        let label = document.createElement('label');
        label.htmlFor = features[k];
        label.appendChild(document.createTextNode(features[k]));
        div.appendChild(featureInput)
        div.appendChild(label)
        featureDiv.appendChild(div)
    }
}


// localStorage.clear()
