'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, X } from 'lucide-react'

interface ComprasFormData {
  rupturaMesValor: number
  rupturaMesPercentual: number
  metaRupturaValor: number
  metaRupturaPercentual: number
  coberturaEstoqueValor: number
  metaCoberturaEstoque: number
  mediaDiaria: number
  mediaDias: number
  curvaCValor: number
  curvaCPercentual: number
  metaCurvaCValor: number
  metaCurvaCPercentual: number
}

interface ComprasFormProps {
  onSubmit: (data: ComprasFormData) => void
  onCancel: () => void
  initialData?: Partial<ComprasFormData>
  isLoading?: boolean
}

export function ComprasForm({ onSubmit, onCancel, initialData, isLoading }: ComprasFormProps) {
  const [formData, setFormData] = useState<ComprasFormData>({
    rupturaMesValor: initialData?.rupturaMesValor || 0,
    rupturaMesPercentual: initialData?.rupturaMesPercentual || 0,
    metaRupturaValor: initialData?.metaRupturaValor || 0,
    metaRupturaPercentual: initialData?.metaRupturaPercentual || 0,
    coberturaEstoqueValor: initialData?.coberturaEstoqueValor || 0,
    metaCoberturaEstoque: initialData?.metaCoberturaEstoque || 45,
    mediaDiaria: initialData?.mediaDiaria || 0,
    mediaDias: initialData?.mediaDias || 0,
    curvaCValor: initialData?.curvaCValor || 0,
    curvaCPercentual: initialData?.curvaCPercentual || 0,
    metaCurvaCValor: initialData?.metaCurvaCValor || 0,
    metaCurvaCPercentual: initialData?.metaCurvaCPercentual || 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof ComprasFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getIndicatorColor = (value: number, target: number, isInverse: boolean = false) => {
    const percentage = (value / target) * 100
    if (isInverse) {
      // Para indicadores onde menor é melhor (ruptura)
      if (percentage <= 100) return 'text-green-600'
      if (percentage <= 120) return 'text-yellow-600'
      return 'text-red-600'
    } else {
      // Para indicadores onde maior é melhor (cobertura, curva C)
      if (percentage >= 100) return 'text-green-600'
      if (percentage >= 80) return 'text-yellow-600'
      return 'text-red-600'
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Formulário - Setor Compras</span>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ruptura */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-600">Ruptura Mês</h3>
              
              <div className="space-y-2">
                <Label htmlFor="rupturaMesValor">Ruptura Mês (R$)</Label>
                <Input
                  id="rupturaMesValor"
                  type="number"
                  step="0.01"
                  value={formData.rupturaMesValor}
                  onChange={(e) => handleInputChange('rupturaMesValor', e.target.value)}
                  placeholder="0,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rupturaMesPercentual">Ruptura Mês (%)</Label>
                <Input
                  id="rupturaMesPercentual"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.rupturaMesPercentual}
                  onChange={(e) => handleInputChange('rupturaMesPercentual', e.target.value)}
                  placeholder="0,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaRupturaValor">Meta Ruptura (R$)</Label>
                <Input
                  id="metaRupturaValor"
                  type="number"
                  step="0.01"
                  value={formData.metaRupturaValor}
                  onChange={(e) => handleInputChange('metaRupturaValor', e.target.value)}
                  placeholder="0,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaRupturaPercentual">Meta Ruptura (%)</Label>
                <Input
                  id="metaRupturaPercentual"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.metaRupturaPercentual}
                  onChange={(e) => handleInputChange('metaRupturaPercentual', e.target.value)}
                  placeholder="0,00"
                />
              </div>
            </div>

            {/* Cobertura de Estoque */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">Cobertura de Estoque</h3>
              
              <div className="space-y-2">
                <Label htmlFor="coberturaEstoqueValor">Cobertura Estoque (R$)</Label>
                <Input
                  id="coberturaEstoqueValor"
                  type="number"
                  step="0.01"
                  value={formData.coberturaEstoqueValor}
                  onChange={(e) => handleInputChange('coberturaEstoqueValor', e.target.value)}
                  placeholder="0,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaCoberturaEstoque">Meta Cobertura (dias)</Label>
                <Input
                  id="metaCoberturaEstoque"
                  type="number"
                  value={formData.metaCoberturaEstoque}
                  onChange={(e) => handleInputChange('metaCoberturaEstoque', e.target.value)}
                  placeholder="45"
                />
                <p className="text-sm text-gray-500">Meta padrão: 45 dias</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mediaDiaria">Média Diária</Label>
                <Input
                  id="mediaDiaria"
                  type="number"
                  step="0.01"
                  value={formData.mediaDiaria}
                  onChange={(e) => handleInputChange('mediaDiaria', e.target.value)}
                  placeholder="0,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mediaDias">Média Dias</Label>
                <Input
                  id="mediaDias"
                  type="number"
                  value={formData.mediaDias}
                  onChange={(e) => handleInputChange('mediaDias', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Curva C */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-600">Curva C</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="curvaCValor">Curva C (R$)</Label>
                  <Input
                    id="curvaCValor"
                    type="number"
                    step="0.01"
                    value={formData.curvaCValor}
                    onChange={(e) => handleInputChange('curvaCValor', e.target.value)}
                    placeholder="0,00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="curvaCPercentual">Curva C (%)</Label>
                  <Input
                    id="curvaCPercentual"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.curvaCPercentual}
                    onChange={(e) => handleInputChange('curvaCPercentual', e.target.value)}
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaCurvaCValor">Meta Curva C (R$)</Label>
                  <Input
                    id="metaCurvaCValor"
                    type="number"
                    step="0.01"
                    value={formData.metaCurvaCValor}
                    onChange={(e) => handleInputChange('metaCurvaCValor', e.target.value)}
                    placeholder="0,00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaCurvaCPercentual">Meta Curva C (%)</Label>
                  <Input
                    id="metaCurvaCPercentual"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.metaCurvaCPercentual}
                    onChange={(e) => handleInputChange('metaCurvaCPercentual', e.target.value)}
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview dos indicadores */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-4">Preview dos Indicadores:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded border">
                <h5 className="font-medium text-red-600">Ruptura</h5>
                <p className={`text-lg font-bold ${getIndicatorColor(formData.rupturaMesValor, formData.metaRupturaValor, true)}`}>
                  {formatCurrency(formData.rupturaMesValor)}
                </p>
                <p className={`text-sm font-semibold ${getIndicatorColor(formData.rupturaMesPercentual, formData.metaRupturaPercentual, true)}`}>
                  {formData.rupturaMesPercentual.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">Meta: {formatCurrency(formData.metaRupturaValor)} ({formData.metaRupturaPercentual}%)</p>
              </div>
              
              <div className="p-3 bg-white rounded border">
                <h5 className="font-medium text-blue-600">Cobertura</h5>
                <p className="text-lg font-bold text-blue-600">
                  {formatCurrency(formData.coberturaEstoqueValor)}
                </p>
                <p className="text-sm text-gray-600">
                  {formData.mediaDias} dias
                </p>
                <p className="text-xs text-gray-500">Meta: {formData.metaCoberturaEstoque} dias</p>
              </div>
              
              <div className="p-3 bg-white rounded border">
                <h5 className="font-medium text-green-600">Curva C</h5>
                <p className={`text-lg font-bold ${getIndicatorColor(formData.curvaCValor, formData.metaCurvaCValor)}`}>
                  {formatCurrency(formData.curvaCValor)}
                </p>
                <p className={`text-sm font-semibold ${getIndicatorColor(formData.curvaCPercentual, formData.metaCurvaCPercentual)}`}>
                  {formData.curvaCPercentual.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">Meta: {formatCurrency(formData.metaCurvaCValor)} ({formData.metaCurvaCPercentual}%)</p>
              </div>

              <div className="p-3 bg-white rounded border">
                <h5 className="font-medium text-purple-600">Média Diária</h5>
                <p className="text-lg font-bold text-purple-600">
                  {formatCurrency(formData.mediaDiaria)}
                </p>
                <p className="text-sm text-gray-600">
                  Consumo diário
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2">Informações Importantes:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ruptura: valores e percentuais de produtos em falta</li>
              <li>• Cobertura de Estoque: valor em R$ e dias de cobertura</li>
              <li>• Curva C: produtos de baixo giro - valores e percentuais</li>
              <li>• Metas são preenchidas apenas uma vez por mês</li>
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
