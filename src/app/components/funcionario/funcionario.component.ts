import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import {
  FuncionarioFuncao,
  ICreateFuncionarioResponse,
} from './funcionario.interface';

type ICreateMessage = 'Criado com sucesso' | 'Erro inesperado ao criar' | '';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss'],
})
export class FuncionarioComponent {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  loading = false;
  funcionarioForm!: FormGroup;
  message: ICreateMessage = '';

  ngOnInit(): void {
    this.funcionarioForm = this.formBuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      funcao: new FormControl(FuncionarioFuncao['funcionario']),
    });
  }

  async onSubmit() {
    this.createFuncionario();
  }

  async createFuncionario() {
    try {
      this.loading = true;
      const response = await this.httpService.post<ICreateFuncionarioResponse>(
        '/funcionario',
        {
          nome: this.funcionarioForm.value.nome,
          email: this.funcionarioForm.value.email,
          funcao: this.funcionarioForm.value.funcao,
        }
      );

      console.log(response);
      this.loading = false;

      if (response.status === 201) {
        this.message = 'Criado com sucesso';
      } else {
        this.message = 'Erro inesperado ao criar';
      }
    } catch(err) {
      this.loading = false;
      this.message = 'Erro inesperado ao criar';
    }
  }
}
