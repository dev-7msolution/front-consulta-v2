import { DashboardLayout } from "@/app/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditarPerfil } from "./components/EditarPerfil"
import { TrocarSenha } from "./components/TrocarSenha"
import { ChaveAPI } from "./components/ChaveAPI"


export default function PerfilPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto max-w-6xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Configurações da Conta</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais, configurações de segurança e integrações.
          </p>
        </div>
        
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <Tabs defaultValue="perfil" className="w-full">
              <div className="border-b bg-muted/30 px-6 py-4">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                  <TabsTrigger value="perfil">Perfil</TabsTrigger>
                  <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                  <TabsTrigger value="api">Chave API</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-6">
                <TabsContent value="perfil" className="space-y-6 mt-0">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Informações Pessoais</h2>
                    <p className="text-sm text-muted-foreground">
                      Atualize suas informações pessoais e da empresa.
                    </p>
                  </div>
                  <EditarPerfil />
                </TabsContent>
                
                <TabsContent value="seguranca" className="space-y-6 mt-0">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Segurança da Conta</h2>
                    <p className="text-sm text-muted-foreground">
                      Mantenha sua conta segura alterando sua senha regularmente.
                    </p>
                  </div>
                  <TrocarSenha />
                </TabsContent>
                
                <TabsContent value="api" className="space-y-6 mt-0">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Chave de API</h2>
                    <p className="text-sm text-muted-foreground">
                      Gerencie suas chaves de API para integrações externas.
                    </p>
                  </div>
                  <ChaveAPI />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 