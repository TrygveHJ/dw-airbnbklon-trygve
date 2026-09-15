const params = new URLSearchParams(location.search)
console.log(params.get("id"));
let paramsId = params.get("id")
// let destinationData = "./data/"
// let a = new URL(paramsId, destinationData)
// console.log(a);


// document.querySelector(".searched").textContent = paramsId
const destinations = "./data/destinations.json"

async function fetchDestinations(url, createPage) {

    try {
        // get results from the url
        let result = await fetch(url)

        if (!result.ok) {
            throw new Error("ERROR" + result.status)
        }

        let data = await result.json()

        createPage(data)

    } catch (error) {
        console.error("Something went wrong...", error)
    }
}
fetchDestinations(`./data/${paramsId}.json`, listDestination)

const destinationDOM = document.querySelector(".destination")

function listDestination(data) {
    console.log(data);
    console.log(data.destination);
    console.log(data.image);
    console.log(data.facilities);

    destinationDOM.innerHTML =
        `<article class="destination__article">
            <div class="destination__text">
                <h2 class="destination__name">${data.destination}</h2>
                <h3 class="destination__title">${data.title}</h3>
                <h4 class="destination__subtitle">${data.subtitle}</h4>
                <p class="destination__description">${data.text}</p>
                <ul class="destination__facilities">

                </ul>
            </div>
            <div>
                <img src="img/${data.image}" alt="" class="destination__img"></img>
                <button class="destination__favorite">&#10084; Favorit</button>
            </div>
        </article>`

    const facilitiesDOM = document.querySelector(".destination__facilities")
    facilitiesDOM.innerHTML = data.facilities.map(facility =>
        `<li class="facilities__item">${facility}</li>`
    ).join("")

}