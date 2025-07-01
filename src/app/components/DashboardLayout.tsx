"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  LineChart,
  Menu,
  Binoculars,
  Settings,
  User,
  LogOut,
  Shield,
  Sparkles,
} from "lucide-react"
import { useSession, signOut } from "next-auth/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Consulta",
    href: "/",
    icon: Home,
    description: "Realizar consultas"
  },
  {
    name: "Relatórios",
    href: "/relatorios",
    icon: LineChart,
    description: "Histórico de consultas"
  }
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()

  const getInitials = (name?: string | null) => {
    if (!name) return "U"
    return name.split(" ").map((n) => n[0]).join("").toUpperCase()
  }

  const NavItem = ({ item, isMobile = false }: { item: typeof navigation[0], isMobile?: boolean }) => {
    const isActive = pathname === item.href
    
    return (
      <Link
        href={item.href}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
          isMobile ? "mx-[-0.65rem] gap-4 px-3 py-3" : "",
          isActive
            ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100"
            : "text-muted-foreground hover:text-foreground hover:bg-gray-50/80"
        )}
      >
        <div className={cn(
          "flex items-center justify-center rounded-lg p-1.5 transition-colors",
          isActive 
            ? "bg-blue-100 text-blue-600" 
            : "text-muted-foreground group-hover:text-foreground group-hover:bg-gray-100"
        )}>
          <item.icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="font-medium">{item.name}</div>
          <div className={cn(
            "text-xs transition-colors",
            isActive ? "text-blue-600" : "text-muted-foreground"
          )}>
            {item.description}
          </div>
        </div>
        {isActive && (
          <div className="absolute right-2 h-2 w-2 rounded-full bg-blue-500" />
        )}
      </Link>
    )
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
      {/* Sidebar Desktop */}
      <div className="hidden border-r bg-gradient-to-b from-gray-50/50 to-white md:block">
        <div className="flex flex-col">
          {/* Logo Header */}
          <div className="sticky top-0 z-10 flex h-16 items-center border-b bg-white/80 backdrop-blur-sm px-6 flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <Binoculars className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Procurou Achou</div>
                <div className="text-xs text-muted-foreground">Sistema de Consultas</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="px-4 py-6 min-h-[calc(100vh-8rem)]">
            <div className="space-y-2">
              <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Menu Principal
              </div>
              {navigation.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </div>
          </div>

          {/* User Profile Card */}
          <div className="sticky bottom-0 p-4 flex-shrink-0 border-t bg-white/90 backdrop-blur-sm">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                      <AvatarImage src={session?.user?.image ?? undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                        {getInitials(session?.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {session?.user?.name ?? "Usuário"}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {session?.user?.email}
                    </div>
                    <Badge variant="secondary" className="mt-1 text-xs bg-green-100 text-green-700">
                      <Shield className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link href="/perfil" className="block">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start bg-white hover:bg-gray-50 border-gray-200"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Meu Perfil
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Mobile Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-sm px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden border-gray-200 hover:bg-gray-50"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-80 p-0 h-full">
              {/* Mobile Logo */}
              <div className="flex h-16 items-center border-b bg-white px-6 flex-shrink-0">
                <Link href="/" className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                    <Binoculars className="h-4 w-4 text-white" />
                  </div>
                  <div className="font-bold text-gray-900">Procurou Achou</div>
                </Link>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 px-4 py-6 overflow-y-auto">
                <div className="space-y-2">
                  <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Menu Principal
                  </div>
                  {navigation.map((item) => (
                    <NavItem key={item.href} item={item} isMobile />
                  ))}
                </div>
              </div>

              {/* Mobile User Profile */}
              <div className="p-4 border-t bg-gray-50/50 flex-shrink-0">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={session?.user?.image ?? undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                          {getInitials(session?.user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {session?.user?.name ?? "Usuário"}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {session?.user?.email}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Link href="/perfil" className="block">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Meu Perfil
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                        onClick={() => signOut()}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>

          {/* Header Title */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <h1 className="text-lg font-semibold text-gray-900">
                {navigation.find(item => item.href === pathname)?.name || "Dashboard"}
              </h1>
            </div>
          </div>

          {/* Header User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-gray-200">
                  <AvatarImage src={session?.user?.image ?? undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    {getInitials(session?.user?.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/perfil" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-gradient-to-br from-gray-50/30 to-white p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 