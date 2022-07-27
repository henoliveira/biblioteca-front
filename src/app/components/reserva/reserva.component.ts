import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Associado } from '../associado/associado.interface';
import { Publicacao } from '../publicacao/publicacao.interface';
import { ICreateReservaResponse, IGetAssociados, IGetPublicacoes } from './reserva.interface';

type ICreateMessage =
  | 'Reserva efetuada'
  | 'Erro inesperado ao reservar'
  | 'Erro inesperado ao buscar publicações'
  | 'Erro inesperado ao buscar associados'
  | '';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  loading = false;

  reservaForm!: FormGroup;
  message: ICreateMessage = '';
  publicacoes: Publicacao[] = [];
  associados: Associado[] = [];

  ngOnInit(): void {
    this.reservaForm = this.formBuilder.group({
      ISBN: new FormControl(''),
      associadoId: new FormControl(''),
    });

    this.getAllPublicacoes().then((publicacoes) => {
      this.publicacoes = publicacoes;
    });

    this.getAllAssociados().then((associados) => {
      this.associados = associados;
    });
  }

  async onSubmit() {
    this.createReserva();
  }

  formatAssociadosInputName(selectedCodigo: number) {
    const selectedAssociado = this.associados.find(
      ({ Codigo }) => Codigo === selectedCodigo
    );

    if (!selectedAssociado) return '';

    return `${selectedAssociado.Codigo} - ${selectedAssociado.Nome}`;
  }

  formatPublicacoesInputName(selectedIsbn: string) {
    const selectedPublicacao = this.publicacoes.find(
      ({ ISBN }) => ISBN === selectedIsbn
    );
    if (!selectedPublicacao) return '';

    return `${selectedPublicacao.Titulo} - ${selectedPublicacao.Autor}`;
  }

  async createReserva() {
    try {
      this.loading = true;
      const response = await this.httpService.post<ICreateReservaResponse>(
        '/reserva',
        {
          ISBN: this.reservaForm.value.ISBN,
          associadoId: this.reservaForm.value.associadoId,
        }
      );

      console.log(response);
      this.loading = false;

      if (response.status === 201) {
        this.message = 'Reserva efetuada';
      } else {
        this.message = 'Erro inesperado ao reservar';
      }
    } catch (err) {
      this.loading = false;
      this.message = 'Erro inesperado ao reservar';
    }
  }

  async getAllAssociados() {
    try {
      this.loading = true;
      const response = await this.httpService.get<IGetAssociados>(
        '/associado'
      );

      console.log(response);
      this.loading = false;

      if (response.status === 200) {
        return response.data;
      } else {
        this.message = 'Erro inesperado ao buscar associados';
        return [];
      }
    } catch (err) {
      this.loading = false;
      this.message = 'Erro inesperado ao buscar associados';
      return [];
    }
  }

  async getAllPublicacoes() {
    try {
      this.loading = true;
      const response = await this.httpService.get<IGetPublicacoes>(
        '/publicacao'
      );

      console.log(response);
      this.loading = false;

      if (response.status === 200) {
        return response.data;
      } else {
        this.message = 'Erro inesperado ao buscar publicações';
        return [];
      }
    } catch (err) {
      this.loading = false;
      this.message = 'Erro inesperado ao buscar publicações';
      return [];
    }
  }
}
