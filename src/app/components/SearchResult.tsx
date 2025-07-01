"use client"

import { format } from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  CreditCard, 
  Home,
  Copy,
  CheckCircle2
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

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

const InfoItem = ({ 
  icon: Icon, 
  label, 
  value, 
  copyable = false 
}: { 
  icon: any; 
  label: string; 
  value: string | undefined;
  copyable?: boolean;
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        toast.success(`${label} copiado!`)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        toast.error("Erro ao copiar")
      }
    }
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
      <div className="mt-0.5">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground mt-1 break-words">
          {value || "-"}
        </p>
      </div>
      {copyable && value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0 hover:bg-gray-200"
        >
          {copied ? (
            <CheckCircle2 className="h-3 w-3 text-green-600" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      )}
    </div>
  )
}

export const SearchResult = ({ data }: SearchResultProps) => {
  const formatAddress = () => {
    const parts = [
      data.rua,
      data.numero,
      data.bairro,
      data.cidade,
      data.uf,
      data.cep
    ].filter(Boolean)
    return parts.length > 0 ? parts.join(", ") : "-"
  }

  return (
    <div className="space-y-6">
      {/* Header com status */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Consulta Realizada</h2>
          <p className="text-muted-foreground">Informações encontradas com sucesso</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Dados Verificados
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações Pessoais */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-blue-600" />
              Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoItem
              icon={User}
              label="Nome Completo"
              value={data.nomeCompleto}
              copyable
            />
            <InfoItem
              icon={CreditCard}
              label="CPF"
              value={data.cpf}
              copyable
            />
            <InfoItem
              icon={Calendar}
              label="Data de Nascimento"
              value={data.dataNascimento ? format(new Date(new Date(data.dataNascimento).valueOf() + new Date(data.dataNascimento).getTimezoneOffset() * 60000), "dd/MM/yyyy") : "-"}
            />
            <InfoItem
              icon={User}
              label="Nome da Mãe"
              value={data.nomeMae}
            />
          </CardContent>
        </Card>

        {/* Contato */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5 text-green-600" />
              Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoItem
              icon={Phone}
              label="Telefone"
              value={data.telefone}
              copyable
            />
            {data.email && (
              <InfoItem
                icon={Phone}
                label="Email"
                value={data.email}
                copyable
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Endereço - Largura completa */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-purple-600" />
            Endereço
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoItem
              icon={Home}
              label="Logradouro"
              value={data.rua}
            />
            <InfoItem
              icon={Home}
              label="Número"
              value={data.numero}
            />
            <InfoItem
              icon={MapPin}
              label="Bairro"
              value={data.bairro}
            />
            <InfoItem
              icon={MapPin}
              label="Cidade"
              value={data.cidade}
            />
            <InfoItem
              icon={MapPin}
              label="Estado"
              value={data.uf}
            />
            <InfoItem
              icon={MapPin}
              label="CEP"
              value={data.cep}
              copyable
            />
          </div>
          
          {/* Endereço completo */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">Endereço Completo</p>
                <p className="text-sm text-blue-800 font-semibold">
                  {formatAddress()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(formatAddress())
                    toast.success("Endereço completo copiado!")
                  } catch (error) {
                    toast.error("Erro ao copiar endereço")
                  }
                }}
                className="ml-auto h-8 w-8 p-0 hover:bg-blue-100"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 