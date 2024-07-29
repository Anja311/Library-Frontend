import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { PopupComponent } from './popup/popup.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { HasClaimDirective } from './has-claim.directive';
import { LocalStorageService } from './services/local-storage.service';
import { SecurityService } from './services/security.service';

export function initializeApp(localStorageService: LocalStorageService) {
  return (): Promise<void> => {
    return localStorageService.init();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BookDetailComponent,
    AddBookComponent,
    AddAuthorComponent,
    UserComponent,
    AddUserComponent,
    PermissionsComponent,
    BookDialogComponent,
    LoginComponent,
    ProfileComponent,
    MyBooksComponent,
    PopupComponent,
    MyReservationsComponent,
    ReturnBookComponent,
    HasClaimDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormField
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    LocalStorageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [LocalStorageService],
      multi: true
    },
    SecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
