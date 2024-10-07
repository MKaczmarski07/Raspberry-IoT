import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  // https://ionicframework.com/docs/native/geolocation Privacy !!!!!
  getGeoLocation() {
    return Geolocation.getCurrentPosition().then((position) => {
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    });
  }

  async getWeather() {
    const { latitude, longitude } = await this.getGeoLocation();
    const response = await this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${environment.WEATHER_API_KEY}`
      )
      .pipe(catchError(this.handleError));

    return response;
  }

  async getCorrectCityName() {
    // openweathermap.org/data/2.5 sometimes returns old names
    const { latitude, longitude } = await this.getGeoLocation();
    return this.http
      .get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${environment.WEATHER_API_KEY}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}
