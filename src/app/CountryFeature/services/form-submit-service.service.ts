// form-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSubmitServiceService {
  private searchDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchData$ = this.searchDataSubject.asObservable();

  private regionDataSubject:BehaviorSubject<string> = new BehaviorSubject<string>('');
  regionData$ = this.regionDataSubject.asObservable();
    snapshot: any;

  setSearchData(searchData: string): void {
    this.searchDataSubject.next(searchData);
  }

  getSearchData(): string {
    return this.searchDataSubject.value;
  }
  setRegionData(searchData: string): void {
    this.regionDataSubject.next(searchData);
  }

  getRegionData(): string {
    return this.regionDataSubject.value;
  }


}
