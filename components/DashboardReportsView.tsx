'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  Calendar,
  Download,
  Filter
} from 'lucide-react'
import { useState } from 'react'

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

interface DashboardReportsViewProps {
  indicators?: any[]
  goals?: any[]
  dateRange?: string
}

export function DashboardReportsView({ indicators = [], goals = [], dateRange = "7 de jul. de 2025 - 3 de ago. de 2025" }: DashboardReportsViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(dateRange)

  // Função para formatar valores
  const formatValue = (value: number | string, unit?: string): string => {
    if (typeof value === 'string') return value
    
    if (unit === 'currency') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    }
    
    if (unit === 'percentage') {
      return `${value.toFixed(1)}%`
    }
    
    return value.toString()
  }

  // Função para determinar se há dados ou não
  const hasData = (value: number | string): boolean => {
    return value !== 0 && value !== '' && value !== 'Não há dados'
  }

  // Processar dados dos indicadores por departamento
  const getIndicatorsByDepartment = (department: string) => {
    return indicators.filter(ind => 
      ind.department === department || ind.user?.department === department
    ).slice(0, 5) // Limitar para evitar sobrecarga
  }

  // Obter metas por departamento
  const getGoalsByDepartment = (department: string) => {
    return goals.filter(goal => goal.department === department)
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

    return [
      {
        title: 'COMERCIAL',
        color: 'text-white',
        bgColor: 'bg-blue-600',
        metrics: [
          {
            label: 'FATURAMENTO',
            realizado: comercialIndicators.find(i => i.name.includes('Faturamento'))?.value || 'Não há dados',
            meta: comercialGoals.find(g => g.name.includes('Faturamento'))?.target || 'Mais detalhes',
            period: 'MÊS',
            hasDetails: true,
            unit: 'currency'
          },
          {
            label: 'POSITIVAÇÃO',
            realizado: comercialIndicators.find(i => i.name.includes('Positivação'))?.value || 'Mais detalhes',
            meta: comercialGoals.find(g => g.name.includes('Positivação'))?.target || 'Mais detalhes',
            period: 'MÊS',
            hasDetails: true
          },
          {
            label: 'POSITIVAÇÃO',
            realizado: comercialIndicators.find(i => i.name.includes('Positivação'))?.value || 'Mais detalhes',
            meta: comercialGoals.find(g => g.name.includes('Positivação'))?.target || 'Mais detalhes',
            period: 'DIA',
            hasDetails: true
          }
        ]
      },
      {
        title: 'LOGÍSTICA',
        color: 'text-white',
        bgColor: 'bg-blue-600',
        metrics: [
          {
            label: 'OTIF',
            realizado: logisticaIndicators.find(i => i.name.includes('OTIF'))?.value || 'Mais detalhes',
            meta: logisticaGoals.find(g => g.name.includes('OTIF'))?.target || 'Mais detalhes',
            period: 'MÊS',
            hasDetails: true,
            unit: 'percentage'
          },
          {
            label: 'OTIF',
            realizado: logisticaIndicators.find(i => i.name.includes('OTIF'))?.value || 'Mais detalhes',
            meta: logisticaGoals.find(g => g.name.includes('OTIF'))?.target || 'Mais detalhes',
            period: 'DIA',
            hasDetails: true,
            unit: 'percentage'
          },
          {
            label: 'TAXA DE DEVOLUÇÃO',
            realizado: logisticaIndicators.find(i => i.name.includes('Devolução'))?.value || 'Mais detalhes',
            meta: logisticaGoals.find(g => g.name.includes('Devolução'))?.target || 'Mais detalhes',
            period: 'MÊS',
            hasDetails: true,
            unit: 'percentage'
          },
          {
            label: 'CUSTO LOGÍSTICO',
            realizado: logisticaIndicators.find(i => i.name.includes('Custo'))?.value || 'Mais detalhes',
            meta: logisticaGoals.find(g => g.name.includes('Custo'))?.target || 'Mais detalhes',
            period: 'DIA',
            hasDetails: true,
            unit: 'currency'
          }
        ]
      },
      {
        title: 'COMPRAS',
        color: 'text-white',
        bgColor: 'bg-blue-600',
        metrics: [
          {
            label: 'ECONOMIA GERADA',
            realizado: comprasIndicators.find(i => i.name.includes('Economia'))?.value || 'Mais detalhes',
            meta: comprasGoals.find(g => g.name.includes('Economia'))?.target || 'Mais detalhes',
            period: 'MÊS',
            hasDetails: true,
            unit: 'currency'
          },
          {
            label: 'PRAZO MÉDIO PAGAMENTO',
            realizado: comprasIndicators.find(i => i.name.includes('Prazo'))?.value || 'Mais detalhes',
            meta: comprasGoals.find(g => g.name.includes('Prazo'))?.target || 'Mais detalhes',
            period: 'DIA',
            hasDetails: true
          },
          {
            label: 'FORNECEDORES ATIVOS',
            realizado: comprasIndicators.find(i => i.name.includes('Fornecedor'))?.value || 'Mais detalhes',
            meta: comprasGoals.find(g => g.name.includes('Fornecedor'))?.target || 'Mais detalhes',
            period: 'MÊS',
            hasDetails: true
          },
          {
            label: 'ÍNDICE QUALIDADE',
            realizado: comprasIndicators.find(i => i.name.includes('Qualidade'))?.value || 'Mais detalhes',
            meta: comprasGoals.find(g => g.name.includes('Qualidade'))?.target || 'Mais detalhes',
            period: 'MÊS',
            hasDetails: true,
            unit: 'percentage'
          }
        ]
      },
      {
        title: 'FINANCEIRO',
        color: 'text-white',
        bgColor: 'bg-blue-600',
        metrics: financeiroIndicators.slice(0, 3).map(indicator => ({
          label: indicator.name.toUpperCase(),
          realizado: indicator.value,
          meta: financeiroGoals.find(g => g.name === indicator.name)?.target || 'Mais detalhes',
          period: 'MÊS' as const,
          hasDetails: true,
          unit: indicator.unit === '%' ? 'percentage' : indicator.unit === 'R$' ? 'currency' : undefined
        }))
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
            <span className={`text-sm ${
              metric.realizado === 'Não há dados' ? 'text-gray-400' : 
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
    <div className="p-6">
      {/* Header do Relatório */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Indicadores Corporativos</h1>
            <p className="text-gray-600 mt-1">Visão consolidada dos principais indicadores por departamento</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{selectedPeriod}</span>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de Seções - Layout 2x2 similar às imagens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 max-w-7xl mx-auto">
        {reportSections.map(section => renderSection(section))}
      </div>

      {/* Rodapé com informações */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Dados últimos atualizados: {new Date().toLocaleString('pt-BR')}</p>
      </div>
    </div>
  )
}
