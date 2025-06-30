
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardLayout } from "@/app/components/DashboardLayout"
import { Database, CalendarDays, CalendarClock } from "lucide-react"
import { TabelaResultado } from "./components/tableResultado"



// Dados mocados para o relatório
const totalConsultas = 1250
const totalMes = 150
const totalAno = 800




export default async function RelatoriosPage() {


  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Consultas
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsultas}</div>
            <p className="text-xs text-muted-foreground">
              Total de consultas realizadas na plataforma.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas (Mês)
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMes}</div>
            <p className="text-xs text-muted-foreground">
              Consultas realizadas no mês atual.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas (Ano)
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAno}</div>
            <p className="text-xs text-muted-foreground">
              Consultas realizadas no ano atual.
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TabelaResultado />
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 