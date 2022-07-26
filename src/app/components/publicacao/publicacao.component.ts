import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ICreatePublicacaoResponse } from './publicacao.interface';

type ICreateMessage = 'Criado com sucesso' | 'Erro inesperado ao criar' | '';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.scss'],
})
export class PublicacaoComponent {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private localStorage: LocalStorageService
  ) {}

  loading = false;
  publicacaoForm!: FormGroup;
  createMessage: ICreateMessage = '';
  role!:string;

  ngOnInit(): void {
    this.publicacaoForm = this.formBuilder.group({
      ISBN: '',
      titulo: '',
      autor: '',
      editora: '',
    });
    this.role = this.localStorage.get('role') as string;
  }

  async onSubmit() {
    console.log(this.publicacaoForm.value);
    this.createPublicacao();
  }

  async createPublicacao() {
    try {
      this.loading = true;
      const response = await this.httpService.post<ICreatePublicacaoResponse>(
        '/publicacao',
        {
          ISBN: this.publicacaoForm.value.ISBN,
          titulo: this.publicacaoForm.value.titulo,
          autor: this.publicacaoForm.value.autor,
          editora: this.publicacaoForm.value.editora,
        }
      );

      console.log(response);
      this.loading = false;

      if (response.status === 201) {
        this.createMessage = 'Criado com sucesso';
      } else {
        this.createMessage = 'Erro inesperado ao criar';
      }
    } catch (err) {
      this.createMessage = 'Erro inesperado ao criar';
      this.loading = false;
    }
  }
}
