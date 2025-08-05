'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Filter, X } from 'lucide-react'

interface DateRangeFilterProps {
  onDateRangeChange: (startDate: string, endDate: string) => void
  onClear: () => void
  isVisible: boolean
  onToggle: () => void
}

export function DateRangeFilter({ 
  onDateRangeChange, 
  onClear, 
  isVisible, 
  onToggle 
}: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Função para obter datas pré-definidas
  const getPresetDates = () => {
    const today = new Date()
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
    const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    return {
      today: today.toISOString().split('T')[0],
      currentMonthStart: currentMonth.toISOString().split('T')[0],
      lastMonthStart: lastMonth.toISOString().split('T')[0],
      lastMonthEnd: lastMonthEnd.toISOString().split('T')[0],
      last7Days: last7Days.toISOString().split('T')[0],
      last30Days: last30Days.toISOString().split('T')[0]
    }
  }

  const presets = getPresetDates()

  const handleApplyFilter = () => {
    if (startDate && endDate) {
      onDateRangeChange(startDate, endDate)
    }
  }

  const handlePresetClick = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)
    onDateRangeChange(start, end)
  }

  const handleClear = () => {
    setStartDate('')
    setEndDate('')
    onClear()
  }

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onToggle}
        className="flex items-center gap-2"
      >
        <Filter className="h-4 w-4" />
        Filtrar por Período
      </Button>

      {isVisible && (
        <Card className="absolute top-full mt-2 right-0 z-50 w-96 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Filtrar por Período
              </h3>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Filtros rápidos */}
            <div className="space-y-2 mb-4">
              <Label className="text-sm font-medium">Períodos Rápidos:</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePresetClick(presets.today, presets.today)}
                >
                  Hoje
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePresetClick(presets.last7Days, presets.today)}
                >
                  Últimos 7 dias
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePresetClick(presets.last30Days, presets.today)}
                >
                  Últimos 30 dias
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePresetClick(presets.currentMonthStart, presets.today)}
                >
                  Mês Atual
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePresetClick(presets.lastMonthStart, presets.lastMonthEnd)}
                >
                  Mês Passado
                </Button>
              </div>
            </div>

            {/* Filtro personalizado */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Período Personalizado:</Label>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="startDate" className="text-xs">Data Inicial</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-xs">Data Final</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  onClick={handleApplyFilter}
                  disabled={!startDate || !endDate}
                  className="flex-1"
                >
                  Aplicar Filtro
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClear}
                  className="flex-1"
                >
                  Limpar
                </Button>
              </div>
            </div>

            {/* Informação do filtro ativo */}
            {startDate && endDate && (
              <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                <span className="font-medium text-blue-800">Filtro ativo:</span>
                <br />
                <span className="text-blue-600">
                  {new Date(startDate).toLocaleDateString('pt-BR')} até {new Date(endDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
