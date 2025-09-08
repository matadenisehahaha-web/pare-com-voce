import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Pause, 
  Heart, 
  Calendar, 
  Shield,
  Target,
  Flame,
  Users,
  BookOpen
} from "lucide-react";
import { PausaButton } from "./PausaButton";
import { CleanDaysCounter } from "./CleanDaysCounter";

export const Dashboard = () => {
  const [showPausa, setShowPausa] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header com contador de dias limpos */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">P.A.R.E.</h1>
        <p className="text-muted-foreground">Sua jornada de recuperação</p>
        <CleanDaysCounter days={7} />
      </div>

      {/* Botão de emergência Pausa */}
      <PausaButton onClick={() => setShowPausa(true)} />

      {/* Os 4 Pilares */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Pausa - Ferramentas de Crise */}
        <Card className="shadow-card transition-smooth hover:shadow-soft cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-destructive/10">
                <Pause className="h-6 w-6 text-destructive" />
              </div>
              <span>Pausa</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Ferramentas rápidas para momentos de crise
            </p>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/respiracao')}
              >
                <Target className="h-4 w-4 mr-2" />
                Respiração Guiada
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Exercícios de Grounding
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rotina - Dia a Dia */}
        <Card className="shadow-card transition-smooth hover:shadow-soft cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <span>Rotina</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Check-ins diários e acompanhamento de progresso
            </p>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/checkin')}
              >
                <Flame className="h-4 w-4 mr-2" />
                Check-in de Hoje
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Diário de Humor
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Apoio - Suporte Humano */}
        <Card className="shadow-card transition-smooth hover:shadow-soft cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/10">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <span>Apoio</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Conexão humana e suporte da comunidade
            </p>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/apoio')}
              >
                <Users className="h-4 w-4 mr-2" />
                Conversar com Buddy
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Círculo de Confiança
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Escudos - Proteções */}
        <Card className="shadow-card transition-smooth hover:shadow-soft cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <span>Escudos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Bloqueios e barreiras digitais
            </p>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/escudos')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Configurar Bloqueios
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Navegação Segura
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo do Dia */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Resumo de Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground">Crises evitadas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">1</p>
              <p className="text-xs text-muted-foreground">Check-ins</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">3</p>
              <p className="text-xs text-muted-foreground">Apoios recebidos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};