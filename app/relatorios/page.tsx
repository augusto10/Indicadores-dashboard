export const dynamic = 'force-dynamic'

import { ReportsView } from '@/components/ReportsView'
import { prisma } from '@/lib/prisma'

async function getIndicatorsData() {
  try {
    const indicators = await prisma.indicator.findMany({
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 100
    })

    const goals = await prisma.goal.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { indicators, goals }
  } catch (error) {
    console.error('Error fetching indicators data:', error)
    return { indicators: [], goals: [] }
  }
}

export default async function RelatoriosPage() {
  const { indicators, goals } = await getIndicatorsData()

  return (
    <ReportsView 
      indicators={indicators} 
      goals={goals}
      dateRange="7 de jul. de 2025 - 3 de ago. de 2025"
    />
  )
}
