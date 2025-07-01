'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { trocarSenhaSchema, type TrocarSenhaFormData } from "@/lib/validations"

export function TrocarSenha() {
  const { data: session } = useSession()
  
  const form = useForm<TrocarSenhaFormData>({
    resolver: zodResolver(trocarSenhaSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form

  const onSubmit = async (data: TrocarSenhaFormData) => {
    try {
      // Aqui você fará a chamada para sua API externa
      const response = await fetch('https://sua-api.com/perfil/trocar-senha', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      })

      if (response.ok) {
        toast.success('Senha alterada com sucesso!')
        reset() // Limpa o formulário
      } else {
        const error = await response.json()
        toast.error(error.message || 'Erro ao alterar senha')
      }
    } catch (error) {
      toast.error('Erro ao alterar senha')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Senha Atual *</Label>
        <Input
          id="currentPassword"
          type="password"
          {...register('currentPassword')}
          placeholder="Digite sua senha atual"
          className={errors.currentPassword ? "border-red-500" : ""}
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="newPassword">Nova Senha *</Label>
        <Input
          id="newPassword"
          type="password"
          {...register('newPassword')}
          placeholder="Digite sua nova senha"
          className={errors.newPassword ? "border-red-500" : ""}
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500">{errors.newPassword.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          A senha deve conter pelo menos 6 caracteres, incluindo uma letra minúscula, uma maiúscula e um número.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Nova Senha *</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          placeholder="Confirme sua nova senha"
          className={errors.confirmPassword ? "border-red-500" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Alterando...' : 'Alterar Senha'}
      </Button>
    </form>
  )
} 