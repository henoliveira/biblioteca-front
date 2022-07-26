import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import {
  Associado,
  AssociadoFuncao,
  ICreateAssociadoResponse,
} from './associado.interface';

type ICreateMessage = 'Criado com sucesso' | 'Erro inesperado ao criar' | '';

@Component({
  selector: 'app-associado',
  templateUrl: './associado.component.html',
  styleUrls: ['./associado.component.scss'],
})
export class AssociadoComponent {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  loading = false;
  associadoForm!: FormGroup;
  message: ICreateMessage = '';

  ngOnInit(): void {
    this.associadoForm = this.formBuilder.group<Associado>({
      nome: '',
      email: '',
      endereco: '',
      status: AssociadoFuncao['graduacao'],
    });
  }

  async onSubmit() {
    this.createAssociado();
  }

  async createAssociado() {
    try {
      this.loading = true;
      const response = await this.httpService.post<ICreateAssociadoResponse>(
        '/associado',
        {
          nome: this.associadoForm.value.nome,
          email: this.associadoForm.value.email,
          endereco: this.associadoForm.value.endereco,
          status: this.associadoForm.value.status,
        }
      );

      this.loading = false;

      if (response.status === 201) {
        this.message = 'Criado com sucesso';
      } else {
        this.message = 'Erro inesperado ao criar';
      }
    } catch (err) {
      this.loading = false;
      this.message = 'Erro inesperado ao criar';
    }
  }
}
