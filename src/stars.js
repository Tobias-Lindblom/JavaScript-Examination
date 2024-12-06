//modul som skapar stjärnor i bakgrunden på modulen.

export const generateStars = (count) => {
    const container = document.getElementById("modal-stars")
    container.innerHTML = ''

    for (let i = 0; i < count; i++) {
        const star = document.createElement("section")
        star.className = "star"

        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100
        const y = Math.random() * 100
        const opacity = Math.random()

        // Tilldela stilen dynamiskt
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.top = `${y}%`
        star.style.left = `${x}%`
        star.style.opacity = opacity

        container.appendChild(star)
    }
}
