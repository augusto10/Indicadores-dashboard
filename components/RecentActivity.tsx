'use client'

import { motion } from 'framer-motion'
import { Clock, TrendingUp, TrendingDown, Target } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface RecentActivityProps {
  indicators: any[]
}

export function RecentActivity({ indicators }: RecentActivityProps) {
  // Sort indicators by most recent
  const recentIndicators = indicators
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

  const getActivityIcon = (indicator: any) => {
    if (indicator.value >= indicator.target) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    } else if (indicator.value >= indicator.target * 0.8) {
      return <Target className="w-4 h-4 text-yellow-500" />
    } else {
      return <TrendingDown className="w-4 h-4 text-red-500" />
    }
  }

  const getActivityColor = (indicator: any) => {
    if (indicator.value >= indicator.target) {
      return 'border-l-green-500'
    } else if (indicator.value >= indicator.target * 0.8) {
      return 'border-l-yellow-500'
    } else {
      return 'border-l-red-500'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">Atividade Recente</h3>
        </div>
      </div>

      <div className="p-6">
        {recentIndicators.length > 0 ? (
          <div className="space-y-4">
            {recentIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-start space-x-3 p-3 rounded-lg border-l-4 bg-gray-50 ${getActivityColor(indicator)}`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(indicator)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {indicator.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(indicator.createdAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {indicator.user.name} • {indicator.user.department}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {indicator.value.toLocaleString('pt-BR')} {indicator.unit}
                    </span>
                    <span className="text-xs text-gray-500">
                      Meta: {indicator.target.toLocaleString('pt-BR')} {indicator.unit}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          indicator.value >= indicator.target
                            ? 'bg-green-500'
                            : indicator.value >= indicator.target * 0.8
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{
                          width: `${Math.min((indicator.value / indicator.target) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma atividade recente
            </h4>
            <p className="text-gray-500">
              As atividades aparecerão aqui quando os indicadores forem atualizados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
