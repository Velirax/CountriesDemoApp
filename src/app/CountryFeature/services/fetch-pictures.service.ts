import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, pluck, retry, throwError } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})


export class FetchPicturesService {
  http = inject(HttpClient);

  getPhotosByCountryName(countryName: string): Observable<any> {
    return this.http.get<any>(`https://api.unsplash.com/search/photos/?query=${countryName}`, {
      headers:{
        Authorization: 'Client-ID Jk6Hdxbp-wSVS0rInvKMgV21jfoxWoJbxlkGEeg45N0',
      }
    }).pipe(
      retry(3),
      catchError(this.handleError),
      map(response => {
        return response.results.map(
          (result: { urls: { regular: string; }; }) => result.urls.regular
        )
      })
    );
  }

  
  handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('An error occured: ', error.error);
    }else{
      console.error(`Backend return code: ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened try again later'));
  }
}
