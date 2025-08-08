"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { DateRangeFilter } from "@/components/DateRangeFilter"
import { IndicatorCharts } from "@/components/IndicatorCharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface Indicator {
  id: string
  name: string
  value: number
  target: number
  unit?: string
  department: string
  date: string | Date
  user: {
    name: string
    department: string
  }
}

export default function ChartsPage() {
  const { data: session } = useSession()
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  const fetchIndicators = async (start?: string, end?: string) => {
    try {
      setLoading(true)
      setError("")

      const params: Record<string, string> = {}
      if (start) params.start = start
      if (end) params.end = end

      // If API supports department filtering server-side, it will read from session or params
      const { data } = await axios.get("/api/indicators/filtered", { params })
      setIndicators(data?.indicators || data || [])
    } catch (e: any) {
      setError(e?.response?.data?.message || "Falha ao carregar dados")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial load: last 30 days will be handled by component, but we try fetch without filters
    fetchIndicators()
  }, [])

  const handleDateRangeChange = (start: string, end: string) => {
    setStartDate(start)
    setEndDate(end)
    fetchIndicators(start, end)
  }

  const handleClearFilters = () => {
    setStartDate("")
    setEndDate("")
    fetchIndicators()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gráficos Demonstrativos</h1>
        <div className="flex items-center gap-2">
          <DateRangeFilter
            isVisible={filterOpen}
            onToggle={() => setFilterOpen((v) => !v)}
            onDateRangeChange={handleDateRangeChange}
            onClear={handleClearFilters}
          />
          <Button variant="outline" size="sm" onClick={() => fetchIndicators(startDate || undefined, endDate || undefined)}>
            <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {startDate && endDate
              ? `Período: ${new Date(startDate).toLocaleDateString("pt-BR")} a ${new Date(endDate).toLocaleDateString("pt-BR")}`
              : "Últimos registros"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-12 text-center text-gray-600">Carregando dados...</div>
          ) : error ? (
            <div className="py-12 text-center text-red-600">{error}</div>
          ) : indicators.length === 0 ? (
            <div className="py-12 text-center text-gray-600">Nenhum dado encontrado para o período selecionado.</div>
          ) : (
            <IndicatorCharts
              indicators={indicators as any}
              userDepartment={session?.user?.department as string}
              isDirector={session?.user?.role === "DIRECTOR" || session?.user?.department === "DIRETORIA"}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
