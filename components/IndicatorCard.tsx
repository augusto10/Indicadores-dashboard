'use client'

import { motion } from 'framer-motion'
import { Edit, Trash2, TrendingUp, TrendingDown, Target } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface IndicatorCardProps {
  indicator: any
  onEdit: () => void
  onDelete: () => void
}

export function IndicatorCard({ indicator, onEdit, onDelete }: IndicatorCardProps) {
  const percentage = (indicator.value / indicator.target) * 100
  const isOnTarget = indicator.value >= indicator.target
  const isNearTarget = indicator.value >= indicator.target * 0.8

  const getStatusColor = () => {
    if (isOnTarget) return 'success'
    if (isNearTarget) return 'warning'
    return 'danger'
  }

  const getStatusIcon = () => {
    if (isOnTarget) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (isNearTarget) return <Target className="w-4 h-4 text-yellow-500" />
    return <TrendingDown className="w-4 h-4 text-red-500" />
  }

  const getProgressColor = () => {
    if (isOnTarget) return 'bg-green-500'
    if (isNearTarget) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`metric-card ${getStatusColor()}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {indicator.name}
          </h3>
          {indicator.description && (
            <p className="text-sm text-gray-600 mb-2">
              {indicator.description}
            </p>
          )}
          <p className="text-xs text-gray-500">
            Atualizado {formatDistanceToNow(new Date(indicator.updatedAt), {
              addSuffix: true,
              locale: ptBR,
            })}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onEdit}
            className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="text-2xl font-bold text-gray-900">
              {indicator.value.toLocaleString('pt-BR')}
            </span>
            {indicator.unit && (
              <span className="text-sm text-gray-500">{indicator.unit}</span>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Meta</p>
            <p className="text-lg font-semibold text-gray-700">
              {indicator.target.toLocaleString('pt-BR')}
              {indicator.unit && <span className="text-sm ml-1">{indicator.unit}</span>}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Progresso</span>
            <span className={`text-sm font-medium ${
              isOnTarget ? 'text-green-600' : 
              isNearTarget ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {percentage.toFixed(1)}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${getStatusColor()}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            {isOnTarget ? 'Meta atingida!' : 
             isNearTarget ? 'Próximo da meta' : 'Abaixo da meta'}
          </span>
          <span className={`font-medium ${
            percentage >= 100 ? 'text-green-600' : 
            percentage >= 80 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {percentage >= 100 ? '+' : ''}{(percentage - 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}
