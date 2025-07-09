
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
        date: new Date(2024, 0, 15),
        type: "Lead",
        status: "Qualificado",
        commission: 0.50,
        details: "Formulário preenchido com WhatsApp"
      },
      {
        id: 2,
        date: new Date(2024, 0, 16),
        type: "Venda",
        status: "Concluída",
        commission: 75.00,
        details: "Matrícula no curso Premium"
      },
      {
        id: 3,
        date: new Date(2024, 0, 17),
        type: "Lead",
        status: "Qualificado",
        commission: 0.50,
        details: "Interesse em seletiva"
      },
      {
        id: 4,
        date: new Date(2024, 0, 18),
        type: "Venda",
        status: "Concluída",
        commission: 150.00,
        details: "Curso Master Class"
      },
      {
        id: 5,
        date: new Date(2024, 0, 19),
        type: "Lead",
        status: "Pendente",
        commission: 0.00,
        details: "Aguardando validação"
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
        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
          {status}
        </Badge>
      ) : (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
          {status}
        </Badge>
      );
    } else {
      return status === "Concluída" ? (
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
          {status}
        </Badge>
      ) : (
        <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">
          {status}
        </Badge>
      );
    }
  };

  const getTypeBadge = (type) => {
    return type === "Lead" ? (
      <Badge variant="outline" className="border-blue-500/50 text-blue-400">
        Lead
      </Badge>
    ) : (
      <Badge variant="outline" className="border-orange-500/50 text-orange-400">
        Venda
      </Badge>
    );
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Detalhamento de Resultados</CardTitle>
        <p className="text-gray-400 text-sm">
          Histórico detalhado de leads e vendas no período selecionado
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-gray-800/50">
                <TableHead className="text-gray-300">Data</TableHead>
                <TableHead className="text-gray-300">Tipo</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Comissão</TableHead>
                <TableHead className="text-gray-300">Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id} className="border-gray-800 hover:bg-gray-800/30">
                  <TableCell className="text-gray-300">
                    {format(row.date, "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(row.type)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(row.status, row.type)}
                  </TableCell>
                  <TableCell className="text-gray-300 font-mono">
                    {formatCurrency(row.commission)}
                  </TableCell>
                  <TableCell className="text-gray-400 text-sm">
                    {row.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {tableData.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>Nenhum dado encontrado para o período selecionado.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
