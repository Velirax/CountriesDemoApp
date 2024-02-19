import { Component, Pipe } from '@angular/core';
import { RouterOutlet , RouterModule} from '@angular/router';
import { CountryComponent } from '../country/country.component';
import { Country, FetchCountriesService} from '../services/fetch-countries.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { toArray } from 'rxjs';
import { Input } from '@angular/core';
import { FormSubmitServiceService } from '../services/form-submit-service.service';
import { NotFoundComponent } from "../../not-found/not-found.component";

@Component({
    selector: 'app-countries-list',
    standalone: true,
    templateUrl: './countries-list.component.html',
    styleUrl: './countries-list.component.css',
    imports: [RouterOutlet, RouterModule, CountryComponent, HttpClientModule, CommonModule, NotFoundComponent]
})

export class CountriesListComponent {


  constructor(private fetchCountriesService : FetchCountriesService, private formSubmitServiceService: FormSubmitServiceService){
    this.fetchAllCountries();
  }
 
  allCountries: Country[] = [];
  filteredList: Country[] = [];
  searchData: string = '';
  regionData: string = '';
  showSpinner:boolean = true;

  fetchAllCountries() {
    this.fetchCountriesService.getAllCountries().subscribe((response: Country[]) => {
      this.showSpinner = false;
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
  clickable:boolean = false;
  offHover() {
    this.clickable = !this.clickable;
  }
  onHover() {
    this.clickable = !this.clickable;
  }
}
