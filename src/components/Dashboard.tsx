import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Copy } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <img 
                  src="/lovable-uploads/b3f362ba-5714-4c51-a4b3-8fe3950075cc.png" 
                  alt="Next Academy" 
                  className="h-10 w-auto"
                />
                <div className="h-8 w-px bg-gray-600"></div>
                <img 
                  src="/lovable-uploads/dd96d960-2986-43fd-b32c-a1e59264223f.png" 
                  alt="Adidas" 
                  className="h-8 w-auto"
                />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Dashboard do Influencer
              </h1>
            </div>
            <Button 
              onClick={onLogout}
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Olá, {influencerData.name}! 👋
          </h2>
          <p className="text-xl text-gray-300">Acompanhe sua performance e ganhos em tempo real</p>
        </div>

        {/* Campaign Link Section */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-8 shadow-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            💎 Seu Link Exclusivo de Campanha
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 bg-black/30 border border-gray-600/50 rounded-xl p-4 font-mono text-sm text-gray-200 backdrop-blur-sm">
              {influencerData.campaignLink}
            </div>
            <Button 
              onClick={copyLink}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
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
