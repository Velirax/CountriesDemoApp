import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pluck } from 'rxjs';
import { query } from '@angular/animations';

interface UnsplashResponse{
  url:string
}

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
    })
  }
}
