import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const department = searchParams.get('department')
    const category = searchParams.get('category')

    // Construir filtros
    const whereClause: any = {}

    // Filtro por data
    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate + 'T00:00:00.000Z'),
        lte: new Date(endDate + 'T23:59:59.999Z')
      }
    }

    // Filtro por departamento
    if (department && department !== 'ALL') {
      whereClause.department = department as any
    }

    // Buscar indicadores
    let indicators = await prisma.indicator.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            name: true,
            department: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    // Buscar metas ativas
    const goalsWhereClause: any = {
      isActive: true
    }
    if (department && department !== 'ALL') {
      goalsWhereClause.department = department as any
    }
    let goals = await prisma.goal.findMany({
      where: goalsWhereClause,
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Filtro por categoria (in-memory via palavras-chave)
    const normalizedCategory = category && category !== 'TODAS' ? category.toUpperCase() : null
    if (normalizedCategory) {
      const categoryKeywords: Record<string, string[]> = {
        VENDAS: ['Faturamento', 'Positivação', 'Venda', 'Ticket'],
        OPERACIONAL: ['OTIF', 'Devolução', 'Custo Logístico', 'Custo', 'Ruptura', 'Cobertura', 'Curva', 'Entrega', 'Operacional'],
        FINANCEIRO: ['Inadimplência', 'Limites', 'Financeiro', 'Margem', 'Custo Financeiro']
      }

      const matchesCategory = (name: string, cat: string) => {
        const list = categoryKeywords[cat] || []
        return list.some(keyword => name.toLowerCase().includes(keyword.toLowerCase()))
      }

      indicators = indicators.filter(i => matchesCategory(i.name, normalizedCategory))
      goals = goals.filter(g => matchesCategory(g.name, normalizedCategory))
    }

    // Agrupar indicadores por departamento e nome para análise
    const groupedIndicators = indicators.reduce((acc, indicator) => {
      const key = `${indicator.department}-${indicator.name}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(indicator)
      return acc
    }, {} as Record<string, typeof indicators>)

    // Calcular estatísticas por indicador
    const statistics = Object.entries(groupedIndicators).map(([key, items]) => {
      const [department, name] = key.split('-', 2)
      const values = items.map(item => item.value)
      const targets = items.map(item => item.target)
      
      return {
        department,
        name,
        count: items.length,
        latest: items[0], // Mais recente (ordenado por data desc)
        average: values.reduce((sum, val) => sum + val, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        averageTarget: targets.reduce((sum, val) => sum + val, 0) / targets.length,
        trend: values.length > 1 ? (values[0] - values[values.length - 1]) : 0,
        dates: items.map(item => item.date)
      }
    })

    return NextResponse.json({
      indicators,
      goals,
      statistics,
      summary: {
        totalIndicators: indicators.length,
        dateRange: { startDate, endDate },
        departments: Array.from(new Set(indicators.map(i => i.department))),
        period: startDate && endDate ? 
          `${new Date(startDate).toLocaleDateString('pt-BR')} - ${new Date(endDate).toLocaleDateString('pt-BR')}` : 
          'Todos os períodos'
      }
    })

  } catch (error) {
    console.error('Error fetching filtered indicators:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor', error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
}
