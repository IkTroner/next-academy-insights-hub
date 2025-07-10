
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogOut, Plus, Edit, Trash2, Eye, Search, Users, TrendingUp, DollarSign, Target } from "lucide-react";
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
      <header className="border-b border-gray-700 bg-black sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              {/* Logos Section */}
              <div className="flex items-center space-x-4">
                <img 
                  src="/lovable-uploads/b3f362ba-5714-4c51-a4b3-8fe3950075cc.png" 
                  alt="Next Academy" 
                  className="h-8 w-auto"
                />
                <div className="h-6 w-px bg-gray-600"></div>
                <img 
                  src="/lovable-uploads/dd96d960-2986-43fd-b32c-a1e59264223f.png" 
                  alt="Adidas" 
                  className="h-6 w-auto"
                />
              </div>
              <div className="h-6 w-px bg-gray-600"></div>
              <div className="bg-orange-500/10 px-4 py-2 rounded-md border border-orange-500/30">
                <h1 className="text-lg font-semibold text-orange-300">Painel Administrativo</h1>
              </div>
            </div>
            <Button 
              onClick={onLogout}
              variant="ghost" 
              className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 rounded-md px-4 py-2 font-medium border border-gray-600 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Total Influencers</p>
                  <p className="text-2xl font-bold text-white">{influencers.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Leads Totais</p>
                  <p className="text-2xl font-bold text-white">
                    {influencers.reduce((acc, inf) => acc + inf.totalLeads, 0)}
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Vendas Totais</p>
                  <p className="text-2xl font-bold text-white">
                    {influencers.reduce((acc, inf) => acc + inf.totalSales, 0)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/50 rounded-lg shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Ganhos Totais</p>
                  <p className="text-lg font-bold text-orange-400">
                    {formatCurrency(influencers.reduce((acc, inf) => acc + inf.totalEarnings, 0))}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-400" />
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
              className="pl-9 bg-gray-900 border border-gray-600 text-white rounded-md h-10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-md px-6 h-10 shadow-md transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Influencer
          </Button>
        </div>

        {/* Influencers List */}
        <Card className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white flex items-center">
              Lista de Influencers
            </h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-black/50">
                    <th className="text-left p-4 text-gray-300 font-medium text-sm">Nome</th>
                    <th className="text-left p-4 text-gray-300 font-medium text-sm">Usuário</th>
                    <th className="text-left p-4 text-gray-300 font-medium text-sm">Email</th>
                    <th className="text-left p-4 text-gray-300 font-medium text-sm">Status</th>
                    <th className="text-left p-4 text-gray-300 font-medium text-sm">Leads</th>
                    <th className="text-left p-4 text-gray-300 font-medium text-sm">Vendas</th>
                    <th className="text-left p-4 text-gray-300 font-medium text-sm">Ganhos</th>
                    <th className="text-left p-4 text-gray-300 font-medium text-sm">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInfluencers.map((influencer, index) => (
                    <tr key={influencer.id} className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${index % 2 === 0 ? 'bg-black/30' : 'bg-gray-900/30'}`}>
                      <td className="p-4 text-white font-medium">{influencer.name}</td>
                      <td className="p-4 text-orange-300">{influencer.username}</td>
                      <td className="p-4 text-gray-300">{influencer.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          influencer.status === 'active' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/50'
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
                            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 rounded-md"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() => {
                              setEditingInfluencer(influencer);
                              setShowForm(true);
                            }}
                            size="sm"
                            className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/50 rounded-md"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteInfluencer(influencer.id)}
                            size="sm"
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 rounded-md"
                          >
                            <Trash2 className="h-3 w-3" />
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
