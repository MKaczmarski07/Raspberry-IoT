import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  public connectionTestFailed = false;

  constructor(private http: HttpClient) {}

  private getConnectionInfo() {
    return this.http
      .get(`http://${environment.RASPBERRY_PI_IP}:5000/connection`)
      .pipe(catchError(this.handleError));
  }

  checkConnection() {
    this.connectionTestFailed = true;
    this.getConnectionInfo().subscribe(
      (response) => {
        this.connectionTestFailed = false;
      },
      (error) => {
        this.connectionTestFailed = true;
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
