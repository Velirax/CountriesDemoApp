import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FormSubmitServiceService } from './CountryFeature/services/form-submit-service.service';
import { FetchCountriesService } from './CountryFeature/services/fetch-countries.service';
import { LoadingSpinnerComponent } from "./CountryFeature/Widgets/loading-spinner/loading-spinner.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, CommonModule, LoadingSpinnerComponent]
})
export class AppComponent {
  constructor(private formSubmitService : FormSubmitServiceService, private router: Router) {}
  fetchCountriesService = inject(FetchCountriesService);
  regionList:any;

  isDropdownActive = false;
  ngOnInit() {
    const searchData = this.formSubmitService.getSearchData();
    this.fetchAllRegions();
  }
  @Output() submitted = new EventEmitter<string>(); 
  imagePath = './assets/Pictures/Countries.png'
  searchValue: string = '';
  region: string = '';
  onInput(event: Event){
    this.searchValue = (event.target as HTMLInputElement).value; 
    this.formSubmitService.setSearchData(this.searchValue);
  }
  onClick(event: Event){
    console.log((event.target as HTMLInputElement).textContent);
    this.region = (event.target as HTMLInputElement).textContent as string;
    this.formSubmitService.setRegionData(this.region);
  }
  isCountriesRoute(): boolean {
    return this.router.url === '/countries';
  }
  fetchAllRegions(){
    this.fetchCountriesService.getAllRegions().subscribe((response : any) =>{
      this.regionList = ['All',...new Set(response[0])];
      
    })
  }

}
