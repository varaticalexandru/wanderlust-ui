import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { TestComponent } from "./components/test/test/test.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/login/register/register.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { authGuard } from "./guards/auth/auth.guard";

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    
    { path: 'home', component: HomeComponent, data: { showNavbar: false } },
    { path: 'login', component: LoginComponent, data: { showNavbar: false } },
    { path: 'register', component: RegisterComponent, data: { showNavbar: false } },
    { path: 'profile', component: UserProfileComponent, data: { showNavbar: true }, canActivate: [authGuard]},
    { path: 'preferences', loadChildren: () => import('src/app/components/preferences/api/index').then(m => m.PREFERENCES_ROUTES) },
    { path: 'itinerary', loadChildren: () => import('src/app/components/itinerary/api/index').then(m => m.ITINERARY_ROUTES) },
    { path: 'itineraries', loadChildren: () => import('src/app/components/itinerary-list/api/index').then(m => m.ITINERARY_LIST_ROUTES)},

    { path: 'test', component: TestComponent, data: { showNavbar: true } },

    { path: '**', redirectTo: 'home' }
];