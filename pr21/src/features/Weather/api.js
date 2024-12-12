import axios from "axios"

export async function getWeather({ lat, lon }) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e9c2f3ecd80bff763959b7093f9abd54&units=metric&lang=ru`)
        return await response.data
    } catch(error) {
        console.error("Ошибочка вышла!", error)
    }
}

export async function getParams({city}) {
    try {
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=e9c2f3ecd80bff763959b7093f9abd54`)
        return await response.data
    } catch (error) {
        console.error("Ошибочка вышла!", error)
    }
}