import { Exemplar } from '../exemplar/exemplar.interface';
import { Publicacao } from '../publicacao/publicacao.interface';

export interface ICreateEmprestimoResponse {
  status: number;
  message: string;
}

export interface IGetPublicacao {
  status: number;
  data: Publicacao[];
}

export interface IGetExemplares {
  status: number;
  data: Exemplar[];
}

export interface Emprestimo {
  exemplarId: number;
  ISBN: string;
  associadoId: number;
}
