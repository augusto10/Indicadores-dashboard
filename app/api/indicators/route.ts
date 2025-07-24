import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department')
    const userId = searchParams.get('userId')

    const where: any = {}
    if (department) where.department = department
    if (userId) where.userId = userId

    const indicators = await prisma.indicator.findMany({
      where,
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
    })

    return NextResponse.json(indicators)
  } catch (error) {
    console.error('Error fetching indicators:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { name, value, target, unit, description, userId, department } = await request.json()

    // Validate required fields
    if (!name || value === undefined || target === undefined || !userId || !department) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify user can only create indicators for their own department
    if (session.user.department !== department || session.user.id !== userId) {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      )
    }

    const indicator = await prisma.indicator.create({
      data: {
        name,
        value: parseFloat(value),
        target: parseFloat(target),
        unit: unit || '',
        description: description || '',
        userId,
        department,
      },
      include: {
        user: {
          select: {
            name: true,
            department: true,
          },
        },
      },
    })

    return NextResponse.json(indicator, { status: 201 })
  } catch (error) {
    console.error('Error creating indicator:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id, name, value, target, unit, description } = await request.json()

    if (!id) {
      return NextResponse.json(
        { message: 'Missing indicator ID' },
        { status: 400 }
      )
    }

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

    const indicator = await prisma.indicator.update({
      where: { id },
      data: {
        name,
        value: parseFloat(value),
        target: parseFloat(target),
        unit: unit || '',
        description: description || '',
      },
      include: {
        user: {
          select: {
            name: true,
            department: true,
          },
        },
      },
    })

    return NextResponse.json(indicator)
  } catch (error) {
    console.error('Error updating indicator:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
