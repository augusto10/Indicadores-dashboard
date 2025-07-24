'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Save, Target, TrendingUp, Edit, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { IndicatorForm } from './IndicatorForm'
import { IndicatorCard } from './IndicatorCard'
import { SectorFormsManager } from './SectorFormsManager'

interface DepartmentPanelProps {
  department: string
  userId: string
  indicators: any[]
  goals: any[]
}

const departmentFields = {
  COMERCIAL: [
    { name: 'vendas_mes', label: 'Vendas do Mês', unit: 'R$', type: 'currency' as const },
    { name: 'leads_gerados', label: 'Leads Gerados', unit: 'unidades', type: 'number' as const },
    { name: 'conversao_leads', label: 'Taxa de Conversão', unit: '%', type: 'percentage' as const },
    { name: 'ticket_medio', label: 'Ticket Médio', unit: 'R$', type: 'currency' as const },
    { name: 'clientes_novos', label: 'Clientes Novos', unit: 'unidades', type: 'number' as const },
  ],
  LOGISTICA: [
    { name: 'entregas_prazo', label: 'Entregas no Prazo', unit: '%', type: 'percentage' as const },
    { name: 'custo_frete', label: 'Custo de Frete', unit: 'R$', type: 'currency' as const },
    { name: 'tempo_entrega', label: 'Tempo Médio de Entrega', unit: 'dias', type: 'number' as const },
    { name: 'avarias', label: 'Taxa de Avarias', unit: '%', type: 'percentage' as const },
    { name: 'estoque_giro', label: 'Giro de Estoque', unit: 'vezes', type: 'number' as const },
  ],
  COMPRAS: [
    { name: 'economia_negociacao', label: 'Economia em Negociação', unit: 'R$', type: 'currency' as const },
    { name: 'prazo_pagamento', label: 'Prazo Médio de Pagamento', unit: 'dias', type: 'number' as const },
    { name: 'fornecedores_avaliados', label: 'Fornecedores Avaliados', unit: 'unidades', type: 'number' as const },
    { name: 'qualidade_produtos', label: 'Qualidade dos Produtos', unit: '%', type: 'percentage' as const },
    { name: 'tempo_processo', label: 'Tempo de Processo', unit: 'dias', type: 'number' as const },
  ],
  FINANCEIRO: [
    { name: 'fluxo_caixa', label: 'Fluxo de Caixa', unit: 'R$', type: 'currency' as const },
    { name: 'inadimplencia', label: 'Taxa de Inadimplência', unit: '%', type: 'percentage' as const },
    { name: 'margem_lucro', label: 'Margem de Lucro', unit: '%', type: 'percentage' as const },
    { name: 'contas_receber', label: 'Contas a Receber', unit: 'R$', type: 'currency' as const },
    { name: 'despesas_operacionais', label: 'Despesas Operacionais', unit: 'R$', type: 'currency' as const },
  ],
  TI: [
    { name: 'uptime_sistemas', label: 'Uptime dos Sistemas', unit: '%', type: 'percentage' as const },
    { name: 'tickets_resolvidos', label: 'Tickets Resolvidos', unit: 'unidades', type: 'number' as const },
    { name: 'tempo_resposta', label: 'Tempo Médio de Resposta', unit: 'horas', type: 'number' as const },
    { name: 'backup_sucesso', label: 'Taxa de Sucesso de Backup', unit: '%', type: 'percentage' as const },
    { name: 'projetos_entregues', label: 'Projetos Entregues no Prazo', unit: '%', type: 'percentage' as const },
  ],
  DIRETORIA: [
    { name: 'receita_total', label: 'Receita Total', unit: 'R$', type: 'currency' as const },
    { name: 'lucro_liquido', label: 'Lucro Líquido', unit: 'R$', type: 'currency' as const },
    { name: 'crescimento_mensal', label: 'Crescimento Mensal', unit: '%', type: 'percentage' as const },
    { name: 'satisfacao_cliente', label: 'Satisfação do Cliente', unit: '%', type: 'percentage' as const },
    { name: 'eficiencia_operacional', label: 'Eficiência Operacional', unit: '%', type: 'percentage' as const },
  ],
}

export function DepartmentPanel({ department, userId, indicators, goals }: DepartmentPanelProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingIndicator, setEditingIndicator] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fields = departmentFields[department as keyof typeof departmentFields] || []

  const handleSubmit = async (formData: any) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/indicators', {
        method: editingIndicator ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId,
          department,
          id: editingIndicator?.id,
        }),
      })

      if (response.ok) {
        toast.success(editingIndicator ? 'Indicador atualizado!' : 'Indicador criado!')
        setShowForm(false)
        setEditingIndicator(null)
        window.location.reload()
      } else {
        toast.error('Erro ao salvar indicador')
      }
    } catch (error) {
      toast.error('Erro ao salvar indicador')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este indicador?')) return

    try {
      const response = await fetch(`/api/indicators/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Indicador excluído!')
        window.location.reload()
      } else {
        toast.error('Erro ao excluir indicador')
      }
    } catch (error) {
      toast.error('Erro ao excluir indicador')
    }
  }

  return (
    <div className="space-y-6">
      {/* Sector Forms Manager */}
      <SectorFormsManager 
        onDataSubmitted={() => {
          toast.success('Dados do setor atualizados!')
          window.location.reload()
        }}
      />

      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Indicador</span>
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {indicators.length} indicadores cadastrados
        </div>
      </div>

      {/* Indicator Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {editingIndicator ? 'Editar Indicador' : 'Novo Indicador'}
            </h3>
            <IndicatorForm
              fields={fields}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false)
                setEditingIndicator(null)
              }}
              initialData={editingIndicator}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Department Goals */}
      {goals.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Metas do Departamento</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">{goal.name}</h3>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Atual: {goal.current.toLocaleString('pt-BR')}</span>
                    <span>Meta: {goal.target.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {indicators.map((indicator, index) => (
          <motion.div
            key={indicator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <IndicatorCard
              indicator={indicator}
              onEdit={() => {
                setEditingIndicator(indicator)
                setShowForm(true)
              }}
              onDelete={() => handleDelete(indicator.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {indicators.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum indicador cadastrado
          </h3>
          <p className="text-gray-500 mb-4">
            Comece adicionando indicadores para acompanhar o desempenho do seu departamento.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Criar Primeiro Indicador
          </button>
        </div>
      )}
    </div>
  )
}
