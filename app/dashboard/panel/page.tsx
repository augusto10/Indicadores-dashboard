import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Department } from '@prisma/client'
import { DepartmentPanel } from '@/components/DepartmentPanel'
import { GeneralDashboard } from '@/components/GeneralDashboard'
import { redirect } from 'next/navigation'

async function getUserIndicators(userId: string, department: string) {
  const indicators = await prisma.indicator.findMany({
    where: {
      userId,
      department: department as Department,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const goals = await prisma.goal.findMany({
    where: {
      department: department as Department,
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { indicators, goals }
}

export default async function PanelPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  // Se for da diretoria, mostra o painel geral
  if (session.user.department === 'DIRETORIA') {
    return <GeneralDashboard userId={session.user.id} />
  }

  // Para outros departamentos, mostra o painel específico
  const { indicators, goals } = await getUserIndicators(
    session.user.id,
    session.user.department
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Painel</h1>
          <p className="text-gray-600 mt-1">
            Departamento: {session.user.department}
          </p>
        </div>
      </div>

      <DepartmentPanel
        department={session.user.department}
        userId={session.user.id}
        indicators={indicators}
        goals={goals}
      />
    </div>
  )
}
