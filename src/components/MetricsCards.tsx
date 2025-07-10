
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
      subtitle: "Leads qualificados com nome e WhatsApp",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-gray-900"
    },
    {
      title: "Total de Vendas/Inscrições",
      value: metrics.totalSales,
      subtitle: "Matrículas, seletivas, etc.",
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
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => (
          <Card key={index} className="border border-gray-700 shadow-md hover:shadow-lg transition-shadow rounded-lg">
            <CardContent className={`p-4 ${card.bg} rounded-lg`}>
              <div className="flex items-center justify-between mb-3">
                <card.icon className={`h-6 w-6 ${card.color}`} />
                <div className="text-right">
                  <div className="text-xl font-bold text-white">{card.value}</div>
                </div>
              </div>
              <h3 className="text-sm font-medium text-white mb-2">{card.title}</h3>
              <p className="text-xs text-gray-400">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total Earnings - Enhanced Card */}
      <Card className="border border-gray-700 shadow-lg overflow-hidden rounded-lg">
        <CardContent className="p-6 bg-gray-900">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <DollarSign className="h-8 w-8 text-orange-500 mr-2" />
              <h3 className="text-xl font-semibold text-white">Ganhos Totais</h3>
            </div>
            <p className="text-3xl font-bold text-orange-500 mb-2">
              {formatCurrency(metrics.totalEarnings)}
            </p>
            <p className="text-sm text-gray-400">
              Soma das comissões de leads e vendas no período selecionado
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
