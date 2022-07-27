import { useCallback } from 'react';
import { useState } from 'react';
import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {
  // local state
  const [weatherData, setWeatherDate] = useState(false);
  const [call, setCall] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setWeatherDate(false);
    setCall(true);
    setError(false);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&limit=1&appid=04d3115be6cdbeaf4c4ae7382fffe13c`
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setWeatherDate({
            city: data.city.name ? data.city.name : 'City name',
            temp: (data.list[0].main.temp ? data.list[0].main.temp : 0) / 10.0,
            icon: data.list[0].weather[0].icon ? data.list[0].weather[0].icon : 'icon',
            description: data.list[0].weather[0].main ? data.list[0].weather[0].main : 'description'
          });
          setCall(false);
        });
      } else {
        setError(true);
      }
    });
  }, []);
  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      {error && <ErrorBox />}
      {weatherData && <WeatherSummary {...weatherData} />}
      {!error && call && <Loader />}
    </section>
  );
};

export default WeatherBox;
