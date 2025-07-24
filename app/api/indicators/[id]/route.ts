import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    // Check if indicator exists and belongs to user
    const existingIndicator = await prisma.indicator.findUnique({
      where: { id },
    })

    if (!existingIndicator) {
      return NextResponse.json(
        { message: 'Indicator not found' },
        { status: 404 }
      )
    }

    if (existingIndicator.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      )
    }

    await prisma.indicator.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Indicator deleted successfully' })
  } catch (error) {
    console.error('Error deleting indicator:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
