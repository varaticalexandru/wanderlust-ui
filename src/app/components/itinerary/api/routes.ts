import { Routes } from "@angular/router";
import { ItineraryComponent } from "../itinerary.component";
import { authGuard } from "src/app/guards/auth/auth.guard";

export const ITINERARY_ROUTES: Routes = [
    {
        path: "",
        component: ItineraryComponent,
        data: { showNavbar: true },
        canActivate: [authGuard],
    },
]