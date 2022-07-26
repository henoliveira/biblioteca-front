import { Emprestimo } from '../emprestimo/emprestimo.interface';

type IGetEmprestimosResponseData = Emprestimo & {
  titulo: string;
  status: 'Atrasdo' | 'Em andamento';
  expirado_a_dias: number;
};

export interface IGetEmprestimosResponse {
  status: number;
  data: Array<IGetEmprestimosResponseData>;
}
