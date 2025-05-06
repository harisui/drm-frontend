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

const chartData = [
    { month: "2020", desktop: 186, mobile: 80 },
    { month: "2021", desktop: 305, mobile: 200 },
    { month: "2022", desktop: 237, mobile: 120 },
    { month: "2023", desktop: 73, mobile: 190 },
    { month: "2024", desktop: 209, mobile: 130 },
    { month: "2025", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#ADD8FF",
    },
    mobile: {
        label: "Mobile",
        color: "#F4A79D",
    },
} satisfies ChartConfig

export function PatientReviews() {
    return (
        <main>
            <h2 className="reports_heading px-8">Patient Reviews</h2>
            <Card className="mx-7">
                <CardContent className="p-4">
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            width={350}
                            height={200}
                            margin={{
                                top: 10,
                                left: 10,
                                right: 10,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                // Removed the tickFormatter since we want full year displayed
                                fontSize={12}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                                wrapperStyle={{ fontSize: '12px' }}
                            />
                            <defs>
                                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="#ADD8FF"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#ADD8FF"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="#F4A79D"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#F4A79D"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <Area
                                dataKey="mobile"
                                type="natural"
                                fill="url(#fillMobile)"
                                fillOpacity={0.4}
                                stroke="#F4A79D"
                                strokeWidth={1.5}
                                stackId="a"
                            />
                            <Area
                                dataKey="desktop"
                                type="natural"
                                fill="url(#fillDesktop)"
                                fillOpacity={0.4}
                                stroke="#ADD8FF"
                                strokeWidth={1.5}
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </main>
    )
}