import relatorios from "@/app/api/action/relatorios"
import { TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { TableHead } from "@/components/ui/table"
import { formatDate, formatCPF, formatDateTime } from "@/lib/utils"
import { RelatorioProps } from "@/lib/types"
import { TablePagination } from "./TablePagination"


interface TabelaResultadoProps {
    page: number
    limit: number
}
export async function TabelaResultado({ page, limit }: TabelaResultadoProps) {
    const { resultado: response, last_page } = await relatorios.relatorios(2, page, limit)    
    
    return (
    <>
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
        {response.map((consulta: RelatorioProps) => (
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
                <TablePagination page={page} last_page={last_page} limit={limit} />
            </TableCell>
        </TableRow>
      </tfoot>
      </>
    )
}