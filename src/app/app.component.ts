import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'final-web';
  constructor(private authService: AuthService, private router: Router) {
    if (!authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  validateSession(): boolean {
    return this.authService.isLoggedIn();
  }
}
