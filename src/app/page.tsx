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
import { DashboardLayout } from "@/app/components/DashboardLayout"
import { SearchResult, UserData } from "@/app/components/SearchResult"
import { Loader2 } from "lucide-react"
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
    path: ["cpf"], // assign error to one field to show message
  }
)

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<UserData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      cpf: "",
      nome: "",
      celular: "",
    },
  })

  const handleSearch = async (values: z.infer<typeof searchFormSchema>) => {
    // Clear previous results
    setSearchResult(null)
    setError(null)
    
    // Check if at least one field is filled (client-side check for better UX)
    if (!values.cpf && !values.nome && !values.celular) {
        toast.error("Preencha ao menos um campo para realizar a busca.")
        return
    }

    setIsLoading(true)


    try {

       // TODO: Substituir por chamada real à API usando os 'values'
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

  return (
    <DashboardLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSearch)} className="w-full max-w-xl space-y-6">
          <Tabs defaultValue="cpf" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cpf">CPF</TabsTrigger>
              <TabsTrigger value="nome">Nome Completo</TabsTrigger>
              <TabsTrigger value="celular">Celular</TabsTrigger>
            </TabsList>
            <TabsContent value="cpf">
              <Card>
                <CardHeader>
                  <CardTitle>Consulta por CPF</CardTitle>
                  <CardDescription>
                    Digite o CPF para consultar as informações.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Consultar
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="nome">
               <Card>
                <CardHeader>
                  <CardTitle>Consulta por Nome Completo</CardTitle>
                  <CardDescription>
                    Digite o nome completo para consultar.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Consultar
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="celular">
               <Card>
                <CardHeader>
                  <CardTitle>Consulta por Celular</CardTitle>
                  <CardDescription>
                    Digite o celular para consultar.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="celular"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Celular</FormLabel>
                        <FormControl>
                          <Input placeholder="(99) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Consultar
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>

      {error && (
        <Card className="mt-6 w-full max-w-xl border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erro na Consulta</CardTitle>
            <CardDescription className="text-destructive">
              {error}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {searchResult && !isLoading && <SearchResult data={searchResult} />}
    </DashboardLayout>
  )
}
