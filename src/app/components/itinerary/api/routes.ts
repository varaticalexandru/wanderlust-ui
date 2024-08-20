import { Routes } from "@angular/router";
import { ItineraryComponent } from "../itinerary.component";
<<<<<<< HEAD
import { authGuard } from "src/app/guards/auth/auth.guard";
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b

export const ITINERARY_ROUTES: Routes = [
    {
        path: "",
<<<<<<< HEAD
        component: ItineraryComponent,
        data: { showNavbar: true },
        canActivate: [authGuard],
=======
        component: ItineraryComponent 
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
    },
]