import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GpioService {
  // Service to communicate with the REST API used to control the GPIO pins on the Raspberry Pi

  constructor(private http: HttpClient) {}

  getState(adress: string) {
    return this.http
      .get(
        `http://${environment.RASPBERRY_PI_IP}:5000/state?entity_adress=${adress}`
      )
      .pipe(catchError(this.handleError));
  }

  getAttributes(adress: string) {
    return this.http
      .get(
        `http://${environment.RASPBERRY_PI_IP}:5000/attributes?entity_adress=${adress}`
      )
      .pipe(catchError(this.handleError));
  }

  setSceneState(adress: string, state: string) {
    return this.http
      .post(`http://${environment.RASPBERRY_PI_IP}:5000/scene`, {
        current_scene_adress: adress,
        state: state,
      })
      .pipe(catchError(this.handleError));
  }

  handleRGB(adress: string, state: string, color: number[] = [255, 255, 255]) {
    return this.http
      .post(`http://${environment.RASPBERRY_PI_IP}:5000/rgb`, {
        device_adress: adress,
        state: state,
        color: color,
      })
      .pipe(catchError(this.handleError));
  }

  getTemperatureAndHumidity() {
    return this.http
      .get(
        `http://${environment.RASPBERRY_PI_IP}:5000/temperature_and_humidity`
      )
      .pipe(catchError(this.handleError));
  }

  detectMotion(isAllowed: boolean) {
    return this.http
      .post(`http://${environment.RASPBERRY_PI_IP}:5000/detect_motion`, {
        is_allowed: isAllowed,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    // if the request fails, return message - "can't connect to the server"
    return throwError(errorRes);
  }
}
