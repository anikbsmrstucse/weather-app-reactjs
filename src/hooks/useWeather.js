import { useEffect, useState } from "react";

const useWeather = () => {
    const [weatherData, setWeatherData] = useState({
        location: "",
        climate: "",
        temperature: "",
        maxTemperature: "",
        minTemperature: "",
        humidity: "",
        cloudPercentage: "",
        wind: "",
        time: "",
        latitude: "",
        longitude: "",
    });

    const [loading, setLoading] = useState({
        state: false,
        message: "",
    });

    const [error, setError] = useState(null);

    const fetchWeather = async (latitude, longitude) => {
        try {
            setLoading({
                ...loading,
                state: true,
                message: "Weather Data is fetching...",
            });

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
                    import.meta.env.VITE_API_KEY
                }&units=metric`
            );
            if (!response.ok) {
                const errorMessage = `Failed to fetching weather data: ${response.message}`;
                throw new Error(errorMessage);
            }
            const data = await response.json();

            const updateWeatherData = {
                ...weatherData,
                location: data?.name,
                climate: data?.weather[0]?.main,
                temperature: data?.main?.temp,
                maxTemperature: data?.main?.temp_max,
                minTemperature: data?.main?.temp_min,
                humidity: data?.main?.humidity,
                cloudPercentage: data?.clouds?.all,
                wind: data?.wind?.speed,
                time: data?.dt,
                latitude: latitude,
                longitude: longitude,
            };
            setWeatherData(updateWeatherData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading({
                ...loading,
                state: false,
                message: "",
            });
        }
    };

    useEffect(() => {
        setLoading({
            ...loading,
            state: true,
            message: "Finding location...",
        });

        navigator.geolocation.getCurrentPosition(function (position) {
            fetchWeather(position.coords.latitude, position.coords.longitude);
        });
    }, []);

    return {
        error,
        weatherData,
        loading,
    };
};

export default useWeather;
