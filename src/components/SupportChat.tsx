import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Heart, Users, Shield, MessageCircle } from "lucide-react";

interface Message {
  id: number;
  sender: 'me' | 'buddy' | 'system';
  content: string;
  timestamp: Date;
}

export const SupportChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'system',
      content: 'Bem-vindo ao chat de apoio. Seu buddy será notificado que você está aqui.',
      timestamp: new Date()
    },
    {
      id: 2,
      sender: 'buddy',
      content: 'Oi! Como você está se sentindo agora?',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [buddyStatus, setBuddyStatus] = useState<'online' | 'offline' | 'away'>('online');

  const quickReplies = [
    "Preciso de apoio 🆘",
    "Estou bem agora 😌", 
    "Consegui resistir! 💪",
    "Tive uma recaída 😔",
    "Obrigado pelo apoio ❤️"
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'me',
        content: newMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simular resposta do buddy após alguns segundos
      setTimeout(() => {
        const responses = [
          "Entendo como você está se sentindo. Você não está sozinho nessa.",
          "Lembre-se: cada momento que você resiste é uma vitória.",
          "Que bom que você veio aqui. Isso já é um grande passo!",
          "Vamos respirar juntos. Inspire... e expire...",
          "Eu acredito em você. Você é mais forte que imagina."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const buddyMessage: Message = {
          id: messages.length + 2,
          sender: 'buddy',
          content: randomResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, buddyMessage]);
      }, 2000);
    }
  };

  const sendQuickReply = (reply: string) => {
    const message: Message = {
      id: messages.length + 1,
      sender: 'me',
      content: reply,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Card className="max-w-lg mx-auto shadow-card h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="gradient-support text-white">
                <Heart className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-lg">Seu Buddy</CardTitle>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  buddyStatus === 'online' ? 'bg-green-500' : 
                  buddyStatus === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
                <span className="text-sm text-muted-foreground">
                  {buddyStatus === 'online' ? 'Online' : 
                   buddyStatus === 'away' ? 'Ausente' : 'Offline'}
                </span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Privado
            </Badge>
          </div>
        </CardHeader>

        {/* Área de mensagens */}
        <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[80%] p-3 rounded-lg text-sm
                  ${message.sender === 'me' 
                    ? 'gradient-primary text-white' 
                    : message.sender === 'system'
                    ? 'bg-muted text-muted-foreground text-center text-xs'
                    : 'bg-card border'
                  }
                `}>
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Respostas rápidas */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Respostas rápidas:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => sendQuickReply(reply)}
                  className="text-xs h-8"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input de mensagem */}
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Opções de apoio adicional */}
      <div className="max-w-lg mx-auto mt-4 space-y-3">
        <Card className="p-4">
          <div className="flex items-center gap-3 text-sm">
            <Users className="h-5 w-5 text-secondary" />
            <div className="flex-1">
              <p className="font-medium">Grupos de Apoio</p>
              <p className="text-muted-foreground text-xs">Converse com outras pessoas na mesma jornada</p>
            </div>
            <Button variant="outline" size="sm">
              Ver Grupos
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 text-sm">
            <MessageCircle className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Linha de Apoio</p>
              <p className="text-muted-foreground text-xs">CVV: 188 (24h gratuito)</p>
            </div>
            <Button variant="outline" size="sm">
              Ligar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};