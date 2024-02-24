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

  blinkDiode() {
    // Send a request to the REST API to blink the diode
    return this.http
      .post(`http://${environment.RASPBERRY_PI_IP}:5000/led_blink`, {
        pin: 17,
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

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}
