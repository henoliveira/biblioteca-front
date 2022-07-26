import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HttpService } from '../../services/http.service';
import { Exemplar } from '../exemplar/exemplar.interface';
import { Publicacao } from '../publicacao/publicacao.interface';
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

  ngOnInit(): void {
    this.emprestimoForm = this.formBuilder.group<Partial<Emprestimo>>({
      ISBN: '',
      associadoId: undefined,
      exemplarId: undefined,
    });

    this.getAllPublicacoes().then((publicacoes) => {
      this.publicacoes = publicacoes;
    });
  }

  async onSubmit() {
    console.log(this.emprestimoForm.value);
    this.createEmprestimo();
  }

  private async createEmprestimo() {
    try {
      this.loading = true;
      const response = await this.httpService.post<ICreateEmprestimoResponse>(
        '/emprestimo',
        {
          ISBN: this.emprestimoForm.value.ISBN,
          preco: this.emprestimoForm.value.preco,
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

  formatPublicacoesInputName(selectedIsbn: string) {
    const selectedPublicacao = this.publicacoes.find(
      ({ ISBN }) => ISBN === selectedIsbn
    );
    if (!selectedPublicacao) return '';

    return `${selectedPublicacao.Titulo} - ${selectedPublicacao.Autor}`;
  }

  formatExemplaresInputName(selectedExemplarCodigo: string) {
    const selectedExemplar = this.exemplares.find(
      ({ Numero }) => `${Numero}` === selectedExemplarCodigo
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

  private async getAllExemplares(publicacaoISBN: string) {
    try {
      this.loading = true;
      const response = await this.httpService.get<IGetPublicacao>(
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
