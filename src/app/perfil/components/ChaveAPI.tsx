'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Key, Copy, RefreshCw, Eye, EyeOff, AlertTriangle } from "lucide-react"

export function ChaveAPI() {
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [keyExists, setKeyExists] = useState(false)

  useEffect(() => {
    fetchApiKey()
  }, [])

  const fetchApiKey = async () => {
    try {
      const response = await fetch('/api/perfil/api-key')
      if (response.ok) {
        const data = await response.json()
        setApiKey(data.apiKey || '')
        setKeyExists(!!data.apiKey)
      }
    } catch (error) {
      console.error('Erro ao buscar chave API:', error)
    }
  }

  const generateApiKey = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/perfil/api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setApiKey(data.apiKey)
        setKeyExists(true)
        toast.success('Chave API gerada com sucesso!')
      } else {
        toast.error('Erro ao gerar chave API')
      }
    } catch (error) {
      toast.error('Erro ao gerar chave API')
    } finally {
      setLoading(false)
    }
  }

  const regenerateApiKey = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/perfil/api-key', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setApiKey(data.apiKey)
        toast.success('Chave API regenerada com sucesso!')
        toast.warning('A chave anterior foi invalidada')
      } else {
        toast.error('Erro ao regenerar chave API')
      }
    } catch (error) {
      toast.error('Erro ao regenerar chave API')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey)
      toast.success('Chave API copiada para a área de transferência!')
    } catch (error) {
      toast.error('Erro ao copiar chave API')
    }
  }

  const maskedKey = apiKey ? `${apiKey.substring(0, 8)}${'*'.repeat(24)}${apiKey.substring(-4)}` : ''

  return (
    <div className="space-y-6">
      {/* Chave API Atual */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Key className="h-5 w-5" />
            Sua Chave de API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {keyExists ? (
            <>
              <div className="space-y-2">
                <Label>Chave de API</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={showKey ? apiKey : maskedKey}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-green-600">
                  Ativa
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Criada em {new Date().toLocaleDateString('pt-BR')}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={regenerateApiKey}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  {loading ? 'Regenerando...' : 'Regenerar Chave'}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-muted p-3">
                  <Key className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Nenhuma chave API encontrada</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Gere uma chave API para acessar nossos serviços programaticamente.
                  </p>
                </div>
                <Button onClick={generateApiKey} disabled={loading}>
                  {loading ? 'Gerando...' : 'Gerar Chave API'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações de Segurança */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            Informações de Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-orange-700">
          <ul className="space-y-2 list-disc list-inside">
            <li>Mantenha sua chave API em segurança e nunca a compartilhe publicamente</li>
            <li>Use variáveis de ambiente para armazenar a chave em suas aplicações</li>
            <li>Regenere sua chave periodicamente ou se suspeitar de comprometimento</li>
            <li>Monitore o uso da sua API através do painel de controle</li>
          </ul>
        </CardContent>
      </Card>

      {/* Documentação */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Como usar sua API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Exemplo de uso (cURL)</Label>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`curl -X GET "https://api.exemplo.com/consulta" \\
  -H "Authorization: Bearer ${apiKey || 'SUA_CHAVE_API'}" \\
  -H "Content-Type: application/json"`}</pre>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Exemplo de uso (JavaScript)</Label>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`const response = await fetch('https://api.exemplo.com/consulta', {
  headers: {
    'Authorization': 'Bearer ${apiKey || 'SUA_CHAVE_API'}',
    'Content-Type': 'application/json'
  }
});`}</pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 