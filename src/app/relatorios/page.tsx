import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DashboardLayout } from "@/app/components/DashboardLayout"
import { Database, CalendarDays, CalendarClock } from "lucide-react"
import relatorios from "../api/action/relatorios"
import { TabelaRelatorios } from "./components/TabelaRelatorios"


export default async function RelatoriosPage() {
  const relatorio = await relatorios.cardRelatorio(2)
  const relatorioMes = await relatorios.cardRelatorioMes(2)
  const relatorioDia = await relatorios.cardRelatorioDia(2)
  
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
            <div className="text-2xl font-bold">{relatorio[0].total_geral}</div>
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
            <div className="text-2xl font-bold">{relatorioMes ? relatorioMes[0].mes : 0}</div>
            <p className="text-xs text-muted-foreground">
              Consultas realizadas no mês atual.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas (dia)
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{relatorioDia ? relatorioDia[0].total : 0}</div>
            <p className="text-xs text-muted-foreground">
              Consultas realizadas no dia atual.
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
            <TabelaRelatorios />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 