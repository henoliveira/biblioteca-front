import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private localStorage: LocalStorageService) {}

  isLoggedIn(): boolean {
    return !!this.localStorage.get('loginToken');
  }
}
