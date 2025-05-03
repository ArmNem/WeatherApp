"use client"
import { Weather } from "@/models/weather"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import weatherService from "@/services/weatherService"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [searchCity, setSearchCity] = useState<string| null>(null)
  const [loading, setLoading] = useState(false)
  const [isImperial, setIsImperial] = useState(false)

  const fetch = async () => {
    if (!searchCity) return

    setLoading(true)
    try {
      const units = isImperial ? 'imperial' : 'metric'
      const data = await weatherService.getWeather(searchCity, units)
      setWeather(data)
      toast.success("Weather loaded!")
    } catch (err: unknown) {
      const errorMsg = axios.isAxiosError(err) ? err.response?.data?.message || err.message : 'Error during the request'
      toast.error(errorMsg)
      setWeather(null)
    } finally {
      setLoading(false)
      setSearchCity(null)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(event.target.value)
  }
  
  const handleSwitchChange = (checked: boolean) => {
    setIsImperial(checked)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-12 p-8 sm:p-20">
      <header className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
          Welcome to the Weather App
        </h1>
        {weather && (
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Current weather for <strong>{weather.city}</strong>
          </p>
        )}
      </header>
        
      <div className="flex gap-4 items-center">
        <Input placeholder="Type a city.." onChange={handleInputChange} value={searchCity ?? ""}></Input>
        <div className="flex items-center space-x-2">
        <Label htmlFor="imperial">
            {isImperial ? "Imperial" : "Metric"}
          </Label>
          <Switch
            id="imperial"
            checked={isImperial}
            onCheckedChange={handleSwitchChange} // Update the state when switch is toggled
          />
        </div>
        <Button onClick={fetch} disabled={loading || !searchCity}>
          {loading ? "Loading..." : "Search"}
        </Button>
      </div>
      
      <div className="w-full overflow-x-auto max-w-4xl">
        <Table>
          <TableHeader>
          {!loading && weather && (
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Humidity</TableHead>
              <TableHead>Wind Speed</TableHead>
            </TableRow>
            )}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>
                  <Skeleton className="w-20 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-32 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-20 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-4" />
                </TableCell>
              </TableRow>
            ) : (
              weather && (
                <TableRow>
                  <TableCell>{weather.city}</TableCell>
                  <TableCell>{weather.temp}</TableCell>
                  <TableCell className="capitalize">{weather.description}</TableCell>
                  <TableCell>{weather.humidity}</TableCell>
                  <TableCell>{weather.windSpeed}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
