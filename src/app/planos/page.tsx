import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    title: "Básico",
    price: "R$ 7,00",
    description: "Perfeito para uma necessidade pontual.",
    features: ["1 consulta completa"],
    isPopular: false,
    buttonText: "Começar agora",
  },
  {
    title: "Pro",
    price: "R$ 40,00",
    description: "Ideal para usuários frequentes.",
    features: [
      "Até 20 consultas por mês",
      "Histórico de consultas",
      "Suporte prioritário",
    ],
    isPopular: true,
    buttonText: "Assinar agora",
  },
  {
    title: "Business",
    price: "R$ 300,00",
    description: "Para uso intensivo e equipes.",
    features: [
      "Até 100 consultas por mês",
      "Acesso via API",
      "Gerenciamento de equipe",
    ],
    isPopular: false,
    buttonText: "Contatar vendas",
  },
];

export default function PlanosPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Escolha o plano ideal para você
        </h1>
        <p className="text-muted-foreground text-lg">
          Comece a consultar agora mesmo com o plano que melhor se adapta às
          suas necessidades.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan) => (
          <Card
            key={plan.title}
            className={`relative flex flex-col ${plan.isPopular ? "border-primary border-2" : ""}`}
          >
            {plan.isPopular && (
              <Badge className="absolute -top-3 self-center">
                Mais Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.title !== 'Básico' && <span className="text-muted-foreground">/mês</span>}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.isPopular ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link href="/login" className="underline text-primary">
            Faça login aqui.
          </Link>
        </p>
      </div>
    </div>
  );
} 