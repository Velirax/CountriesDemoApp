import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, Navigation  } from '@angular/router';
import { Country, FetchCountriesService } from '../services/fetch-countries.service';
import { CommonModule } from '@angular/common';
import { PictureCarouselComponent } from "../Widgets/picture-carousel/picture-carousel.component";
import { FetchPicturesService } from '../services/fetch-pictures.service';
import { Observable , pipe} from 'rxjs';

@Component({
    selector: 'app-country-page',
    standalone: true,
    templateUrl: './country-page.component.html',
    styleUrl: './country-page.component.css',
    imports: [CommonModule, PictureCarouselComponent]
})
export class CountryPageComponent {
  countryObject!: Country; 
  router = inject(Router);
  activatedRouter = inject(ActivatedRoute);
  dataService = inject(FetchCountriesService);
  pictureService = inject(FetchPicturesService);
  pictureArray:string[] = [];
  urls: string[] = [];

  ngOnInit(): void {
    this.dataService.getSpecificCountry(this.activatedRouter.snapshot.params['name']).subscribe(x => {
      this.countryObject = x[0]});

      this.pictureService.getPhotosByCountryName(this.activatedRouter.snapshot.params['name']).subscribe(x =>{
        this.pictureArray = x;
      });
  }
}