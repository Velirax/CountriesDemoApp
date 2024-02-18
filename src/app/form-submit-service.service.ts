// form-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSubmitServiceService {
  private searchDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchData$ = this.searchDataSubject.asObservable();

  setSearchData(searchData: string): void {
    this.searchDataSubject.next(searchData);
  }

  getSearchData(): string {
    return this.searchDataSubject.value;
  }
}
