# Esplendor Indicadores

Sistema de dashboard para acompanhamento de indicadores e metas por departamento, com notificações automáticas diárias.

## 🚀 Funcionalidades

- **Autenticação de usuários** com NextAuth.js
- **Painéis por departamento** (Comercial, Logística, Compras, Financeiro)
- **Dashboard interativo** com métricas em tempo real
- **Sistema de metas** e acompanhamento de performance
- **Notificações automáticas** via email e WhatsApp
- **Interface responsiva** e moderna

## 🏗️ Tecnologias

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Banco de dados**: PostgreSQL (Prisma Cloud)
- **Autenticação**: NextAuth.js
- **UI/UX**: Framer Motion, Lucide Icons
- **Notificações**: Nodemailer, WhatsApp API
- **Deploy**: Vercel

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL database (ou Prisma Cloud)
- Conta de email para SMTP
- WhatsApp Business API (opcional)

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd esplendor-indicadores
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/esplendor_indicadores"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# WhatsApp API (opcional)
WHATSAPP_API_URL="https://api.whatsapp.com"
WHATSAPP_TOKEN="your-whatsapp-token"

# Cron Job Secret
CRON_SECRET="your-cron-secret"
```

4. **Configure o banco de dados**
```bash
npx prisma generate
npx prisma db push
```

5. **Execute o projeto**
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## 📊 Departamentos e Indicadores

### Comercial
- Vendas do Mês
- Leads Gerados
- Taxa de Conversão
- Ticket Médio
- Clientes Novos

### Logística
- Entregas no Prazo
- Custo de Frete
- Tempo Médio de Entrega
- Taxa de Avarias
- Giro de Estoque

### Compras
- Economia em Negociação
- Prazo Médio de Pagamento
- Fornecedores Avaliados
- Qualidade dos Produtos
- Tempo de Processo

### Financeiro
- Fluxo de Caixa
- Taxa de Inadimplência
- Margem de Lucro
- Contas a Receber
- Despesas Operacionais

## 🔐 Níveis de Acesso

- **USER**: Acesso ao próprio departamento
- **ADMIN**: Acesso completo e configurações
- **DIRECTOR**: Recebe relatórios automáticos

## 📧 Notificações Automáticas

O sistema envia relatórios diários automaticamente:

### Email
- Relatório HTML completo
- Gráficos e métricas por departamento
- Performance geral da empresa

### WhatsApp
- Resumo executivo
- Principais indicadores
- Alertas de performance

### Configuração do Cron Job

Para automatizar o envio diário, configure um cron job no Vercel ou use o endpoint:

```
GET /api/cron/daily-reports
Authorization: Bearer YOUR_CRON_SECRET
```

## 🚀 Deploy no Vercel

1. **Conecte seu repositório ao Vercel**

2. **Configure as variáveis de ambiente** no painel do Vercel

3. **Configure o banco de dados Prisma Cloud**

4. **Deploy automático** será feito a cada push

## 📱 Uso da Aplicação

### 1. Cadastro e Login
- Acesse `/auth/signup` para criar uma conta
- Selecione seu departamento
- Faça login em `/auth/signin`

### 2. Painel do Departamento
- Acesse "Meu Painel" para adicionar indicadores
- Preencha valores atuais e metas
- Acompanhe o progresso em tempo real

### 3. Dashboard Geral
- Visualize performance de todos os departamentos
- Acompanhe métricas consolidadas
- Veja atividade recente

### 4. Configurações (Admin)
- Configure notificações automáticas
- Gerencie emails e números de WhatsApp
- Defina horário de envio dos relatórios

## 🎨 Personalização

### Cores por Status
- 🟢 **Verde**: Meta atingida (≥100%)
- 🟡 **Amarelo**: Próximo da meta (≥80%)
- 🔴 **Vermelho**: Abaixo da meta (<80%)

### Departamentos
Para adicionar novos departamentos, edite:
- `prisma/schema.prisma` (enum Department)
- `components/DepartmentPanel.tsx` (departmentFields)

## 🔧 Desenvolvimento

### Comandos Úteis
```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Prisma
npx prisma studio
npx prisma generate
npx prisma db push

# Lint
npm run lint
```

### Estrutura do Projeto
```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticação
│   └── dashboard/         # Páginas do dashboard
├── components/            # Componentes React
├── lib/                   # Utilitários e configurações
├── prisma/               # Schema do banco de dados
└── types/                # Definições TypeScript
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Suporte

Para suporte, entre em contato através do email ou WhatsApp configurado no sistema.

---

Desenvolvido para a Esplendor
