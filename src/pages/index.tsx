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

  interface FiveWeather {
    dt: number;
    main: {
      temp: number;
    };
    weather: [
      {
        main: string;
        description: string;
      }
    ];
    wind: {
      speed: number;
    }
  }

  interface FiveWeatherList {
    list: FiveWeather[];
  }

  const apiKey = process.env.NEXT_PUBLIC_API;

  const [location, setLocation] = useState('');
  const [data, setData] = useState<CurrentWeather>();
  const [five, setFive] = useState<FiveWeatherList>();


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

  const getFiveWeather = async () => {

    const fiveUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(fiveUrl);
      console.log(response.data);
      setFive(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      getWeatherData();
      getFiveWeather();
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
          <p className={`text-center pt-10`}><span>Feeling lost about tomorrows weather? <br></br>Search up your location to find your path through the next five days. </span></p>

          <div>
            {data && (
              <div className={`p-5 flex flex-wrap flex-row justify-between mt-10 border-sky-400 border-2 p-3 rounded-xl`}>
                <div>
                  <h2 className={`text-xl`}>{data.name}</h2>
                  <div>Last Updated: {UpDate(data.dt)}</div>
                </div>
                <div>
                  <div className={`text-xl`}>{data.main.temp.toFixed(1)}°C</div>
                  {data.weather[0].main && (
                    <Image
                      src={`/images/${data.weather[0].main}.svg`}
                      width="60"
                      height="60"
                      alt="weather icon"
                    />
                  )}
                  <div>{data.weather[0].main}</div>
                  <div>Wind Speed: {data.wind.speed} m/s</div>
                </div>
              </div>
            )}
          </div>

          <div>
            {five && five.list.map((d, index) => (
              <div key={index} className={`p-5 flex flex-wrap flex-row justify-between mt-10 border-sky-400 border-2 p-3 rounded-xl`}>
                <div>
                  <div className={`text-xl`}>{UpDate(d.dt)}</div>
                  <div>{d.main.temp.toFixed(1)}°C</div>
                </div>
                <div>
                  <div>Condition: {d.weather[0].main}</div>
                  <div>{d.weather[0].description}</div>
                </div>
                <div>Wind Speed: {d.wind.speed} m/s</div>
              </div>
            ))}
          </div>

          {/* can't figure out how to isolate just one map per day :( */}

        </article>

        <footer className={`text-center bg-sky-400`}>

          <span><h3 className={`text-md`}>Created by Meelaud Totonchi</h3></span>
          <span><h5 className={`text-sm`}>@2024 Weather Compass</h5></span>

        </footer>
      </main>
    </>
  );
}