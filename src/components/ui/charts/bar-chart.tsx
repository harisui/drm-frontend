import React from 'react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface BarChartProps {
    data: Array<{
        rating: number;
        count: number;
    }>;
    xAxis: string;
    yAxis: string;
    height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, xAxis, yAxis, height = 300 }) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsBarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey={xAxis}
                    label={{ value: 'Rating', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                    dataKey={yAxis}
                    label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Bar dataKey={yAxis} fill="#8884d8" />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
};

export default BarChart; 