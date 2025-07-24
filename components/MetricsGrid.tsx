'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Users, Truck, ShoppingCart, DollarSign } from 'lucide-react'

interface MetricsGridProps {
  indicators: any[]
  goals: any[]
}

const departmentIcons = {
  COMERCIAL: Users,
  LOGISTICA: Truck,
  COMPRAS: ShoppingCart,
  FINANCEIRO: DollarSign,
}

const departmentColors = {
  COMERCIAL: 'from-blue-500 to-blue-600',
  LOGISTICA: 'from-green-500 to-green-600',
  COMPRAS: 'from-purple-500 to-purple-600',
  FINANCEIRO: 'from-yellow-500 to-yellow-600',
}

export function MetricsGrid({ indicators, goals }: MetricsGridProps) {
  // Group indicators by department
  const departmentMetrics = indicators.reduce((acc, indicator) => {
    const dept = indicator.user.department
    if (!acc[dept]) {
      acc[dept] = []
    }
    acc[dept].push(indicator)
    return acc
  }, {} as Record<string, any[]>)

  // Calculate department performance
  const getDepartmentPerformance = (deptIndicators: any[]) => {
    if (deptIndicators.length === 0) return { percentage: 0, status: 'neutral' }
    
    const achieved = deptIndicators.filter(ind => ind.value >= ind.target).length
    const percentage = (achieved / deptIndicators.length) * 100
    
    let status = 'danger'
    if (percentage >= 80) status = 'success'
    else if (percentage >= 60) status = 'warning'
    
    return { percentage, status }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'danger': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'danger': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getTrendIcon = (value: number, target: number) => {
    if (value > target) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (value < target) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Indicadores por Departamento</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(departmentMetrics).map(([department, deptIndicators], index) => {
          const performance = getDepartmentPerformance(deptIndicators)
          const DepartmentIcon = departmentIcons[department as keyof typeof departmentIcons]
          const gradientColor = departmentColors[department as keyof typeof departmentColors]
          
          return (
            <motion.div
              key={department}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Department Header */}
              <div className={`bg-gradient-to-r ${gradientColor} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DepartmentIcon className="w-6 h-6" />
                    <div>
                      <h3 className="text-lg font-semibold">{department}</h3>
                      <p className="text-sm opacity-90">{deptIndicators.length} indicadores</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{performance.percentage.toFixed(0)}%</p>
                    <p className="text-sm opacity-90">Performance</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="px-4 py-2 bg-gray-50">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(performance.status)}`}
                    style={{ width: `${performance.percentage}%` }}
                  />
                </div>
              </div>

              {/* Indicators List */}
              <div className="p-4 space-y-3">
                {deptIndicators.slice(0, 3).map((indicator, idx) => (
                  <div key={indicator.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{indicator.name}</p>
                      <p className="text-xs text-gray-500">{indicator.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {indicator.value.toLocaleString('pt-BR')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Meta: {indicator.target.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      {getTrendIcon(indicator.value, indicator.target)}
                    </div>
                  </div>
                ))}
                
                {deptIndicators.length > 3 && (
                  <div className="text-center pt-2">
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      Ver mais {deptIndicators.length - 3} indicadores
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {Object.keys(departmentMetrics).length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum indicador encontrado</h3>
          <p className="text-gray-500">Comece adicionando indicadores no seu painel.</p>
        </div>
      )}
    </div>
  )
}
