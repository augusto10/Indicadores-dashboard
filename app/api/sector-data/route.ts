import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { department, data, date } = await request.json()

    // Verificar se o usuário pode criar dados para este departamento
    if (session.user.department !== department) {
      return NextResponse.json(
        { message: 'Forbidden: You can only submit data for your department' },
        { status: 403 }
      )
    }

    // Processar dados baseado no departamento
    const indicators = await processDataByDepartment(department, data, session.user.id, date)

    return NextResponse.json({ 
      message: 'Data saved successfully', 
      indicators,
      count: indicators.length 
    }, { status: 201 })

  } catch (error) {
    console.error('Error saving sector data:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function processDataByDepartment(department: string, data: any, userId: string, date: string) {
  const indicators = []

  switch (department) {
    case 'COMERCIAL':
      // Faturamento
      indicators.push(
        await createOrUpdateIndicator({
          name: 'Faturamento Dia',
          value: data.faturamentoDia,
          target: data.metaFaturamentoDia,
          unit: 'BRL',
          description: 'Faturamento do dia atual',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Faturamento Mês Acumulado',
          value: data.faturamentoMesAcumulado,
          target: data.metaFaturamentoMes,
          unit: 'BRL',
          description: 'Faturamento acumulado do mês',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Positivação Dia',
          value: data.positivacaoDia,
          target: data.metaPositivacaoDia,
          unit: 'UNITS',
          description: 'Positivação do dia atual',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Positivação Mês Acumulado',
          value: data.positivacaoMesAcumulado,
          target: data.metaPositivacaoMes,
          unit: 'UNITS',
          description: 'Positivação acumulada do mês',
          userId,
          department,
          date
        })
      )
      break

    case 'LOGISTICA':
      indicators.push(
        await createOrUpdateIndicator({
          name: 'OTIF Mês',
          value: data.otifMes,
          target: data.metaOtif,
          unit: 'PERCENTAGE',
          description: 'On Time In Full - dados D-2',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Taxa Devolução Mês',
          value: data.taxaDevolucaoMes,
          target: data.metaTaxaDevolucao,
          unit: 'PERCENTAGE',
          description: 'Taxa de devolução - dados D-1',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Custo Logístico Mês',
          value: data.custoLogisticoMes,
          target: data.metaCustoLogistico,
          unit: 'PERCENTAGE',
          description: 'Custo logístico - dados D-2',
          userId,
          department,
          date
        })
      )
      break

    case 'COMPRAS':
      indicators.push(
        await createOrUpdateIndicator({
          name: 'Ruptura Mês Valor',
          value: data.rupturaMesValor,
          target: data.metaRupturaValor,
          unit: 'BRL',
          description: 'Valor de ruptura do mês',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Ruptura Mês Percentual',
          value: data.rupturaMesPercentual,
          target: data.metaRupturaPercentual,
          unit: 'PERCENTAGE',
          description: 'Percentual de ruptura do mês',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Cobertura Estoque',
          value: data.coberturaEstoqueValor,
          target: data.metaCoberturaEstoque,
          unit: 'BRL',
          description: 'Valor da cobertura de estoque',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Curva C Valor',
          value: data.curvaCValor,
          target: data.metaCurvaCValor,
          unit: 'BRL',
          description: 'Valor da curva C',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Curva C Percentual',
          value: data.curvaCPercentual,
          target: data.metaCurvaCPercentual,
          unit: 'PERCENTAGE',
          description: 'Percentual da curva C',
          userId,
          department,
          date
        })
      )
      break

    case 'FINANCEIRO':
      indicators.push(
        await createOrUpdateIndicator({
          name: 'Inadimplência 45d Valor',
          value: data.inadimplencia45dValor,
          target: data.metaInadimplenciaValor,
          unit: 'BRL',
          description: 'Valor de inadimplência 45 dias',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Inadimplência 45d Percentual',
          value: data.inadimplencia45dPercentual,
          target: data.metaInadimplenciaPercentual,
          unit: 'PERCENTAGE',
          description: 'Percentual de inadimplência 45 dias',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Limites Implantados',
          value: data.limitesImplantadosValor,
          target: data.limitesImplantadosValor, // Meta é o próprio valor
          unit: 'BRL',
          description: 'Limites de crédito implantados M-1',
          userId,
          department,
          date
        }),
        await createOrUpdateIndicator({
          name: 'Utilização Semanal',
          value: data.limitesUtilizadoSemanal,
          target: data.limitesImplantadosValor * 0.8, // Meta de 80% de utilização
          unit: 'BRL',
          description: 'Utilização semanal dos limites',
          userId,
          department,
          date
        })
      )
      break

    default:
      throw new Error(`Department ${department} not supported`)
  }

  return indicators.filter(Boolean) // Remove null values
}

async function createOrUpdateIndicator(indicatorData: any) {
  try {
    // Verificar se já existe um indicador similar para hoje
    const today = new Date().toISOString().split('T')[0]
    
    const existingIndicator = await prisma.indicator.findFirst({
      where: {
        name: indicatorData.name,
        userId: indicatorData.userId,
        department: indicatorData.department,
        createdAt: {
          gte: new Date(today + 'T00:00:00.000Z'),
          lt: new Date(today + 'T23:59:59.999Z')
        }
      }
    })

    if (existingIndicator) {
      // Atualizar indicador existente
      return await prisma.indicator.update({
        where: { id: existingIndicator.id },
        data: {
          value: indicatorData.value,
          target: indicatorData.target,
          unit: indicatorData.unit,
          description: indicatorData.description,
          updatedAt: new Date()
        }
      })
    } else {
      // Criar novo indicador
      return await prisma.indicator.create({
        data: {
          name: indicatorData.name,
          value: indicatorData.value,
          target: indicatorData.target,
          unit: indicatorData.unit,
          description: indicatorData.description,
          userId: indicatorData.userId,
          department: indicatorData.department,

        }
      })
    }
  } catch (error) {
    console.error('Error creating/updating indicator:', error)
    return null
  }
}
