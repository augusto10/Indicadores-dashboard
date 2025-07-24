'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ComercialForm } from './forms/ComercialForm'
import { LogisticaForm } from './forms/LogisticaForm'
import { ComprasForm } from './forms/ComprasForm'
import { FinanceiroForm } from './forms/FinanceiroForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, BarChart3 } from 'lucide-react'

interface SectorFormsManagerProps {
  onDataSubmitted?: () => void
}

export function SectorFormsManager({ onDataSubmitted }: SectorFormsManagerProps) {
  const { data: session } = useSession()
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const userDepartment = session?.user?.department || 'COMERCIAL'

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/sector-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          department: userDepartment,
          data: data,
          date: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setShowForm(false)
        onDataSubmitted?.()
        // Mostrar notificação de sucesso
        alert(`Dados salvos com sucesso! ${result.count} indicadores atualizados.`)
      } else {
        const error = await response.json()
        console.error('Erro ao salvar dados:', error)
        alert('Erro ao salvar dados: ' + error.message)
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
      alert('Erro ao salvar dados. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  const getDepartmentTitle = () => {
    switch (userDepartment) {
      case 'COMERCIAL':
        return 'Comercial'
      case 'LOGISTICA':
        return 'Logística'
      case 'COMPRAS':
        return 'Compras'
      case 'FINANCEIRO':
        return 'Financeiro'
      default:
        return 'Departamento'
    }
  }

  const getDepartmentDescription = () => {
    switch (userDepartment) {
      case 'COMERCIAL':
        return 'Preencha os dados de faturamento e positivação do seu setor'
      case 'LOGISTICA':
        return 'Preencha os dados de OTIF, taxa de devolução e custo logístico'
      case 'COMPRAS':
        return 'Preencha os dados de ruptura, cobertura de estoque e curva C'
      case 'FINANCEIRO':
        return 'Preencha os dados de inadimplência e limites de crédito'
      default:
        return 'Preencha os dados do seu departamento'
    }
  }

  const renderForm = () => {
    switch (userDepartment) {
      case 'COMERCIAL':
        return (
          <ComercialForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )
      case 'LOGISTICA':
        return (
          <LogisticaForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )
      case 'COMPRAS':
        return (
          <ComprasForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )
      case 'FINANCEIRO':
        return (
          <FinanceiroForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )
      default:
        return (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">
                Departamento não reconhecido. Entre em contato com o administrador.
              </p>
            </CardContent>
          </Card>
        )
    }
  }

  if (showForm) {
    return renderForm()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Painel {getDepartmentTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Bem-vindo ao Painel {getDepartmentTitle()}
            </h3>
            <p className="text-gray-600 mb-4">
              {getDepartmentDescription()}
            </p>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Preencher Dados do Setor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-green-50 rounded border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800">Dados Atualizados</h4>
              <p className="text-green-700">
                Os dados preenchidos alimentarão automaticamente os indicadores do dashboard
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-800">Metas Mensais</h4>
              <p className="text-yellow-700">
                As metas precisam ser definidas apenas uma vez por mês
              </p>
            </div>
          </div>

          {/* Informações específicas por departamento */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Campos do Setor {getDepartmentTitle()}:</h4>
            <div className="text-left text-sm text-gray-600">
              {userDepartment === 'COMERCIAL' && (
                <ul className="space-y-1">
                  <li>• Faturamento: dia, mês acumulado e metas</li>
                  <li>• Positivação: dia, mês acumulado e metas</li>
                </ul>
              )}
              {userDepartment === 'LOGISTICA' && (
                <ul className="space-y-1">
                  <li>• OTIF mês % (D-2) - Meta: 95%</li>
                  <li>• Taxa de devolução mês % (D-1) - Meta: 5%</li>
                  <li>• Custo logístico mês % (D-2) - Meta: 3,5%</li>
                </ul>
              )}
              {userDepartment === 'COMPRAS' && (
                <ul className="space-y-1">
                  <li>• Ruptura mês: R$ e % com metas</li>
                  <li>• Cobertura de estoque: R$ - Meta: 45 dias</li>
                  <li>• Curva C: R$ e % com metas</li>
                </ul>
              )}
              {userDepartment === 'FINANCEIRO' && (
                <ul className="space-y-1">
                  <li>• Inadimplência 45d: valor R$ e % com metas</li>
                  <li>• Limites implantados: valor M-1 R$</li>
                  <li>• Utilizado semanal</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
