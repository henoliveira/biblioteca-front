import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { IGetPublicacaoResponse } from './consultar-publicacao.interface';

type ICreateMessage =
  | 'Erro inesperado ao buscar publicação'
  | ''
  | 'Um dos campos é obrigatório';

@Component({
  selector: 'app-consulta-publicacao',
  templateUrl: './consultar-publicacao.component.html',
  styleUrls: ['./consultar-publicacao.component.scss'],
})
export class ConsultarPublicacaoComponent {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  loading = false;
  consultaPublicacaoForm!: FormGroup;
  message: ICreateMessage = '';
  publicacao: IGetPublicacaoResponse['data'] | null = null;

  ngOnInit(): void {
    this.consultaPublicacaoForm = this.formBuilder.group({
      ISBN: '',
      titulo: '',
    });
  }

  async onSubmit() {
    this.getPublicacao();
  }

  async getPublicacao() {
    if (
      !this.consultaPublicacaoForm.value.ISBN &&
      !this.consultaPublicacaoForm.value.titulo
    ) {
      this.message = 'Um dos campos é obrigatório';
      return;
    }

    try {
      this.loading = true;
      let queryParams = '';

      if (this.consultaPublicacaoForm.value.ISBN) {
        queryParams += `ISBN=${this.consultaPublicacaoForm.value.ISBN}`;
      }
      if (this.consultaPublicacaoForm.value.titulo) {
        queryParams += `&titulo=${this.consultaPublicacaoForm.value.titulo}`;
      }

      const response = await this.httpService.get<IGetPublicacaoResponse>(
        `/publicacao/getOne?${queryParams}`
      );

      console.log(response);
      this.loading = false;

      if (response.status === 200) {
        this.publicacao = response.data;
      } else {
        this.message = 'Erro inesperado ao buscar publicação';
      }
    } catch (err) {
      this.message = 'Erro inesperado ao buscar publicação';
      this.loading = false;
    }
  }
}
