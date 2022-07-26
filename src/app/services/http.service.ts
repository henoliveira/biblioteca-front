import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = environment.apiURL;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  async post<T extends { status: number }>(
    url: string,
    body: unknown
  ): Promise<T> {
    const token = this.localStorageService.get('loginToken');

    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });

    const response = await lastValueFrom(
      this.http.post<T>(`${this.url}${url}`, body, { headers })
    );

    if (response.status === 401) {
      this.localStorageService.remove('loginToken');
    }

    return response;
  }

  async get<T extends { status: number }>(url: string): Promise<T> {
    const token = this.localStorageService.get('loginToken');

    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });
    const response = await lastValueFrom(
      this.http.get<T>(`${this.url}${url}`, {
        headers,
      })
    );

    if (response.status === 401) {
      this.localStorageService.remove('loginToken');
    }

    return response;
  }
}
