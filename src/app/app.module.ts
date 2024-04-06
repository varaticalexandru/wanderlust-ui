import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';

import { FailedAuthComponent } from './components/login/failed-auth/failed-auth.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [AppComponent],
    imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginComponent,
    FailedAuthComponent
],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
