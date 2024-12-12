import React, { useEffect, useState } from "react"
import Button from "../../shared/Button"
import { getWeather, getParams } from "./api"

export default function Weether() {
    const [city, setCity] = useState(localStorage.getItem('city'))
    const [weathStat, setWeathStat] = useState({})
    const [lat, setLat] = useState(localStorage.getItem('lat'))
    const [lon, setLon] = useState(localStorage.getItem('lon'))
    const [iconURL, setIconURL] = useState('')
    const [pending, setPending] = useState('Готово')

    function handleCity(event) {
        const newCity = event.target.value
        setCity(newCity)
        localStorage.setItem('city', city)
    }

    useEffect(() => {
        getWeatherIn()
        localStorage.setItem('city', city)
        const auto = setInterval(() => {
            getWeatherIn()
        }, 600000);
        return () => clearInterval(auto)
    }, [city])

    async function getWeatherIn() {
        setPending('Загружаем...')
        try {
            const params = await getParams({ city })
            setLat(params[0].lat)
            setLon(params[0].lon)
            localStorage.setItem('lat', lat)
            localStorage.setItem('lon', lon)
            const data = await getWeather({ lat, lon })
            setWeathStat({
                temp: data.main.temp, 
                feelsLike: data.main.feels_like, 
                windSpeed: data.wind.speed, weath: 
                data.weather[0].description})
            const iconName = data.weather[0].icon
            setIconURL(`http://openweathermap.org/img/w/${iconName}.png`)
            console.log(data)
            setPending('Готово')
        } catch(error) {
            console.error("Такого города нет", error);
            setPending('Не смогли загрузить такой город :<')            
        }
    }
    return (
        <>
            <input value={city} onChange={handleCity} placeholder="Введите город"/>
            <Button text={"Обновить"} onclick={getWeatherIn}></Button>
            {pending === 'Готово' ? (<div className="weath">
                <img src={iconURL} alt="Иконка погоды" width='60'></img>
                <h3>{city}</h3>
                <div className="opis">
                    <p>Cейчас {weathStat.weath}.<br/>Температура: {weathStat.temp}, ощущается как {weathStat.feelsLike}.<br/>Скорость ветра: {weathStat.windSpeed}м/с</p>
                </div>
            </div>) : (
                <h3>{pending}</h3>
            )}
        </>
    )
}