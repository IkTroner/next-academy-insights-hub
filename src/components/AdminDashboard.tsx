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
      <header className="border-b-2 border-orange-500/30 bg-black sticky top-0 z-50 shadow-xl shadow-orange-500/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              {/* Logos Section */}
              <div className="flex items-center space-x-6">
                <img 
                  src="/lovable-uploads/b3f362ba-5714-4c51-a4b3-8fe3950075cc.png" 
                  alt="Next Academy" 
                  className="h-10 w-auto"
                />
                <div className="h-8 w-px bg-orange-500"></div>
                <img 
                  src="/lovable-uploads/dd96d960-2986-43fd-b32c-a1e59264223f.png" 
                  alt="Adidas" 
                  className="h-8 w-auto"
                />
              </div>
              <div className="h-8 w-px bg-orange-500"></div>
              <div className="bg-orange-500/20 px-6 py-3 rounded-2xl border border-orange-500/50">
                <h1 className="text-2xl font-bold text-orange-300">🎯 Painel Administrativo</h1>
              </div>
            </div>
            <Button 
              onClick={onLogout}
              variant="ghost" 
              className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 rounded-2xl px-6 py-3 font-semibold border border-orange-500/30 transition-all duration-300"
            >
              <LogOut className="h-5 w-5 mr-2" />
              🚪 Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-500/50 rounded-3xl shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-semibold">👥 Total Influencers</p>
                  <p className="text-3xl font-black text-white">{influencers.length}</p>
                </div>
                <Users className="h-12 w-12 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500/50 rounded-3xl shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-semibold">🎯 Leads Totais</p>
                  <p className="text-3xl font-black text-white">
                    {influencers.reduce((acc, inf) => acc + inf.totalLeads, 0)}
                  </p>
                </div>
                <Target className="h-12 w-12 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-2 border-purple-500/50 rounded-3xl shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-semibold">💰 Vendas Totais</p>
                  <p className="text-3xl font-black text-white">
                    {influencers.reduce((acc, inf) => acc + inf.totalSales, 0)}
                  </p>
                </div>
                <TrendingUp className="h-12 w-12 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-2 border-orange-500/50 rounded-3xl shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-semibold">🚀 Ganhos Totais</p>
                  <p className="text-2xl font-black text-orange-400">
                    {formatCurrency(influencers.reduce((acc, inf) => acc + inf.totalEarnings, 0))}
                  </p>
                </div>
                <DollarSign className="h-12 w-12 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 h-6 w-6" />
            <Input
              placeholder="🔍 Buscar por nome, usuário ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-gray-900 border-2 border-orange-500/50 text-white rounded-2xl h-14 text-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-black rounded-2xl px-8 h-14 text-lg shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" />
            ➕ Novo Influencer
          </Button>
        </div>

        {/* Influencers List */}
        <Card className="bg-gray-900 border-2 border-orange-500/30 rounded-3xl shadow-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-b-2 border-orange-500/30">
            <h2 className="text-2xl font-bold text-white flex items-center">
              👥 Lista de Influencers
            </h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-orange-500/30 bg-black/50">
                    <th className="text-left p-6 text-orange-300 font-bold text-lg">Nome</th>
                    <th className="text-left p-6 text-orange-300 font-bold text-lg">Usuário</th>
                    <th className="text-left p-6 text-orange-300 font-bold text-lg">Email</th>
                    <th className="text-left p-6 text-orange-300 font-bold text-lg">Status</th>
                    <th className="text-left p-6 text-orange-300 font-bold text-lg">Leads</th>
                    <th className="text-left p-6 text-orange-300 font-bold text-lg">Vendas</th>
                    <th className="text-left p-6 text-orange-300 font-bold text-lg">Ganhos</th>
                    <th className="text-left p-6 text-orange-300 font-bold text-lg">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInfluencers.map((influencer, index) => (
                    <tr key={influencer.id} className={`border-b border-orange-500/20 hover:bg-orange-500/10 transition-all duration-300 ${index % 2 === 0 ? 'bg-black/30' : 'bg-gray-900/30'}`}>
                      <td className="p-6 text-white font-bold text-lg">{influencer.name}</td>
                      <td className="p-6 text-orange-300 font-medium">{influencer.username}</td>
                      <td className="p-6 text-gray-300">{influencer.email}</td>
                      <td className="p-6">
                        <span className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                          influencer.status === 'active' 
                            ? 'bg-green-500/30 text-green-300 border border-green-500/50' 
                            : 'bg-red-500/30 text-red-300 border border-red-500/50'
                        }`}>
                          {influencer.status === 'active' ? '✅ Ativo' : '❌ Inativo'}
                        </span>
                      </td>
                      <td className="p-6 text-blue-400 font-bold text-lg">{influencer.totalLeads}</td>
                      <td className="p-6 text-green-400 font-bold text-lg">{influencer.totalSales}</td>
                      <td className="p-6 text-orange-400 font-bold text-lg">{formatCurrency(influencer.totalEarnings)}</td>
                      <td className="p-6">
                        <div className="flex gap-3">
                          <Button
                            onClick={() => onSelectInfluencer(influencer)}
                            size="sm"
                            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/50 rounded-xl"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setEditingInfluencer(influencer);
                              setShowForm(true);
                            }}
                            size="sm"
                            className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/50 rounded-xl"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteInfluencer(influencer.id)}
                            size="sm"
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 rounded-xl"
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
