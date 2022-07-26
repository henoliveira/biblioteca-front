import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HttpService } from '../../services/http.service';
import { Associado } from '../associado/associado.interface';
import { Exemplar } from '../exemplar/exemplar.interface';
import { Publicacao } from '../publicacao/publicacao.interface';
import { IGetAssociados } from '../reserva/reserva.interface';
import {
  Emprestimo,
  ICreateEmprestimoResponse,
  IGetExemplares,
  IGetPublicacao,
} from './emprestimo.interface';

type IMessage =
  | 'Emprestimo realizado'
  | 'Erro inesperado ao realizar emprestimo'
  | 'Erro inesperado ao buscar exemplares'
  | 'Erro inesperado ao buscar associados'
  | '';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.scss'],
})
export class EmprestimoComponent {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  loading = false;

  emprestimoForm!: FormGroup;
  message: IMessage = '';
  publicacoes: Publicacao[] = [];
  exemplares: Exemplar[] = [];
  associados: Associado[] = [];

  ngOnInit(): void {
    this.emprestimoForm = this.formBuilder.group<Partial<Emprestimo>>({
      ISBN: '',
      associadoId: undefined,
      exemplarId: undefined,
    });

    this.getAllPublicacoes().then((publicacoes) => {
      this.publicacoes = publicacoes;
    });

    this.getAllAssociados().then((associados) => {
      this.associados = associados;
    });
  }

  formatAssociadosInputName(selectedCodigo: number) {
    const selectedAssociado = this.associados.find(
      ({ Codigo }) => Codigo === selectedCodigo
    );

    if (!selectedAssociado) return '';

    return `${selectedAssociado.Codigo} - ${selectedAssociado.Nome}`;
  }

  async onSubmit() {
    this.createEmprestimo();
  }

  private async createEmprestimo() {
    try {
      this.loading = true;
      const response = await this.httpService.post<ICreateEmprestimoResponse>(
        '/emprestimo',
        {
          ISBN: this.emprestimoForm.value.ISBN,
          id_associado: this.emprestimoForm.value.associadoId,
          nro_exemplar: this.emprestimoForm.value.exemplarId,
        }
      );

      console.log(response);
      this.loading = false;

      if (response.status === 201) {
        this.message = 'Emprestimo realizado';
      } else {
        this.message = 'Erro inesperado ao realizar emprestimo';
      }
    } catch (err) {
      this.loading = false;
      this.message = 'Erro inesperado ao realizar emprestimo';
    }
  }

  async handlePublicacaoChange(event: any) {
    this.exemplares = await this.getAllExemplares(event.option.value);
  }

  formatPublicacoesInputName(selectedIsbn: string) {
    const selectedPublicacao = this.publicacoes.find(
      ({ ISBN }) => ISBN === selectedIsbn
    );
    if (!selectedPublicacao) return '';

    return `${selectedPublicacao.Titulo} - ${selectedPublicacao.Autor}`;
  }

  formatExemplaresInputName(selectedExemplarCodigo: string) {
    const selectedExemplar = this.exemplares.find(
      ({ Numero }) => `${Numero}` === `${selectedExemplarCodigo}`
    );
    if (!selectedExemplar) return '';

    return `Exemplar ${selectedExemplar.Numero} - R$${selectedExemplar.Preco}`;
  }

  private async getAllPublicacoes() {
    try {
      this.loading = true;
      const response = await this.httpService.get<IGetPublicacao>(
        '/publicacao'
      );

      console.log(response);
      this.loading = false;

      if (response.status === 200) {
        return response.data;
      } else {
        console.log('Erro inesperado ao buscar publicações');
        return [];
      }
    } catch (err) {
      this.loading = false;
      console.log('Erro inesperado ao buscar publicações');
      return [];
    }
  }

  async getAllAssociados() {
    try {
      this.loading = true;
      const response = await this.httpService.get<IGetAssociados>('/associado');

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

  private async getAllExemplares(publicacaoISBN: string) {
    try {
      this.loading = true;
      const response = await this.httpService.get<IGetExemplares>(
        `/exemplar/publicacao/${publicacaoISBN}`
      );

      console.log(response);
      this.loading = false;

      if (response.status === 200) {
        return response.data;
      } else {
        this.message = 'Erro inesperado ao buscar exemplares';
        return [];
      }
    } catch (err) {
      this.loading = false;
      this.message = 'Erro inesperado ao buscar exemplares';
      return [];
    }
  }
}
