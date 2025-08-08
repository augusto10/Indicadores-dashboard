import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || (session.user.department !== 'DIRETORIA' && session.user.role !== 'ADMIN')) {
    return new NextResponse(JSON.stringify({ error: 'Acesso não autorizado' }), { status: 403 })
  }

  try {
    const body = await request.json()
    const { target, unit, description, isActive, name, department } = body

    const updated = await prisma.goal.update({
      where: { id: params.id },
      data: {
        ...(target !== undefined ? { target: Number(target) } : {}),
        ...(unit !== undefined ? { unit: unit ?? null } : {}),
        ...(description !== undefined ? { description: description ?? null } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
        ...(name !== undefined ? { name } : {}),
        ...(department !== undefined ? { department } : {}),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Erro ao atualizar meta:', error)
    return new NextResponse(JSON.stringify({ error: 'Erro ao atualizar meta' }), { status: 500 })
  }
}
