import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClient } from '@angular/common/http';
import { CountryPageComponent } from './CountryFeature/country-page/country-page.component';

export const routes: Routes = [
    {path: 'countries', loadChildren: () =>
        import ('./countries-list-app-routes').then((c) => c.routes)},
    {path: 'countries/:name', component: CountryPageComponent},
    {path: 'about', loadChildren: () =>
        import ('./about-routes').then((c) => c.routes)},
    {path: '', component:HomeComponent },
    {path: '**', component:NotFoundComponent }
];
