import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  currentUser!: User;

  constructor(private localStorage : LocalStorageService) {
  }

  private loadUserFromLocalStorage(): void {
    const storedUser = this.localStorage.getFromLocalStorage("user");
    if (storedUser) {
      this.currentUser = storedUser;
    }
  }

  hasPermission(permissionName: string): boolean {
    this.loadUserFromLocalStorage();
    if (!this.currentUser || !this.currentUser.role || !this.currentUser.role.permissions) {
      return false;
    }
    
    return this.currentUser.role.permissions.some(permission => permission.name === permissionName);
  }
}
