import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Country } from '../fetch-countries.service';
@Component({
    selector: 'app-country',
    standalone: true,
    templateUrl: './country.component.html',
    styleUrl: './country.component.css',
    imports: [CommonModule]
})
export class CountryComponent {
    @Input() name:Object = [];
    @Input() capital: string = '';
    @Input() flagUrl: string = '';
    @Input() population: string = '';
    @Input()countryObject!: Country;
}
