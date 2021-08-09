import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiKey: string = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(loc: string) {
    return this.http.get(`${environment.apiUrl}/weather?q=${loc}&units=metric&appid=${apiKey}`)
  }
  getCurrentWeatherLatLon(lat: string, lon: string) {
    return this.http.get(`${environment.apiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`)
  }
  // getForecast(loc: string) {
  //   return this.http.get(`${environment.apiUrl}/forecast/daily?q=${loc}&appid=${apiKey}`)
  // }
  // getForecastLatLon(lat: string, lon: string) {
  //   return this.http.get(`${environment.apiUrl}/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  // }
}
