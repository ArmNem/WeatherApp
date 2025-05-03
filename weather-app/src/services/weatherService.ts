import { Weather } from "@/models/weather";
import api from "@/utils/api";

export class WeatherService {

    async getWeather():Promise<Weather>{
        const res = await api.get(''/* ,{ 
            params: {
                //q: 'New York'
          },} */)
          
          const data = res.data

          const weather: Weather = {
            city: data.name,
            temp: `${data.main.temp}°C`,
            description: data.weather?.[0]?.description ?? 'N/A',
            humidity: `${data.main.humidity}%`,
            windSpeed: data.wind.speed,
          }

        return weather
    }

}

export default new WeatherService()