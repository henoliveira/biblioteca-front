import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { IGetEmprestimosResponse } from './consultar-emprestimo.interface';

type ICreateMessage = 'Erro inesperado ao buscar emprestimos' | '';

@Component({
  selector: 'app-consultar-emprestimo',
  templateUrl: './consultar-emprestimo.component.html',
  styleUrls: ['./consultar-emprestimo.component.scss'],
})
export class ConsultarEmprestimoComponent {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  loading = false;
  consultaEmprestimoForm!: FormGroup;
  message: ICreateMessage = '';
  emprestimos: IGetEmprestimosResponse['data'] = [];

  ngOnInit(): void {
    this.consultaEmprestimoForm = this.formBuilder.group({
      ISBN: new FormControl(''),
      titulo: new FormControl(''),
    });
  }

  async onSubmit() {
    this.getEmprestimos();
  }

  async getEmprestimos() {
    try {
      this.loading = true;

      const response = await this.httpService.get<IGetEmprestimosResponse>(
        `/consultaEmprestimo`
      );

      console.log(response);
      this.loading = false;

      if (response.status === 200) {
        this.emprestimos = response.data;
      } else {
        this.message = 'Erro inesperado ao buscar emprestimos';
      }
    } catch (err) {
      this.message = 'Erro inesperado ao buscar emprestimos';
      this.loading = false;
    }
  }
}
