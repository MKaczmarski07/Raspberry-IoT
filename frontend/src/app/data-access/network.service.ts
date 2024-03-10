import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  public connectionTestFailed$ = new BehaviorSubject<boolean | null>(null);

  constructor(private http: HttpClient) {}

  private getConnectionInfo() {
    return this.http
      .get(`http://${environment.RASPBERRY_PI_IP}:5000`)
      .pipe(catchError(this.handleError));
  }

  checkConnection() {
    this.getConnectionInfo().subscribe(
      (response) => {
        this.connectionTestFailed$.next(false);
      },
      (error) => {
        this.connectionTestFailed$.next(true);
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
