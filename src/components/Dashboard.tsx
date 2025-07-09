
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Copy, Calendar } from "lucide-react";
import { MetricsCards } from "@/components/MetricsCards";
import { DateFilter } from "@/components/DateFilter";
import { DetailedTable } from "@/components/DetailedTable";
import { toast } from "@/hooks/use-toast";

export const Dashboard = ({ influencerData, onLogout }) => {
  const [dateRange, setDateRange] = useState("30days");
  const [customDateRange, setCustomDateRange] = useState({ from: null, to: null });
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    totalSales: 0,
    leadsCommission: 0,
    salesCommission: 0,
    totalEarnings: 0
  });

  // Mock data generation based on date range
  useEffect(() => {
    generateMockData();
  }, [dateRange, customDateRange]);

  const generateMockData = () => {
    // Simulating different data based on selected period
    const baseData = {
      "7days": { leads: 12, sales: 3, leadsComm: 6.00, salesComm: 225.00 },
      "30days": { leads: 45, sales: 8, leadsComm: 22.50, salesComm: 600.00 },
      "thisMonth": { leads: 38, sales: 7, leadsComm: 19.00, salesComm: 525.00 },
      "lastMonth": { leads: 52, sales: 12, leadsComm: 26.00, salesComm: 900.00 },
      "custom": { leads: 25, sales: 5, leadsComm: 12.50, salesComm: 375.00 }
    };

    const currentData = baseData[dateRange] || baseData.custom;
    
    setMetrics({
      totalLeads: currentData.leads,
      totalSales: currentData.sales,
      leadsCommission: currentData.leadsComm,
      salesCommission: currentData.salesComm,
      totalEarnings: currentData.leadsComm + currentData.salesComm
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(influencerData.campaignLink);
    toast({
      title: "Link copiado!",
      description: "Seu link exclusivo foi copiado para a área de transferência.",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Next Academy</h1>
          <Button 
            onClick={onLogout}
            variant="ghost" 
            className="text-gray-400 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Olá, {influencerData.name}! 👋</h2>
          <p className="text-gray-400">Acompanhe sua performance e ganhos</p>
        </div>

        {/* Campaign Link Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">Seu Link Exclusivo de Campanha</h3>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-3 font-mono text-sm text-gray-300">
              {influencerData.campaignLink}
            </div>
            <Button 
              onClick={copyLink}
              className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar Link
            </Button>
          </div>
        </div>

        {/* Date Filter */}
        <DateFilter 
          dateRange={dateRange} 
          setDateRange={setDateRange}
          customDateRange={customDateRange}
          setCustomDateRange={setCustomDateRange}
        />

        {/* Metrics Cards */}
        <MetricsCards metrics={metrics} />

        {/* Detailed Table */}
        <DetailedTable 
          dateRange={dateRange}
          customDateRange={customDateRange}
        />
      </div>
    </div>
  );
};
