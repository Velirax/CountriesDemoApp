import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Country } from '../services/fetch-countries.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-country',
    standalone: true,
    templateUrl: './country.component.html',
    styleUrl: './country.component.css',
    imports: [CommonModule]
})
export class CountryComponent {
constructor(private router: Router){}
    
navigateToCountryPage() {
    this.router.navigate(['/countries', this.name], { state: { countryObject: this.countryObject } });
}
    @Input() name:Object = [];
    @Input() capital: string = '';
    @Input() flagUrl: string = '';
    @Input() population: string = '';
    @Input()countryObject!: Country;
}
