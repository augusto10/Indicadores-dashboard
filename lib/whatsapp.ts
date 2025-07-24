import axios from 'axios'

export interface WhatsAppMessage {
  to: string
  message: string
}

export async function sendWhatsAppMessage(to: string, message: string) {
  try {
    // This is a placeholder for WhatsApp API integration
    // You can integrate with services like Twilio, WhatsApp Business API, or other providers
    
    if (!process.env.WHATSAPP_API_URL || !process.env.WHATSAPP_TOKEN) {
      console.log('WhatsApp API not configured')
      return { success: false, error: 'WhatsApp API not configured' }
    }

    const response = await axios.post(
      process.env.WHATSAPP_API_URL,
      {
        to,
        message,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('WhatsApp message sent successfully')
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
    return { success: false, error }
  }
}

export async function sendDailyWhatsAppReport(
  recipients: string[],
  dashboardData: any[]
) {
  const message = generateWhatsAppReportMessage(dashboardData)
  
  const results = await Promise.all(
    recipients.map(async (recipient) => {
      return await sendWhatsAppMessage(recipient, message)
    })
  )

  return results
}

function generateWhatsAppReportMessage(dashboardData: any[]): string {
  const totalPerformance = dashboardData.reduce((acc, dept) => acc + dept.overallPerformance, 0) / dashboardData.length
  const totalIndicators = dashboardData.reduce((acc, dept) => acc + dept.totalIndicators, 0)
  const totalAchieved = dashboardData.reduce((acc, dept) => acc + dept.achievedTargets, 0)

  let message = `📊 *RELATÓRIO DIÁRIO DE INDICADORES*\n`
  message += `📅 ${new Date().toLocaleDateString('pt-BR')}\n\n`
  
  message += `📈 *RESUMO GERAL*\n`
  message += `• Performance: ${totalPerformance.toFixed(1)}%\n`
  message += `• Indicadores: ${totalIndicators}\n`
  message += `• Metas atingidas: ${totalAchieved}\n`
  message += `• Departamentos: ${dashboardData.length}\n\n`

  dashboardData.forEach(dept => {
    const emoji = dept.overallPerformance >= 80 ? '🟢' : dept.overallPerformance >= 60 ? '🟡' : '🔴'
    message += `${emoji} *${dept.department}*\n`
    message += `Performance: ${dept.overallPerformance.toFixed(1)}%\n`
    
    dept.indicators.slice(0, 3).forEach((indicator: any) => {
      const statusEmoji = indicator.status === 'success' ? '✅' : indicator.status === 'warning' ? '⚠️' : '❌'
      message += `${statusEmoji} ${indicator.name}: ${indicator.value.toLocaleString('pt-BR')}/${indicator.target.toLocaleString('pt-BR')} ${indicator.unit}\n`
    })
    
    if (dept.indicators.length > 3) {
      message += `... e mais ${dept.indicators.length - 3} indicadores\n`
    }
    message += `\n`
  })

  message += `🔗 Acesse o dashboard completo em: ${process.env.APP_URL}\n\n`
  message += `_Relatório gerado automaticamente pelo sistema Esplendor Indicadores_`

  return message
}
