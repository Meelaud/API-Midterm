import Image from "next/image";
import axios from "axios";
import { useState } from "react";



export default function Home() {

  interface CurrentWeather {
    name: string;
    dt: number;
    main: {
      temp: number;
    }
    weather: [
      {
        main: string;
      }
    ];
    wind: {
      speed: number
    }
  }

  const apiKey = process.env.NEXT_PUBLIC_API;

  const [location, setLocation] = useState('');
  const [data, setData] = useState<CurrentWeather>();


  const getWeatherData = async () => {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`

    try {
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (location) { 
  //     getWeatherData();
  //   }
  // }, [location]);

  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      getWeatherData();
    }
  };


  const UpDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-CA", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };


  return (
    <>
      <main>
        <header className={`pb-8 items-center flex flex-row gap-10 flex-row text-5xl font-semibold text-sky-400 p-5 rounded-l-full rounded-r-full `}>
          <Image src="/images/Asset 3.svg" alt="Custom Icon" width="100" height="100" />
          Weather Compass
        </header>

        <article className={`flex flex-wrap flex-col content-center`}>

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search Location!"
            onKeyDown={keyPress}
            className={`border-sky-400 border-2 p-3 rounded-l-full rounded-r-full`}
          />
          <p className={`text-center pt-10`}><span>Feeling lost about tomorrows weather? <br></br>Search up your location to find your path through the next six days. </span></p>

          <div>
            {data && (
              <div>
                <h2 className={`text-xl`}>{data.name}</h2>
                <div>Last Updated: {UpDate(data.dt)}</div>
                <div>Temperature: {data.main.temp}°C</div>
                <div>Condition: {data.weather[0].main}</div>
                <div>Wind Speed: {data.wind.speed} m/s</div>
              </div>
            )}
          </div>

        </article>

        <footer className={`text-center bg-sky-400`}>

          <span><h3 className={`text-md`}>Created by Meelaud Totonchi</h3></span>
          <span><h5 className={`text-sm`}>@2024 Weather Compass</h5></span>

        </footer>
      </main>
    </>
  );
}