
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TrendingUp, Users, DollarSign, Calendar } from "lucide-react";

export const DetailedTable = ({ dateRange, customDateRange }) => {
  const [tableData, setTableData] = useState([]);

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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status, type) => {
    if (type === "Lead") {
      return status === "Qualificado" ? (
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-medium">
          ✓ {status}
        </Badge>
      ) : (
        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 font-medium">
          ⏳ {status}
        </Badge>
      );
    } else {
      return status === "Concluída" ? (
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 font-medium">
          💰 {status}
        </Badge>
      ) : (
        <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50 font-medium">
          {status}
        </Badge>
      );
    }
  };

  const getTypeBadge = (type) => {
    return type === "Lead" ? (
      <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10 font-medium">
        <Users className="h-3 w-3 mr-1" />
        Lead
      </Badge>
    ) : (
      <Badge variant="outline" className="border-orange-500/50 text-orange-400 bg-orange-500/10 font-medium">
        <TrendingUp className="h-3 w-3 mr-1" />
        Venda
      </Badge>
    );
  };

  const totalCommission = tableData
    .filter(row => row.status === "Qualificado" || row.status === "Concluída")
    .reduce((sum, row) => sum + row.commission, 0);

  return (
    <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm shadow-2xl">
      <CardHeader className="border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-orange-400" />
              Detalhamento de Resultados
            </CardTitle>
            <p className="text-gray-400 text-sm mt-2">
              Histórico completo de leads e vendas no período selecionado
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total de Comissões</p>
            <p className="text-2xl font-bold text-orange-400">
              {formatCurrency(totalCommission)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {tableData.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700/50 hover:bg-gray-800/30">
                  <TableHead className="text-gray-300 font-semibold px-6 py-4">Data</TableHead>
                  <TableHead className="text-gray-300 font-semibold px-6 py-4">Tipo</TableHead>
                  <TableHead className="text-gray-300 font-semibold px-6 py-4">Status</TableHead>
                  <TableHead className="text-gray-300 font-semibold px-6 py-4">Origem</TableHead>
                  <TableHead className="text-gray-300 font-semibold px-6 py-4 text-right">Comissão</TableHead>
                  <TableHead className="text-gray-300 font-semibold px-6 py-4">Detalhes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    className={`border-gray-700/30 hover:bg-gradient-to-r hover:from-gray-800/20 hover:to-gray-700/20 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-gray-900/20' : 'bg-gray-800/20'
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
                      <span className={`font-mono font-bold ${row.commission > 0 ? 'text-green-400' : 'text-gray-500'}`}>
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
          <div className="text-center py-16 text-gray-400">
            <div className="mb-4 opacity-50">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-lg mb-2">Nenhum resultado encontrado</p>
            <p className="text-sm">Dados não encontrados para o período selecionado.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
