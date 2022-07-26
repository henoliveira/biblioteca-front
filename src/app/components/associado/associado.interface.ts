export enum AssociadoFuncao {
  graduacao = 'Grad',
  posgraduacao = 'Posgrad',
  professor = 'Prof',
}

export interface ICreateAssociadoResponse {
  status: number;
  message: string;
}

export interface Associado {
  nome: string;
  email: string;
  endereco: string;
  status: AssociadoFuncao;
}
