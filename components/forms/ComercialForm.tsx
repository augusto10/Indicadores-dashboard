'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, X } from 'lucide-react'

interface ComercialFormData {
  faturamentoDia: number
  faturamentoMesAcumulado: number
  metaFaturamentoDia: number
  metaFaturamentoMes: number
  positivacaoDia: number
  positivacaoMesAcumulado: number
  metaPositivacaoDia: number
  metaPositivacaoMes: number
}

interface ComercialFormProps {
  onSubmit: (data: ComercialFormData) => void
  onCancel: () => void
  initialData?: Partial<ComercialFormData>
  isLoading?: boolean
}

export function ComercialForm({ onSubmit, onCancel, initialData, isLoading }: ComercialFormProps) {
  const [formData, setFormData] = useState<ComercialFormData>({
    faturamentoDia: initialData?.faturamentoDia || 0,
    faturamentoMesAcumulado: initialData?.faturamentoMesAcumulado || 0,
    metaFaturamentoDia: initialData?.metaFaturamentoDia || 0,
    metaFaturamentoMes: initialData?.metaFaturamentoMes || 0,
    positivacaoDia: initialData?.positivacaoDia || 0,
    positivacaoMesAcumulado: initialData?.positivacaoMesAcumulado || 0,
    metaPositivacaoDia: initialData?.metaPositivacaoDia || 0,
    metaPositivacaoMes: initialData?.metaPositivacaoMes || 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof ComercialFormData, value: string) => {
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Formulário - Setor Comercial</span>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Faturamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">Faturamento</h3>
              
              <div className="space-y-2">
                <Label htmlFor="faturamentoDia">Faturamento do Dia (R$)</Label>
                <Input
                  id="faturamentoDia"
                  type="number"
                  step="0.01"
                  value={formData.faturamentoDia}
                  onChange={(e) => handleInputChange('faturamentoDia', e.target.value)}
                  placeholder="0,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faturamentoMesAcumulado">Faturamento Mês Acumulado (R$)</Label>
                <Input
                  id="faturamentoMesAcumulado"
                  type="number"
                  step="0.01"
                  value={formData.faturamentoMesAcumulado}
                  onChange={(e) => handleInputChange('faturamentoMesAcumulado', e.target.value)}
                  placeholder="0,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaFaturamentoDia">Meta Faturamento Dia (R$)</Label>
                <Input
                  id="metaFaturamentoDia"
                  type="number"
                  step="0.01"
                  value={formData.metaFaturamentoDia}
                  onChange={(e) => handleInputChange('metaFaturamentoDia', e.target.value)}
                  placeholder="0,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaFaturamentoMes">Meta Faturamento Mês (R$)</Label>
                <Input
                  id="metaFaturamentoMes"
                  type="number"
                  step="0.01"
                  value={formData.metaFaturamentoMes}
                  onChange={(e) => handleInputChange('metaFaturamentoMes', e.target.value)}
                  placeholder="0,00"
                />
              </div>
            </div>

            {/* Positivação */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Positivação</h3>
              
              <div className="space-y-2">
                <Label htmlFor="positivacaoDia">Positivação do Dia</Label>
                <Input
                  id="positivacaoDia"
                  type="number"
                  value={formData.positivacaoDia}
                  onChange={(e) => handleInputChange('positivacaoDia', e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="positivacaoMesAcumulado">Positivação Mês Acumulado</Label>
                <Input
                  id="positivacaoMesAcumulado"
                  type="number"
                  value={formData.positivacaoMesAcumulado}
                  onChange={(e) => handleInputChange('positivacaoMesAcumulado', e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaPositivacaoDia">Meta Positivação Dia</Label>
                <Input
                  id="metaPositivacaoDia"
                  type="number"
                  value={formData.metaPositivacaoDia}
                  onChange={(e) => handleInputChange('metaPositivacaoDia', e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaPositivacaoMes">Meta Positivação Mês</Label>
                <Input
                  id="metaPositivacaoMes"
                  type="number"
                  value={formData.metaPositivacaoMes}
                  onChange={(e) => handleInputChange('metaPositivacaoMes', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Preview dos valores */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Preview dos Indicadores:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Faturamento Dia:</span>
                <p>{formatCurrency(formData.faturamentoDia)}</p>
              </div>
              <div>
                <span className="font-medium">Meta Dia:</span>
                <p>{formatCurrency(formData.metaFaturamentoDia)}</p>
              </div>
              <div>
                <span className="font-medium">Positivação Dia:</span>
                <p>{formData.positivacaoDia}</p>
              </div>
              <div>
                <span className="font-medium">Meta Positivação:</span>
                <p>{formData.metaPositivacaoDia}</p>
              </div>
            </div>
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
