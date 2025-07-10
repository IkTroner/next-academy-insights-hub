
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
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard de Parceria</h1>
          <p className="text-gray-400">Sistema de Gestão de Campanhas</p>
        </div>
        
        <Card className="bg-gray-900 border-2 border-orange-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10">
          <CardHeader className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-b border-orange-500/30">
            <h2 className="text-2xl font-bold text-center text-white">🔐 Acesso ao Sistema</h2>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="username" className="text-white font-semibold text-lg">👤 Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black border-2 border-orange-500/50 text-white placeholder-gray-400 rounded-2xl h-14 text-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all duration-300"
                  placeholder="Digite seu usuário ou 'admin'"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="password" className="text-white font-semibold text-lg">🔑 Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black border-2 border-orange-500/50 text-white placeholder-gray-400 rounded-2xl h-14 text-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all duration-300"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-black rounded-2xl h-14 text-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30"
              >
                {isLoading ? "🔄 Entrando..." : "🚀 Entrar no Sistema"}
              </Button>
            </form>
            
            <div className="mt-8 text-center p-4 bg-orange-500/10 rounded-2xl border border-orange-500/30">
              <p className="text-orange-400 text-sm font-medium">
                💡 Use "admin" como usuário para acesso administrativo
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
