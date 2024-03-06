import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GpioService {
  // Service to communicate with the REST API used to control the GPIO pins on the Raspberry Pi

  constructor(private http: HttpClient) {}

  checkConnection() {
    return this.http
      .get(`http://${environment.RASPBERRY_PI_IP}:5000/connection`)
      .pipe(catchError(this.handleError));
  }

  getDeviceState(uniqueDeviceAdress: string) {
    return this.http
      .get(
        `http://${environment.RASPBERRY_PI_IP}:5000/device_state?device_adress=${uniqueDeviceAdress}`
      )
      .pipe(catchError(this.handleError));
  }

  getDeviceAttributes(uniqueDeviceAdress: string) {
    return this.http
      .get(
        `http://${environment.RASPBERRY_PI_IP}:5000/device_attributes?device_adress=${uniqueDeviceAdress}`
      )
      .pipe(catchError(this.handleError));
  }

  handleRGB(
    uniqueDeviceAdress: string,
    state: string,
    color: number[] = [255, 255, 255]
  ) {
    return this.http
      .post(`http://${environment.RASPBERRY_PI_IP}:5000/rgb`, {
        device_adress: uniqueDeviceAdress,
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
