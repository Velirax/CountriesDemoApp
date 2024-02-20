import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, pluck } from 'rxjs';

interface WikipediaResponse {
  query:{
    search: {
      pageid: string;
      snipped:string;
      title:string;
    }[]
  }
}

@Injectable({
  providedIn: 'root'
})

export class WikipediaService {

  http = inject(HttpClient)

  url:string = 'https://en.wikipedia.org/w/api.php?';

  search(term: string){
    return this.http.get<WikipediaResponse>('https://en.wikipedia.org/w/api.php?', {
      params:{
        action: 'query',
        format:'json',
        list:'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
    }).pipe(
      pluck('query', 'search')
    );
  }
}
