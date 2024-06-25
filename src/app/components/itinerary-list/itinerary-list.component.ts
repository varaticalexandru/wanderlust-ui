import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Itinerary, ItineraryList } from 'src/app/models/itinerary.model';
import { ItineraryCardComponent } from './itinerary-card/itinerary-card.component';
import { ItineraryService } from 'src/app/services/itinerary/itinerary.service';
import { Observable, forkJoin, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PhotoSearchService } from 'src/app/services/google-maps/photo-search/photo-search.service';
import { TextSearchService } from 'src/app/services/google-maps/text-search/text-search.service';
import {
  PlacePhotoUriResponse,
  PlacePhotosResponse,
} from 'src/app/models/google-maps/place-photo.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from 'src/app/services/auth/auth-service/auth.service';
import { LogOutComponent } from '../login/log-out/log-out.component';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-itinerary-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ItineraryCardComponent,
    AsyncPipe,
    MatDialogModule,
    RouterOutlet,
    FooterComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './itinerary-list.component.html',
  styleUrl: './itinerary-list.component.scss',
})
export class ItineraryListComponent implements OnInit {

  noItineraries: boolean = false;
  isLoading: boolean = true;
  photoIds: Array<string> = [];
  photos: Array<string> = [];
  itineraryList$!: Observable<ItineraryList | null>;
  itineraryList!: ItineraryList;

  currentUserId: string | null = null;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value!: number;
  diameter: number = 150;
  strokeWidth: number = 20;

  constructor(
    private itineraryService: ItineraryService,
    private textSearchService: TextSearchService,
    private photoService: PhotoSearchService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');

    if (!this.currentUserId) {
      this.handleUserNotLoggedIn();
      return;
    }

    this.loadItineraries();
  }

  private handleUserNotLoggedIn(): void {
    this.dialog.open(LogOutComponent);
    this.router.navigate(['/login']);
  }

  private loadItineraries(): void {
    this.itineraryList$ = this.itineraryService
      .getItinerariesByUserId(this.currentUserId as string)
      .pipe(
        tap((itineraryList: ItineraryList) => {
          this.value = 25;
          if (itineraryList.itineraries.length === 0) {
            this.isLoading = false;
            this.noItineraries = true;
          }
        }),
        mergeMap((itineraryList: ItineraryList) =>
          this.loadPhotoIds(itineraryList)
        ),
        switchMap((itineraryList) => {
          return of(itineraryList);
        }),
      );
  }

  private loadPhotoIds(
    itineraryList: ItineraryList
  ): Observable<ItineraryList> {

    this.value = 50;
    const photoIdsRequests$ = itineraryList.itineraries.map((itinerary) =>
      this.textSearchService.fetchPlacePhotoIds(itinerary.placeId as string)
    );

    return forkJoin(photoIdsRequests$).pipe(
      mergeMap((photosResponses: PlacePhotosResponse[]) => {
        this.photoIds = photosResponses.map(
          (photosResponse) => photosResponse.photos[0].name
        );
        return this.loadPhotoUris(itineraryList);
      })
    );
  }

  private loadPhotoUris(
    itineraryList: ItineraryList
  ): Observable<ItineraryList> {

    this.value = 75;
    const photoUrisRequests$ = this.photoIds.map((photoId) =>
      this.photoService.fetchPhotoById(photoId)
    );

    return forkJoin(photoUrisRequests$).pipe(
      map((photoUris: PlacePhotoUriResponse[]) => {
        this.photos = photoUris.map((photoUri) => photoUri.photoUri);
        this.itineraryList = itineraryList;
        this.value = 100;

        this.isLoading = false;
        return itineraryList;
      })
    );
  }

  goToNewItinerary(): void {
    this.router.navigate(['/preferences']);
  }

  deleteItinerary(itineraryId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      maxWidth: '1200px',
      maxHeight: '800px',
      width: '500px',
      height: '200px',
      data: { itinerary: this.findItineraryById(itineraryId) },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.executeDeleteItinerary(itineraryId);
      }
    });
  }

  private executeDeleteItinerary(itineraryId: string): void {
    this.itineraryService.deleteItinerary(itineraryId).subscribe({
      next: () => {
        this.refreshItineraryList();
        this.snackBar.open('Itinerary deleted successfully! ✅', 'Close', {
          duration: 5000,
          politeness: 'assertive',
        });
      },
      error: (error) => {
        console.error(`Error deleting itinerary: ${itineraryId}`, error);
        this.snackBar.open('Error deleting itinerary. ❌', 'Close', {
          duration: 5000,
          politeness: 'assertive',
        });
      },
    });
  }

  private refreshItineraryList(): void {
    this.itineraryList$ = this.itineraryService.getItinerariesByUserId(
      this.currentUserId as string
    );
  }

  viewItinerary(itineraryId: string): void {
    this.router.navigate(['/itineraries', itineraryId]);
  }

  private findItineraryById(itineraryId: string): Itinerary {
    const foundItinerary = this.itineraryList.itineraries.find(
      (itinerary) => itinerary.id === itineraryId
    );

    if (foundItinerary) {
      return foundItinerary;
    } else {
      throw new Error(`No itinerary found with id: ${itineraryId}`);
    }
  }
}
