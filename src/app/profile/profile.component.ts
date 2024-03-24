import { Component } from '@angular/core';
import { User } from '../shared/models/User';
import { LocalStorageService } from '../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { BorrowService } from '../services/borrow.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] 
})
export class ProfileComponent {

  user: User = new User();

  constructor(private localStorage: LocalStorageService, private router: Router, private userService: UserService){
    this.user = localStorage.getFromLocalStorage("user");
  }

  deleteProfile() {
    if (this.user != null)
    {
      this.userService.delete(this.user.idUser).subscribe(
        response => {
          this.router.navigate(['/login']);
        },
        error => {
        }
      );
    } 
  }

  logout() {
    this.localStorage.addToLocalStorage("user", null);
    this.localStorage.addToLocalStorage("token", null);
    this.router.navigate(['/login']);
  }

  editProfile() {

  }
}
