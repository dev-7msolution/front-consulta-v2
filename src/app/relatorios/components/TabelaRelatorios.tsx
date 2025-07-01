'use client'

import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatCPF, formatDateTime } from "@/lib/utils"
import { RelatorioProps } from "@/lib/types"
import { TablePagination } from "./TablePagination"
import { 
  User, 
  CreditCard, 
  Calendar, 
  BarChart3, 
  Clock,
  Loader2,
  AlertCircle,
  Search
} from "lucide-react"

export function TabelaRelatorios() {
  const [data, setData] = useState<RelatorioProps[]>([])
  const [lastPage, setLastPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/relatorios?page=${page}&limit=${limit}`)
        if (!response.ok) {
          throw new Error('Erro ao carregar dados')
        }
        const result = await response.json()
        setData(result.resultado)
        setLastPage(result.last_page)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        setError('Erro ao carregar os dados. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, limit])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">Carregando relatórios...</p>
          <p className="text-sm text-gray-500">Aguarde enquanto buscamos os dados</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">Ops! Algo deu errado</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">Nenhum dado encontrado</p>
          <p className="text-sm text-gray-500">Não há consultas para exibir no momento</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>       
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nome Cliente
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  CPF
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Data Aniversário
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Qtde Consultas
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Última Consulta
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((consulta: RelatorioProps, index) => (
              <TableRow 
                key={consulta.cpf} 
                className="hover:bg-blue-50/50 transition-colors duration-200"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold">
                      {consulta.nome.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-900">{consulta.nome}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {formatCPF(consulta.cpf)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-700">
                    {formatDate(consulta.data_aniversaio)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={`
                      ${consulta.qtde_consulta >= 10 
                        ? 'bg-green-100 text-green-700' 
                        : consulta.qtde_consulta >= 5 
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                      }
                    `}
                  >
                    {consulta.qtde_consulta} consulta{consulta.qtde_consulta !== 1 ? 's' : ''}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-700">
                    {formatDateTime(consulta.ultima_consulta)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="border-t bg-gray-50/50 px-6 py-4">
        <TablePagination page={page} last_page={lastPage} limit={limit} />
      </div>
    </div>
  )
} 