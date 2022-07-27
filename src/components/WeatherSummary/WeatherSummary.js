import styles from './WeatherSummary.module.scss';
import PropTypes from 'prop-types';
const WeatherSummary = (props) => {
  return (
    <section className={styles.weatherSummary}>
      <img
        className={styles.weatherIcon}
        alt="Weather Icon"
        src={`${process.env.PUBLIC_URL}/images/weather-icons/${props.icon}.png`}
      />
      <div className={styles.weatherInfo}>
        <h2>{props.city}</h2>
        <p>
          <strong>Temp:</strong> {props.temp.toFixed(2)}°C
        </p>
      </div>
    </section>
  );
};

WeatherSummary.propTypes = {
  icon: PropTypes.string,
  city: PropTypes.string,
  temp: PropTypes.number
};

export default WeatherSummary;
