
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export const DateFilter = ({ dateRange, setDateRange, customDateRange, setCustomDateRange }) => {
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const dateOptions = [
    { value: "7days", label: "Últimos 7 dias" },
    { value: "30days", label: "Últimos 30 dias" },
    { value: "thisMonth", label: "Este Mês" },
    { value: "lastMonth", label: "Mês Passado" },
    { value: "custom", label: "Período Personalizado" }
  ];

  const handleCustomDateApply = () => {
    if (customDateRange.from && customDateRange.to) {
      setDateRange("custom");
      setIsCustomOpen(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4 text-white">Filtro de Período</h3>
      
      <div className="flex flex-wrap gap-3 mb-4">
        {dateOptions.slice(0, 4).map((option) => (
          <Button
            key={option.value}
            onClick={() => setDateRange(option.value)}
            variant={dateRange === option.value ? "default" : "outline"}
            className={dateRange === option.value 
              ? "bg-orange-500 hover:bg-orange-600 text-black border-orange-500" 
              : "border-gray-700 text-gray-300 hover:bg-gray-800"
            }
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Custom Date Range */}
      <div className="border-t border-gray-800 pt-4">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Período Personalizado</h4>
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">De:</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-gray-700 bg-gray-800",
                    !customDateRange.from && "text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customDateRange.from ? (
                    format(customDateRange.from, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione a data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                <Calendar
                  mode="single"
                  selected={customDateRange.from}
                  onSelect={(date) => setCustomDateRange({ ...customDateRange, from: date })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Até:</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-gray-700 bg-gray-800",
                    !customDateRange.to && "text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customDateRange.to ? (
                    format(customDateRange.to, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione a data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                <Calendar
                  mode="single"
                  selected={customDateRange.to}
                  onSelect={(date) => setCustomDateRange({ ...customDateRange, to: date })}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            onClick={handleCustomDateApply}
            disabled={!customDateRange.from || !customDateRange.to}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
          >
            Aplicar Filtro
          </Button>
        </div>
      </div>
    </div>
  );
};
