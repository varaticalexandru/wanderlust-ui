import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
    selector: 'app-failed-auth',
    templateUrl: './failed-auth.component.html',
    styleUrls: ['./failed-auth.component.scss'],
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose
    ]
})
export class FailedAuthComponent {

}
