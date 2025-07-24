import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { NotificationSettings } from '@/components/NotificationSettings'

async function getNotificationConfig() {
  const config = await prisma.notificationConfig.findFirst({
    where: { isActive: true },
  })
  return config
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const notificationConfig = await getNotificationConfig()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">
            Gerencie as configurações do sistema
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Perfil do Usuário</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                value={session.user.name || ''}
                disabled
                className="input-field bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={session.user.email || ''}
                disabled
                className="input-field bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <input
                type="text"
                value={session.user.department}
                disabled
                className="input-field bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
              <input
                type="text"
                value={session.user.role}
                disabled
                className="input-field bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings - Only for Admins */}
        {session.user.role === 'ADMIN' && (
          <NotificationSettings initialConfig={notificationConfig} />
        )}
      </div>
    </div>
  )
}
