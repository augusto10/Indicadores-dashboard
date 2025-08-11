'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Truck, 
  Users,
  BarChart3,
  Target,
  Activity,
  AlertCircle,
  Package,
  CreditCard
} from 'lucide-react'
import { IndicatorCard } from '@/components/IndicatorCard'
import { safeDivide, clampPercent, formatPercent } from '@/utils/format'

interface DashboardMetric {
  title: string
  value: string
  change?: string
  trend: 'up' | 'down' | 'stable'
  icon: React.ReactNode
  color: string
  meta?: string
  status?: 'success' | 'warning' | 'danger'
}

interface CorporateDashboardProps {
  indicators?: any[]
  goals?: any[]
}

// Função para calcular tendência baseada em valor vs meta
function calculateTrend(value: number, meta: number, isInverse: boolean = false): 'up' | 'down' | 'stable' {
  const percentage = clampPercent(safeDivide(value, meta, 0) * 100, 0, 200)
  if (isInverse) {
    // Para indicadores onde menor é melhor
    return percentage <= 100 ? 'up' : 'down'
  } else {
    // Para indicadores onde maior é melhor
    return percentage >= 100 ? 'up' : 'down'
  }
}

// Função para calcular mudança percentual
function calculateChange(value: number, meta: number, isInverse: boolean = false): string {
  const percentage = clampPercent(safeDivide(value, meta, 0) * 100, 0, 200)
  const diffRaw = isInverse ? (100 - percentage) : (percentage - 100)
  const diff = clampPercent(diffRaw, -100, 100)
  const sign = diff >= 0 ? '+' : ''
  return `${sign}${formatPercent(Math.abs(diff))}`
}

// Função para formatar moeda
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Função para formatar números grandes
function formatLargeNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`
  }
  return value.toString()
}

export function CorporateDashboard({ indicators = [], goals = [] }: CorporateDashboardProps) {
  const [departmentFilter, setDepartmentFilter] = useState<'TODOS' | 'COMERCIAL' | 'LOGISTICA' | 'COMPRAS' | 'FINANCEIRO'>('TODOS')
  const [categoryFilter, setCategoryFilter] = useState<'TODAS' | 'FINANCEIRO' | 'OPERACIONAL' | 'VENDAS'>('TODAS')

  // Dados remotos filtrados por API
  const [remoteIndicators, setRemoteIndicators] = useState<any[] | null>(null)
  const [remoteGoals, setRemoteGoals] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Buscar dados quando filtros mudarem
  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        setIsLoading(true)
        const params = new URLSearchParams()
        if (departmentFilter && departmentFilter !== 'TODOS') params.append('department', departmentFilter)
        if (categoryFilter && categoryFilter !== 'TODAS') params.append('category', categoryFilter)
        const res = await fetch(`/api/indicators/filtered?${params.toString()}`)
        const data = await res.json()
        setRemoteIndicators(data?.indicators ?? [])
        setRemoteGoals(data?.goals ?? [])
      } catch (e) {
        console.error('Erro ao buscar indicadores filtrados (dashboard):', e)
        setRemoteIndicators(null)
        setRemoteGoals(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFiltered()
  }, [departmentFilter, categoryFilter])

  // Fonte de dados: remota (quando disponível) ou props
  const indicatorsSource = remoteIndicators ?? indicators
  const goalsSource = remoteGoals ?? goals

  // Filtrar indicadores por departamento
  const comercialData = indicatorsSource.filter(ind => ind.department === 'COMERCIAL' || ind.user?.department === 'COMERCIAL')
  const logisticaData = indicatorsSource.filter(ind => ind.department === 'LOGISTICA' || ind.user?.department === 'LOGISTICA')
  const comprasData = indicatorsSource.filter(ind => ind.department === 'COMPRAS' || ind.user?.department === 'COMPRAS')
  const financeiroData = indicatorsSource.filter(ind => ind.department === 'FINANCEIRO' || ind.user?.department === 'FINANCEIRO')

  // Obter dados mais recentes de cada setor
  const latestComercial = comercialData[0]?.data || {}
  const latestLogistica = logisticaData[0]?.data || {}
  const latestCompras = comprasData[0]?.data || {}
  const latestFinanceiro = financeiroData[0]?.data || {}

  // Métricas do Comercial baseadas nos formulários reais
  const comercialMetrics: DashboardMetric[] = [
    {
      title: 'Faturamento Mês',
      value: latestComercial.faturamentoMesAcumulado ? formatCurrency(latestComercial.faturamentoMesAcumulado) : 'R$ 0',
      change: latestComercial.faturamentoMesAcumulado && latestComercial.metaFaturamentoMes ? 
        calculateChange(latestComercial.faturamentoMesAcumulado, latestComercial.metaFaturamentoMes) : undefined,
      trend: latestComercial.faturamentoMesAcumulado && latestComercial.metaFaturamentoMes ? 
        calculateTrend(latestComercial.faturamentoMesAcumulado, latestComercial.metaFaturamentoMes) : 'stable',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-green-600',
      meta: latestComercial.metaFaturamentoMes ? `Meta: ${formatCurrency(latestComercial.metaFaturamentoMes)}` : undefined
    },
    {
      title: 'Faturamento Dia',
      value: latestComercial.faturamentoDia ? formatCurrency(latestComercial.faturamentoDia) : 'R$ 0',
      change: latestComercial.faturamentoDia && latestComercial.metaFaturamentoDia ? 
        calculateChange(latestComercial.faturamentoDia, latestComercial.metaFaturamentoDia) : undefined,
      trend: latestComercial.faturamentoDia && latestComercial.metaFaturamentoDia ? 
        calculateTrend(latestComercial.faturamentoDia, latestComercial.metaFaturamentoDia) : 'stable',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'text-blue-600',
      meta: latestComercial.metaFaturamentoDia ? `Meta: ${formatCurrency(latestComercial.metaFaturamentoDia)}` : undefined
    },
    {
      title: 'Positivação Mês',
      value: latestComercial.positivacaoMesAcumulado ? latestComercial.positivacaoMesAcumulado.toString() : '0',
      change: latestComercial.positivacaoMesAcumulado && latestComercial.metaPositivacaoMes ? 
        calculateChange(latestComercial.positivacaoMesAcumulado, latestComercial.metaPositivacaoMes) : undefined,
      trend: latestComercial.positivacaoMesAcumulado && latestComercial.metaPositivacaoMes ? 
        calculateTrend(latestComercial.positivacaoMesAcumulado, latestComercial.metaPositivacaoMes) : 'stable',
      icon: <Users className="h-6 w-6" />,
      color: 'text-purple-600',
      meta: latestComercial.metaPositivacaoMes ? `Meta: ${latestComercial.metaPositivacaoMes}` : undefined
    }
  ]

  // Métricas da Logística baseadas nos formulários reais
  const logisticaMetrics: DashboardMetric[] = [
    {
      title: 'OTIF (On Time In Full)',
      value: latestLogistica.otifMes ? `${latestLogistica.otifMes.toFixed(1)}%` : '0%',
      change: latestLogistica.otifMes && latestLogistica.metaOtif ? 
        calculateChange(latestLogistica.otifMes, latestLogistica.metaOtif) : undefined,
      trend: latestLogistica.otifMes && latestLogistica.metaOtif ? 
        calculateTrend(latestLogistica.otifMes, latestLogistica.metaOtif) : 'stable',
      icon: <Truck className="h-6 w-6" />,
      color: 'text-green-600',
      meta: latestLogistica.metaOtif ? `Meta: ${latestLogistica.metaOtif}%` : undefined
    },
    {
      title: 'Taxa Devolução',
      value: latestLogistica.taxaDevolucaoMes ? `${latestLogistica.taxaDevolucaoMes.toFixed(1)}%` : '0%',
      change: latestLogistica.taxaDevolucaoMes && latestLogistica.metaTaxaDevolucao ? 
        calculateChange(latestLogistica.taxaDevolucaoMes, latestLogistica.metaTaxaDevolucao, true) : undefined,
      trend: latestLogistica.taxaDevolucaoMes && latestLogistica.metaTaxaDevolucao ? 
        calculateTrend(latestLogistica.taxaDevolucaoMes, latestLogistica.metaTaxaDevolucao, true) : 'stable',
      icon: <AlertCircle className="h-6 w-6" />,
      color: 'text-orange-600',
      meta: latestLogistica.metaTaxaDevolucao ? `Meta: ≤${latestLogistica.metaTaxaDevolucao}%` : undefined
    },
    {
      title: 'Custo Logístico',
      value: latestLogistica.custoLogisticoMes ? `${latestLogistica.custoLogisticoMes.toFixed(1)}%` : '0%',
      change: latestLogistica.custoLogisticoMes && latestLogistica.metaCustoLogistico ? 
        calculateChange(latestLogistica.custoLogisticoMes, latestLogistica.metaCustoLogistico, true) : undefined,
      trend: latestLogistica.custoLogisticoMes && latestLogistica.metaCustoLogistico ? 
        calculateTrend(latestLogistica.custoLogisticoMes, latestLogistica.metaCustoLogistico, true) : 'stable',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-purple-600',
      meta: latestLogistica.metaCustoLogistico ? `Meta: ≤${latestLogistica.metaCustoLogistico}%` : undefined
    }
  ]

  // Métricas de Compras baseadas nos formulários reais
  const comprasMetrics: DashboardMetric[] = [
    {
      title: 'Ruptura Mês',
      value: latestCompras.rupturaMesValor ? formatCurrency(latestCompras.rupturaMesValor) : 'R$ 0',
      change: latestCompras.rupturaMesValor && latestCompras.metaRupturaValor ? 
        calculateChange(latestCompras.rupturaMesValor, latestCompras.metaRupturaValor, true) : undefined,
      trend: latestCompras.rupturaMesValor && latestCompras.metaRupturaValor ? 
        calculateTrend(latestCompras.rupturaMesValor, latestCompras.metaRupturaValor, true) : 'stable',
      icon: <AlertCircle className="h-6 w-6" />,
      color: 'text-red-600',
      meta: latestCompras.metaRupturaValor ? `Meta: ${formatCurrency(latestCompras.metaRupturaValor)}` : undefined
    },
    {
      title: 'Cobertura Estoque',
      value: latestCompras.mediaDias ? `${latestCompras.mediaDias} dias` : '0 dias',
      change: latestCompras.mediaDias && latestCompras.metaCoberturaEstoque ? 
        calculateChange(latestCompras.mediaDias, latestCompras.metaCoberturaEstoque) : undefined,
      trend: latestCompras.mediaDias && latestCompras.metaCoberturaEstoque ? 
        calculateTrend(latestCompras.mediaDias, latestCompras.metaCoberturaEstoque) : 'stable',
      icon: <Package className="h-6 w-6" />,
      color: 'text-blue-600',
      meta: latestCompras.metaCoberturaEstoque ? `Meta: ${latestCompras.metaCoberturaEstoque} dias` : undefined
    },
    {
      title: 'Curva C',
      value: latestCompras.curvaCValor ? formatCurrency(latestCompras.curvaCValor) : 'R$ 0',
      change: latestCompras.curvaCValor && latestCompras.metaCurvaCValor ? 
        calculateChange(latestCompras.curvaCValor, latestCompras.metaCurvaCValor, true) : undefined,
      trend: latestCompras.curvaCValor && latestCompras.metaCurvaCValor ? 
        calculateTrend(latestCompras.curvaCValor, latestCompras.metaCurvaCValor, true) : 'stable',
      icon: <ShoppingCart className="h-6 w-6" />,
      color: 'text-green-600',
      meta: latestCompras.metaCurvaCValor ? `Meta: ${formatCurrency(latestCompras.metaCurvaCValor)}` : undefined
    }
  ]

  // Métricas do Financeiro baseadas nos formulários reais
  const financeiroMetrics: DashboardMetric[] = [
    {
      title: 'Inadimplência 45d',
      value: latestFinanceiro.inadimplencia45dValor ? formatCurrency(latestFinanceiro.inadimplencia45dValor) : 'R$ 0',
      change: latestFinanceiro.inadimplencia45dValor && latestFinanceiro.metaInadimplenciaValor ? 
        calculateChange(latestFinanceiro.inadimplencia45dValor, latestFinanceiro.metaInadimplenciaValor, true) : undefined,
      trend: latestFinanceiro.inadimplencia45dValor && latestFinanceiro.metaInadimplenciaValor ? 
        calculateTrend(latestFinanceiro.inadimplencia45dValor, latestFinanceiro.metaInadimplenciaValor, true) : 'stable',
      icon: <AlertCircle className="h-6 w-6" />,
      color: 'text-red-600',
      meta: latestFinanceiro.metaInadimplenciaValor ? `Meta: ${formatCurrency(latestFinanceiro.metaInadimplenciaValor)}` : undefined
    },
    {
      title: 'Inadimplência %',
      value: latestFinanceiro.inadimplencia45dPercentual ? `${latestFinanceiro.inadimplencia45dPercentual.toFixed(1)}%` : '0%',
      change: latestFinanceiro.inadimplencia45dPercentual && latestFinanceiro.metaInadimplenciaPercentual ? 
        calculateChange(latestFinanceiro.inadimplencia45dPercentual, latestFinanceiro.metaInadimplenciaPercentual, true) : undefined,
      trend: latestFinanceiro.inadimplencia45dPercentual && latestFinanceiro.metaInadimplenciaPercentual ? 
        calculateTrend(latestFinanceiro.inadimplencia45dPercentual, latestFinanceiro.metaInadimplenciaPercentual, true) : 'stable',
      icon: <TrendingDown className="h-6 w-6" />,
      color: 'text-orange-600',
      meta: latestFinanceiro.metaInadimplenciaPercentual ? `Meta: ≤${latestFinanceiro.metaInadimplenciaPercentual}%` : undefined
    },
    {
      title: 'Limites Implantados',
      value: latestFinanceiro.limitesImplantadosValor ? formatCurrency(latestFinanceiro.limitesImplantadosValor) : 'R$ 0',
      change: latestFinanceiro.limitesUtilizadoSemanal && latestFinanceiro.limitesImplantadosValor ? 
        `${((latestFinanceiro.limitesUtilizadoSemanal / latestFinanceiro.limitesImplantadosValor) * 100).toFixed(1)}% utilizado` : undefined,
      trend: 'stable',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'text-blue-600',
      meta: latestFinanceiro.limitesUtilizadoSemanal ? `Utilizado: ${formatCurrency(latestFinanceiro.limitesUtilizadoSemanal)}` : undefined
    }
  ]

  const renderMetricCard = (title: string, metrics: DashboardMetric[], bgColor: string) => (
    <Card className={`${bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
          {title}
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {metrics.length} métricas
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-white/80">
                  {metric.icon}
                </div>
                <span className="text-white/90 font-medium text-sm">
                  {metric.title}
                </span>
              </div>
              {metric.change && (
                <div className="flex items-center gap-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-300" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-red-300" />
                  ) : (
                    <Activity className="h-4 w-4 text-yellow-300" />
                  )}
                  <span className={`text-sm font-semibold ${
                    metric.trend === 'up' ? 'text-green-300' : 
                    metric.trend === 'down' ? 'text-red-300' : 'text-yellow-300'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              )}
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {metric.value}
            </div>
            {metric.meta && (
              <div className="text-xs text-white/70">
                {metric.meta}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        {/* Destaques com IndicatorCard (validação visual) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {(departmentFilter === 'TODOS' || departmentFilter === 'COMERCIAL') && (
          <IndicatorCard
            indicator={{
              name: 'Faturamento Mês',
              description: 'Performance vs Meta',
              value: latestComercial.faturamentoMesAcumulado ?? 0,
              target: latestComercial.metaFaturamentoMes ?? 0,
              unit: 'R$',
              updatedAt: new Date(),
              trendData: (latestComercial.faturamentoMesAcumulado && latestComercial.metaFaturamentoMes)
                ? [
                    Number(latestComercial.metaFaturamentoMes) * 0.7,
                    Number(latestComercial.metaFaturamentoMes) * 0.85,
                    Number(latestComercial.faturamentoMesAcumulado)
                  ]
                : undefined,
            }}
            onEdit={() => {}}
            onDelete={() => {}}
          />)}

          {(departmentFilter === 'TODOS' || departmentFilter === 'LOGISTICA') && (
          <IndicatorCard
            indicator={{
              name: 'OTIF',
              description: 'On Time In Full',
              value: logisticaData[0]?.data?.otifPercentual ?? 0,
              target: 95,
              unit: '%',
              updatedAt: new Date(),
              trendData: (logisticaData[0]?.data?.otifPercentual)
                ? [
                    90,
                    93,
                    Number(logisticaData[0]?.data?.otifPercentual)
                  ]
                : undefined,
            }}
            onEdit={() => {}}
            onDelete={() => {}}
          />)}
        </div>

        {/* Grid de Cards - Layout Paisagem */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Card Comercial */}
          {(departmentFilter === 'TODOS' || departmentFilter === 'COMERCIAL') && (
            renderMetricCard(
              'Comercial', 
              comercialMetrics, 
              'bg-gradient-to-br from-blue-600 to-blue-700'
            )
          )}

          {/* Card Logística */}
          {(departmentFilter === 'TODOS' || departmentFilter === 'LOGISTICA') && (
            renderMetricCard(
              'Logística', 
              logisticaMetrics, 
              'bg-gradient-to-br from-green-600 to-green-700'
            )
          )}

          {/* Card Compras */}
          {(departmentFilter === 'TODOS' || departmentFilter === 'COMPRAS') && (
            renderMetricCard(
              'Compras', 
              comprasMetrics, 
              'bg-gradient-to-br from-purple-600 to-purple-700'
            )
          )}

          {/* Card Financeiro */}
          {(departmentFilter === 'TODOS' || departmentFilter === 'FINANCEIRO') && (
            renderMetricCard(
              'Financeiro', 
              financeiroMetrics, 
              'bg-gradient-to-br from-orange-600 to-orange-700'
            )
          )}
        </div>

        {/* Resumo Executivo */}
        <div className="mt-8">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Resumo Executivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">R$ 2.4M</div>
                  <div className="text-sm text-slate-600">Vendas Totais</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">94.2%</div>
                  <div className="text-sm text-slate-600">Entregas no Prazo</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-1">R$ 180K</div>
                  <div className="text-sm text-slate-600">Economia Compras</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-1">18.5%</div>
                  <div className="text-sm text-slate-600">Margem EBITDA</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
