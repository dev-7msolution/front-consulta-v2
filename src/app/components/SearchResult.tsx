"use client"

import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type UserData = {
  nomeCompleto: string
  cpf: string
  dataNascimento: string
  endereco: string
  nomeMae: string
  telefone: string
  email?: string
  bairro?: string
  cidade?: string
  uf?: string
  cep?: string
  numero?: string
  rua?: string
  tipo_end?: string
}

interface SearchResultProps {
  data: UserData
}

const DataRow = ({ label, value }: { label: string; value: string | undefined }) => (
  <div className="flex flex-col justify-between border-b py-3 sm:flex-row sm:items-center">
    <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
    <dd className="mt-1 text-sm font-semibold sm:mt-0">{value || "-"}</dd>
  </div>
)

export const SearchResult = ({ data }: SearchResultProps) => {
  return (
    <Card className="mt-6 w-full max-w-xl">
      <CardHeader>
        <CardTitle>Resultado da Consulta</CardTitle>
        <CardDescription>
          Informações encontradas para a sua busca.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="space-y-1">
          <DataRow label="Nome Completo" value={data.nomeCompleto} />
          <DataRow label="CPF" value={data.cpf} />
          <DataRow label="Data de Nascimento" value={data.dataNascimento ? format(new Date(new Date(data.dataNascimento).valueOf() + new Date(data.dataNascimento).getTimezoneOffset() * 60000), "dd/MM/yyyy") : "-"} />
          <DataRow label="Endereço" value={data.rua} />
          <DataRow label="Número" value={data.numero} />
          <DataRow label="Bairro" value={data.bairro} />
          <DataRow label="Cidade" value={data.cidade} />
          <DataRow label="UF" value={data.uf} />
          <DataRow label="CEP" value={data.cep} />
          <DataRow label="Nome da Mãe" value={data.nomeMae} />
          <DataRow label="Telefone" value={data.telefone} />
        </dl>
      </CardContent>
    </Card>
  )
} 