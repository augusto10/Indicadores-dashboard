import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Target, Users, Truck, ShoppingCart, DollarSign } from 'lucide-react'

interface Goal {
  id: string
  name: string
  description?: string | null
  department: 'COMERCIAL' | 'LOGISTICA' | 'COMPRAS' | 'FINANCEIRO' | string
  target: number
  current?: number | null
  unit?: string | null
  isActive: boolean
}

const DEPARTMENT_INFO: Record<string, { title: string; color: string; icon: any; description: string }> = {
  COMERCIAL: {
    title: 'Comercial',
    color: 'from-blue-500 to-blue-700',
    icon: Users,
    description:
      'Metas focadas em faturamento, positivação e crescimento de vendas. Acompanhe o desempenho mensal e diário frente às metas definidas.'
  },
  LOGISTICA: {
    title: 'Logística',
    color: 'from-green-500 to-green-700',
    icon: Truck,
    description:
      'Metas orientadas à eficiência operacional: OTIF, Taxa de Devolução e Custo Logístico. Objetivo é garantir nível de serviço com menor custo.'
  },
  COMPRAS: {
    title: 'Compras',
    color: 'from-purple-500 to-purple-700',
    icon: ShoppingCart,
    description:
      'Metas para disponibilidade e saúde de estoque: Ruptura, Cobertura e Curva C. Buscam equilíbrio entre giro e nível de serviço.'
  },
  FINANCEIRO: {
    title: 'Financeiro',
    color: 'from-orange-500 to-orange-700',
    icon: DollarSign,
    description:
      'Metas de saúde financeira: Inadimplência, Utilização de Limites e Limites Implantados. Foco na adimplência e capital de giro.'
  }
}

function getPerformanceColor(dept: string, name: string, current: number, target: number) {
  // Padrões por setor conforme regras conhecidas
  const pct = target > 0 ? (current / target) * 100 : 0

  if (dept === 'COMERCIAL') {
    if (pct >= 100) return 'text-green-600'
    if (pct >= 80) return 'text-orange-500'
    return 'text-red-600'
  }
  if (dept === 'LOGISTICA') {
    // Preferências: OTIF maior melhor (>95), Devolução menor melhor (<5), Custo menor melhor (<3.5)
    const n = name.toLowerCase()
    if (n.includes('otif')) return current >= target ? 'text-green-600' : 'text-red-600'
    if (n.includes('devolu')) return current <= target ? 'text-green-600' : 'text-red-600'
    if (n.includes('custo')) return current <= target ? 'text-green-600' : 'text-red-600'
    return pct >= 100 ? 'text-green-600' : 'text-red-600'
  }
  if (dept === 'COMPRAS') {
    // regras típicas: Ruptura% menor melhor; Cobertura (dias) dentro da faixa; Curva C% menor melhor
    const n = name.toLowerCase()
    if (n.includes('ruptura')) return current <= target ? 'text-green-600' : 'text-red-600'
    if (n.includes('curva c')) return current <= target ? 'text-green-600' : 'text-red-600'
    // cobertura sem faixa: considerar aproximação da meta como melhor
    return Math.abs(current - target) <= target * 0.1 ? 'text-green-600' : 'text-orange-500'
  }
  if (dept === 'FINANCEIRO') {
    // Inadimplência% menor melhor
    const n = name.toLowerCase()
    if (n.includes('inadimpl')) return current <= target ? 'text-green-600' : 'text-red-600'
    return pct >= 100 ? 'text-green-600' : 'text-orange-500'
  }
  return pct >= 100 ? 'text-green-600' : pct >= 80 ? 'text-orange-500' : 'text-red-600'
}

function ProgressBar({ value, max, goodIsLower = false }: { value: number; max: number; goodIsLower?: boolean }) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0
  const isGood = goodIsLower ? value <= max : value >= max
  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className={`h-2 rounded ${isGood ? 'bg-green-500' : 'bg-red-500'}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

async function getGoals(): Promise<Goal[]> {
  // Buscar metas ativas diretamente via Prisma (server component)
  const goals = await prisma.goal.findMany({
    where: { isActive: true },
    orderBy: [{ department: 'asc' }, { createdAt: 'desc' }]
  })
  return goals as unknown as Goal[]
}

export default async function GoalsPage() {
  const goals = await getGoals()

  const departments = ['COMERCIAL', 'LOGISTICA', 'COMPRAS', 'FINANCEIRO']
  const goalsByDept = Object.fromEntries(
    departments.map((d) => [d, goals.filter((g) => g.department === d)])
  ) as Record<string, Goal[]>

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Target className="h-6 w-6 text-primary-600" /> Metas por Setor
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept) => {
          const info = DEPARTMENT_INFO[dept]
          const Icon = info.icon
          const items = goalsByDept[dept] || []

          return (
            <Card key={dept}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${info.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      {info.title}
                    </CardTitle>
                    <CardDescription className="mt-1">{info.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{items.length} metas</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <div className="text-sm text-gray-500">Nenhuma meta cadastrada para este setor.</div>
                ) : (
                  <div className="space-y-4">
                    {items.map((g) => {
                      const current = typeof g.current === 'number' ? g.current! : 0
                      const target = typeof g.target === 'number' ? g.target : 0
                      const unit = g.unit || ''
                      const pct = target > 0 ? (current / target) * 100 : 0
                      const perfColor = getPerformanceColor(g.department, g.name, current, target)
                      const goodIsLower = (() => {
                        const n = g.name.toLowerCase()
                        if (g.department === 'LOGISTICA' && (n.includes('devolu') || n.includes('custo'))) return true
                        if (g.department === 'COMPRAS' && (n.includes('ruptura') || n.includes('curva c'))) return true
                        if (g.department === 'FINANCEIRO' && n.includes('inadimpl')) return true
                        return false
                      })()

                      return (
                        <div key={g.id} className="p-4 rounded-lg border border-gray-200">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{g.name}</div>
                              {g.description && (
                                <div className="text-xs text-gray-500 mt-1">{g.description}</div>
                              )}
                            </div>
                            <div className={`text-sm font-semibold ${perfColor} flex items-center gap-1`}>
                              {goodIsLower ? (
                                current <= target ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />
                              ) : (
                                current >= target ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
                              )}
                              {target > 0 ? pct.toFixed(1) : '0'}%
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="bg-blue-50 rounded p-2">
                              <div className="text-blue-700 font-medium">Atual</div>
                              <div className="text-blue-900">{current.toLocaleString('pt-BR')} {unit}</div>
                            </div>
                            <div className="bg-gray-50 rounded p-2">
                              <div className="text-gray-700 font-medium">Meta</div>
                              <div className="text-gray-900">{target.toLocaleString('pt-BR')} {unit}</div>
                            </div>
                            <div className="bg-purple-50 rounded p-2">
                              <div className="text-purple-700 font-medium">Diferença</div>
                              <div className="text-purple-900">{(current - target).toLocaleString('pt-BR')} {unit}</div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <ProgressBar value={current} max={target || 1} goodIsLower={goodIsLower} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
