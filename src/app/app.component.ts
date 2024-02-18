import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FormSubmitServiceService } from './form-submit-service.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, CommonModule]
})
export class AppComponent {
  constructor(private formSubmitService : FormSubmitServiceService, private router: Router) {

  }
  isDropdownActive = false;
  regionsArray = ['All','Europe', 'Asia', "Americas", 'Oceania']
  ngOnInit() {
    const searchData = this.formSubmitService.getSearchData();
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
}
