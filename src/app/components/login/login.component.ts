import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ILoginResponse, IModes } from './login.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  mode: IModes = 'associado';
  loginForm!: FormGroup;
  loading = false;
  message = '';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      codigo: '',
      senha: '',
    });
  }

  toggleMode() {
    this.mode = this.mode === 'associado' ? 'funcionario' : 'associado';
    this.loginForm.reset();
  }

  async onSubmit() {
    try {
      this.loading = true;
      const response = await this.login(this.mode);
      this.loading = false;

      if (response) {
        this.message = '';

        this.localStorage.set('loginToken', response.token);
        this.localStorage.set('role', this.mode);

        const landingPage = this.mode === 'associado' ? '/publicacao' : '/funcionario';
        this.router.navigate([landingPage]);
      } else {
        this.message = 'Codigo incorreto';
      }
    } catch (err) {
      this.loading = false;
      this.message = 'Codigo incorreto'
    }
  }

  private async login(mode: IModes) {
    if (mode === 'associado') {
      const response = await this.httpService.post<ILoginResponse>(
        '/login/associado',
        {
          codigo: this.loginForm.value.codigo,
          senha: this.loginForm.value.senha,
        }
        );
        return response;
      } else {
        const response = await this.httpService.post<ILoginResponse>(
          '/login/funcionario',
          {
            codigo: this.loginForm.value.codigo,
            senha: this.loginForm.value.senha,
          }
          );
      return response;
    }
  }
}
