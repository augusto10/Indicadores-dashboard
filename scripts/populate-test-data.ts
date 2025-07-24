// Script para popular dados de teste nos indicadores
// Execute com: npx tsx scripts/populate-test-data.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Populando dados de teste...')

  // Buscar usuários por departamento
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      department: true,
    }
  })

  console.log(`Encontrados ${users.length} usuários`)

  // Dados de teste para cada departamento
  const testData = {
    COMERCIAL: [
      {
        name: 'Faturamento Dia',
        value: 45000,
        target: 50000,
        unit: 'BRL',
        description: 'Faturamento do dia atual'
      },
      {
        name: 'Faturamento Mês Acumulado',
        value: 850000,
        target: 1000000,
        unit: 'BRL',
        description: 'Faturamento acumulado do mês'
      },
      {
        name: 'Positivação Dia',
        value: 120,
        target: 150,
        unit: 'UNITS',
        description: 'Positivação do dia atual'
      },
      {
        name: 'Positivação Mês Acumulado',
        value: 2800,
        target: 3000,
        unit: 'UNITS',
        description: 'Positivação acumulada do mês'
      }
    ],
    LOGISTICA: [
      {
        name: 'OTIF Mês',
        value: 92.5,
        target: 95,
        unit: 'PERCENTAGE',
        description: 'On Time In Full - dados D-2'
      },
      {
        name: 'Taxa Devolução Mês',
        value: 3.2,
        target: 5,
        unit: 'PERCENTAGE',
        description: 'Taxa de devolução - dados D-1'
      },
      {
        name: 'Custo Logístico Mês',
        value: 4.1,
        target: 3.5,
        unit: 'PERCENTAGE',
        description: 'Custo logístico - dados D-2'
      }
    ],
    COMPRAS: [
      {
        name: 'Ruptura Mês Valor',
        value: 25000,
        target: 20000,
        unit: 'BRL',
        description: 'Valor de ruptura do mês'
      },
      {
        name: 'Ruptura Mês Percentual',
        value: 2.8,
        target: 2.0,
        unit: 'PERCENTAGE',
        description: 'Percentual de ruptura do mês'
      },
      {
        name: 'Cobertura Estoque',
        value: 1800000,
        target: 45,
        unit: 'BRL',
        description: 'Valor da cobertura de estoque'
      },
      {
        name: 'Curva C Valor',
        value: 180000,
        target: 150000,
        unit: 'BRL',
        description: 'Valor da curva C'
      },
      {
        name: 'Curva C Percentual',
        value: 12.5,
        target: 10.0,
        unit: 'PERCENTAGE',
        description: 'Percentual da curva C'
      }
    ],
    FINANCEIRO: [
      {
        name: 'Inadimplência 45d Valor',
        value: 85000,
        target: 70000,
        unit: 'BRL',
        description: 'Valor de inadimplência 45 dias'
      },
      {
        name: 'Inadimplência 45d Percentual',
        value: 4.2,
        target: 3.5,
        unit: 'PERCENTAGE',
        description: 'Percentual de inadimplência 45 dias'
      },
      {
        name: 'Limites Implantados',
        value: 2500000,
        target: 2500000,
        unit: 'BRL',
        description: 'Limites de crédito implantados M-1'
      },
      {
        name: 'Utilização Semanal',
        value: 1800000,
        target: 2000000,
        unit: 'BRL',
        description: 'Utilização semanal dos limites'
      }
    ]
  }

  let totalCreated = 0

  for (const user of users) {
    const departmentData = testData[user.department as keyof typeof testData]
    
    if (!departmentData) {
      console.log(`⚠️  Dados de teste não encontrados para o departamento: ${user.department}`)
      continue
    }

    console.log(`📊 Criando indicadores para ${user.name} (${user.department})...`)

    for (const indicator of departmentData) {
      try {
        const created = await prisma.indicator.create({
          data: {
            ...indicator,
            userId: user.id,
            department: user.department,
          }
        })
        
        console.log(`  ✅ ${created.name}: ${created.value} (meta: ${created.target})`)
        totalCreated++
      } catch (error) {
        console.error(`  ❌ Erro ao criar indicador ${indicator.name}:`, error)
      }
    }
  }

  console.log(`\n🎉 Processo concluído! ${totalCreated} indicadores criados.`)
  
  // Mostrar resumo por departamento
  const summary = await prisma.indicator.groupBy({
    by: ['department'],
    _count: {
      id: true
    }
  })

  console.log('\n📈 Resumo por departamento:')
  summary.forEach(dept => {
    console.log(`  ${dept.department}: ${dept._count.id} indicadores`)
  })
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar script:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
