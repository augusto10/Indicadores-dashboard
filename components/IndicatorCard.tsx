'use client'

import { motion } from 'framer-motion'
import { Edit, Trash2, TrendingUp, TrendingDown, Target } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { safeDivide, clampPercent, formatPercent, formatNumber } from '../utils/format'

interface IndicatorCardProps {
  indicator: any
  onEdit: () => void
  onDelete: () => void
}

export function IndicatorCard({ indicator, onEdit, onDelete }: IndicatorCardProps) {
  // Safe percentage with clamping to avoid absurd values like 1666050.4%
  const percentageRaw = safeDivide(indicator?.value ?? 0, indicator?.target ?? 0, 0) * 100
  const percentage = clampPercent(percentageRaw, 0, 200)
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

  const renderSparkline = (data?: number[]) => {
    if (!data || data.length < 2) return null
    const width = 72
    const height = 28
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const points = data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * width
        const y = height - ((v - min) / range) * height
        return `${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')
    const positiveTrend = data[data.length - 1] >= data[0]
    const stroke = positiveTrend ? '#16a34a' : '#dc2626' // green-600 / red-600
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="ml-2">
        <polyline
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          points={points}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    )
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
              {formatNumber(indicator.value)}
            </span>
            {indicator.unit && (
              <span className="text-sm text-gray-500">{indicator.unit}</span>
            )}
            {renderSparkline(indicator.trendData)}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Meta</p>
            <p className="text-lg font-semibold text-gray-700">
              {formatNumber(indicator.target)}
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
              {formatPercent(percentage)}
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
            {percentage >= 100 ? '+' : ''}{formatPercent(clampPercent(percentage - 100, -100, 100))}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
