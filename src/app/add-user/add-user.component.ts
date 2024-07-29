import { Component } from '@angular/core';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import { Role } from '../shared/models/Role';
import { UserRequest } from '../shared/models/request/UserRequest';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  roles: Role[] = [];
  userRequest: UserRequest = {
    username : "",
    password: "",
    name: "",
    surname : "",
    email: "",
    dateOfBirth: new Date(),
    idRole : -1
  };

  idSelektovaneRole = -1;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private roleService : RoleService, private userService: UserService){
    console.log("AJAJJA");
    this.loadRoles();
  }

  async loadRoles() {
    try {
      const response: any = await this.roleService.findAll().toPromise();
      this.roles = response;
      console.log('Lista rola:', this.roles);
    } catch (error) {
      console.error('Došlo je do greške prilikom dohvaćanja podataka:', error);
    }
  }

  dodajKorisnika() {
    this.successMessage = "";
    this.errorMessage = "";
    this.userRequest.idRole = this.idSelektovaneRole;
    this.userService.create(this.userRequest).subscribe(
      response =>{
        this.successMessage = 'Korisnik je uspješno dodat!';
        console.log('Korisnik je uspješno dodat:', response);
        this.clearData();
      },
      error => {
        if (error.error && error.error.errors === "ExistingUsername") {
          this.errorMessage = 'Korisničko ime već postoji.';
        } else {
          this.errorMessage = 'Došlo je do greške prilikom dodavanja korisnika.';
        }
        console.error('Došlo je do greške prilikom dodavanja korisnika:', error);
      }
    );
  }

  clearData(){
    this.userRequest.dateOfBirth = new Date();
    this.userRequest.email = "";
    this.userRequest.idRole = -1;
    this.userRequest.name = "";
    this.userRequest.surname = "";
    this.userRequest.password = "";
    this.userRequest.username = "";
  }
}
