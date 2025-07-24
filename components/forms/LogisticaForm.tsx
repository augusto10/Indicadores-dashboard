'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, X } from 'lucide-react'

interface LogisticaFormData {
  otifMes: number
  metaOtif: number
  taxaDevolucaoMes: number
  metaTaxaDevolucao: number
  custoLogisticoMes: number
  metaCustoLogistico: number
}

interface LogisticaFormProps {
  onSubmit: (data: LogisticaFormData) => void
  onCancel: () => void
  initialData?: Partial<LogisticaFormData>
  isLoading?: boolean
}

export function LogisticaForm({ onSubmit, onCancel, initialData, isLoading }: LogisticaFormProps) {
  const [formData, setFormData] = useState<LogisticaFormData>({
    otifMes: initialData?.otifMes || 0,
    metaOtif: initialData?.metaOtif || 95,
    taxaDevolucaoMes: initialData?.taxaDevolucaoMes || 0,
    metaTaxaDevolucao: initialData?.metaTaxaDevolucao || 5,
    custoLogisticoMes: initialData?.custoLogisticoMes || 0,
    metaCustoLogistico: initialData?.metaCustoLogistico || 3.5,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof LogisticaFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
  }

  const getIndicatorColor = (value: number, target: number, isInverse: boolean = false) => {
    const percentage = (value / target) * 100
    if (isInverse) {
      // Para indicadores onde menor é melhor (taxa de devolução, custo logístico)
      if (percentage <= 100) return 'text-green-600'
      if (percentage <= 120) return 'text-yellow-600'
      return 'text-red-600'
    } else {
      // Para indicadores onde maior é melhor (OTIF)
      if (percentage >= 100) return 'text-green-600'
      if (percentage >= 80) return 'text-yellow-600'
      return 'text-red-600'
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Formulário - Setor Logística</span>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* OTIF */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">OTIF (On Time In Full)</h3>
              
              <div className="space-y-2">
                <Label htmlFor="otifMes">OTIF Mês % (D-2)</Label>
                <Input
                  id="otifMes"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.otifMes}
                  onChange={(e) => handleInputChange('otifMes', e.target.value)}
                  placeholder="0,00"
                />
                <p className="text-sm text-gray-500">Dados de 2 dias atrás</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaOtif">Meta OTIF (%)</Label>
                <Input
                  id="metaOtif"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.metaOtif}
                  onChange={(e) => handleInputChange('metaOtif', e.target.value)}
                  placeholder="95,00"
                />
                <p className="text-sm text-gray-500">Meta padrão: 95%</p>
              </div>
            </div>

            {/* Taxa de Devolução */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-600">Taxa de Devolução</h3>
              
              <div className="space-y-2">
                <Label htmlFor="taxaDevolucaoMes">Taxa Devolução Mês % (D-1)</Label>
                <Input
                  id="taxaDevolucaoMes"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.taxaDevolucaoMes}
                  onChange={(e) => handleInputChange('taxaDevolucaoMes', e.target.value)}
                  placeholder="0,00"
                />
                <p className="text-sm text-gray-500">Dados de 1 dia atrás</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaTaxaDevolucao">Meta Taxa Devolução (%)</Label>
                <Input
                  id="metaTaxaDevolucao"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.metaTaxaDevolucao}
                  onChange={(e) => handleInputChange('metaTaxaDevolucao', e.target.value)}
                  placeholder="5,00"
                />
                <p className="text-sm text-gray-500">Meta padrão: 5%</p>
              </div>
            </div>

            {/* Custo Logístico */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-600">Custo Logístico</h3>
              
              <div className="space-y-2">
                <Label htmlFor="custoLogisticoMes">Custo Logístico Mês % (D-2)</Label>
                <Input
                  id="custoLogisticoMes"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.custoLogisticoMes}
                  onChange={(e) => handleInputChange('custoLogisticoMes', e.target.value)}
                  placeholder="0,00"
                />
                <p className="text-sm text-gray-500">Dados de 2 dias atrás</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaCustoLogistico">Meta Custo Logístico (%)</Label>
                <Input
                  id="metaCustoLogistico"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.metaCustoLogistico}
                  onChange={(e) => handleInputChange('metaCustoLogistico', e.target.value)}
                  placeholder="3,50"
                />
                <p className="text-sm text-gray-500">Meta padrão: 3,5%</p>
              </div>
            </div>
          </div>

          {/* Preview dos indicadores */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-4">Preview dos Indicadores:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded border">
                <h5 className="font-medium text-blue-600">OTIF</h5>
                <p className={`text-2xl font-bold ${getIndicatorColor(formData.otifMes, formData.metaOtif)}`}>
                  {formData.otifMes.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">Meta: {formData.metaOtif}%</p>
              </div>
              
              <div className="p-3 bg-white rounded border">
                <h5 className="font-medium text-orange-600">Taxa Devolução</h5>
                <p className={`text-2xl font-bold ${getIndicatorColor(formData.taxaDevolucaoMes, formData.metaTaxaDevolucao, true)}`}>
                  {formData.taxaDevolucaoMes.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">Meta: ≤{formData.metaTaxaDevolucao}%</p>
              </div>
              
              <div className="p-3 bg-white rounded border">
                <h5 className="font-medium text-purple-600">Custo Logístico</h5>
                <p className={`text-2xl font-bold ${getIndicatorColor(formData.custoLogisticoMes, formData.metaCustoLogistico, true)}`}>
                  {formData.custoLogisticoMes.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">Meta: ≤{formData.metaCustoLogistico}%</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2">Informações Importantes:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• OTIF e Custo Logístico: dados de 2 dias atrás (D-2)</li>
              <li>• Taxa de Devolução: dados de 1 dia atrás (D-1)</li>
              <li>• Metas são preenchidas apenas uma vez por mês</li>
              <li>• Cores: Verde (meta atingida), Amarelo (próximo da meta), Vermelho (abaixo da meta)</li>
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
