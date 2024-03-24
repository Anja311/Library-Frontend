import { Component } from "@angular/core";
import { User } from "../shared/models/User";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: User[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router){
    this.loadData();
  }

  ngOnInit(): void {
    
  }

  async loadData() {
    try {
      const response: any = await this.userService.findAll().toPromise();
      this.users = response.collection;
      console.log('Lista korisnika:', this.users);
    } catch (error) {
      console.error('Došlo je do greške prilikom dohvaćanja podataka:', error);
    }
  }

  addUser() {
    this.router.navigate(['/addUser']);
  }
  
  
  deleteUser(idUser: number) {
    this.userService.delete(idUser).subscribe(
      response => {
        this.successMessage = 'Korisnik je uspješno obrisan!';
        this.loadData();
      },
      error => {
        this.errorMessage = 'Došlo je do greške.';
      }
    );
  }
}
