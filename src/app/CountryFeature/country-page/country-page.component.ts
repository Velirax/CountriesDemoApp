import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, Navigation  } from '@angular/router';
import { Country, FetchCountriesService } from '../services/fetch-countries.service';
import { CommonModule } from '@angular/common';
import { PictureCarouselComponent } from "../Widgets/picture-carousel/picture-carousel.component";
import { FetchPicturesService } from '../services/fetch-pictures.service';
import { forkJoin} from 'rxjs';
import { LoadingSpinnerComponent } from "../Widgets/loading-spinner/loading-spinner.component";
import { WikipediaService } from '../services/wikipedia.service';

@Component({
    selector: 'app-country-page',
    standalone: true,
    templateUrl: './country-page.component.html',
    styleUrl: './country-page.component.css',
    imports: [CommonModule, PictureCarouselComponent, LoadingSpinnerComponent]
})
export class CountryPageComponent {
  countryObject!: Country; 
  router = inject(Router);
  activatedRouter = inject(ActivatedRoute);
  dataService = inject(FetchCountriesService);
  pictureService = inject(FetchPicturesService);
  pictureArray:string[] = [];
  urls: string[] = [];
  isLoaded:boolean = false;
  wikiService = inject(WikipediaService);
  wikiInfo: any = [];
  countryName = this.activatedRouter.snapshot.params['name'];
  firstWikiInfoResult = this.wikiInfo[0];
  
  getSnippet(){
    if(this.wikiInfo[0] === undefined){
      return '';
    }
    else{
      return this.wikiInfo[0]['snippet'];
    }
  }
  getUrl(){
    return  'https://en.wikipedia.org?curid=' + this.wikiInfo[0]['pageid'];
  }
  onClick(){
    window.open(this.getUrl());
  }

  getPopulation(){
    if(this.countryObject === undefined){
      return 0;
    }
    else{
      return this.countryObject.population;
    }
  }

  getContinents(){
    if(this.countryObject === undefined){
      return '';
    }
    else{
      return this.countryObject.continents;
    }
  }

  getCapital(){
    if(this.countryObject === undefined){
      return '';
    }
    else{
      return this.countryObject.capital;
    }
  }

  ngOnInit(): void {
    const subscribe1 = this.dataService.getSpecificCountry(this.countryName);
    const subscribe2 = this.pictureService.getPhotosByCountryName(this.countryName);
    const subscribe3 = this.wikiService.search(this.countryName);

    forkJoin([subscribe1, subscribe2, subscribe3]).subscribe({
      next: ([country, pictures, wikiInfo]) => {
        this.countryObject = country[0];
        this.pictureArray = pictures;
        this.wikiInfo = wikiInfo;
        this.isLoaded = !this.isLoaded;
      },
      error: error => {
        console.error('Error fetching data:', error);
      }
    });
    this.getCountryInfo();
  }

  getCountryInfo(){
    this.wikiService.search(this.countryName).subscribe((wikiInfo: any) => {
      this.wikiInfo = wikiInfo;
    })
  }
}