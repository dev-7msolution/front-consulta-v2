'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { User, Building2, MapPin } from "lucide-react"
import { perfilSchema, type PerfilFormData, formatPhone, formatCNPJ, formatCEP } from "@/lib/validations"

export function EditarPerfil() {
  const { data: session, update } = useSession()
  
  const form = useForm<PerfilFormData>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      phone: '',
      companyName: '',
      cnpj: '',
      address: '',
      city: '',
      state: '',
      cep: ''
    }
  })

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = form

  const onSubmit = async (data: PerfilFormData) => {
    try {
      // Aqui você fará a chamada para sua API externa
      const response = await fetch('https://sua-api.com/perfil/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await update({
          ...session,
          user: {
            ...session?.user,
            name: data.name,
            email: data.email,
          },
        })
        toast.success('Perfil atualizado com sucesso!')
      } else {
        toast.error('Erro ao atualizar perfil')
      }
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    }
  }

  // Formatação automática dos campos
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setValue('phone', formatted)
  }

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value)
    setValue('cnpj', formatted)
  }

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value)
    setValue('cep', formatted)
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setValue('state', value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Dados Pessoais */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5" />
            Dados Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Seu nome completo"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="seu@email.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                {...register('phone')}
                onChange={handlePhoneChange}
                placeholder="(11) 99999-9999"
                maxLength={15}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dados da Empresa */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5" />
            Dados da Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nome da Empresa</Label>
              <Input
                id="companyName"
                {...register('companyName')}
                placeholder="Nome da sua empresa"
                className={errors.companyName ? "border-red-500" : ""}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">{errors.companyName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                {...register('cnpj')}
                onChange={handleCNPJChange}
                placeholder="00.000.000/0000-00"
                maxLength={18}
                className={errors.cnpj ? "border-red-500" : ""}
              />
              {errors.cnpj && (
                <p className="text-sm text-red-500">{errors.cnpj.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Endereço */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            Endereço
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Endereço Completo</Label>
            <Input
              id="address"
              {...register('address')}
              placeholder="Rua, número, complemento"
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="São Paulo"
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                {...register('state')}
                onChange={handleStateChange}
                placeholder="SP"
                maxLength={2}
                className={errors.state ? "border-red-500" : ""}
              />
              {errors.state && (
                <p className="text-sm text-red-500">{errors.state.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                {...register('cep')}
                onChange={handleCEPChange}
                placeholder="00000-000"
                maxLength={9}
                className={errors.cep ? "border-red-500" : ""}
              />
              {errors.cep && (
                <p className="text-sm text-red-500">{errors.cep.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} size="lg" className="px-8">
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  )
} 