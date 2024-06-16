import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { TestComponent } from "./components/test/test/test.component";

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    
    { path: 'login', component: LoginComponent },
    { path: 'preferences', loadChildren: () => import('src/app/components/preferences/api/index').then(m => m.PREFERENCES_ROUTES) },
    { path: 'itinerary', loadChildren: () => import('src/app/components/itinerary/api/index').then(m => m.ITINERARY_ROUTES) },
    { path: 'itineraries', loadChildren: () => import('src/app/components/itinerary-list/api/index').then(m => m.ITINERARY_LIST_ROUTES)},

    { path: 'test', component: TestComponent },

    { path: '**', redirectTo: 'login' }
];