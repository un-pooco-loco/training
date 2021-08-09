import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WeatherService } from '../services/weather/weather.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  loc$: Observable<any>;
  loc: string;
  currentWeather: any = <any>{};
  forecastWeather: any = <any>{};
  msg: string;
  icons: any;
  length: any;
  placeNameData: any;
  placeName: string;
  locationAvailable: boolean;
  weatherInputFocused: boolean = false;
  timezone: string;
  isLocalWeatherSet:boolean;
  localPlaceCurrentWeather;

  constructor(private store: Store<any>, private weatherService: WeatherService, private locationService: LocationService) {
    this.isLocalWeatherSet = false;
  }
  @ViewChild('weatherInput', { static: true }) weatherInput: ElementRef;

  ngOnInit(): void {
    this.locationAvailable ? this.updateLocation(this.loc) : this.setLocation();
    this.getCurrentWeatherLatLon();
  }


  public updateLocation(loc): void {
    this.store.dispatch({
      type: 'SET_LOCATION',
      payload: loc
    });
  }

  public setLocation(): any {
    this.store.select('loc').subscribe(loc => {
      this.loc$ = loc;
      this.length = loc.length;
    });
  }

  getCurrentWeather(name: HTMLInputElement) {
    this.weatherInputFocused = false;
    let loc = (<HTMLInputElement>name).value;
    this.locationService.getCoordinates(loc).subscribe(
      (data) => {
        let loc = [data[0].lat, data[0].lon];
        this.updateLocation(loc);
        this.updateWeather();
        this.getPlaceName(data[0].lat, data[0].lon);
      },
      (err) => {
        this.msg = 'Unable to get the weather details for current location';
        console.log(err)
      })
  }

  getCurrentWeatherLatLon() {
    this.msg = '';
    this.locationService.getPosition().then(pos => {
      let loc = [pos.lat, pos.lng];
      this.updateLocation(loc);
      this.updateWeather();
      this.getPlaceName(pos.lat, pos.lng)
    })
      .catch(err => {
        console.log(err);
        this.msg = 'Unable to detect current location!';
      });
  }

  updateWeather() {
    this.currentWeather = {};
    this.weatherService.getCurrentWeatherLatLon(this.loc$[this.length - 1][0], this.loc$[this.length - 1][1])
      .subscribe(
        (data) => {
          console.log('currentWeather',data);
          this.currentWeather = data;
          if(!this.isLocalWeatherSet){
            this.localPlaceCurrentWeather = this.formatLocalPlaceDataForSharing(this.currentWeather.current);
            this.isLocalWeatherSet = true;
          }
          this.forecastWeather = this.currentWeather.daily;
          this.timezone = (this.currentWeather.timezone_offset/60).toString();
        },
        (err) => {
          this.msg = 'Unable to get the weather details for current location';
          console.log(err)
        })
  }

  getPlaceName(lat, lon) {
    this.locationService.getPlaceName(lat, lon)
      .subscribe(
        (data) => {
          this.placeNameData = data;
          console.log(data)
          this.placeName = this.placeNameData.address.city ? this.placeNameData.address.city : this.placeNameData.address.neighbourhood || this.placeNameData.address.village || this.placeNameData.address.county || this.placeNameData.address.country;   
        },
        (err) => {
          console.log(err)
        })
  }

  cancelInput(name: HTMLInputElement) {
    this.weatherInputFocused = false;
    name.value = this.placeName;
  }

  shareData() {
    console.log(this.forecastWeather, 'Forecast WeatherApp')
    document.dispatchEvent(new CustomEvent('dataFromWeatherApp', {
      detail: {
        forecastWeather: this.formatDataForSharing(this.forecastWeather),
        localPlaceWeather: this.localPlaceCurrentWeather
      }
    }));
  }

  formatLocalPlaceDataForSharing(localWeather){
    let weatherFormat = {};

    weatherFormat = {
      "UVI":localWeather.uvi,
      "WEATHER_STATE":localWeather.weather[0]?localWeather.weather[0].description:'',
      "TEMP":localWeather.temp,
      "RAIN":localWeather.rain
    };

    return weatherFormat;
  }

  formatDataForSharing(forecastWeather){
    let forecastFormat = {
      "weatherData" : [],
      "PLACE" : "",
      "FROM" : "",
      "TO" : ""
    };  

      forecastWeather.forEach(day => {
      forecastFormat.weatherData.push({UVI:day.uvi,
          WEATHER_STATE:day.weather[0]?day.weather[0].description:'',
          TEMP:day.temp.day,
          RAIN:day.rain});
    });

    forecastFormat["PLACE"] = this.placeName;
    forecastFormat["FROM"] = forecastWeather[1].dt;
    forecastFormat["TO"] = forecastWeather[forecastWeather.length-1].dt;

    return forecastFormat;
  }

  getFormattedTimeZone() {
    return this.timezone;
  }
}
