export interface ICreatePublicacaoResponse {
  status: number;
  message: string;
}

export interface Publicacao {
  ISBN: string;
  Titulo: string;
  Autor: string;
  Editora: string;
}
