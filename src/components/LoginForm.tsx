
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call - replace with real authentication
    setTimeout(() => {
      if (username && password) {
        // Check if is admin login
        if (username.toLowerCase() === 'admin' || username.toLowerCase() === 'administrador') {
          const adminData = {
            id: "admin_001",
            name: "Administrador",
            username: username,
            email: "admin@nextacademy.com.br",
            role: "admin"
          };
          onLogin(adminData);
        } else {
          // Regular influencer login
          const userData = {
            id: "influencer_001",
            name: "Ana Silva",
            username: username,
            campaignLink: `https://nextacademy.com.br/parceria/${username.toLowerCase()}`,
            email: "ana@email.com",
            role: "influencer"
          };
          onLogin(userData);
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logos Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-8 mb-6">
            <img 
              src="/lovable-uploads/b3f362ba-5714-4c51-a4b3-8fe3950075cc.png" 
              alt="Next Academy" 
              className="h-12 w-auto"
            />
            <div className="h-12 w-px bg-orange-500"></div>
            <img 
              src="/lovable-uploads/dd96d960-2986-43fd-b32c-a1e59264223f.png" 
              alt="Adidas" 
              className="h-10 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Painel de Controle</h1>
          <p className="text-gray-400">Sistema de Gestão de Campanhas</p>
        </div>
        
        <Card className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-center text-white">Acesso ao Sistema</h2>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white font-medium">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black border border-gray-600 text-white placeholder-gray-400 rounded-md h-10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black border border-gray-600 text-white placeholder-gray-400 rounded-md h-10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-md h-10 mt-6 transition-colors"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            
            <div className="mt-6 text-center p-3 bg-orange-500/10 rounded-md border border-orange-500/20">
              <p className="text-orange-400 text-sm">
                Use "admin" como usuário para acesso administrativo
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
