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

  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get('days') || '30', 10)
  const dateLimit = new Date()
  dateLimit.setDate(dateLimit.getDate() - days)

  try {
    const indicators = await prisma.indicator.findMany({
      where: {
        date: {
          gte: dateLimit,
        },
      },
      orderBy: {
        date: 'desc',
      },
    })
    return NextResponse.json(indicators)
  } catch (error) {
    console.error('Erro ao buscar todos os indicadores:', error)
    return new NextResponse(JSON.stringify({ error: 'Erro ao buscar indicadores' }), { status: 500 })
  }
}
