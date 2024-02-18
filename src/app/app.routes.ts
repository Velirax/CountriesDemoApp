import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClient } from '@angular/common/http';

export const routes: Routes = [
    {path: 'countries', loadChildren: () =>
        import ('./countries-list-app-routes').then((c) => c.routes)},
    {path: 'about', loadChildren: () =>
        import ('./about-routes').then((c) => c.routes)},
    {path: '', component:HomeComponent },
    {path: '**', component:NotFoundComponent }
];
