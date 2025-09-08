import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Smartphone, 
  Monitor, 
  Wifi, 
  CreditCard,
  Clock,
  Lock,
  Eye,
  CheckCircle,
  ExternalLink,
  AlertTriangle
} from "lucide-react";

export const ShieldsGuide = () => {
  const [activeShields, setActiveShields] = useState<string[]>([]);

  const toggleShield = (shieldId: string) => {
    setActiveShields(prev => 
      prev.includes(shieldId) 
        ? prev.filter(id => id !== shieldId)
        : [...prev, shieldId]
    );
  };

  const blockingGuides = {
    mobile: [
      {
        id: 'screen-time',
        title: 'Tempo de Tela (iOS/Android)',
        difficulty: 'Fácil',
        steps: [
          'Abra Configurações > Tempo de Tela (iOS) ou Bem-estar digital (Android)',
          'Configure limites para apps específicos',
          'Ative "Bloquear no limite do tempo"',
          'Configure um código diferente do seu PIN'
        ]
      },
      {
        id: 'app-restrictions',
        title: 'Restrições de Apps',
        difficulty: 'Médio',
        steps: [
          'Instale um app bloqueador (Cold Turkey, Freedom)',
          'Configure lista de apps/sites para bloquear',
          'Defina horários de bloqueio (ex: 22h-8h)',
          'Peça para seu buddy definir a senha'
        ]
      }
    ],
    web: [
      {
        id: 'dns-blocking',
        title: 'Bloqueio por DNS',
        difficulty: 'Médio',
        steps: [
          'Configure DNS seguro (1.1.1.3 da Cloudflare)',
          'No roteador: altere DNS para 1.1.1.3 e 1.0.0.3',
          'No celular: Configurações > Wi-Fi > DNS',
          'Bloqueia automaticamente sites adultos'
        ]
      },
      {
        id: 'browser-extensions',
        title: 'Extensões do Navegador',
        difficulty: 'Fácil',
        steps: [
          'Instale BlockSite ou uBlock Origin',
          'Configure lista de sites bloqueados',
          'Ative modo estrito/adult filter',
          'Configure senha com seu buddy'
        ]
      }
    ],
    financial: [
      {
        id: 'bank-blocks',
        title: 'Bloqueios Bancários',
        difficulty: 'Fácil',
        steps: [
          'Ligue para seu banco ou acesse o app',
          'Solicite bloqueio de apostas/jogos online',
          'Configure limite de PIX diário baixo',
          'Peça relatórios mensais de gastos'
        ]
      },
      {
        id: 'payment-blocks',
        title: 'Cartões e Pagamentos',
        difficulty: 'Médio',
        steps: [
          'Remova cartões salvos dos apps de apostas',
          'Configure notificações para todas as transações',
          'Use apenas dinheiro para gastos essenciais',
          'Peça para alguém guardar seus cartões'
        ]
      }
    ]
  };

  const urgentContacts = [
    { name: 'CVV - Centro de Valorização da Vida', phone: '188', description: '24h gratuito' },
    { name: 'Jogadores Anônimos', phone: '(11) 3229-7684', description: 'Apoio especializado' },
    { name: 'CAPS-AD mais próximo', phone: '136', description: 'Saúde Mental - SUS' }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto gradient-calm rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Escudos Digitais</CardTitle>
            <p className="text-muted-foreground">
              Configurações de bloqueio e proteção para sua jornada
            </p>
          </CardHeader>
        </Card>

        {/* Status dos Escudos */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Status dos Seus Escudos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  activeShields.length > 0 ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <span className="text-sm">
                  {activeShields.length > 0 ? 'Protegido' : 'Sem proteção'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">
                  {activeShields.length}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  escudos ativos
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guias de Bloqueio */}
        <Tabs defaultValue="mobile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Celular
            </TabsTrigger>
            <TabsTrigger value="web" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Internet
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Financeiro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mobile" className="space-y-4">
            {blockingGuides.mobile.map((guide) => (
              <Card key={guide.id} className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        guide.difficulty === 'Fácil' ? 'secondary' :
                        guide.difficulty === 'Médio' ? 'outline' : 'destructive'
                      }>
                        {guide.difficulty}
                      </Badge>
                      <Button
                        variant={activeShields.includes(guide.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleShield(guide.id)}
                      >
                        {activeShields.includes(guide.id) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm">
                    {guide.steps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="font-medium text-primary">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="web" className="space-y-4">
            {blockingGuides.web.map((guide) => (
              <Card key={guide.id} className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        guide.difficulty === 'Fácil' ? 'secondary' :
                        guide.difficulty === 'Médio' ? 'outline' : 'destructive'
                      }>
                        {guide.difficulty}
                      </Badge>
                      <Button
                        variant={activeShields.includes(guide.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleShield(guide.id)}
                      >
                        {activeShields.includes(guide.id) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm">
                    {guide.steps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="font-medium text-primary">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            {blockingGuides.financial.map((guide) => (
              <Card key={guide.id} className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        guide.difficulty === 'Fácil' ? 'secondary' :
                        guide.difficulty === 'Médio' ? 'outline' : 'destructive'
                      }>
                        {guide.difficulty}
                      </Badge>
                      <Button
                        variant={activeShields.includes(guide.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleShield(guide.id)}
                      >
                        {activeShields.includes(guide.id) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm">
                    {guide.steps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="font-medium text-primary">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Contatos de Emergência */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Contatos de Emergência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgentContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg">{contact.phone}</span>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Dicas Importantes */}
        <Card className="shadow-card border-destructive/50">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-medium">Dicas Importantes:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Sempre configure senhas diferentes com seu buddy ou pessoa de confiança</li>
                  <li>• Comece com bloqueios simples e vá aumentando gradualmente</li>
                  <li>• Lembre-se: o objetivo é criar fricção, não impossibilitar totalmente</li>
                  <li>• Se você conseguiu contornar um bloqueio, não se culpe - ajuste as configurações</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};