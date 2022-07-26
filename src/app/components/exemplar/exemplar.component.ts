import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Publicacao } from '../publicacao/publicacao.interface';
import {
  Exemplar,
  ICreateExemplarResponse,
  IGetPublicacoes,
} from './exemplar.interface';

type ICreateMessage = 'Criado com sucesso' | 'Erro inesperado ao criar' | '';

@Component({
  selector: 'app-exemplar',
  templateUrl: './exemplar.component.html',
  styleUrls: ['./exemplar.component.scss'],
})
export class ExemplarComponent {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  loading = false;
  publicacoesLoading = false;

  exemplarForm!: FormGroup;
  createMessage: ICreateMessage = '';
  publicacoes: Publicacao[] = [];

  ngOnInit(): void {
    this.exemplarForm = this.formBuilder.group<Exemplar>({
      Numero: '',
      ISBN: '',
      Preco: '',
    });

    this.getAllPublicacoes().then((publicacoes) => {
      this.publicacoes = publicacoes;
    });
  }

  async onSubmit() {
    this.createExemplar();
  }

  async createExemplar() {
    this.loading = true;
    const response = await this.httpService.post<ICreateExemplarResponse>(
      '/exemplar',
      {
        Numero: this.exemplarForm.value.Numero,
        ISBN: this.exemplarForm.value.ISBN,
        Preco: this.exemplarForm.value.Preco,
      }
    );

    console.log(response);
    this.loading = false;

    if (response.status === 201) {
      this.createMessage = 'Criado com sucesso';
    } else {
      this.createMessage = 'Erro inesperado ao criar';
    }
  }

  async getAllPublicacoes() {
    this.publicacoesLoading = true;
    const response = await this.httpService.get<IGetPublicacoes>('/publicacao');

    console.log(response);
    this.publicacoesLoading = false;

    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Erro inesperado ao buscar publicações');
      return [];
    }
  }

  formatPublicacoesInputName(selectedISBN: string) {
    const selectedPublicacao = this.publicacoes.find(
      ({ ISBN }) => ISBN === selectedISBN
    );

    if (!selectedPublicacao) return '';

    return `${selectedPublicacao.Titulo} - ${selectedPublicacao.Autor}`;
  }
}
