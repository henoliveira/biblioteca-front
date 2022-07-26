import { Exemplar } from '../exemplar/exemplar.interface';
import { Publicacao } from '../publicacao/publicacao.interface';

export interface IGetPublicacaoResponse {
  status: number;
  data: Publicacao & {
    exemplares: Array<Exemplar & { status: 'Emprestado' | 'Em estoque' }>;
  };
}
