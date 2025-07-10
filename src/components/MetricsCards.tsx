
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

export const MetricsCards = ({ metrics }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const cards = [
    {
      title: "Total de Leads Gerados",
      value: metrics.totalLeads,
      subtitle: "(Leads qualificados com nome e WhatsApp)",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-gray-900"
    },
    {
      title: "Total de Vendas/Inscrições",
      value: metrics.totalSales,
      subtitle: "(Matrículas, seletivas, etc.)",
      icon: Target,
      color: "text-green-400",
      bg: "bg-gray-900"
    },
    {
      title: "Comissão - Ganhos por Leads",
      value: formatCurrency(metrics.leadsCommission),
      subtitle: `R$ 0,50 por lead qualificado`,
      icon: TrendingUp,
      color: "text-purple-400",
      bg: "bg-gray-900"
    },
    {
      title: "Comissão - Ganhos por Vendas",
      value: formatCurrency(metrics.salesCommission),
      subtitle: `R$ 75,00 por conversão`,
      icon: DollarSign,
      color: "text-yellow-400",
      bg: "bg-gray-900"
    }
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <Card key={index} className="border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
            <CardContent className={`p-6 ${card.bg} rounded-2xl relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <card.icon className={`h-8 w-8 ${card.color}`} />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{card.value}</div>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white mb-2">{card.title}</h3>
                <p className="text-xs text-gray-400">{card.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total Earnings - Enhanced Card */}
      <Card className="border border-gray-800 shadow-2xl overflow-hidden rounded-2xl">
        <CardContent className="p-8 bg-gray-900 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-4">
              <DollarSign className="h-12 w-12 text-orange-500 mr-3" />
              <h3 className="text-2xl font-bold text-white">Ganhos Totais</h3>
            </div>
            <p className="text-5xl font-bold text-orange-500 mb-2">
              {formatCurrency(metrics.totalEarnings)}
            </p>
            <p className="text-lg text-gray-400">
              Soma das comissões de leads e vendas no período selecionado
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
