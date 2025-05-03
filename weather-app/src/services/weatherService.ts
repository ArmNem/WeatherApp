import { Weather } from "@/models/weather";
import api from "@/utils/api";

export class WeatherService {

    async getWeather(city: string, units: string):Promise<Weather>{
        try {
            const res = await api.get('' ,{ 
                params: {
                    q: city,
                    units: units
                },} )
                
            const data = res.data

            const temperature = units === 'imperial'
                ? `${data.main.temp}°F`
                : `${data.main.temp}°C`;

            const windSpeed = units === 'imperial'
                ? `${data.wind.speed * 2.237} mph`
                : `${data.wind.speed} m/s`;

            const weather: Weather = {
                city: data.name,
                temp: temperature,
                description: data.weather?.[0]?.description ?? 'N/A',
                humidity: `${data.main.humidity}%`,
                windSpeed: windSpeed,
            };

            return weather
        } catch (error) {         
            throw error
        }
    }

}

export default new WeatherService()