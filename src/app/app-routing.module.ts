import { ApplicationConfig, NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ReturnBookComponent } from './return-book/return-book.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path: 'book/:id', component: BookDetailComponent},
  {path: 'addBook', data: { claim: "BookWrite" }, canActivate: [AuthGuardGuard], component: AddBookComponent },
  {path: 'addAuthor', data: { claim: "AuthorWrite" }, canActivate: [AuthGuardGuard], component : AddAuthorComponent},
  {path: 'user', data: { claim: "UserRead" }, canActivate: [AuthGuardGuard], component: UserComponent},
  {path: 'addUser', data: { claim: "UserWrite" }, canActivate: [AuthGuardGuard], component: AddUserComponent},
  {path: 'permissions', data: { claim: "PermissionRead" }, canActivate: [AuthGuardGuard], component : PermissionsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'myProfile', component: ProfileComponent},
  {path: 'home', component : HomeComponent},
  {path: 'myBooks', component: MyBooksComponent},
  {path: 'myReservations', component : MyReservationsComponent},
  {path: 'returnBook', data: { claim: "BookReturn" }, canActivate: [AuthGuardGuard], component : ReturnBookComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
  ReactiveFormsModule
 ],
  exports: [RouterModule],
  providers : [
    provideHttpClient(withFetch()) 
  ],
})
export class AppRoutingModule { }
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()), provideRouter(routes), provideClientHydration()]
};
