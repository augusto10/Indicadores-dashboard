'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface IndicatorFormProps {
  fields: Array<{
    name: string
    label: string
    unit: string
    type: 'number' | 'currency' | 'percentage'
  }>
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData?: any
  isLoading?: boolean
}

export function IndicatorForm({ fields, onSubmit, onCancel, initialData, isLoading }: IndicatorFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    target: '',
    unit: '',
    description: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        value: initialData.value?.toString() || '',
        target: initialData.target?.toString() || '',
        unit: initialData.unit || '',
        description: initialData.description || '',
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      value: parseFloat(formData.value),
      target: parseFloat(formData.target),
    })
  }

  const handleFieldSelect = (field: any) => {
    setFormData({
      ...formData,
      name: field.label,
      unit: field.unit,
    })
  }

  const formatValue = (value: string, type: string) => {
    if (!value) return value
    
    const numValue = parseFloat(value.replace(/[^\d.-]/g, ''))
    if (isNaN(numValue)) return value

    switch (type) {
      case 'currency':
        return numValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      case 'percentage':
        return `${numValue}%`
      default:
        return numValue.toLocaleString('pt-BR')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Quick Field Selection */}
      {!initialData && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione um campo padrão (opcional)
          </label>
          <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
            {fields.map((field) => (
              <button
                key={field.name}
                type="button"
                onClick={() => handleFieldSelect(field)}
                className="text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border transition-colors"
              >
                {field.label} ({field.unit})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Indicador *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-field"
          placeholder="Ex: Vendas do mês"
        />
      </div>

      {/* Value and Target */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
            Valor Atual *
          </label>
          <input
            type="number"
            id="value"
            required
            step="0.01"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            className="input-field"
            placeholder="0"
          />
        </div>
        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
            Meta *
          </label>
          <input
            type="number"
            id="target"
            required
            step="0.01"
            value={formData.target}
            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
            className="input-field"
            placeholder="0"
          />
        </div>
      </div>

      {/* Unit */}
      <div>
        <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
          Unidade
        </label>
        <input
          type="text"
          id="unit"
          value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          className="input-field"
          placeholder="Ex: R$, %, unidades"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input-field"
          placeholder="Descrição opcional do indicador"
        />
      </div>

      {/* Preview */}
      {formData.value && formData.target && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <div className="flex justify-between items-center">
            <span className="font-medium">{formData.name}</span>
            <span className="text-sm">
              {formData.value} / {formData.target} {formData.unit}
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                parseFloat(formData.value) >= parseFloat(formData.target)
                  ? 'bg-green-500'
                  : parseFloat(formData.value) >= parseFloat(formData.target) * 0.8
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{
                width: `${Math.min((parseFloat(formData.value) / parseFloat(formData.target)) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : initialData ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  )
}
