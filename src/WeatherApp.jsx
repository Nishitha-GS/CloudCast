import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { useState } from 'react'


export default function WeatherApp(){
    const [weatherInfo, setWeatherInfo] = useState({
        city:"Mumbai",
        humidity: 13,
        pressure: 1011,
        temp: 28.08,
        temp_max: 28.08,
        temp_min: 28.08,
        weather: "clear sky"
    })

    let updateInfo = (newInfo) =>{
        setWeatherInfo(newInfo);
    }
    return(
        <>
        <div style={{textAlign:"center"}}>
            <h1>Weather App By NGS</h1>
            <SearchBox updateInfo = {updateInfo}/>
            <InfoBox info = {weatherInfo}/>
        </div>
        </>
    )
}