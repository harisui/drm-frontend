"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface PatientReviewsProps {
    positiveComments?: {
        first?: { date?: string }
        second?: { date?: string }
    }
    negativeComment?: { date?: string }
}

const chartConfig = {
    positive: {
        label: "Positive Reviews",
        color: "#ADD8FF",
    },
    negative: {
        label: "Negative Reviews",
        color: "#F4A79D",
    },
} satisfies ChartConfig

export function PatientReviews({ positiveComments, negativeComment }: PatientReviewsProps) {
    // Process review dates into chart data
    const processChartData = () => {
        const yearCounts: Record<string, { positive: number; negative: number }> = {}

        const extractYear = (dateStr?: string): string | null => {
            if (!dateStr) return null
            const parts = dateStr.split(' ')
            const year = parts[1]
            return year && /^\d{4}$/.test(year) ? year : null
        }

        
        // Process positive comments
        [positiveComments?.first, positiveComments?.second].forEach(comment => {
            const year = extractYear(comment?.date)
            if (year) {
                yearCounts[year] = yearCounts[year] || { positive: 0, negative: 0 }
                yearCounts[year].positive += 1
            }
        })


        // Process negative comment
        const negativeYear = extractYear(negativeComment?.date)
        if (negativeYear) {
            yearCounts[negativeYear] = yearCounts[negativeYear] || { positive: 0, negative: 0 }
            yearCounts[negativeYear].negative += 1
        }

        return Object.entries(yearCounts)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([year, counts]) => ({
                year,
                positive: counts.positive,
                negative: counts.negative
            }))
    }

    const chartData = processChartData()
    const hasData = chartData.length > 0

    return (
        <main>
            <h2 className="reports_heading px-8">Patient Reviews Timeline</h2>
            <Card className="mx-7">
                <CardContent className="p-4">
                    {hasData ? (
                        <ChartContainer config={chartConfig}>
                            <AreaChart
                                data={chartData}
                                width={350}
                                height={200}
                                margin={{ top: 10, left: 10, right: 10, bottom: 10 }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="year"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    fontSize={12}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent />}
                                />
                                <defs>
                                    <linearGradient id="fillPositive" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ADD8FF" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ADD8FF" stopOpacity={0.1} />
                                    </linearGradient>
                                    <linearGradient id="fillNegative" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F4A79D" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#F4A79D" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    dataKey="negative"
                                    type="natural"
                                    fill="url(#fillNegative)"
                                    fillOpacity={0.4}
                                    stroke="#F4A79D"
                                    strokeWidth={1.5}
                                />
                                <Area
                                    dataKey="positive"
                                    type="natural"
                                    fill="url(#fillPositive)"
                                    fillOpacity={0.4}
                                    stroke="#ADD8FF"
                                    strokeWidth={1.5}
                                />
                            </AreaChart>
                        </ChartContainer>
                    ) : (
                        <div className="text-center text-gray-500 py-4">
                            No review data available
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    )
}