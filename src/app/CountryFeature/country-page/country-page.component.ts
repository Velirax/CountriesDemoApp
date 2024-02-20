import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, Navigation  } from '@angular/router';
import { Country, FetchCountriesService } from '../services/fetch-countries.service';
import { CommonModule } from '@angular/common';
import { PictureCarouselComponent } from "../Widgets/picture-carousel/picture-carousel.component";
import { FetchPicturesService } from '../services/fetch-pictures.service';
import { forkJoin} from 'rxjs';
import { LoadingSpinnerComponent } from "../Widgets/loading-spinner/loading-spinner.component";

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

  ngOnInit(): void {
    const subscribe1 = this.dataService.getSpecificCountry(this.activatedRouter.snapshot.params['name']);
    const subscribe2 = this.pictureService.getPhotosByCountryName(this.activatedRouter.snapshot.params['name']);

    forkJoin([subscribe1, subscribe2]).subscribe({
      next: ([country, pictures]) => {
        this.countryObject = country[0];
        this.pictureArray = pictures;
        this.isLoaded = !this.isLoaded;
        console.log(this.isLoaded); 
      },
      error: error => {
        console.error('Error fetching data:', error);
      }
    });


  }
}