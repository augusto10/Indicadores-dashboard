import { NextRequest, NextResponse } from 'next/server'
import { sendDailyReports } from '@/lib/scheduler'

export async function GET(request: NextRequest) {
  try {
    // Verify the request is from a cron job (you can add authentication here)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    console.log('Starting scheduled daily reports...')
    await sendDailyReports()
    
    return NextResponse.json({ 
      message: 'Daily reports sent successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in daily reports cron job:', error)
    return NextResponse.json(
      { message: 'Error sending daily reports', error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Allow manual triggering of daily reports
  try {
    console.log('Manual trigger of daily reports...')
    await sendDailyReports()
    
    return NextResponse.json({ 
      message: 'Daily reports sent successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in manual daily reports trigger:', error)
    return NextResponse.json(
      { message: 'Error sending daily reports', error: error.message },
      { status: 500 }
    )
  }
}
