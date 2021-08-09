import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

  getCoordinates(placeName: any) {
    return this.http.get('https://us1.locationiq.com/v1/search.php?key=8ce7d36d9f96dd&q=' + placeName + '&format=json')
  }

  getPlaceName(lat: any, lon: any) {
    return this.http.get('https://us1.locationiq.com/v1/reverse.php?key=8ce7d36d9f96dd&lat='+lat+'&lon='+lon+'&format=json')
  }
}
