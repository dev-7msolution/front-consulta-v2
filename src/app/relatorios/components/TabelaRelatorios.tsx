'use client'

import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table"
import { formatDate, formatCPF, formatDateTime } from "@/lib/utils"
import { RelatorioProps } from "@/lib/types"
import { TablePagination } from "./TablePagination"

export function TabelaRelatorios() {
  const [data, setData] = useState<RelatorioProps[]>([])
  const [lastPage, setLastPage] = useState(1)
  const [loading, setLoading] = useState(true)
  
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/relatorios?page=${page}&limit=${limit}`)
        const result = await response.json()
        setData(result.resultado)
        setLastPage(result.last_page)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, limit])

  if (loading) {
    return <div className="text-center py-4">Carregando...</div>
  }

  return (
    <>
      <Table>
        <TableHeader>       
          <TableRow>
            <TableHead>Nome Cliente</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Data Aniversário</TableHead>
            <TableHead>Qtde Consultas</TableHead>
            <TableHead>Data Última Consulta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((consulta: RelatorioProps) => (
            <TableRow key={consulta.cpf}>
              <TableCell>{consulta.nome}</TableCell>
              <TableCell>{formatCPF(consulta.cpf)}</TableCell>
              <TableCell>{formatDate(consulta.data_aniversaio)}</TableCell>
              <TableCell>{consulta.qtde_consulta}</TableCell>
              <TableCell>{formatDateTime(consulta.ultima_consulta)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          <TableRow>
            <TableCell colSpan={5}>
              <TablePagination page={page} last_page={lastPage} limit={limit} />
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </>
  )
} 