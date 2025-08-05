'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, X } from 'lucide-react'

interface FinanceiroFormData {
  inadimplencia45dValor: number | ''
  inadimplencia45dPercentual: number | ''
  metaInadimplenciaValor: number | ''
  metaInadimplenciaPercentual: number | ''
  limitesImplantadosValor: number | ''
  limitesUtilizadoSemanal: number | ''
}

interface FinanceiroFormProps {
  onSubmit: (data: FinanceiroFormData) => void
  onCancel: () => void
  initialData?: Partial<FinanceiroFormData>
  isLoading?: boolean
}

export function FinanceiroForm({ onSubmit, onCancel, initialData, isLoading }: FinanceiroFormProps) {
  const [formData, setFormData] = useState<FinanceiroFormData>({
    inadimplencia45dValor: initialData?.inadimplencia45dValor || '',
    inadimplencia45dPercentual: initialData?.inadimplencia45dPercentual || '',
    metaInadimplenciaValor: initialData?.metaInadimplenciaValor || '',
    metaInadimplenciaPercentual: initialData?.metaInadimplenciaPercentual || '',
    limitesImplantadosValor: initialData?.limitesImplantadosValor || '',
    limitesUtilizadoSemanal: initialData?.limitesUtilizadoSemanal || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof FinanceiroFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === '' ? '' : parseFloat(value) || 0
    }))
  }

  const formatCurrency = (value: number | '') => {
    if (value === '' || value === 0) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value))
  }

  const getIndicatorColor = (value: number | '', target: number | '', isInverse: boolean = false) => {
    if (value === '' || target === '' || value === 0 || target === 0) return 'text-gray-500'
    const numValue = Number(value)
    const numTarget = Number(target)
    const percentage = (numValue / numTarget) * 100
    if (isInverse) {
      // Para indicadores onde menor é melhor (inadimplência)
      if (percentage <= 100) return 'text-green-600'
      if (percentage <= 120) return 'text-yellow-600'
      return 'text-red-600'
    } else {
      // Para indicadores onde maior é melhor (utilização de limites)
      if (percentage >= 100) return 'text-green-600'
      if (percentage >= 80) return 'text-yellow-600'
      return 'text-red-600'
    }
  }

  const calcularUtilizacaoLimites = () => {
    if (formData.limitesImplantadosValor === '' || formData.limitesImplantadosValor === 0 || 
        formData.limitesUtilizadoSemanal === '' || formData.limitesUtilizadoSemanal === 0) return 0
    return (Number(formData.limitesUtilizadoSemanal) / Number(formData.limitesImplantadosValor)) * 100
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Formulário - Setor Financeiro</span>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inadimplência 45 dias */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-600">Inadimplência 45 Dias</h3>
              
              <div className="space-y-2">
                <Label htmlFor="inadimplencia45dValor">Inadimplência 45d - Valor (R$)</Label>
                <Input
                  id="inadimplencia45dValor"
                  type="number"
                  step="0.01"
                  value={formData.inadimplencia45dValor}
                  onChange={(e) => handleInputChange('inadimplencia45dValor', e.target.value)}
                  placeholder="Digite o valor"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inadimplencia45dPercentual">Inadimplência 45d - Percentual (%)</Label>
                <Input
                  id="inadimplencia45dPercentual"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.inadimplencia45dPercentual}
                  onChange={(e) => handleInputChange('inadimplencia45dPercentual', e.target.value)}
                  placeholder="Digite o valor"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaInadimplenciaValor">Meta Inadimplência - Valor (R$)</Label>
                <Input
                  id="metaInadimplenciaValor"
                  type="number"
                  step="0.01"
                  value={formData.metaInadimplenciaValor}
                  onChange={(e) => handleInputChange('metaInadimplenciaValor', e.target.value)}
                  placeholder="Digite o valor"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaInadimplenciaPercentual">Meta Inadimplência - Percentual (%)</Label>
                <Input
                  id="metaInadimplenciaPercentual"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.metaInadimplenciaPercentual}
                  onChange={(e) => handleInputChange('metaInadimplenciaPercentual', e.target.value)}
                  placeholder="Digite o valor"
                />
              </div>
            </div>

            {/* Limites Implantados */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">Limites de Crédito</h3>
              
              <div className="space-y-2">
                <Label htmlFor="limitesImplantadosValor">Limites Implantados M-1 (R$)</Label>
                <Input
                  id="limitesImplantadosValor"
                  type="number"
                  step="0.01"
                  value={formData.limitesImplantadosValor}
                  onChange={(e) => handleInputChange('limitesImplantadosValor', e.target.value)}
                  placeholder="Digite o valor"
                />
                <p className="text-sm text-gray-500">Valor do mês anterior (M-1)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="limitesUtilizadoSemanal">Utilizado Semanal (R$)</Label>
                <Input
                  id="limitesUtilizadoSemanal"
                  type="number"
                  step="0.01"
                  value={formData.limitesUtilizadoSemanal}
                  onChange={(e) => handleInputChange('limitesUtilizadoSemanal', e.target.value)}
                  placeholder="Digite o valor"
                />
                <p className="text-sm text-gray-500">Valor utilizado na semana atual</p>
              </div>

              {/* Cálculo automático da utilização */}
              <div className="p-3 bg-blue-50 rounded border">
                <Label className="text-sm font-medium text-blue-800">Utilização dos Limites</Label>
                <p className="text-2xl font-bold text-blue-600">
                  {calcularUtilizacaoLimites().toFixed(1)}%
                </p>
                <p className="text-sm text-blue-600">
                  {formatCurrency(formData.limitesUtilizadoSemanal)} de {formatCurrency(formData.limitesImplantadosValor)}
                </p>
              </div>
            </div>
          </div>

          {/* Preview dos indicadores */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-4">Preview dos Indicadores:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded border">
                <h5 className="font-medium text-red-600">Inadimplência 45d</h5>
                <p className={`text-xl font-bold ${getIndicatorColor(formData.inadimplencia45dValor, formData.metaInadimplenciaValor, true)}`}>
                  {formatCurrency(formData.inadimplencia45dValor)}
                </p>
                <p className={`text-lg font-semibold ${getIndicatorColor(formData.inadimplencia45dPercentual, formData.metaInadimplenciaPercentual, true)}`}>
                  {formData.inadimplencia45dPercentual === '' ? '0.0' : Number(formData.inadimplencia45dPercentual).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">
                  Meta: {formatCurrency(formData.metaInadimplenciaValor)} ({formData.metaInadimplenciaPercentual === '' ? '0' : formData.metaInadimplenciaPercentual}%)
                </p>
              </div>
              
              <div className="p-3 bg-white rounded border">
                <h5 className="font-medium text-blue-600">Limites Implantados</h5>
                <p className="text-xl font-bold text-blue-600">
                  {formatCurrency(formData.limitesImplantadosValor)}
                </p>
                <p className="text-sm text-gray-600">
                  Valor do mês anterior
                </p>
              </div>
              
              <div className="p-3 bg-white rounded border">
                <h5 className="font-medium text-green-600">Utilização Semanal</h5>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(formData.limitesUtilizadoSemanal)}
                </p>
                <p className="text-lg font-semibold text-green-600">
                  {calcularUtilizacaoLimites().toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">
                  dos limites implantados
                </p>
              </div>
            </div>
          </div>

          {/* Análise de Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h5 className="font-semibold text-red-800 mb-2">Status Inadimplência:</h5>
              <div className="text-sm text-red-700">
                {(formData.inadimplencia45dValor !== '' && formData.metaInadimplenciaValor !== '' && 
                  Number(formData.inadimplencia45dValor) <= Number(formData.metaInadimplenciaValor)) ? (
                  <p className="text-green-700">✅ Meta de inadimplência atingida</p>
                ) : formData.inadimplencia45dValor === '' || formData.metaInadimplenciaValor === '' ? (
                  <p className="text-gray-500">Preencha os valores para ver o status</p>
                ) : (
                  <p>⚠️ Inadimplência acima da meta estabelecida</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2">Status Utilização de Limites:</h5>
              <div className="text-sm text-blue-700">
                {calcularUtilizacaoLimites() >= 80 ? (
                  <p>📈 Alta utilização dos limites de crédito</p>
                ) : calcularUtilizacaoLimites() >= 50 ? (
                  <p>📊 Utilização moderada dos limites</p>
                ) : (
                  <p>📉 Baixa utilização dos limites de crédito</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2">Informações Importantes:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Inadimplência 45d: clientes com atraso superior a 45 dias</li>
              <li>• Limites Implantados: valor total de limites de crédito aprovados no mês anterior</li>
              <li>• Utilizado Semanal: valor efetivamente utilizado pelos clientes na semana</li>
              <li>• Metas são preenchidas apenas uma vez por mês</li>
              <li>• Cores: Verde (dentro da meta), Amarelo (próximo do limite), Vermelho (acima da meta)</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Salvando...' : 'Salvar Dados'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
