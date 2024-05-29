import { WeatherContext } from "../contexts";
import useWeather from "../hooks/useWeather";

const WeatherProvider = ({ children }) => {
    const { weatherData, error, loading } = useWeather();
    return (
        <WeatherContext.Provider value={{ weatherData, error, loading }}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherProvider;
