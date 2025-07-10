
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Copy, ArrowLeft } from "lucide-react";
import { MetricsCards } from "@/components/MetricsCards";
import { DateFilter } from "@/components/DateFilter";
import { DetailedTable } from "@/components/DetailedTable";
import { toast } from "@/hooks/use-toast";

export const Dashboard = ({ influencerData, onLogout, isAdminView = false }) => {
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
      <header className="border-b border-gray-700 bg-black sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              {isAdminView && (
                <>
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 rounded-md px-4 py-2 font-medium border border-gray-600 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao Admin
                  </Button>
                  <div className="h-6 w-px bg-gray-600"></div>
                </>
              )}
              
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
              
              {isAdminView && (
                <>
                  <div className="h-6 w-px bg-gray-600"></div>
                  <div className="bg-orange-500/10 px-4 py-2 rounded-md border border-orange-500/30">
                    <span className="text-orange-300 font-medium">Dashboard de {influencerData.name}</span>
                  </div>
                </>
              )}
            </div>
            
            {!isAdminView && (
              <Button 
                onClick={onLogout}
                variant="ghost" 
                className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 rounded-md px-4 py-2 font-medium border border-gray-600 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Campaign Link Section */}
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-lg p-6 mb-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-center text-white">
            Link Exclusivo de Campanha
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 bg-black border border-gray-600 rounded-md p-4 font-mono text-sm text-orange-300 shadow-sm">
              {influencerData.campaignLink}
            </div>
            <Button 
              onClick={copyLink}
              className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-2 rounded-md shadow-md transition-colors"
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
