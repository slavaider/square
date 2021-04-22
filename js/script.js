const schema = `
    
`
window.onload = () => {
    let index = 2
    const add = document.querySelector(".add-btn")
    const form = document.querySelector(".form")
    const result = document.querySelector(".result")
    // Listeners
    add.addEventListener("click", () => {
        form.firstElementChild.insertAdjacentHTML("beforeend",
            `
             <div class="col-md-6 col-xs-12">
                <div class="input-group  input-group-sm">
                    <span class="input-group-text">X</span>
                    <input type="number" id="x${index}" class="form-control" required>
                </div>
            </div>
            <div class="col-md-6 col-xs-12">
                <div class="input-group  input-group-sm">
                    <span class="input-group-text">Y</span>
                    <input type="number" id="y${index}" class="form-control" required>
                    <span class="input-group-text">
                        <button type="button" class="btn-sm btn-close close-${index}"></button>
                    </span>
                </div>
            </div>`
        )
        const close = form.querySelector(`.close-${index}`)
        let temp = index
        close.addEventListener("click", () => {
            const x = document.getElementById(`x${temp}`)
            const y = document.getElementById(`y${temp}`)
            x.parentElement.parentElement.remove()
            y.parentElement.parentElement.remove()
        })
        index++
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const dots = form.querySelectorAll("input")
        const x = []
        const y = []
        dots.forEach((el) => {
            const type = el.id.split("")[0]
            type === "x" ? x.push(+el.value) : y.push(+el.value)
        })
        result.innerHTML = ""
        if (x.length !== 1) {
            let res = 0
            let square = 0
            // Perimeter
            for (let i = 0; i < x.length; i++) {
                if (i === x.length - 1) {
                    x.length !== 2 ? res += Math.sqrt(Math.pow(x[0] - x[i], 2) + Math.pow(y[0] - y[i], 2)) : null
                } else {
                    res += Math.sqrt(Math.pow(x[i + 1] - x[i], 2) + Math.pow(y[i + 1] - y[i], 2))
                }
            }
            // Square
            for (let i = 0; i < x.length; i++) {
                if (x.length > 2) {
                    if (i === 0) {
                        square += y[i] * (x[x.length - 1] - x[i + 1])
                    } else {
                        if (i === x.length - 1) {
                            square += y[i] * (x[i - 1] - x[0])
                        } else {
                            square += y[i] * (x[i - 1] - x[i + 1])
                        }
                    }
                } else {
                    result.insertAdjacentHTML("beforeend", `
                    <p>Для площади необходимо 3 или более точек</p>
                    `)
                    break
                }
            }

            square !== 0 ? result.insertAdjacentHTML("beforeend", `
                <p>Площадь: ${square / 2}</p>
            `) : null
            result.insertAdjacentHTML("beforeend", `
                <p>Периметр или длина между точками: ${res}</p>
            `)
        } else {
            result.insertAdjacentHTML("beforeend", `
                <p>Для периметра необходимо 2 или более точек</p>
            `)
        }
    })
}
