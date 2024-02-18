import { Component, Pipe } from '@angular/core';
import { RouterOutlet , RouterModule} from '@angular/router';
import { CountryComponent } from "../country/country.component";
import { Country, FetchCountriesService } from '../fetch-countries.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { toArray } from 'rxjs';
import { Input } from '@angular/core';
import { FormSubmitServiceService } from '../form-submit-service.service';

@Component({
    selector: 'app-countries-list',
    standalone: true,
    templateUrl: './countries-list.component.html',
    styleUrl: './countries-list.component.css',
    imports: [RouterOutlet, RouterModule, CountryComponent, HttpClientModule, CommonModule]
})

export class CountriesListComponent {
  constructor(private fetchCountriesService : FetchCountriesService, private formSubmitServiceService: FormSubmitServiceService){
    this.fetchAllCountries();
  }
  allCountries:Country[] = [];
  filteredList:Country[] = [];
  searchData: string = '';
  regionData:string = '';

  fetchAllCountries() {
    this.fetchCountriesService.getAllCountries().subscribe((response: Country[]) => {
      this.allCountries = response;
      this.filterCountries();
    });
  }

  filterCountries() {
    if (this.searchData) {
      this.filteredList = this.allCountries.filter(country =>
        country.name.common.toLowerCase().includes(this.searchData.toLowerCase())
      );
    } else {
      this.filteredList = this.allCountries;
    }
    console.log('test');
    if(this.regionData != "All"){
      this.filteredList = this.filteredList.filter(country =>
        country.region.toLowerCase().includes(this.regionData.toLocaleLowerCase())
        );
    } else if(!this.searchData){
      this.filteredList = this.allCountries;
    }
  }
  ngOnInit() {
    this.fetchAllCountries();
    this.formSubmitServiceService.searchData$.subscribe((searchData: string) => {
      this.searchData = searchData;
      this.filterCountries();
    });
    
    this.formSubmitServiceService.regionData$.subscribe((regionData: string) => {
      this.regionData = regionData;
      this.filterCountries();
    });
  }
  
  getCapital(country: Country): string {
    return country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A';
  }
  getCountryName(country:Country):string{
    return country.name.common && country.name.common.length > 0 ? country.name.common : 'N/A';
  }
  getFlagUrl(country:Country):string{
    if(country.flags.svg != ''){
      return country.flags.svg;
    }else {
      return '';
    }
  }
  getPopulation(country:Country):string{
    return country.population.toString() && country.population > 0 ? country.population.toString() : '0';
  }
}
