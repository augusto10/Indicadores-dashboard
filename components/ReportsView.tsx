'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DateRangeFilter } from '@/components/DateRangeFilter'
import { 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { formatCurrencyBRL, formatPercent, safeDivide, clampPercent, formatNumber } from '@/utils/format'

interface ReportMetric {
  label: string
  realizado: number | string
  meta: number | string
  unit?: string
  period: 'MÊS' | 'DIA'
  hasDetails?: boolean
  status?: 'success' | 'warning' | 'danger'
}

interface ReportSection {
  title: string
  color: string
  bgColor: string
  metrics: ReportMetric[]
}

interface ReportsViewProps {
  indicators?: any[]
  goals?: any[]
  dateRange?: string
}

interface FilteredData {
  indicators: any[]
  goals: any[]
  statistics: any[]
  summary: {
    totalIndicators: number
    dateRange: { startDate: string | null, endDate: string | null }
    departments: string[]
    period: string
  }
}

export function ReportsView({ indicators = [], goals = [], dateRange = "7 de jul. de 2025 - 3 de ago. de 2025" }: ReportsViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(dateRange)
  const [filteredData, setFilteredData] = useState<FilteredData | null>(null)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState<{startDate: string, endDate: string} | null>(null)

  // Função para formatar valores
  const formatValue = (value: number | string, unit?: string): string => {
    if (typeof value === 'string') return value
    if (unit === 'currency') {
      return formatCurrencyBRL(value)
    }
    if (unit === 'percentage') {
      const pct = clampPercent(value, 0, 200)
      return formatPercent(pct)
    }
    return formatNumber(value)
  }

  // Função para determinar se há dados ou não
  const hasData = (value: number | string): boolean => {
    return value !== 0 && value !== '' && value !== 'Não há dados'
  }

  // Função para calcular a cor do indicador baseado nas regras de negócio
  const getIndicatorColor = (department: string, indicatorName: string, realizado: number | string, meta: number | string): string => {
    // Se não há dados, retorna cor padrão
    if (!hasData(realizado) || typeof realizado !== 'number') {
      return 'text-gray-800'
    }

    const realizadoNum = Number(realizado)
    const metaNum = Number(meta)

    switch (department) {
      case 'COMERCIAL':
        // Comercial: < 80% = vermelho, 80-99.9% = laranja, >= 100% = verde
        if (metaNum > 0) {
          const percentual = (realizadoNum / metaNum) * 100
          if (percentual < 80) return 'text-red-600'
          if (percentual < 100) return 'text-orange-600'
          return 'text-green-600'
        }
        break

      case 'LOGISTICA':
        if (indicatorName.includes('OTIF')) {
          // OTIF: > 95% = verde, <= 95% = vermelho
          return realizadoNum > 95 ? 'text-green-600' : 'text-red-600'
        }
        if (indicatorName.includes('DEVOLUÇÃO') || indicatorName.includes('Devolução')) {
          // Taxa de devolução: < 5% = verde, >= 5% = vermelho
          return realizadoNum < 5 ? 'text-green-600' : 'text-red-600'
        }
        if (indicatorName.includes('CUSTO') || indicatorName.includes('Custo')) {
          // Custo logístico: < 3.5% = verde, >= 3.5% = vermelho
          return realizadoNum < 3.5 ? 'text-green-600' : 'text-red-600'
        }
        break

      case 'COMPRAS':
        if (indicatorName.includes('RUPTURA') || indicatorName.includes('Ruptura')) {
          // Ruptura: < 5% = verde, >= 5% = vermelho
          return realizadoNum < 5 ? 'text-green-600' : 'text-red-600'
        }
        if (indicatorName.includes('COBERTURA') || indicatorName.includes('Cobertura')) {
          // Cobertura de estoque: < 45 dias = verde, >= 45 = vermelho
          return realizadoNum < 45 ? 'text-green-600' : 'text-red-600'
        }
        if (indicatorName.includes('CURVA C') || indicatorName.includes('Curva C')) {
          // Curva C: < 20% = verde, >= 20% = vermelho
          return realizadoNum < 20 ? 'text-green-600' : 'text-red-600'
        }
        break

      case 'FINANCEIRO':
        if (indicatorName.includes('INADIMPLÊNCIA') || indicatorName.includes('Inadimplência')) {
          // Inadimplência: < 1% = verde, >= 1% = vermelho
          return realizadoNum < 1 ? 'text-green-600' : 'text-red-600'
        }
        break

      default:
        break
    }

    return 'text-gray-800'
  }

  // Função para buscar dados filtrados
  const fetchFilteredData = async (startDate?: string, endDate?: string, department?: string) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      if (department) params.append('department', department)
      
      const response = await fetch(`/api/indicators/filtered?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setFilteredData(data)
        setSelectedPeriod(data.summary.period)
      } else {
        console.error('Erro ao buscar dados filtrados')
      }
    } catch (error) {
      console.error('Erro ao buscar dados filtrados:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Processar dados dos indicadores por departamento
  const getIndicatorsByDepartment = (department: string) => {
    const dataSource = filteredData ? filteredData.indicators : indicators
    return dataSource.filter(ind => 
      ind.department === department || ind.user?.department === department
    ).slice(0, 5) // Limitar para evitar sobrecarga
  }

  // Obter metas por departamento
  const getGoalsByDepartment = (department: string) => {
    const dataSource = filteredData ? filteredData.goals : goals
    return dataSource.filter(goal => goal.department === department)
  }

  // Handlers para filtros
  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setActiveFilter({ startDate, endDate })
    fetchFilteredData(startDate, endDate)
    setIsFilterVisible(false)
  }

  const handleClearFilter = () => {
    setActiveFilter(null)
    setFilteredData(null)
    setSelectedPeriod(dateRange)
    setIsFilterVisible(false)
  }

  const handleRefreshData = () => {
    if (activeFilter) {
      fetchFilteredData(activeFilter.startDate, activeFilter.endDate)
    } else {
      // Recarregar dados originais
      window.location.reload()
    }
  }

  // Gerar dados das seções baseados nos dados reais e layout das imagens
  const generateReportSections = (): ReportSection[] => {
    const comercialIndicators = getIndicatorsByDepartment('COMERCIAL')
    const logisticaIndicators = getIndicatorsByDepartment('LOGISTICA')
    const comprasIndicators = getIndicatorsByDepartment('COMPRAS')
    const financeiroIndicators = getIndicatorsByDepartment('FINANCEIRO')
    
    const comercialGoals = getGoalsByDepartment('COMERCIAL')
    const logisticaGoals = getGoalsByDepartment('LOGISTICA')
    const comprasGoals = getGoalsByDepartment('COMPRAS')
    const financeiroGoals = getGoalsByDepartment('FINANCEIRO')

    // Função auxiliar para criar métrica com cor
    const createMetric = (label: string, realizado: any, meta: any, period: 'MÊS' | 'DIA', department: string, unit?: string): ReportMetric => {
      const realizadoValue = realizado || 'Não há dados'
      const metaValue = meta || 'Mais detalhes'
      
      return {
        label,
        realizado: realizadoValue,
        meta: metaValue,
        period,
        hasDetails: true,
        unit,
        status: getIndicatorColor(department, label, realizadoValue, metaValue) as any
      }
    }

    return [
      {
        title: 'COMERCIAL',
        color: 'text-white',
        bgColor: 'bg-blue-600',
        metrics: [
          createMetric(
            'FATURAMENTO',
            comercialIndicators.find(i => i.name.includes('Faturamento'))?.value,
            comercialGoals.find(g => g.name.includes('Faturamento'))?.target,
            'MÊS',
            'COMERCIAL',
            'currency'
          ),
          createMetric(
            'POSITIVAÇÃO',
            comercialIndicators.find(i => i.name.includes('Positivação') && i.name.includes('Mês'))?.value,
            comercialGoals.find(g => g.name.includes('Positivação') && g.name.includes('Mês'))?.target,
            'MÊS',
            'COMERCIAL'
          ),
          createMetric(
            'POSITIVAÇÃO',
            comercialIndicators.find(i => i.name.includes('Positivação') && i.name.includes('Dia'))?.value,
            comercialGoals.find(g => g.name.includes('Positivação') && g.name.includes('Dia'))?.target,
            'DIA',
            'COMERCIAL'
          )
        ]
      },
      {
        title: 'LOGÍSTICA',
        color: 'text-white',
        bgColor: 'bg-blue-600',
        metrics: [
          createMetric(
            'OTIF',
            logisticaIndicators.find(i => i.name.includes('OTIF'))?.value,
            logisticaGoals.find(g => g.name.includes('OTIF'))?.target || 95,
            'MÊS',
            'LOGISTICA',
            'percentage'
          ),
          createMetric(
            'TAXA DE DEVOLUÇÃO',
            logisticaIndicators.find(i => i.name.includes('Devolução'))?.value,
            logisticaGoals.find(g => g.name.includes('Devolução'))?.target || 5,
            'MÊS',
            'LOGISTICA',
            'percentage'
          ),
          createMetric(
            'CUSTO LOGÍSTICO',
            logisticaIndicators.find(i => i.name.includes('Custo'))?.value,
            logisticaGoals.find(g => g.name.includes('Custo'))?.target || 3.5,
            'MÊS',
            'LOGISTICA',
            'percentage'
          )
        ]
      },
      {
        title: 'COMPRAS',
        color: 'text-white',
        bgColor: 'bg-blue-600',
        metrics: [
          createMetric(
            'RUPTURA',
            comprasIndicators.find(i => i.name.includes('Ruptura') && i.name.includes('Percentual'))?.value,
            comprasGoals.find(g => g.name.includes('Ruptura') && g.name.includes('Percentual'))?.target || 5,
            'MÊS',
            'COMPRAS',
            'percentage'
          ),
          createMetric(
            'COBERTURA DE ESTOQUE',
            comprasIndicators.find(i => i.name.includes('Cobertura'))?.value,
            comprasGoals.find(g => g.name.includes('Cobertura'))?.target || 45,
            'MÊS',
            'COMPRAS'
          ),
          createMetric(
            'CURVA C',
            comprasIndicators.find(i => i.name.includes('Curva C') && i.name.includes('Percentual'))?.value,
            comprasGoals.find(g => g.name.includes('Curva C') && g.name.includes('Percentual'))?.target || 20,
            'MÊS',
            'COMPRAS',
            'percentage'
          )
        ]
      },
      {
        title: 'FINANCEIRO',
        color: 'text-white',
        bgColor: 'bg-blue-600',
        metrics: [
          createMetric(
            'INADIMPLÊNCIA 45D',
            financeiroIndicators.find(i => i.name.includes('Inadimplência') && i.name.includes('Percentual'))?.value,
            financeiroGoals.find(g => g.name.includes('Inadimplência') && g.name.includes('Percentual'))?.target || 1,
            'MÊS',
            'FINANCEIRO',
            'percentage'
          ),
          createMetric(
            'UTILIZAÇÃO SEMANAL',
            financeiroIndicators.find(i => i.name.includes('Utilização'))?.value,
            financeiroGoals.find(g => g.name.includes('Utilização'))?.target,
            'MÊS',
            'FINANCEIRO',
            'currency'
          ),
          createMetric(
            'LIMITES IMPLANTADOS',
            financeiroIndicators.find(i => i.name.includes('Limites'))?.value,
            financeiroGoals.find(g => g.name.includes('Limites'))?.target,
            'MÊS',
            'FINANCEIRO',
            'currency'
          )
        ]
      }
    ]
  }

  const reportSections = generateReportSections()

  const renderMetricRow = (metric: ReportMetric, index: number) => (
    <tr key={index} className="border-b border-gray-200">
      <td className="py-3 px-4 text-left">
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{metric.label}</span>
          <span className="text-xs text-gray-500 mt-1">{metric.period}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">REALIZADO</span>
          <div className="flex items-center mt-1">
            {hasData(metric.realizado) && typeof metric.realizado === 'number' && (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            )}
            <span className={`text-sm font-semibold ${
              metric.realizado === 'Não há dados' ? 'text-gray-400' : 
              metric.hasDetails && typeof metric.status === 'string' ? metric.status + ' cursor-pointer hover:underline' : 
              metric.hasDetails ? 'text-blue-600 cursor-pointer hover:underline' : 'text-gray-800'
            }`}>
              {typeof metric.realizado === 'number' ? 
                formatValue(metric.realizado, metric.unit) : 
                metric.realizado
              }
            </span>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">META</span>
          <div className="flex items-center mt-1">
            {hasData(metric.meta) && typeof metric.meta === 'number' && (
              <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
            )}
            <span className={`text-sm ${
              metric.hasDetails ? 'text-blue-600 cursor-pointer hover:underline' : 'text-gray-800'
            }`}>
              {typeof metric.meta === 'number' ? 
                formatValue(metric.meta, metric.unit) : 
                metric.meta
              }
            </span>
          </div>
        </div>
      </td>
    </tr>
  )

  const renderSection = (section: ReportSection) => (
    <div key={section.title} className="border border-gray-300 bg-white">
      {/* Header da Seção */}
      <div className={`${section.bgColor} ${section.color} py-4 px-4 font-bold text-center text-lg`}>
        {section.title}
      </div>
      
      {/* Tabela de Métricas */}
      <div className="bg-white">
        {section.metrics.length > 0 ? (
          <table className="w-full">
            <tbody>
              {section.metrics.map((metric, index) => renderMetricRow(metric, index))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center text-gray-400">
            <span className="text-sm">Nenhum dado disponível</span>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header do Relatório */}
        <div className="bg-black text-white p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">INDICADORES ESPLENDOR</h1>
              {filteredData && (
                <p className="text-sm text-gray-300 mt-1">
                  {filteredData.summary.totalIndicators} indicadores encontrados
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{selectedPeriod}</span>
                {activeFilter && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Filtrado
                  </Badge>
                )}
              </div>
              
              <DateRangeFilter
                onDateRangeChange={handleDateRangeChange}
                onClear={handleClearFilter}
                isVisible={isFilterVisible}
                onToggle={() => setIsFilterVisible(!isFilterVisible)}
              />
              
              <Button 
                variant="outline" 
                size="sm" 
                className="text-black"
                onClick={handleRefreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              
              <Button variant="outline" size="sm" className="text-black">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Carregando dados...</span>
          </div>
        )}

        {/* Grid de Seções - Layout 2x2 similar às imagens */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 max-w-7xl mx-auto">
            {reportSections.map(section => renderSection(section))}
          </div>
        )}

        {/* Estatísticas do Filtro */}
        {filteredData && filteredData.statistics.length > 0 && (
          <div className="mt-8 max-w-7xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Estatísticas do Período
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredData.statistics.slice(0, 8).map((stat, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-800">{stat.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{stat.department}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Atual:</span>
                          <span className="font-medium">{stat.latest?.value?.toFixed(1) || '0'}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Média:</span>
                          <span>{stat.average?.toFixed(1) || '0'}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Registros:</span>
                          <span>{stat.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Rodapé com informações */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Dados últimos atualizados: {new Date().toLocaleString('pt-BR')}</p>
          <p className="mt-1">
            <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  )
}
