import { Component } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Role } from '../shared/models/Role';
import { PermissionService } from '../services/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent {

  roles: Role[] = [];
  availablePermissions: any[] = [];
  selectedRoleId: number = -1;
  selectedPermissions: string[] = [];
  
  constructor(private roleService: RoleService, private permissionService: PermissionService, private dialog : MatDialog){
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

  delete(roleId: number, permissionId: number) {
    console.log('Brisanje permisije:', permissionId, 'za rolu:', roleId);
    this.permissionService.deletePermissionToRole(roleId, permissionId).subscribe(
      response => {
        this.openPopup("Permisija je uklonjena!");
        this.loadRoles();
        this.showPermissionsToAdd(roleId);
      },
      error => {
        console.log("Greska prilikom brisanja permisije.");
      }
    );
  }

  addPermission(event: Event) {
    const permissionId = parseInt((event.target as HTMLSelectElement).value);
    const roleId = this.selectedRoleId; 

    if (permissionId) {
        
        console.log("roleId:", roleId);
        console.log("permissionId:", permissionId);
    }

    this.permissionService.addPermissionToRole(roleId, permissionId).subscribe(
      response => {
        console.log('Permisija je uspjesno dodata:', response);
        this.openPopup("Permisija je dodata!");
        this.loadRoles();
        this.showPermissionsToAdd(roleId);
      },
      error => {
        console.error('Došlo je do greške prilikom dodavanja permisije:', error);
      }
    );
}
  
  cancelAddPermission() {
    this.selectedRoleId = -1;
  }

  async showPermissionsToAdd(roleId: number) {
    this.selectedRoleId = roleId;
    try {
      const response: any = await this.permissionService.findMissingPermissions(roleId).toPromise();
      this.availablePermissions = response;
      console.log('Lista rola:', this.roles);
    } catch (error) {
      console.error('Došlo je do greške prilikom dohvaćanja podataka:', error);
    }
  }

  openPopup(message: string): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px',
      data: { message: message }
    });

    setTimeout(() => {
      dialogRef.close();
    }, 3000);
  }
}
