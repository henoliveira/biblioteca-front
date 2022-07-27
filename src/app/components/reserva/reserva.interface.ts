import { Associado } from '../associado/associado.interface';
import { Publicacao } from '../publicacao/publicacao.interface';

export interface ICreateReservaResponse {
  status: number;
  message: string;
}

export interface IGetPublicacoes {
  status: number;
  data: Publicacao[];
}

export interface IGetAssociados {
  status: number;
  data: Associado[];
}
