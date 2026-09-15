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
        `<article>
            <div>
                <h2>${data.destination}</h2>
                <h3>${data.title}</h3>
                <p class="subtitle">${data.subtitle}</p>
                <p>${data.text}</p>
                <ul class="facilities">

                </ul>
            </div>
            <div>
                <img src="img/${data.image}" alt=""></img>
                <button>&#10084; Favorit</button>
            </div>
        </article>`

    const facilitiesDOM = document.querySelector(".facilities")
    facilitiesDOM.innerHTML = data.facilities.map(facility =>
        `<li>${facility}</li>`
    ).join("")

}