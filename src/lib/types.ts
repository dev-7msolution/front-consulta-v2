export type BuscaProps = {
  nome?: string;
  cpf?: string;
  data_nascimento?: string;
  endereco?: string;
  nome_mae?: string;
  telefone?: string;
  // Adicione aqui outros campos que sua API pode retornar
};

export type ApiResponse = {
  data: {
    busca?: BuscaProps;
  };
  // Outras propriedades da resposta da API, se houver
};

export interface RelatorioProps {
    nome: string;
    cpf: string;
    data_aniversaio: string;
    ultima_consulta: string;
    qtde_consulta: number;
  } 