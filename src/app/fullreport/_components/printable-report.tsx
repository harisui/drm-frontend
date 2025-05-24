"use client"
import React from "react";
import { MapPin, Star } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  InformationCircleIcon
} from "@heroicons/react/24/solid";
import { Info } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PrintableReportProps {
  params: {
    _nme: string;
    _spt: string;
    _ct: string;
    _st: string;
    _rt: number;
  };
  report: {
    insights?: string[];
    yearlyData?: Array<{
      year: string;
      positive: number;
      negative: number;
      total?: number;
    }>;
    totalReviews?: number;
    positiveComments?: {
      first?: { date?: string; comment?: string; author?: string };
      second?: { date?: string; comment?: string; author?: string };
    };
    negativeComment?: { date?: string; comment?: string; author?: string };
    summary?: string;
  } | null;
}

const PrintableReport = ({ params, report }: PrintableReportProps) => {
  // Chart configuration
  const chartConfig = {
    positive: {
      label: "Positive Reviews",
      color: "#ADD8FF",
    },
    negative: {
      label: "Negative Reviews",
      color: "#F4A79D",
    },
  } satisfies ChartConfig;

  const chartData = report?.yearlyData?.map(item => ({
    year: item.year,
    positive: item.positive,
    negative: item.negative
  })) || [];

  const hasData = chartData.some(item => item.positive > 0 || item.negative > 0);

  // Process comments for Feedback section
  const processComments = () => {
    const comments = [];

    if (report?.positiveComments?.first) {
      comments.push({ ...report.positiveComments.first, type: 'positive' });
    }
    if (report?.positiveComments?.second) {
      comments.push({ ...report.positiveComments.second, type: 'positive' });
    }
    if (report?.negativeComment) {
      comments.push({ ...report.negativeComment, type: 'negative' });
    }

    return comments;
  };

  const comments = processComments();

  const getAvatarColor = (type: 'positive' | 'negative') => {
    return type === 'positive'
      ? 'bg-[#ADD8FF] border-[#ADD8FF] text-white'
      : 'bg-[#FF7664] border-[#FF7664] text-white';
  };

  const getCardBgColor = (type: 'positive' | 'negative') => {
    return type === 'positive'
      ? 'border border-[#ADD8FF]'
      : 'bg-[#FFF2F2] border border-[#FFCCCC]';
  };

  const renderStars = (type: 'positive' | 'negative') => {
    const rating = type === 'positive' ? 5 : 1;
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-3 h-3 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ));
  };

  // Convert 5-star rating to 10-point scale for Summary
  const score = Math.round(params._rt * 2);

  return (
    <div
      className="printable-report bg-white text-xs m-0 p-0"
      style={{
        width: '210mm',
        height: '297mm', // A4 height
        fontSize: '10px',
        lineHeight: '1.2',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Intro Section */}
      <div className="bg-[#E5EEFB] pt-4 pb-2 flex-shrink-0">
        <div className="px-4">
          <h1 className="text-lg font-bold mb-1">{params._nme}</h1>
          <div className="flex justify-between items-center text-xs">
            <p>{params._spt}</p>
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>{params._ct}, {params._st}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights Section */}
      <div className="px-4 py-3 flex-shrink-0">
        <h2 className="text-sm font-bold mb-2">Key Insights</h2>
        <div className="grid grid-cols-3 gap-3">
          {report?.insights?.map((insight, index) => {
            const cleanedInsight = insight.replace(/^\d+\.\s*/, '');
            return (
              <div key={index} className="border border-[#ADD8FF] rounded p-2">
                <h3 className="text-xs font-medium leading-tight">{cleanedInsight}</h3>
              </div>
            );
          })}

          {(!report?.insights || report.insights.length === 0) && (
            <div className="border border-[#ADD8FF] rounded p-2 col-span-3">
              <div className="flex items-center gap-1">
                <InformationCircleIcon className="w-4 h-4 text-gray-600" />
                <h3 className="text-xs font-medium">No insights available</h3>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Patient Reviews Section */}
      <div className="px-4 py-3 flex-grow">
        <div className="flex items-center space-x-2 mb-2">
          <h2 className="text-sm font-bold">Patient Reviews Timeline</h2>
          {report?.totalReviews && (
            <span className="bg-[#4da6ff] text-white text-xs px-2 py-1 rounded-full">
              {report.totalReviews} reviews
            </span>
          )}
        </div>

        <div className="p-2">
          {hasData ? (
            <div style={{ width: '100%', height: '180px' }}>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  data={chartData}
                  width={700}
                  height={180}
                  margin={{ top: 5, left: 5, right: 5, bottom: 5 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    fontSize={10}
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
                    strokeWidth={1}
                  />
                  <Area
                    dataKey="positive"
                    type="natural"
                    fill="url(#fillPositive)"
                    fillOpacity={0.4}
                    stroke="#ADD8FF"
                    strokeWidth={1}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-2 text-xs">
              No review data available
            </div>
          )}
        </div>

        {/* Feedback Section */}
        <div className="py-3">
          {comments.length === 0 ? (
            <div className="w-full p-2 text-center text-gray-500 text-xs">
              No feedback available
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className={`rounded p-2 transition-all ${getCardBgColor(comment.type)}`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-8 h-8 border ${getAvatarColor(comment.type)} font-medium text-xs rounded`}>
                      <span>
                        {comment.author?.charAt(0).toUpperCase() || 'A'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-medium">
                          {comment.author || 'Anonymous'}
                        </h3>
                        <div className="flex">
                          {renderStars(comment.type)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-tight mb-1" style={{ fontSize: '9px' }}>
                        {comment.comment}
                      </p>
                      {comment.date && (
                        <p className="text-xs text-gray-400" style={{ fontSize: '8px' }}>
                          {comment.date}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-[#E5EEFB] py-3 flex-shrink-0 mt-auto">
        <h2 className="text-sm font-bold px-4 mb-2">Summary</h2>
        <div className="grid grid-cols-3 gap-4 px-4">
          <div className="col-span-2 text-xs">
            <p className="leading-tight">{report?.summary || "No summary available."}</p>
          </div>
          <div>
            <h3 className="text-xs font-medium mb-2">
              {params._nme}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-600 text-white rounded w-16 h-12 flex items-center justify-center">
                <span className="text-xl font-bold">{score}</span>
                <span className="text-xs mt-1">/10</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Info className="bg-[#0F152B] text-white rounded-full w-3 h-3" />
              <p className="text-xs">See how we calculate the score</p>
            </div>
          </div>
        </div>
        <div className="px-4 pt-2">
          <p className="text-xs text-gray-700">
            <span className="font-medium">Disclaimer: </span>
            This is not medical advice. Please consult a healthcare professional for any medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintableReport;