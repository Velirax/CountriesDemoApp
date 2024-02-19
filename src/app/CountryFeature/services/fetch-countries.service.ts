import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable, take, toArray } from 'rxjs';
import { fromEvent,delay } from 'rxjs';
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
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all').pipe(delay(0));
    
  }
  getSpecificCountry(countryName: string){
    return this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${countryName}`);
  }

  
}
