import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GpioService {
  // Service used to communicate with the GPIO REST API

  constructor(private http: HttpClient) {}

  handleRGB(
    diode_number: number,
    isOn: boolean,
    color: number[] = [255, 255, 255]
  ) {
    return this.http
      .post(`http://${environment.RASPBERRY_PI_IP}:5000/rgb`, {
        diode_number: diode_number,
        is_on: isOn,
        color: color,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          console.log(response);
        })
      );
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
