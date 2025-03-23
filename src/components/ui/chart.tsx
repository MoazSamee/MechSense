"use client"

import type * as React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

// Chart Container
interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Chart({ children, className, ...props }: ChartProps) {
  return (
    <div className={cn("h-[350px] w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

// Line Chart
interface LineChartProps {
  data: any[]
  className?: string
  showXAxis?: boolean
  showYAxis?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  children: React.ReactNode
}

export function LineChart({
  data,
  className,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  children,
  ...props
}: LineChartProps) {
  return (
    <Chart className={className} {...props}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} />}
        {showYAxis && <YAxis tickLine={false} axisLine={false} />}
        {showTooltip && <RechartsTooltip content={<ChartTooltip />} />}
        {showLegend && <Legend />}
        {children}
      </RechartsLineChart>
    </Chart>
  )
}

// Area Chart
interface AreaChartProps {
  data: any[]
  className?: string
  showXAxis?: boolean
  showYAxis?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  children: React.ReactNode
}

export function AreaChart({
  data,
  className,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  children,
  ...props
}: AreaChartProps) {
  return (
    <Chart className={className} {...props}>
      <RechartsAreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} />}
        {showYAxis && <YAxis tickLine={false} axisLine={false} />}
        {showTooltip && <RechartsTooltip content={<ChartTooltip />} />}
        {showLegend && <Legend />}
        {children}
      </RechartsAreaChart>
    </Chart>
  )
}

// Bar Chart
interface BarChartProps {
  data: any[]
  className?: string
  showXAxis?: boolean
  showYAxis?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  showLegend?: boolean
  children: React.ReactNode
}

export function BarChart({
  data,
  className,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  children,
  ...props
}: BarChartProps) {
  return (
    <Chart className={className} {...props}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} />}
        {showYAxis && <YAxis tickLine={false} axisLine={false} />}
        {showTooltip && <RechartsTooltip content={<ChartTooltip />} />}
        {showLegend && <Legend />}
        {children}
      </RechartsBarChart>
    </Chart>
  )
}

// Pie Chart
interface PieChartProps {
  data: any[]
  className?: string
  showTooltip?: boolean
  showLegend?: boolean
  children: React.ReactNode
}

export function PieChart({
  data,
  className,
  showTooltip = true,
  showLegend = false,
  children,
  ...props
}: PieChartProps) {
  return (
    <Chart className={className} {...props}>
      <RechartsPieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        {showTooltip && <RechartsTooltip content={<ChartTooltip />} />}
        {showLegend && <Legend />}
        {children}
      </RechartsPieChart>
    </Chart>
  )
}

// Chart Components
export { Area, Bar, CartesianGrid, Cell, Legend, Line, Pie, XAxis, YAxis }

// Custom Chart Tooltip
interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="text-xs font-medium">{label}</div>
      <div className="mt-1 flex flex-col gap-0.5">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="font-medium">{item.name}:</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

