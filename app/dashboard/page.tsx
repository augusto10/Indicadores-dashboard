import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { Prisma, Department } from '@prisma/client'
import { DashboardOverview } from '@/components/DashboardOverview'
import { MetricsGrid } from '@/components/MetricsGrid'
import { RecentActivity } from '@/components/RecentActivity'
import { IndicatorCharts } from '@/components/IndicatorCharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

async function getDashboardData(userDepartment?: string, isDirector: boolean = false) {
  // Se for diretor, buscar todos os indicadores. Caso contrário, filtrar por departamento (enum Prisma)
  const indicatorFilter: Prisma.IndicatorWhereInput = (isDirector || !userDepartment)
    ? {}
    : { department: userDepartment as Department }
  
  const [indicators, goals] = await Promise.all([
    prisma.indicator.findMany({
      where: indicatorFilter,
      include: {
        user: {
          select: {
            name: true,
            department: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: isDirector ? 200 : 50, // Diretores veem mais indicadores
    }),
    prisma.goal.findMany({
      where: {
        isActive: true,
        ...(isDirector || !userDepartment ? {} : { department: userDepartment as Department })
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ])

  return { indicators, goals }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const isDirector = session?.user?.department === 'DIRETORIA' || session?.user?.role === 'DIRECTOR'
  const { indicators, goals } = await getDashboardData(session?.user?.department, isDirector)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo, {session?.user?.name} - {session?.user?.department}
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="charts">Gráficos e Análises</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <DashboardOverview indicators={indicators} goals={goals} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MetricsGrid indicators={indicators} goals={goals} />
            </div>
            <div>
              <RecentActivity indicators={indicators} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="charts" className="space-y-6">
          <IndicatorCharts 
            indicators={indicators.map(ind => ({
              ...ind,
              // normalizar tipos para o componente de gráficos
              unit: ind.unit ?? undefined,
              department: String(ind.department),
              date: new Date(ind.date)
            }))}
            userDepartment={session?.user?.department}
            isDirector={isDirector}
          />
        </TabsContent>
        
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <MetricsGrid indicators={indicators} goals={goals} />
            <RecentActivity indicators={indicators} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
