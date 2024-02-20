import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, distinct, map, retry, throwError, toArray,} from 'rxjs';
import { delay } from 'rxjs';
export interface Country {
  name: {
    common: string;
    official: string;
  }
  independent?: boolean
  capital: string[]
  altSpellings: string[]
  region: string
  subregion?: string
  landlocked: boolean
  area: number
  flag: string
  maps: {
    googleMaps: string;
  }
  population: number
  timezones: string[]
  continents: string[]
  borders?: string[]
  flags:{
    png: string;
    svg: string;
    alt: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FetchCountriesService {

  constructor(private http:HttpClient) { }
  
  getAllCountries(): Observable<Country[]>{
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all').pipe(
      retry(3),
      catchError(this.handleError)
    );
    
  }
  getSpecificCountry(countryName: string){
    return this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${countryName}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getAllRegions(){
    return this.http.get<any>('https://restcountries.com/v3.1/all').pipe(
      retry(3),
      catchError(this.handleError),
      map(response => {
        return response.map(
          (result: {region: string}) => result.region
        )
      }),
      toArray()
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
