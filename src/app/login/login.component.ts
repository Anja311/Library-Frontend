import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { LoginRequest } from '../shared/models/request/LoginRequest';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  errorMessage: string = '';
  username: string | null = null;
  password: string | null = null;
  token: string = '';
  user: User | null = null;

  constructor(private loginService: LoginService, private userService: UserService, private localStorage: LocalStorageService,
    private router: Router){
      if (this.localStorage.getFromLocalStorage("user")){
        this.router.navigate(['/home']);
      }
  }

  login(){
    console.log("user " +  this.username);
    console.log("password " +  this.password);


    if (this.username != null && this.password != null){
    const request = new LoginRequest(this.username, this.password);

    this.loginService.login(request).subscribe(
      response => {
        this.token = response;
        this.localStorage.addToLocalStorage("token", this.token);
        this.localStorage.addToLocalStorage("username", this.username);
        console.log('Prijava uspjesna', response);
        
        this.userService.findByUsername(this.username!).subscribe(
          response => {
            console.log("USER: ", response);
            this.user = response;
            this.localStorage.addToLocalStorage("user", this.user);

           // window.location.reload(); 
          }
        )
        this.router.navigate(['/home']);
      },
      error => {
        if (error.error.erorrs.errorMessage == "DeletedUser"){
          this.errorMessage = 'Profil je obrisan!';
          console.error('Profil je obrisan!', error);
        }
        else {
          this.errorMessage = 'Pogrešno korisničko ime ili lozinka!';
          console.error('Pogrešno korisničko ime ili lozinka!', error);
        }
      }
    );
  }
}
  
  

}
