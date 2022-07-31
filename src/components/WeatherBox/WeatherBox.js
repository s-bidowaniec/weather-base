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
          if (!data) {
            setError(true);
            return;
          }
          const city = data?.city?.name ?? 'City name';
          let temp = 0;
          let icon = 'icon';
          let description = 'description';
          if (data?.list?.length) {
            const firstList = data.list[0];
            temp = firstList?.main?.temp ?? 0;
            temp = temp / 10.0;
            if (firstList?.weather?.length) {
              icon = firstList.weather[0]?.icon ?? 'icon';
              description = firstList.weather[0]?.main ?? 'description';
            }
          }
          setWeatherDate({ city, temp, icon, description });
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
