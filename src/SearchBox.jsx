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
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo); 
        }catch(err){
            seterror(true);
        }
    }
    return(
        <>
        <div className='form'>
            <h3>Search Box</h3>
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="City Name" variant="outlined" onChange={searchCity} value={city} required/>
                <br></br><br></br><br></br>
                <Button variant="contained" type="submit" className='submitBtn'>Search</Button>
            </form>
            {error && <p style={{color:"red"}}>No such place exists!</p>}
        </div>
        </>
    )
}