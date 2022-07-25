import styles from './WeatherSummary.module.scss';

const WeatherSummary = (props) => {
  console.log(props)
  return (
    <section className={styles.weatherSummary}>
      <img
        className={styles.weatherIcon}
        alt="????"
        src={`${process.env.PUBLIC_URL}/images/weather-icons/${props.icon}.png`} />
      <div className={styles.weatherInfo}>
        <h2>{props.city}</h2>
        <p>
          <strong>Temp:</strong> {props.temp.toFixed(2)}°C
        </p>
      </div>
    </section>
  );
};

export default WeatherSummary;