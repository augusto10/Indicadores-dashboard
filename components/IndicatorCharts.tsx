'use client'

import { useState, useMemo } from 'react'
import { format, startOfMonth, endOfMonth, subMonths, isWithinInterval } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'

interface Indicator {
  id: string
  name: string
  value: number
  target: number
  unit?: string
  department: string
  date: Date
  user: {
    name: string
    department: string
  }
}

interface IndicatorChartsProps {
  indicators: Indicator[]
  userDepartment?: string
  isDirector?: boolean
}

const DEPARTMENT_COLORS = {
  COMERCIAL: '#3B82F6',
  LOGISTICA: '#10B981',
  COMPRAS: '#F59E0B',
  FINANCEIRO: '#EF4444',
  TI: '#8B5CF6',
  DIRETORIA: '#6B7280'
}

const DEPARTMENT_NAMES = {
  COMERCIAL: 'Comercial',
  LOGISTICA: 'Logística',
  COMPRAS: 'Compras',
  FINANCEIRO: 'Financeiro',
  TI: 'TI',
  DIRETORIA: 'Diretoria'
}

export function IndicatorCharts({ indicators, userDepartment, isDirector = false }: IndicatorChartsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '3m' | '6m' | '1y'>('30d')
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])

  // Filtrar indicadores baseado no período selecionado
  const filteredIndicators = useMemo(() => {
    const now = new Date()
    let startDate: Date

    switch (selectedPeriod) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case '3m':
        startDate = subMonths(now, 3)
        break
      case '6m':
        startDate = subMonths(now, 6)
        break
      case '1y':
        startDate = subMonths(now, 12)
        break
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    let filtered = indicators.filter(indicator => 
      new Date(indicator.date) >= startDate
    )

    // Se não for diretor, filtrar apenas o departamento do usuário
    if (!isDirector && userDepartment) {
      filtered = filtered.filter(indicator => indicator.department === userDepartment)
    }

    // Filtrar por departamentos selecionados se houver
    if (selectedDepartments.length > 0) {
      filtered = filtered.filter(indicator => 
        selectedDepartments.includes(indicator.department)
      )
    }

    return filtered
  }, [indicators, selectedPeriod, userDepartment, isDirector, selectedDepartments])

  // Dados para gráfico de barras - Performance por departamento
  const departmentPerformanceData = useMemo(() => {
    const departmentStats = filteredIndicators.reduce((acc, indicator) => {
      const dept = indicator.department
      if (!acc[dept]) {
        acc[dept] = {
          department: DEPARTMENT_NAMES[dept as keyof typeof DEPARTMENT_NAMES] || dept,
          totalValue: 0,
          totalTarget: 0,
          count: 0,
          performance: 0
        }
      }
      acc[dept].totalValue += indicator.value
      acc[dept].totalTarget += indicator.target
      acc[dept].count += 1
      return acc
    }, {} as Record<string, any>)

    return Object.values(departmentStats).map((dept: any) => ({
      ...dept,
      avgValue: dept.totalValue / dept.count,
      avgTarget: dept.totalTarget / dept.count,
      performance: ((dept.totalValue / dept.totalTarget) * 100).toFixed(1)
    }))
  }, [filteredIndicators])

  // Dados para gráfico de pizza - Distribuição de indicadores por departamento
  const departmentDistributionData = useMemo(() => {
    const distribution = filteredIndicators.reduce((acc, indicator) => {
      const dept = indicator.department
      acc[dept] = (acc[dept] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(distribution).map(([dept, count]) => ({
      name: DEPARTMENT_NAMES[dept as keyof typeof DEPARTMENT_NAMES] || dept,
      value: count,
      color: DEPARTMENT_COLORS[dept as keyof typeof DEPARTMENT_COLORS] || '#6B7280'
    }))
  }, [filteredIndicators])

  // Dados para gráfico de linha - Evolução temporal
  const timeSeriesData = useMemo(() => {
    const grouped = filteredIndicators.reduce((acc, indicator) => {
      const dateKey = format(new Date(indicator.date), 'yyyy-MM-dd')
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          displayDate: format(new Date(indicator.date), 'dd/MM', { locale: ptBR }),
          totalValue: 0,
          totalTarget: 0,
          count: 0
        }
      }
      acc[dateKey].totalValue += indicator.value
      acc[dateKey].totalTarget += indicator.target
      acc[dateKey].count += 1
      return acc
    }, {} as Record<string, any>)

    return Object.values(grouped)
      .map((item: any) => ({
        ...item,
        avgValue: item.totalValue / item.count,
        avgTarget: item.totalTarget / item.count,
        performance: (item.totalValue / item.totalTarget) * 100
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [filteredIndicators])

  const availableDepartments = useMemo(() => {
    const departmentSet = new Set(indicators.map(i => i.department))
    const departments = Array.from(departmentSet)
    return departments.map(dept => ({
      value: dept,
      label: DEPARTMENT_NAMES[dept as keyof typeof DEPARTMENT_NAMES] || dept,
      color: DEPARTMENT_COLORS[dept as keyof typeof DEPARTMENT_COLORS] || '#6B7280'
    }))
  }, [indicators])

  const toggleDepartment = (department: string) => {
    setSelectedDepartments(prev => 
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    )
  }

  return (
    <div className="space-y-6">
      {/* Controles de Filtro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Filtros de Análise
          </CardTitle>
          <CardDescription>
            Selecione o período e departamentos para análise dos indicadores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filtro de Período */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Período de Análise
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: '7d', label: '7 dias' },
                { value: '30d', label: '30 dias' },
                { value: '3m', label: '3 meses' },
                { value: '6m', label: '6 meses' },
                { value: '1y', label: '1 ano' }
              ].map((period) => (
                <Button
                  key={period.value}
                  variant={selectedPeriod === period.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.value as any)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Filtro de Departamentos (apenas para diretores) */}
          {isDirector && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Departamentos (deixe vazio para ver todos)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableDepartments.map((dept) => (
                  <Button
                    key={dept.value}
                    variant={selectedDepartments.includes(dept.value) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleDepartment(dept.value)}
                    style={{
                      backgroundColor: selectedDepartments.includes(dept.value) ? dept.color : undefined,
                      borderColor: dept.color
                    }}
                  >
                    {dept.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gráfico de Barras - Performance por Departamento */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Departamento</CardTitle>
          <CardDescription>
            Comparação entre valores realizados e metas por departamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={departmentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  typeof value === 'number' ? value.toFixed(2) : value,
                  name === 'avgValue' ? 'Valor Médio' : 
                  name === 'avgTarget' ? 'Meta Média' : 
                  name === 'performance' ? 'Performance (%)' : name
                ]}
              />
              <Legend />
              <Bar dataKey="avgValue" fill="#3B82F6" name="Valor Médio" />
              <Bar dataKey="avgTarget" fill="#10B981" name="Meta Média" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Pizza - Distribuição por Departamento */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Indicadores</CardTitle>
          <CardDescription>
            Quantidade de indicadores por departamento no período selecionado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={departmentDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Linha - Evolução Temporal */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução Temporal dos Indicadores</CardTitle>
          <CardDescription>
            Acompanhamento da performance ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="displayDate" />
              <YAxis />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  typeof value === 'number' ? value.toFixed(2) : value,
                  name === 'avgValue' ? 'Valor Médio' : 
                  name === 'avgTarget' ? 'Meta Média' : 
                  name === 'performance' ? 'Performance (%)' : name
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="avgValue" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Valor Médio"
              />
              <Line 
                type="monotone" 
                dataKey="avgTarget" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Meta Média"
              />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#F59E0B" 
                strokeWidth={2}
                name="Performance (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resumo Estatístico */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Período</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {filteredIndicators.length}
              </div>
              <div className="text-sm text-gray-600">Total de Indicadores</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {departmentPerformanceData.length}
              </div>
              <div className="text-sm text-gray-600">Departamentos Ativos</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredIndicators.length > 0 
                  ? ((filteredIndicators.reduce((acc, ind) => acc + ind.value, 0) / 
                      filteredIndicators.reduce((acc, ind) => acc + ind.target, 0)) * 100).toFixed(1)
                  : '0'
                }%
              </div>
              <div className="text-sm text-gray-600">Performance Média</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {selectedPeriod === '7d' ? '7 dias' :
                 selectedPeriod === '30d' ? '30 dias' :
                 selectedPeriod === '3m' ? '3 meses' :
                 selectedPeriod === '6m' ? '6 meses' : '1 ano'}
              </div>
              <div className="text-sm text-gray-600">Período Analisado</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
