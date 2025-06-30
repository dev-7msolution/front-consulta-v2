import relatorios from "@/app/api/action/relatorios"
import { TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { TableHead } from "@/components/ui/table"
import { formatDate, formatCPF, formatDateTime } from "@/lib/utils"


interface RelatorioProps {
    nome: string
    cpf: string
    data_aniversaio: string
    ultima_consulta: string
  
  }
export async function TabelaResultado() {
    const response : RelatorioProps[] = await relatorios.relatorios(2)    
    return (
    <>
        <TableHeader>       
        <TableRow>
          <TableHead>Nome Cliente</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>Data Aniversário</TableHead>
          <TableHead>Data Última Consulta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {response.map((consulta) => (
          <TableRow key={consulta.cpf}>
            <TableCell>{consulta.nome}</TableCell>
            <TableCell>{formatCPF(consulta.cpf)}</TableCell>
            <TableCell>{formatDate(consulta.data_aniversaio)}</TableCell>
            <TableCell>{formatDateTime(consulta.ultima_consulta)}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      </>
    )
}