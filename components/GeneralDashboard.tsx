'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Filter
} from 'lucide-react'
import { IndicatorCard } from './IndicatorCard'

interface GeneralDashboardProps {
  userId: string
}

interface DepartmentSummary {
  department: string
  totalIndicators: number
  averagePerformance: number
  trend: 'up' | 'down' | 'stable'
  topIndicators: any[]
}

interface ConsolidatedMetrics {
  totalRevenue: number
  totalProfit: number
  overallEfficiency: number
  customerSatisfaction: number
  departmentPerformance: DepartmentSummary[]
}

const departmentColors = {
  COMERCIAL: 'bg-blue-500',
  LOGISTICA: 'bg-green-500',
  COMPRAS: 'bg-purple-500',
  FINANCEIRO: 'bg-yellow-500',
  TI: 'bg-red-500',
  DIRETORIA: 'bg-gray-500'
}

const departmentNames = {
  COMERCIAL: 'Comercial',
  LOGISTICA: 'Logística',
  COMPRAS: 'Compras',
  FINANCEIRO: 'Financeiro',
  TI: 'TI',
  DIRETORIA: 'Diretoria'
}

export function GeneralDashboard({ userId }: GeneralDashboardProps) {
  const [metrics, setMetrics] = useState<ConsolidatedMetrics | null>(null)
  const [allIndicators, setAllIndicators] = useState<any[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL')
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30') // days

  useEffect(() => {
    fetchConsolidatedData()
  }, [timeRange])

  const fetchConsolidatedData = async () => {
    setIsLoading(true)
    try {
      // Buscar todos os indicadores
      const indicatorsResponse = await fetch(`/api/indicators/all?days=${timeRange}`)
      const indicators = await indicatorsResponse.json()
      
      // Buscar metas de todos os departamentos
      const goalsResponse = await fetch(`/api/goals/all`)
      const goals = await goalsResponse.json()

      setAllIndicators(indicators)
      
      // Calcular métricas consolidadas
      const consolidated = calculateConsolidatedMetrics(indicators, goals)
      setMetrics(consolidated)
    } catch (error) {
      console.error('Erro ao buscar dados consolidados:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateConsolidatedMetrics = (indicators: any[], goals: any[]): ConsolidatedMetrics => {
    const departmentGroups = indicators.reduce((acc, indicator) => {
      if (!acc[indicator.department]) {
        acc[indicator.department] = []
      }
      acc[indicator.department].push(indicator)
      return acc
    }, {} as Record<string, any[]>)

    const departmentPerformance: DepartmentSummary[] = Object.entries(departmentGroups).map(([dept, deptIndicators]) => {
      const avgPerformance = deptIndicators.reduce((sum, ind) => {
        const performance = ind.target > 0 ? (ind.value / ind.target) * 100 : 0
        return sum + performance
      }, 0) / deptIndicators.length

      return {
        department: dept,
        totalIndicators: deptIndicators.length,
        averagePerformance: avgPerformance,
        trend: avgPerformance > 80 ? 'up' : avgPerformance > 60 ? 'stable' : 'down',
        topIndicators: deptIndicators.slice(0, 3)
      }
    })

    // Calcular métricas gerais
    const revenueIndicators = indicators.filter(i => 
      i.name.includes('receita') || i.name.includes('vendas') || i.name.includes('faturamento')
    )
    const totalRevenue = revenueIndicators.reduce((sum, ind) => sum + ind.value, 0)

    const profitIndicators = indicators.filter(i => 
      i.name.includes('lucro') || i.name.includes('margem')
    )
    const totalProfit = profitIndicators.reduce((sum, ind) => sum + ind.value, 0)

    const efficiencyIndicators = indicators.filter(i => 
      i.name.includes('eficiencia') || i.name.includes('produtividade')
    )
    const overallEfficiency = efficiencyIndicators.length > 0 
      ? efficiencyIndicators.reduce((sum, ind) => sum + ind.value, 0) / efficiencyIndicators.length
      : 0

    const satisfactionIndicators = indicators.filter(i => 
      i.name.includes('satisfacao') || i.name.includes('cliente')
    )
    const customerSatisfaction = satisfactionIndicators.length > 0
      ? satisfactionIndicators.reduce((sum, ind) => sum + ind.value, 0) / satisfactionIndicators.length
      : 0

    return {
      totalRevenue,
      totalProfit,
      overallEfficiency,
      customerSatisfaction,
      departmentPerformance
    }
  }

  const filteredIndicators = selectedDepartment === 'ALL' 
    ? allIndicators 
    : allIndicators.filter(ind => ind.department === selectedDepartment)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header com filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Geral</h1>
          <p className="text-gray-600">Visão consolidada de todos os departamentos</p>
        </div>
        
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
          </select>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="ALL">Todos os Departamentos</option>
            {Object.entries(departmentNames).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Métricas principais */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.totalRevenue.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  })}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lucro Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.totalProfit.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  })}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eficiência Geral</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.overallEfficiency.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfação Cliente</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.customerSatisfaction.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Performance por departamento */}
      {metrics && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance por Departamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.departmentPerformance.map((dept, index) => (
              <motion.div
                key={dept.department}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${departmentColors[dept.department as keyof typeof departmentColors]}`}></div>
                    <h3 className="font-medium text-gray-900">
                      {departmentNames[dept.department as keyof typeof departmentNames]}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    {dept.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {dept.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                    {dept.trend === 'stable' && <Activity className="w-4 h-4 text-yellow-500" />}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Performance:</span>
                    <span className="font-medium">{dept.averagePerformance.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Indicadores:</span>
                    <span className="font-medium">{dept.totalIndicators}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        dept.averagePerformance > 80 ? 'bg-green-500' :
                        dept.averagePerformance > 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(dept.averagePerformance, 100)}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de indicadores */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Indicadores {selectedDepartment === 'ALL' ? 'Gerais' : `- ${departmentNames[selectedDepartment as keyof typeof departmentNames]}`}
          </h2>
          <span className="text-sm text-gray-500">
            {filteredIndicators.length} indicadores
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <IndicatorCard
                indicator={indicator}
                showDepartment={selectedDepartment === 'ALL'}
              />
            </motion.div>
          ))}
        </div>

        {filteredIndicators.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum indicador encontrado
            </h3>
            <p className="text-gray-500">
              {selectedDepartment === 'ALL' 
                ? 'Não há indicadores cadastrados no sistema.'
                : `Não há indicadores para o departamento ${departmentNames[selectedDepartment as keyof typeof departmentNames]}.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
