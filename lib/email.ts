import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface DashboardData {
  department: string
  indicators: Array<{
    name: string
    value: number
    target: number
    unit: string
    percentage: number
    status: 'success' | 'warning' | 'danger'
  }>
  overallPerformance: number
  totalIndicators: number
  achievedTargets: number
}

export async function sendDailyReport(
  recipients: string[],
  dashboardData: DashboardData[]
) {
  const htmlContent = generateReportHTML(dashboardData)
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipients.join(', '),
    subject: `Relatório Diário de Indicadores - ${new Date().toLocaleDateString('pt-BR')}`,
    html: htmlContent,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Daily report sent successfully')
    return { success: true }
  } catch (error) {
    console.error('Error sending daily report:', error)
    return { success: false, error }
  }
}

function generateReportHTML(dashboardData: DashboardData[]): string {
  const totalPerformance = dashboardData.reduce((acc, dept) => acc + dept.overallPerformance, 0) / dashboardData.length
  const totalIndicators = dashboardData.reduce((acc, dept) => acc + dept.totalIndicators, 0)
  const totalAchieved = dashboardData.reduce((acc, dept) => acc + dept.achievedTargets, 0)

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Relatório Diário de Indicadores</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .summary { padding: 30px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .summary-card { background: white; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #3b82f6; }
        .summary-card h3 { margin: 0 0 10px 0; color: #1f2937; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .summary-card .value { font-size: 32px; font-weight: bold; color: #3b82f6; margin: 0; }
        .department { margin: 30px; }
        .department h2 { color: #1f2937; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; }
        .indicators-grid { display: grid; gap: 15px; }
        .indicator { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #6b7280; }
        .indicator.success { border-left-color: #10b981; }
        .indicator.warning { border-left-color: #f59e0b; }
        .indicator.danger { border-left-color: #ef4444; }
        .indicator-header { display: flex; justify-content: between; align-items: center; margin-bottom: 10px; }
        .indicator-name { font-weight: bold; color: #1f2937; }
        .indicator-value { font-size: 18px; font-weight: bold; }
        .indicator-target { font-size: 14px; color: #6b7280; }
        .progress-bar { width: 100%; height: 8px; background-color: #e2e8f0; border-radius: 4px; overflow: hidden; margin-top: 10px; }
        .progress-fill { height: 100%; transition: width 0.3s ease; }
        .progress-fill.success { background-color: #10b981; }
        .progress-fill.warning { background-color: #f59e0b; }
        .progress-fill.danger { background-color: #ef4444; }
        .footer { padding: 30px; text-align: center; background-color: #1f2937; color: white; }
        .footer p { margin: 0; opacity: 0.8; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Relatório Diário de Indicadores</h1>
          <p>Esplendor Indicadores - ${new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>

        <div class="summary">
          <div class="summary-grid">
            <div class="summary-card">
              <h3>Performance Geral</h3>
              <p class="value">${totalPerformance.toFixed(1)}%</p>
            </div>
            <div class="summary-card">
              <h3>Total de Indicadores</h3>
              <p class="value">${totalIndicators}</p>
            </div>
            <div class="summary-card">
              <h3>Metas Atingidas</h3>
              <p class="value">${totalAchieved}</p>
            </div>
            <div class="summary-card">
              <h3>Departamentos</h3>
              <p class="value">${dashboardData.length}</p>
            </div>
          </div>
        </div>

        ${dashboardData.map(dept => `
          <div class="department">
            <h2>${dept.department}</h2>
            <div class="indicators-grid">
              ${dept.indicators.map(indicator => `
                <div class="indicator ${indicator.status}">
                  <div class="indicator-header">
                    <span class="indicator-name">${indicator.name}</span>
                    <div>
                      <span class="indicator-value">${indicator.value.toLocaleString('pt-BR')} ${indicator.unit}</span>
                      <div class="indicator-target">Meta: ${indicator.target.toLocaleString('pt-BR')} ${indicator.unit}</div>
                    </div>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill ${indicator.status}" style="width: ${Math.min(indicator.percentage, 100)}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <div class="footer">
          <p>Este relatório foi gerado automaticamente pelo sistema Esplendor Indicadores</p>
        </div>
      </div>
    </body>
    </html>
  `
}
