import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css" 
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';


export default function Info({info}){
    
    let HOT_URL = "https://images.unsplash.com/photo-1528306606980-c7b093f99f21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN1bW1lciUyMG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D";
    let COLD_URL = "https://images.unsplash.com/photo-1420585269105-d908ec316eb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ludGVyfGVufDB8fDB8fHwwRain_day.avif"
    let RAINY_URL = "https://images.unsplash.com/photo-1610741083757-1ae88e1a17f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbnklMjBkYXl8ZW58MHx8MHx8fDA%3D";
    return(
        <>
        <h1 className='weather'>Weather -{info.weather}</h1>
        <div className="cardContainer">
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={info.humidity>80 ? RAINY_URL : (info.temp >15) ? HOT_URL: COLD_URL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {info.city}{info.humidity>80 ? <ThunderstormIcon/> : (info.temp >15) ? <SunnyIcon/>: <AcUnitIcon/>}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
            <p>Temperature :{info.temp}&deg;C</p>
            <p>Max Temperature :{info.temp_max}&deg;C</p>
            <p>Min Temperature :{info.temp_min}&deg;C</p>
            <p>Humidity :{info.humidity}</p>
            <p>Pressure :{info.pressure}atm</p>
            <p>The weather can be described as <i>{info.weather}</i></p>
        </Typography>
      </CardContent>
      
    </Card>
        </div>
        </>
    )
}