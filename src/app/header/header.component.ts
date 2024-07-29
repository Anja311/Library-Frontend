import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentUser : any;
  isLogged : boolean = false;
  ngOnInit(){

    if (this.localStorage.getFromLocalStorage("user") != null){
      this.isLogged = true;
    }
  }

  constructor(private localStorage : LocalStorageService, private loginService : LoginService){
    this.loginService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  refreshHeader(){
    this.ngOnInit();
  }

}
