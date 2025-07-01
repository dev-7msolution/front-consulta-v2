import { z } from "zod"

// Schema para dados pessoais e da empresa
export const perfilSchema = z.object({
  // Dados pessoais
  name: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  
  email: z.string()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  
  phone: z.string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone deve estar no formato (11) 99999-9999")
    .optional()
    .or(z.literal("")),
  
  // Dados da empresa
  companyName: z.string()
    .max(100, "Nome da empresa deve ter no máximo 100 caracteres")
    .optional()
    .or(z.literal("")),
  
  cnpj: z.string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ deve estar no formato 00.000.000/0000-00")
    .optional()
    .or(z.literal("")),
  
  // Endereço
  address: z.string()
    .max(200, "Endereço deve ter no máximo 200 caracteres")
    .optional()
    .or(z.literal("")),
  
  city: z.string()
    .max(100, "Cidade deve ter no máximo 100 caracteres")
    .optional()
    .or(z.literal("")),
  
  state: z.string()
    .length(2, "Estado deve ter 2 caracteres")
    .regex(/^[A-Z]{2}$/, "Estado deve ter 2 letras maiúsculas")
    .optional()
    .or(z.literal("")),
  
  cep: z.string()
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 00000-000")
    .optional()
    .or(z.literal(""))
})

// Schema para troca de senha
export const trocarSenhaSchema = z.object({
  currentPassword: z.string()
    .min(1, "Senha atual é obrigatória"),
  
  newPassword: z.string()
    .min(6, "Nova senha deve ter pelo menos 6 caracteres")
    .max(100, "Nova senha deve ter no máximo 100 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Nova senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número"),
  
  confirmPassword: z.string()
    .min(1, "Confirmação de senha é obrigatória")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
})

// Tipos TypeScript derivados dos schemas
export type PerfilFormData = z.infer<typeof perfilSchema>
export type TrocarSenhaFormData = z.infer<typeof trocarSenhaSchema>

// Funções de formatação para inputs
export const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

export const formatCNPJ = (value: string) => {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
  if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
  if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
}

export const formatCEP = (value: string) => {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 5) return numbers
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
} 