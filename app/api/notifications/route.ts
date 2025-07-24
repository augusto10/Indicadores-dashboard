import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendDailyReports } from '@/lib/scheduler'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const config = await prisma.notificationConfig.findFirst({
      where: { isActive: true },
    })

    return NextResponse.json(config)
  } catch (error) {
    console.error('Error fetching notification config:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const {
      emailEnabled,
      whatsappEnabled,
      recipients,
      whatsappNumbers,
      sendTime,
    } = await request.json()

    // Deactivate existing configs
    await prisma.notificationConfig.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    })

    // Create new config
    const config = await prisma.notificationConfig.create({
      data: {
        emailEnabled: emailEnabled || false,
        whatsappEnabled: whatsappEnabled || false,
        recipients: recipients || [],
        whatsappNumbers: whatsappNumbers || [],
        sendTime: sendTime || '09:00',
        isActive: true,
      },
    })

    return NextResponse.json(config, { status: 201 })
  } catch (error) {
    console.error('Error creating notification config:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { action } = await request.json()

    if (action === 'send_test_report') {
      await sendDailyReports()
      return NextResponse.json({ message: 'Test report sent successfully' })
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error processing notification action:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
