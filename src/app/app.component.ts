import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FormSubmitServiceService } from './form-submit-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private formSubmitService : FormSubmitServiceService, private router: Router) {

  }
  ngOnInit() {
    const searchData = this.formSubmitService.getSearchData();
  }
  @Output() submitted = new EventEmitter<string>(); 
  imagePath = './assets/Pictures/Countries.png'
  searchValue: string = '';
  onInput(event: Event){
    this.searchValue = (event.target as HTMLInputElement).value; 
    this.formSubmitService.setSearchData(this.searchValue);
  }
}
