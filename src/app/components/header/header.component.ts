import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private localStorage:LocalStorageService) {}

  role!: string;

  ngOnInit(): void {
    this.role = this.localStorage.get('role') as string;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
