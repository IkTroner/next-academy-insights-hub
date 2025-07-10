
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TrendingUp, Users, DollarSign, Calendar, Filter } from "lucide-react";

export const DetailedTable = ({ dateRange, customDateRange }) => {
  const [tableData, setTableData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("todos"); // "todos", "leads", "vendas"

  useEffect(() => {
    generateTableData();
  }, [dateRange, customDateRange]);

  const generateTableData = () => {
    // Mock data generation - replace with real API call
    const mockData = [
      {
        id: 1,
        date: new Date(2024, 6, 15),
        type: "Lead",
        status: "Qualificado",
        commission: 0.50,
        details: "Formulário preenchido com WhatsApp",
        source: "Instagram Story"
      },
      {
        id: 2,
        date: new Date(2024, 6, 16),
        type: "Venda",
        status: "Concluída",
        commission: 75.00,
        details: "Matrícula no curso Premium",
        source: "Link do Bio"
      },
      {
        id: 3,
        date: new Date(2024, 6, 17),
        type: "Lead",
        status: "Qualificado",
        commission: 0.50,
        details: "Interesse em seletiva",
        source: "Instagram Post"
      },
      {
        id: 4,
        date: new Date(2024, 6, 18),
        type: "Venda",
        status: "Concluída",
        commission: 75.00,
        details: "Curso Master Class",
        source: "Stories"
      },
      {
        id: 5,
        date: new Date(2024, 6, 19),
        type: "Lead",
        status: "Pendente",
        commission: 0.00,
        details: "Aguardando validação",
        source: "Link Direto"
      },
      {
        id: 6,
        date: new Date(2024, 6, 20),
        type: "Venda",
        status: "Concluída",
        commission: 75.00,
        details: "Inscrição seletiva",
        source: "Instagram Story"
      }
    ];

    setTableData(mockData);
  };

  const filteredData = tableData.filter(row => {
    if (activeFilter === "leads") return row.type === "Lead";
    if (activeFilter === "vendas") return row.type === "Venda";
    return true; // "todos"
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status, type) => {
    if (type === "Lead") {
      return status === "Qualificado" ? (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/50 font-medium rounded-xl px-3 py-1">
          ✓ {status}
        </Badge>
      ) : (
        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 font-medium rounded-xl px-3 py-1">
          ⏳ {status}
        </Badge>
      );
    } else {
      return status === "Concluída" ? (
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 font-medium rounded-xl px-3 py-1">
          💰 {status}
        </Badge>
      ) : (
        <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50 font-medium rounded-xl px-3 py-1">
          {status}
        </Badge>
      );
    }
  };

  const getTypeBadge = (type) => {
    return type === "Lead" ? (
      <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 font-medium rounded-xl px-3 py-1">
        <Users className="h-3 w-3 mr-1" />
        Lead
      </Badge>
    ) : (
      <Badge variant="outline" className="border-orange-500/50 text-orange-400 bg-orange-500/10 font-medium rounded-xl px-3 py-1">
        <TrendingUp className="h-3 w-3 mr-1" />
        Venda
      </Badge>
    );
  };

  const totalCommission = filteredData
    .filter(row => row.status === "Qualificado" || row.status === "Concluída")
    .reduce((sum, row) => sum + row.commission, 0);

  return (
    <Card className="bg-black border border-gray-800 shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className="border-b border-gray-800 bg-black">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Calendar className="h-6 w-6 mr-3 text-orange-500" />
                Detalhamento de Resultados
              </CardTitle>
              <p className="text-gray-400 text-sm mt-2">
                Histórico completo de leads e vendas no período selecionado
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total de Comissões</p>
              <p className="text-2xl font-bold text-orange-500">
                {formatCurrency(totalCommission)}
              </p>
            </div>
          </div>
          
          {/* Filtros */}
          <div className="flex items-center space-x-3">
            <Filter className="h-4 w-4 text-gray-400" />
            <div className="flex space-x-2">
              <Button
                onClick={() => setActiveFilter("todos")}
                variant={activeFilter === "todos" ? "default" : "outline"}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilter === "todos"
                    ? "bg-orange-500 text-black hover:bg-orange-600"
                    : "bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Todos ({tableData.length})
              </Button>
              <Button
                onClick={() => setActiveFilter("leads")}
                variant={activeFilter === "leads" ? "default" : "outline"}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilter === "leads"
                    ? "bg-orange-500 text-black hover:bg-orange-600"
                    : "bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Users className="h-3 w-3 mr-1" />
                Leads ({tableData.filter(row => row.type === "Lead").length})
              </Button>
              <Button
                onClick={() => setActiveFilter("vendas")}
                variant={activeFilter === "vendas" ? "default" : "outline"}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeFilter === "vendas"
                    ? "bg-orange-500 text-black hover:bg-orange-600"
                    : "bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Vendas ({tableData.filter(row => row.type === "Venda").length})
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-900/30">
                  <TableHead className="text-gray-300 font-semibold px-6 py-4 text-left">Data</TableHead>
                  <TableHead className="text-gray-300 font-semibold px-6 py-4 text-left">Tipo</TableHead>
                  <TableHead className="text-gray-300 font-semibold px-6 py-4 text-left">Status</TableHead>
                  <TableHead className="text-gray-300 font-semibold px-6 py-4 text-left">Origem</TableHead>
                  <TableHead className="text-gray-300 font-semibold px-6 py-4 text-right">Comissão</TableHead>
                  <TableHead className="text-gray-300 font-semibold px-6 py-4 text-left">Detalhes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    className={`border-gray-800 hover:bg-gray-900/20 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-gray-950/30' : 'bg-black/20'
                    }`}
                  >
                    <TableCell className="text-gray-300 px-6 py-4 font-medium">
                      {format(row.date, "dd/MM/yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {getTypeBadge(row.type)}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {getStatusBadge(row.status, row.type)}
                    </TableCell>
                    <TableCell className="text-gray-400 px-6 py-4 text-sm">
                      {row.source}
                    </TableCell>
                    <TableCell className="text-right px-6 py-4">
                      <span className={`font-mono font-bold text-sm ${row.commission > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                        {formatCurrency(row.commission)}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm px-6 py-4 max-w-xs">
                      {row.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="mb-4 opacity-50">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-lg mb-2">Nenhum resultado encontrado</p>
            <p className="text-sm">
              {activeFilter === "leads" ? "Nenhum lead encontrado para o período selecionado." :
               activeFilter === "vendas" ? "Nenhuma venda encontrada para o período selecionado." :
               "Dados não encontrados para o período selecionado."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
