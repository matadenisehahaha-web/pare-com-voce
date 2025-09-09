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
      <div className="text-center space-y-2 animate-scale-in">
        <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">P.A.R.E.</h1>
        <p className="text-muted-foreground">Sua jornada de recuperação</p>
        <CleanDaysCounter days={7} />
      </div>

      {/* Botão de emergência Pausa */}
      <div className="animate-float">
        <PausaButton onClick={() => setShowPausa(true)} />
      </div>

      {/* Os 4 Pilares */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pausa - Ferramentas de Crise */}
        <Card className="card-interactive shadow-card hover:shadow-lg group">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-destructive/10 group-hover:bg-destructive/15 transition-colors">
                <Pause className="h-6 w-6 text-destructive" />
              </div>
              <span className="font-semibold">Pausa</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ferramentas rápidas para momentos de crise
            </p>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start hover:bg-primary/5 hover:border-primary/30 transition-all"
                onClick={() => navigate('/respiracao')}
              >
                <Target className="h-4 w-4 mr-3 text-primary" />
                Respiração Guiada
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start hover:bg-accent/5 hover:border-accent/30 transition-all"
              >
                <BookOpen className="h-4 w-4 mr-3 text-accent" />
                Exercícios de Grounding
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rotina - Dia a Dia */}
        <Card className="card-interactive shadow-card hover:shadow-lg group">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <span className="font-semibold">Rotina</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Check-ins diários e acompanhamento de progresso
            </p>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start hover:bg-secondary/5 hover:border-secondary/30 transition-all"
                onClick={() => navigate('/checkin')}
              >
                <Flame className="h-4 w-4 mr-3 text-secondary" />
                Check-in de Hoje
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start hover:bg-primary/5 hover:border-primary/30 transition-all"
              >
                <Target className="h-4 w-4 mr-3 text-primary" />
                Diário de Humor
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Apoio - Suporte Humano */}
        <Card className="card-interactive shadow-card hover:shadow-lg group">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/15 transition-colors">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <span className="font-semibold">Apoio</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Conexão humana e suporte da comunidade
            </p>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start hover:bg-secondary/5 hover:border-secondary/30 transition-all"
                onClick={() => navigate('/apoio')}
              >
                <Users className="h-4 w-4 mr-3 text-secondary" />
                Conversar com Buddy
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start hover:bg-accent/5 hover:border-accent/30 transition-all"
              >
                <Heart className="h-4 w-4 mr-3 text-accent" />
                Círculo de Confiança
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Escudos - Proteções */}
        <Card className="card-interactive shadow-card hover:shadow-lg group">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/15 transition-colors">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <span className="font-semibold">Escudos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bloqueios e barreiras digitais
            </p>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start hover:bg-accent/5 hover:border-accent/30 transition-all"
                onClick={() => navigate('/escudos')}
              >
                <Shield className="h-4 w-4 mr-3 text-accent" />
                Configurar Bloqueios
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start hover:bg-primary/5 hover:border-primary/30 transition-all"
              >
                <Target className="h-4 w-4 mr-3 text-primary" />
                Navegação Segura
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo do Dia */}
      <Card className="shadow-card animate-scale-in border-none bg-gradient-to-r from-card via-card to-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-8 bg-gradient-primary rounded-full"></div>
            Resumo de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto gradient-primary rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">0</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Crises evitadas</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto gradient-support rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Check-ins</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto gradient-calm rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">Apoios recebidos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};