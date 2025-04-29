'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReviewData {
    month: string;
    reviews: number;
}

const PatientReviews = () => {
    // Sample data - replace with your actual data
    const data: ReviewData[] = [
        { month: 'Jan', reviews: 12 },
        { month: 'Feb', reviews: 19 },
        { month: 'Mar', reviews: 15 },
        { month: 'Apr', reviews: 22 },
        { month: 'May', reviews: 18 },
        { month: 'Jun', reviews: 25 },
    ];

    return (
        <div className="w-full h-[400px] p-8 bg-white rounded-lg shadow">
            <h2 className="reports_heading">Patient Reviews</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reviews" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PatientReviews;
