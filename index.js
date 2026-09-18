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
fetchDestinations(destinations, listDestinations)

const apartmentsDOM = document.querySelector(".apartments")

function listDestinations(data) {
    console.log(data);

    apartmentsDOM.innerHTML = data.destinations.map(destination =>
        `
        <li> 
        <a href="destination.html?id=${destination.id}" class="apartment__img-link"><img src="img/${destination.image}"></a>
        <div class="apartment__bottom">
        <button class="apartment__favorite">&#10084;</button>
        <a href="destination.html?id=${destination.id}" class="color1 apartment-more">
        More</a>
        </div>
        </li>
        `
    ).join("")

}