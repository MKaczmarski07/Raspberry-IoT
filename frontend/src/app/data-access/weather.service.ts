import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  latitude: number | undefined;
  longitude: number | undefined;
  constructor(private http: HttpClient) {}

  // https://ionicframework.com/docs/native/geolocation Privacy !!!!!
  getGeoLocation() {
    Geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log('Latitude', this.latitude);
      console.log('Longitude', this.longitude);
    });
  }

  getWeather() {
    this.getGeoLocation();
    return this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=51.2598484&lon=22.5665786&appid=${environment.WEATHER_API_KEY}`
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          console.log(response);
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}
