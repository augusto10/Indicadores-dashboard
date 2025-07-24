import { prisma } from './prisma'
import { sendDailyReport, DashboardData } from './email'
import { sendDailyWhatsAppReport } from './whatsapp'

export async function generateDashboardData(): Promise<DashboardData[]> {
  const indicators = await prisma.indicator.findMany({
    include: {
      user: {
        select: {
          name: true,
          department: true,
        },
      },
    },
  })

  // Group indicators by department
  const departmentGroups = indicators.reduce((acc, indicator) => {
    const dept = indicator.user.department
    if (!acc[dept]) {
      acc[dept] = []
    }
    acc[dept].push(indicator)
    return acc
  }, {} as Record<string, any[]>)

  // Generate dashboard data for each department
  const dashboardData: DashboardData[] = Object.entries(departmentGroups).map(([department, deptIndicators]) => {
    const processedIndicators = deptIndicators.map(indicator => {
      const percentage = (indicator.value / indicator.target) * 100
      let status: 'success' | 'warning' | 'danger' = 'danger'
      
      if (percentage >= 100) status = 'success'
      else if (percentage >= 80) status = 'warning'

      return {
        name: indicator.name,
        value: indicator.value,
        target: indicator.target,
        unit: indicator.unit || '',
        percentage,
        status,
      }
    })

    const achievedTargets = processedIndicators.filter(ind => ind.status === 'success').length
    const overallPerformance = processedIndicators.length > 0 
      ? (achievedTargets / processedIndicators.length) * 100 
      : 0

    return {
      department,
      indicators: processedIndicators,
      overallPerformance,
      totalIndicators: processedIndicators.length,
      achievedTargets,
    }
  })

  return dashboardData
}

export async function sendDailyReports() {
  try {
    console.log('Starting daily report generation...')
    
    // Get notification configuration
    const config = await prisma.notificationConfig.findFirst({
      where: { isActive: true },
    })

    if (!config) {
      console.log('No active notification configuration found')
      return
    }

    // Generate dashboard data
    const dashboardData = await generateDashboardData()

    if (dashboardData.length === 0) {
      console.log('No dashboard data available')
      return
    }

    // Send email reports
    if (config.emailEnabled && config.recipients.length > 0) {
      console.log('Sending email reports...')
      const emailResult = await sendDailyReport(config.recipients, dashboardData)
      if (emailResult.success) {
        console.log('Email reports sent successfully')
      } else {
        console.error('Failed to send email reports:', emailResult.error)
      }
    }

    // Send WhatsApp reports
    if (config.whatsappEnabled && config.whatsappNumbers.length > 0) {
      console.log('Sending WhatsApp reports...')
      const whatsappResults = await sendDailyWhatsAppReport(config.whatsappNumbers, dashboardData)
      const successCount = whatsappResults.filter(result => result.success).length
      console.log(`WhatsApp reports: ${successCount}/${whatsappResults.length} sent successfully`)
    }

    console.log('Daily reports completed')
  } catch (error) {
    console.error('Error sending daily reports:', error)
  }
}

export function scheduleReports() {
  // This would typically use a cron job or similar scheduling mechanism
  // For now, we'll provide a manual trigger via API
  console.log('Report scheduler initialized')
}
