export enum AssociadoFuncao {
  graduacao = 'Grad',
  posgraduacao = 'Posgrad',
  professor = 'Prof',
}

export interface ICreateAssociadoResponse {
  status: number;
  message: string;
}

export interface CreateAssociado {
  nome: string;
  email: string;
  endereco: string;
  status: AssociadoFuncao;
}

export interface Associado {
  Nome: string;
  Email: string;
  Endereco: string;
  Codigo: number;
  Status: AssociadoFuncao;
}
