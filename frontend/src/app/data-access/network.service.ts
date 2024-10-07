import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, from, Observable, switchMap  } from 'rxjs';
import { StorageService } from '../shared/storage.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  public connectionTestFailed$ = new BehaviorSubject<boolean | null>(null);

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  getIP(): Promise<string> {
      return this.storage.getValue('ip');
  }

  testIP() {
    this.getIP().then((ip) => {
      console.log(ip)
    })
  }

  getConnectionInfo(): Observable<any> {
      return from(this.getIP()).pipe(
        switchMap((ip) =>
          this.http
            .get(`http://${ip}:5000`)
            .pipe(catchError(this.handleError)
        )
        )
      );
    }
  
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
