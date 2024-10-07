import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, from, Observable, switchMap } from 'rxjs';
import { StorageService } from '../shared/storage.service';

@Injectable({
  providedIn: 'root',
})
  
export class GpioService {
    // Service to communicate with the REST API used to control the GPIO pins on the Raspberry Pi
  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  private getIP(): Promise<string> {
    return this.storage.getValue('ip');
  }

  getState(adress: string): Observable<any> {
    return from(this.getIP()).pipe(
      switchMap((ip) =>
        this.http
          .get(`http://${ip}:5000/state?entity_adress=${adress}`)
          .pipe(catchError(this.handleError))
      )
    );
  }

  getAttributes(adress: string): Observable<any> {
    return from(this.getIP()).pipe(
      switchMap((ip) =>
        this.http
          .get(`http://${ip}:5000/attributes?entity_adress=${adress}`)
          .pipe(catchError(this.handleError))
      )
    );
  }

  setSceneState(adress: string, state: string): Observable<any> {
    return from(this.getIP()).pipe(
      switchMap((ip) =>
        this.http
          .post(`http://${ip}:5000/scene`, {
            current_scene_adress: adress,
            state: state,
          })
          .pipe(catchError(this.handleError))
      )
    );
  }

  handleRGB(adress: string, state: string, color: number[] = [255, 255, 255]): Observable<any> {
    return from(this.getIP()).pipe(
      switchMap((ip) =>
        this.http
          .post(`http://${ip}:5000/rgb`, {
            device_adress: adress,
            state: state,
            color: color,
          })
          .pipe(catchError(this.handleError))
      )
    );
  }

  getTemperatureAndHumidity(): Observable<any> {
    return from(this.getIP()).pipe(
      switchMap((ip) =>
        this.http
          .get(`http://${ip}:5000/temperature_and_humidity`)
          .pipe(catchError(this.handleError))
      )
    );
  }

  detectMotion(
    adress: string,
    state: string,
    isAlarmAllowed: boolean,
    areNotificationsAllowed: boolean,
    email: string
  ): Observable<any> {
    return from(this.getIP()).pipe(
      switchMap((ip) =>
        this.http
          .post(`http://${ip}:5000/detect_motion`, {
            device_adress: adress,
            state: state,
            is_alarm_allowed: isAlarmAllowed,
            are_notifications_allowed: areNotificationsAllowed,
            email: email,
          })
          .pipe(catchError(this.handleError))
      )
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}

