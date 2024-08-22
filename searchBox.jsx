
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function searchBox ({updateInfo}){
    let [City, setCity] = useState("") 
    const ApiUrl = `https://api.openweathermap.org/data/2.5/weather`
    const ApiKey = `71d07426312d83ab844e1f8d651f8d7b`

    let getWeatherInfo = async()=>{
        let URL = await fetch(`${ApiUrl}?q=${City}&appid=${ApiKey}&units=metric`)
        let response  = await URL.json();
        // console.log(responses)
        let result = {
            city : response.name,
            temp :response.main.temp,
            humidity : response.main.humidity,
            MaxTemp : response.main.temp_max,
            MinTemp : response.main.temp_min,
            FeelsLike : response.main.feels_like,
            pressure : response.main.pressure

        }
        console.log(response)
        return result
         
    }
    let handleSearch =(event)=>{
        setCity(event.target.value)
        
    }
    let handleSubmit = async (event)=>{
        event.preventDefault()
        setCity("")
        let weather = await getWeatherInfo();
        updateInfo(weather)
    }
    
    return(
        <>
        <form onSubmit={handleSubmit}>
        <TextField id="city" label="City Name" variant="outlined" value = {City} onChange={handleSearch}/>
        <br /><br /><br />
        <Button variant="contained" type='submit' >Search<SearchIcon/></Button>
        
        </form>
        </>
    )
}