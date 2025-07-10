
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";

export const InfluencerForm = ({ influencer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: influencer?.name || "",
    username: influencer?.username || "",
    email: influencer?.email || "",
    status: influencer?.status || "active"
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(formData);
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-6">
            <Button
              onClick={onCancel}
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="h-6 w-px bg-gray-700"></div>
            <img 
              src="/lovable-uploads/b3f362ba-5714-4c51-a4b3-8fe3950075cc.png" 
              alt="Next Academy" 
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-bold text-white">
              {influencer ? 'Editar Influencer' : 'Novo Influencer'}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900 border-gray-800 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-center text-white">
                {influencer ? 'Editar Dados do Influencer' : 'Cadastrar Novo Influencer'}
              </h2>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">Nome Completo</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="bg-black border-gray-700 text-white placeholder-gray-500 rounded-xl h-12 focus:border-orange-500 focus:ring-orange-500/20"
                      placeholder="Ex: Ana Silva"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white font-medium">Nome de Usuário</Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleChange('username', e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                      className="bg-black border-gray-700 text-white placeholder-gray-500 rounded-xl h-12 focus:border-orange-500 focus:ring-orange-500/20"
                      placeholder="Ex: anasilva"
                      required
                    />
                    <p className="text-gray-500 text-xs">
                      Será usado no link: nextacademy.com.br/parceria/{formData.username || 'usuario'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-black border-gray-700 text-white placeholder-gray-500 rounded-xl h-12 focus:border-orange-500 focus:ring-orange-500/20"
                    placeholder="Ex: ana@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-white font-medium">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full bg-black border border-gray-700 text-white rounded-xl h-12 px-3 focus:border-orange-500 focus:ring-orange-500/20"
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>

                {formData.username && (
                  <div className="bg-black border border-gray-800 rounded-xl p-4">
                    <Label className="text-white font-medium">Link de Campanha Gerado:</Label>
                    <p className="text-orange-400 font-mono text-sm mt-1 break-all">
                      https://nextacademy.com.br/parceria/{formData.username}
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={onCancel}
                    variant="ghost"
                    className="flex-1 border border-gray-700 hover:bg-gray-800 text-white rounded-xl h-12"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-xl h-12"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
