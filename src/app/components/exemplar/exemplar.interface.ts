import { Publicacao } from '../publicacao/publicacao.interface';

export interface ICreateExemplarResponse {
  status: number;
  message: string;
}

export interface IGetPublicacoes {
  status: number;
  data: Publicacao[];
}

export interface Exemplar {
  Numero: string;
  ISBN: string;
  Preco: string;
}
