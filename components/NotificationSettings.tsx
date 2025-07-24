'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Clock, Send, Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface NotificationSettingsProps {
  initialConfig: any
}

export function NotificationSettings({ initialConfig }: NotificationSettingsProps) {
  const [config, setConfig] = useState({
    emailEnabled: initialConfig?.emailEnabled || false,
    whatsappEnabled: initialConfig?.whatsappEnabled || false,
    recipients: initialConfig?.recipients || [],
    whatsappNumbers: initialConfig?.whatsappNumbers || [],
    sendTime: initialConfig?.sendTime || '09:00',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newWhatsApp, setNewWhatsApp] = useState('')

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        toast.success('Configurações salvas com sucesso!')
      } else {
        toast.error('Erro ao salvar configurações')
      }
    } catch (error) {
      toast.error('Erro ao salvar configurações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendTestReport = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'send_test_report' }),
      })

      if (response.ok) {
        toast.success('Relatório de teste enviado!')
      } else {
        toast.error('Erro ao enviar relatório de teste')
      }
    } catch (error) {
      toast.error('Erro ao enviar relatório de teste')
    } finally {
      setIsLoading(false)
    }
  }

  const addEmail = () => {
    if (newEmail && !config.recipients.includes(newEmail)) {
      setConfig({
        ...config,
        recipients: [...config.recipients, newEmail],
      })
      setNewEmail('')
    }
  }

  const removeEmail = (email: string) => {
    setConfig({
      ...config,
      recipients: config.recipients.filter((e: string) => e !== email),
    })
  }

  const addWhatsApp = () => {
    if (newWhatsApp && !config.whatsappNumbers.includes(newWhatsApp)) {
      setConfig({
        ...config,
        whatsappNumbers: [...config.whatsappNumbers, newWhatsApp],
      })
      setNewWhatsApp('')
    }
  }

  const removeWhatsApp = (number: string) => {
    setConfig({
      ...config,
      whatsappNumbers: config.whatsappNumbers.filter((n: string) => n !== number),
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Configurações de Notificação</h2>
      
      <div className="space-y-6">
        {/* Email Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-900">Notificações por Email</h3>
                <p className="text-sm text-gray-500">Enviar relatórios diários por email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.emailEnabled}
                onChange={(e) => setConfig({ ...config, emailEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {config.emailEnabled && (
            <div className="ml-8 space-y-3">
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Adicionar email"
                  className="input-field flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                />
                <button
                  onClick={addEmail}
                  className="btn-primary px-3"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {config.recipients.map((email: string) => (
                  <div key={email} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{email}</span>
                    <button
                      onClick={() => removeEmail(email)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-green-500" />
              <div>
                <h3 className="font-medium text-gray-900">Notificações por WhatsApp</h3>
                <p className="text-sm text-gray-500">Enviar relatórios diários por WhatsApp</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.whatsappEnabled}
                onChange={(e) => setConfig({ ...config, whatsappEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          {config.whatsappEnabled && (
            <div className="ml-8 space-y-3">
              <div className="flex space-x-2">
                <input
                  type="tel"
                  value={newWhatsApp}
                  onChange={(e) => setNewWhatsApp(e.target.value)}
                  placeholder="Adicionar número (+55...)"
                  className="input-field flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addWhatsApp()}
                />
                <button
                  onClick={addWhatsApp}
                  className="btn-primary px-3"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {config.whatsappNumbers.map((number: string) => (
                  <div key={number} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{number}</span>
                    <button
                      onClick={() => removeWhatsApp(number)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Send Time */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-purple-500" />
            <div>
              <h3 className="font-medium text-gray-900">Horário de Envio</h3>
              <p className="text-sm text-gray-500">Horário para envio dos relatórios diários</p>
            </div>
          </div>
          <div className="ml-8">
            <input
              type="time"
              value={config.sendTime}
              onChange={(e) => setConfig({ ...config, sendTime: e.target.value })}
              className="input-field w-32"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="btn-primary disabled:opacity-50"
          >
            {isLoading ? 'Salvando...' : 'Salvar Configurações'}
          </button>
          <button
            onClick={handleSendTestReport}
            disabled={isLoading}
            className="btn-secondary flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Teste</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
