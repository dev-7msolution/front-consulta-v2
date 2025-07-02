import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/app/components/DashboardLayout"
import { 
  Database, 
  CalendarDays, 
  CalendarClock, 
  TrendingUp, 
  BarChart3,
  Users,
  Activity,
  Clock,
  CheckCircle2
} from "lucide-react"
import relatorios from "../api/action/relatorios"
import { TabelaRelatorios } from "./components/TabelaRelatorios"

export default async function RelatoriosPage() {
  const relatorio = await relatorios.cardRelatorio(2)
  const relatorioMes = await relatorios.cardRelatorioMes(2)
  const relatorioDia = await relatorios.cardRelatorioDia(2)
  
  const stats = [
    {
      title: "Total de Consultas",
      value: relatorio.length > 0 ? relatorio[0].total_geral : 0,
      description: "Total de consultas realizadas na plataforma",
      icon: Database,
      color: "blue",
      trend: "+12.5%",
      trendLabel: "vs último mês"
    },
    {
      title: "Consultas do Mês",
      value: relatorioMes.length > 0 ? relatorioMes[0].mes : 0,
      description: "Consultas realizadas no mês atual",
      icon: CalendarDays,
      color: "green",
      trend: "+8.2%",
      trendLabel: "vs mês anterior"
    },
    {
      title: "Consultas Hoje",
      value:   relatorioDia.length > 0 ? relatorioDia[0].total : 0,
      description: "Consultas realizadas no dia atual",
      icon: CalendarClock,
      color: "purple",
      trend: "+15.3%",
      trendLabel: "vs ontem"
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          gradient: 'from-blue-500 to-indigo-600',
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-700'
        }
      case 'green':
        return {
          gradient: 'from-green-500 to-emerald-600',
          bg: 'bg-green-50',
          text: 'text-green-600',
          badge: 'bg-green-100 text-green-700'
        }
      case 'purple':
        return {
          gradient: 'from-purple-500 to-violet-600',
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          badge: 'bg-purple-100 text-purple-700'
        }
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          bg: 'bg-gray-50',
          text: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-700'
        }
    }
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Dados Atualizados
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Última atualização: agora
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => {
            const colors = getColorClasses(stat.color)
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className={`h-1 bg-gradient-to-r ${colors.gradient}`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value.toLocaleString()}
                      </div>
                      <Badge variant="secondary" className={colors.badge}>
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.trend}
                      </Badge>
                    </div>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">
                      {stat.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <Activity className="h-3 w-3" />
                      {stat.trend} {stat.trendLabel}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Histórico de Consultas */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Histórico de Consultas
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Visualize todas as consultas realizadas pelos usuários
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                <Database className="h-3 w-3 mr-1" />
                Dados em Tempo Real
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <TabelaRelatorios />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 