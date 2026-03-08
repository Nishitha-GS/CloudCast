import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    const API_URL="https://api.openweathermap.org/data/2.5/weather"
    const API_KEY="c0b6ea1354cf16a1472f75e650b4f121" 
    
    let [city,setCity] = useState("");
    let [error,seterror] = useState(false);
    let searchCity =(event)=>{
        setCity(event.target.value);
    }

    let getWeatherInfo = async() =>{
       try{
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
       const jsonresponse =await response.json();
    //    console.log(jsonresponse);
       let result ={
        city:city,
        temp:jsonresponse.main.temp,
        temp_min:jsonresponse.main.temp_min,
        temp_max:jsonresponse.main.temp_max,
        pressure:jsonresponse.main.pressure,
        humidity:jsonresponse.main.humidity,
        weather:jsonresponse.weather[0].description
       };
    //    console.log(result);
    return result;
       }catch(err){
        throw err
       }
    }

    let handleSubmit = async (event) =>{
        try{
            event.preventDefault();
            setCity("");
            seterror(false);
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo); 
        }catch(err){
            seterror(true);
        }
    }
    let getLocationWeather = async (event)=>{
        return new Promise((resolve,reject)=>{
            if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async (position)=>{
                try{
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    const response = await fetch(`${API_URL}?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`);
                    const jsonresponse =await response.json();
                    // console.log(jsonresponse);
                    let result ={
                    city:jsonresponse.name,
                    temp:jsonresponse.main.temp,
                    temp_min:jsonresponse.main.temp_min,
                    temp_max:jsonresponse.main.temp_max,
                    pressure:jsonresponse.main.pressure,
                    humidity:jsonresponse.main.humidity,
                    weather:jsonresponse.weather[0].description 
                };
                // console.log(result);
                resolve(result)
                }catch(err){
                    seterror(true);
                }

                });
            } else {
                reject("Geolocation not supported");
                }

            });
            };
        let handleLocation = async(event)=>{
            event.preventDefault();
        try{
            seterror(false);
            let newInfo = await getLocationWeather();
            // console.log("new node "+newInfo)
            updateInfo(newInfo);
        }catch(err){
            seterror(city);
        }
    }
        return(
        <>
        <div className='form'>
            <h3>Search city</h3>
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="City Name" variant="outlined" onChange={searchCity} value={city} required/>
                <br></br><br></br><br></br>
                <Button variant="contained" type="submit" className='submitBtn'>Search</Button>
            </form>
            <br></br><br></br><br></br>
                <Button variant="contained" onClick={handleLocation} className='submitBtn'>Use My Location</Button>
            {error && <p style={{color:"red"}}>No such place exists!</p>}
        </div>
        </>
    )
}