'use client'

import { TrendingUp, TrendingDown, Target, Users } from 'lucide-react'
import { motion } from 'framer-motion'

interface DashboardOverviewProps {
  indicators: any[]
  goals: any[]
}

export function DashboardOverview({ indicators, goals }: DashboardOverviewProps) {
  // Calculate overview metrics
  const totalIndicators = indicators.length
  const activeGoals = goals.filter(goal => goal.isActive).length
  
  // Calculate department performance
  const departmentStats = indicators.reduce((acc, indicator) => {
    const dept = indicator.user.department
    if (!acc[dept]) {
      acc[dept] = { total: 0, achieved: 0 }
    }
    acc[dept].total++
    if (indicator.value >= indicator.target) {
      acc[dept].achieved++
    }
    return acc
  }, {} as Record<string, { total: number; achieved: number }>)

  const deptValues = Object.values(departmentStats) as { total: number; achieved: number }[]
  const overallPerformance = deptValues.reduce(
    (acc, dept) => {
      acc.total += dept.total
      acc.achieved += dept.achieved
      return acc
    },
    { total: 0, achieved: 0 }
  )

  const performancePercentage = overallPerformance.total > 0 
    ? (overallPerformance.achieved / overallPerformance.total) * 100 
    : 0

  const stats = [
    {
      name: 'Total de Indicadores',
      value: totalIndicators,
      icon: TrendingUp,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      name: 'Metas Ativas',
      value: activeGoals,
      icon: Target,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      name: 'Performance Geral',
      value: `${performancePercentage.toFixed(1)}%`,
      icon: Users,
      color: performancePercentage >= 70 ? 'bg-green-500' : performancePercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500',
      change: performancePercentage >= 70 ? '+5%' : '-2%',
      changeType: performancePercentage >= 70 ? 'positive' as const : 'negative' as const,
    },
    {
      name: 'Departamentos',
      value: Object.keys(departmentStats).length,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '0%',
      changeType: 'neutral' as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 
              stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {stat.changeType === 'positive' && <TrendingUp className="w-4 h-4 inline mr-1" />}
              {stat.changeType === 'negative' && <TrendingDown className="w-4 h-4 inline mr-1" />}
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
