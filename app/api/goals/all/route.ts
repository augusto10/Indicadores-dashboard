import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.department !== 'DIRETORIA' && session.user.role !== 'ADMIN')) {
    return new NextResponse(JSON.stringify({ error: 'Acesso não autorizado' }), { status: 403 })
  }

  try {
    const goals = await prisma.goal.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        department: 'asc',
      },
    })
    return NextResponse.json(goals)
  } catch (error) {
    console.error('Erro ao buscar todas as metas:', error)
    return new NextResponse(JSON.stringify({ error: 'Erro ao buscar metas' }), { status: 500 })
  }
}
