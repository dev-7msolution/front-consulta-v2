"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/app/components/DashboardLayout"
import { SearchResult, UserData } from "@/app/components/SearchResult"
import { Loader2, Search, Users, FileText, Shield, Sparkles } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { buscadadoapi } from "./api/action/buscadado"

const searchFormSchema = z.object({
  cpf: z.string().optional(),
  nome: z.string().optional(),
  celular: z.string().optional(),
}).refine(
  (data) => data.cpf || data.nome || data.celular,
  {
    message: "Preencha ao menos um campo para realizar a busca.",
    path: ["cpf"],
  }
)

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<UserData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("cpf")

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      cpf: "",
      nome: "",
      celular: "",
    },
  })

  const handleSearch = async (values: z.infer<typeof searchFormSchema>) => {
    setSearchResult(null)
    setError(null)
    
    if (!values.cpf && !values.nome && !values.celular) {
        toast.error("Preencha ao menos um campo para realizar a busca.")
        return
    }

    setIsLoading(true)

    try {
      const response = await buscadadoapi(values.cpf ?? "", values.nome ?? "", values.celular ?? "")

      const mockData: UserData = {
            nomeCompleto: response?.nome ?? "",
            cpf: values.cpf ?? "",
            dataNascimento: response?.data_aniversaio,
            endereco: response?.rua ,
            nomeMae: response.nome_mae ?? "",
            telefone: "(" + response.celular_ddd + ")" + " " + response.celular_number,
            bairro: response.bairro ?? "",
            cidade: response.cidade ?? "",
            uf: response.uf ?? "",
            cep: response.cep ?? "",
            numero: response.numero ?? "",
            rua: response.rua ?? "",
            tipo_end: response.tipo_end ?? "",
      }

      setSearchResult(mockData)
      toast.success("Consulta realizada com sucesso!")
    } catch (e) {
      console.log(e)
      setError("Não foi possível realizar a consulta. Tente novamente.")
      toast.error("Erro na consulta", {
        description: "Não foi possível buscar os dados. Tente novamente mais tarde."
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Central de Consultas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre informações completas e atualizadas de forma rápida e segura
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Shield className="h-3 w-3" />
              100% Seguro
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Users className="h-3 w-3" />
              Dados Atualizados
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <FileText className="h-3 w-3" />
              Relatórios Completos
            </Badge>
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50/50">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">Realizar Consulta</CardTitle>
              <CardDescription>
                Escolha o tipo de busca e preencha as informações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-10">
                      <TabsTrigger value="cpf" className="text-sm font-medium">
                        CPF
                      </TabsTrigger>
                      <TabsTrigger value="nome" className="text-sm font-medium">
                        Nome
                      </TabsTrigger>
                      <TabsTrigger value="celular" className="text-sm font-medium">
                        Celular
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="cpf" className="mt-4">
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="cpf"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Número do CPF</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="000.000.000-00" 
                                  className="h-10"
                                  {...field}
                                  onChange={(e) => {
                                    const formatted = formatCPF(e.target.value)
                                    field.onChange(formatted)
                                  }}
                                  maxLength={14}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="nome" className="mt-4">
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="nome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Nome Completo</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Digite o nome completo" 
                                  className="h-10"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="celular" className="mt-4">
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="celular"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Número do Celular</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="(11) 99999-9999" 
                                  className="h-10"
                                  {...field}
                                  onChange={(e) => {
                                    const formatted = formatPhone(e.target.value)
                                    field.onChange(formatted)
                                  }}
                                  maxLength={15}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full h-10 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Consultando...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Realizar Consulta
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 text-xs">!</span>
                  </div>
                  Erro na Consulta
                </CardTitle>
                <CardDescription className="text-red-700">
                  {error}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Results */}
        {searchResult && !isLoading && (
          <div className="max-w-4xl mx-auto">
            <SearchResult data={searchResult} />
          </div>
        )}

        {/* Features Section */}
        {!searchResult && !isLoading && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="text-center p-4 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <Search className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Busca Inteligente</h3>
              <p className="text-muted-foreground text-sm">
                Encontre informações usando CPF, nome completo ou número de celular
              </p>
            </Card>

            <Card className="text-center p-4 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Dados Seguros</h3>
              <p className="text-muted-foreground text-sm">
                Todas as consultas são protegidas e seguem as normas de privacidade
              </p>
            </Card>

            <Card className="text-center p-4 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Relatórios Detalhados</h3>
              <p className="text-muted-foreground text-sm">
                Informações completas e organizadas para suas necessidades
              </p>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
