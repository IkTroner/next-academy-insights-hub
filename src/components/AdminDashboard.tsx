
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogOut, Plus, Edit, Trash2, Eye, Search, Users } from "lucide-react";
import { InfluencerForm } from "@/components/InfluencerForm";

export const AdminDashboard = ({ onLogout, onSelectInfluencer }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingInfluencer, setEditingInfluencer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - replace with real data
  const [influencers, setInfluencers] = useState([
    {
      id: "inf_001",
      name: "Ana Silva",
      username: "anasilva",
      email: "ana@email.com",
      campaignLink: "https://nextacademy.com.br/parceria/anasilva",
      status: "active",
      totalLeads: 45,
      totalSales: 8,
      totalEarnings: 622.50
    },
    {
      id: "inf_002", 
      name: "João Santos",
      username: "joaosantos",
      email: "joao@email.com",
      campaignLink: "https://nextacademy.com.br/parceria/joaosantos",
      status: "active",
      totalLeads: 32,
      totalSales: 5,
      totalEarnings: 391.00
    },
    {
      id: "inf_003",
      name: "Maria Costa",
      username: "mariacosta", 
      email: "maria@email.com",
      campaignLink: "https://nextacademy.com.br/parceria/mariacosta",
      status: "inactive",
      totalLeads: 18,
      totalSales: 2,
      totalEarnings: 159.00
    }
  ]);

  const filteredInfluencers = influencers.filter(inf => 
    inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inf.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inf.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateInfluencer = (data) => {
    const newInfluencer = {
      ...data,
      id: `inf_${Date.now()}`,
      campaignLink: `https://nextacademy.com.br/parceria/${data.username.toLowerCase()}`,
      status: "active",
      totalLeads: 0,
      totalSales: 0,
      totalEarnings: 0
    };
    setInfluencers([...influencers, newInfluencer]);
    setShowForm(false);
  };

  const handleEditInfluencer = (data) => {
    setInfluencers(influencers.map(inf => 
      inf.id === editingInfluencer.id 
        ? { ...inf, ...data, campaignLink: `https://nextacademy.com.br/parceria/${data.username.toLowerCase()}` }
        : inf
    ));
    setEditingInfluencer(null);
    setShowForm(false);
  };

  const handleDeleteInfluencer = (id) => {
    if (confirm("Tem certeza que deseja excluir este influencer?")) {
      setInfluencers(influencers.filter(inf => inf.id !== id));
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (showForm) {
    return (
      <InfluencerForm
        influencer={editingInfluencer}
        onSave={editingInfluencer ? handleEditInfluencer : handleCreateInfluencer}
        onCancel={() => {
          setShowForm(false);
          setEditingInfluencer(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <img 
                src="/lovable-uploads/b3f362ba-5714-4c51-a4b3-8fe3950075cc.png" 
                alt="Next Academy" 
                className="h-8 w-auto"
              />
              <div className="h-6 w-px bg-gray-700"></div>
              <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
            </div>
            <Button 
              onClick={onLogout}
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Influencers</p>
                  <p className="text-2xl font-bold text-white">{influencers.length}</p>
                </div>
                <Users className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Leads Totais</p>
                  <p className="text-2xl font-bold text-white">
                    {influencers.reduce((acc, inf) => acc + inf.totalLeads, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Vendas Totais</p>
                  <p className="text-2xl font-bold text-white">
                    {influencers.reduce((acc, inf) => acc + inf.totalSales, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Ganhos Totais</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {formatCurrency(influencers.reduce((acc, inf) => acc + inf.totalEarnings, 0))}
                  </p>
                </div>
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome, usuário ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white rounded-xl h-12"
            />
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-xl px-6 h-12"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Influencer
          </Button>
        </div>

        {/* Influencers List */}
        <Card className="bg-gray-900 border-gray-800 rounded-2xl">
          <CardHeader>
            <h2 className="text-xl font-bold text-white">Influencers</h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-4 text-gray-400 font-medium">Nome</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Usuário</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Email</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Leads</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Vendas</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Ganhos</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInfluencers.map((influencer) => (
                    <tr key={influencer.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-4 text-white font-medium">{influencer.name}</td>
                      <td className="p-4 text-gray-300">{influencer.username}</td>
                      <td className="p-4 text-gray-300">{influencer.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          influencer.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {influencer.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="p-4 text-blue-400 font-medium">{influencer.totalLeads}</td>
                      <td className="p-4 text-green-400 font-medium">{influencer.totalSales}</td>
                      <td className="p-4 text-orange-400 font-medium">{formatCurrency(influencer.totalEarnings)}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => onSelectInfluencer(influencer)}
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setEditingInfluencer(influencer);
                              setShowForm(true);
                            }}
                            size="sm"
                            variant="ghost"
                            className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteInfluencer(influencer.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
