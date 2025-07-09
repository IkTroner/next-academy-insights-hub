
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
      color: "text-white"
    },
    {
      title: "Total de Vendas/Inscrições",
      value: metrics.totalSales,
      subtitle: "(Matrículas, seletivas, etc.)",
      icon: Target,
      color: "text-white"
    },
    {
      title: "Comissão - Ganhos por Leads",
      value: formatCurrency(metrics.leadsCommission),
      subtitle: `R$ 0,50 por lead qualificado`,
      icon: TrendingUp,
      color: "text-white"
    },
    {
      title: "Comissão - Ganhos por Vendas",
      value: formatCurrency(metrics.salesCommission),
      subtitle: `Comissão por conversão`,
      icon: DollarSign,
      color: "text-white"
    }
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {cards.map((card, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <card.icon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">{card.title}</h3>
              <p className={`text-3xl font-bold ${card.color} mb-1`}>{card.value}</p>
              <p className="text-xs text-gray-500">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total Earnings - Highlighted Card */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 border-orange-500">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-black mb-2">Ganhos Totais (Período Selecionado)</h3>
            <p className="text-4xl font-bold text-black">
              {formatCurrency(metrics.totalEarnings)}
            </p>
            <p className="text-sm text-black/80 mt-2">
              Soma das comissões de leads e vendas
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
