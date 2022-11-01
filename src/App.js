import React, {useEffect, useState} from "react";
import axios from "axios"; //Axios is like fetch. Fetch is built in but axios you have to install.

// I used Function Components, States and Props here below.
function App() {
  const [data, setData] = useState({}); // two values: data and setData = useState(set to an empty object).
  const [location, setLocation] = useState(''); // state with an empty string.
  const [dog, setDog] = useState('');

// I got my API info from openweathermap.org. Location is the value the search location will be passing in
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7cc66db8b37198c3cc016a9e8033b718&units=metric`;

// to grab my API I used a search function. If you press the Enter button you will get the location you searched for
const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const response = fetch(url);
      setData(response)
    axios.get(url).then((response) =>{
      setData(response.data)
      console.log(response.data)
    })
    setLocation('') // after onKeyPress, set to an empty string because when I have pressed enter I want the location to dissapear
  }
};

// Here I used useEffect to fetch a random dog photo
useEffect(() => {
  fetchDogs(); //load dog state on initial render
}, []);

const fetchDogs = async () => {
  try { // defines a code block to run (to try).
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await res.json();
    console.log(data.message);
    setDog(data.message);
  } catch (error) { // defines a code block to handle any error.
  }
};

const changeDog = ()=> {
  alert("changeddog")
}

  return (
    <div className="app">
      <div className="search">
        <input
        value={location} // grabbing the location from the API location
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation} // on keyPress the code above is going to run, searchLocation
        placeholder="Enter Location"
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}  
          </div>
        </div>

{data.name != undefined &&
      <div className="bottom">
          <div className="feels">
          {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed.toFixed()}m/s</p> : null}
            <p>Wind Speed</p>
          </div>
      </div>
}
        <img src={dog}/>
        <button onClick={fetchDogs}>Random Dog Photo</button>
      </div>
    </div>  
  );
}


export default App;

