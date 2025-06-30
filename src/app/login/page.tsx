"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Binoculars } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.ok) {
      router.push("/")
    } else {
      // Tratar erro de login aqui
      console.error("Failed to login")
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Digite seu e-mail abaixo para fazer login em sua conta.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
              Entrar
            </Button>
            <Button variant="outline" className="w-full" onClick={() => signIn("google", { callbackUrl: "/" })}>
              Login com Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Não possui uma conta?{" "}
            <Link href="/planos" className="underline">
              Conheça nossos planos
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <div className="text-center">
            <Binoculars className="h-24 w-24 mx-auto text-primary" />
            <h2 className="mt-6 text-4xl font-bold text-primary">Consulta App</h2>
            <p className="mt-4 text-xl text-muted-foreground">
                Aqui você procura, aqui você acha.
            </p>
        </div>
      </div>
    </div>
  )
} 