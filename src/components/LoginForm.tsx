
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Next Academy</h1>
          <p className="text-gray-400">Dashboard do Sistema</p>
        </div>
        
        <Card className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10">
            <h2 className="text-2xl font-bold text-center text-white">Entrar</h2>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white font-medium">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black border-gray-700 text-white placeholder-gray-500 rounded-xl h-12 focus:border-orange-500 focus:ring-orange-500/20"
                  placeholder="Digite seu usuário ou 'admin'"
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
                  className="bg-black border-gray-700 text-white placeholder-gray-500 rounded-xl h-12 focus:border-orange-500 focus:ring-orange-500/20"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-xl h-12 text-lg transition-all duration-200 hover:scale-105"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Use "admin" como usuário para acesso administrativo
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
