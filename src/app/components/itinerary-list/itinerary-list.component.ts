import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Itinerary, ItineraryList } from 'src/app/models/itinerary.model';
import { ItineraryCardComponent } from './itinerary-card/itinerary-card.component';
import { ItineraryService } from 'src/app/services/itinerary/itinerary.service';
import { Observable, forkJoin, map, mergeMap, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PhotoSearchService } from 'src/app/services/google-maps/photo-search/photo-search.service';
import { TextSearchService } from 'src/app/services/google-maps/text-search/text-search.service';
import { PlacePhotoUriResponse, PlacePhotosResponse } from 'src/app/models/google-maps/place-photo.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-itinerary-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    ItineraryCardComponent,
    AsyncPipe,
    MatDialogModule,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './itinerary-list.component.html',
  styleUrl: './itinerary-list.component.scss',
})
export class ItineraryListComponent implements OnInit {
  photoIds: Array<string> = [];
  photos: Array<string> = [];
  itineraryList$!: Observable<ItineraryList | null>;
  itineraryList!: ItineraryList;

  constructor(
    private itineraryService: ItineraryService,
    private photoService: PhotoSearchService,
    private textSearchService: TextSearchService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itineraryList$ = this.itineraryService.getAllItineraries().pipe(
      mergeMap((itineraryList: ItineraryList) => {
        const photoIdsRequests$: Observable<PlacePhotosResponse>[] =
          itineraryList.itineraries.map((itinerary) => {
            return this.textSearchService.fetchPlacePhotoIds(
              itinerary.placeId as string
            );
          });

        return forkJoin(photoIdsRequests$).pipe(
          map((photosResponses: PlacePhotosResponse[]) => {
            const photoIds: Array<string> = photosResponses.map(
              (photosResponse) => photosResponse.photos[0].name
            );
            this.photoIds = photoIds;

            const photoUrisRequests$: Observable<PlacePhotoUriResponse>[] = photoIds.map(photoId =>
              this.photoService.fetchPhotoById(photoId)
            );

            return forkJoin(photoUrisRequests$).pipe(
              map((photoUris: Array<PlacePhotoUriResponse>) => {
                const photoUrisArr: Array<string> = photoUris.map(photoUri => photoUri.photoUri); 
                this.photos = photoUrisArr;

                this.itineraryList = itineraryList;
                return itineraryList;
              })
            );
          }),

          switchMap(itineraryList => {
            return itineraryList;
          })
        );
      })
    );
  }

  goToNewItinerary() {
    this.router.navigate(['/preferences']);
  }

  deleteItinerary(itineraryId: string) {

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      maxWidth: '1200px',
      maxHeight: '800px',
      width: '500px',
      height: '200px',
      data: {
        itinerary: this.findItineraryById(itineraryId),
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.itineraryService.deleteItinerary(itineraryId).subscribe({
          next: () => {
            this.itineraryList$ = this.itineraryService.getAllItineraries();
            this.snackBar.open('Itinerary deleted successfully ! ✅', 'Close', {
              duration: 5000,
              politeness: 'assertive',
            });
          },
          error: (error) => {
            console.error(`Error deleting itinerary: {itineraryId}` + error);
            this.snackBar.open('Error deleting itinerary. ❌', 'Close', {
              duration: 5000,
              politeness: 'assertive',
            });
          }
        });
      }
    });
  }

  viewItinerary(itineraryId: string) {
    this.router.navigate(['/itineraries', itineraryId]);
  }

  findItineraryById(itineraryId: string): Itinerary {
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
