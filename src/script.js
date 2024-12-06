// "main" modulen som samlar data från de andra modulerna och knyter samman allt.

import { getApiKey, getAllPlanets } from "/src/api.js"
import { generateStars } from "/src/stars.js"

let planetData = []

const planetModalColors = {
    solen: "#FFD029",
    merkurius: "#888888",
    venus:"#E7CDCD",
    jorden:"#428ED4",
    mars:"#EF5F5F",
    jupiter:"#E29468",
    saturnus:"#C7AA72",
    uranus:"#C9D4F1",
    neptunus:"#7A91A7"
}

const loadPlanetData = async () => {
    try {
        const apiKey = await getApiKey("POST", "/keys")
        const response = await getAllPlanets("GET", "/bodies", apiKey)
        const planets = response.bodies.filter(body => body.type = "planet", "star")

        planets.forEach(planet => {
            const planetKey = planet.name.toLowerCase()
            planetData[planetKey] = {
                name: planet.name,
                latin: planet.latinName,
                desc: planet.desc,
                circumf: `${planet.circumference} km`,
                kmtosun: `${planet.distance} km`,
                maxtemp: `${planet.temp.day} °C`,
                mintemp: `${planet.temp.night} °C`,
                moons: planet.moons.length > 0 ? planet.moons.join(", ") : "Inga"
            }
            console.log(planetData)
        })

    } catch (error) {
        console.error("Fel vid hämtning av API-data:", error)
    }
}

const showModal = (planetKey) => {
    const planet = planetData[planetKey]
    generateStars(100)
    
    if (!planet) {
        return
    } 
    
    const planetModal = document.getElementById("modal-planet")
    const planetColor = planetModalColors[planetKey]
    planetModal.style.backgroundImage = `linear-gradient(200deg, ${planetColor || "gray"}, black)`

    document.getElementById("planet-name").textContent = planet.name
    document.getElementById("planet-latin").textContent = planet.latin
    document.getElementById("planet-desc").textContent = planet.desc
    document.getElementById("planet-circumference").textContent = planet.circumf
    document.getElementById("planet-kmtosun").textContent = planet.kmtosun
    document.getElementById("planet-maxtemp").textContent = planet.maxtemp
    document.getElementById("planet-mintemp").textContent = planet.mintemp
    document.getElementById("planet-moons").textContent = planet.moons

    document.getElementById("planet-modal").classList.add("show")
}

document.querySelectorAll(".planet").forEach(planet => {
    planet.addEventListener("click", (event) => {
        const planetKey = event.currentTarget.getAttribute("data-planet").toLowerCase()
        showModal(planetKey)
    })
})

const hideModal = () => {
    const modal = document.getElementById("planet-modal")
    modal.classList.add("fade-out")

    setTimeout(() => {
        modal.classList.remove("show")
        modal.classList.remove("fade-out")
    }, 300)
}

const closeButton = document.getElementById("modal-close")
closeButton.addEventListener("click", hideModal)

loadPlanetData()
