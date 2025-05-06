import React from 'react';
import Link from 'next/link';

const DiscardPage = () => {
    return (
        <section className="flex min-h-screen items-center justify-center bg-[#EDF3FF] p-6 sm:p-10 lg:p-20">
            <div className="w-full max-w-4xl space-y-8 lg:space-y-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl md:text-6xl">
                        Wait! Don't Go Yet
                    </h1>
                    <p className="mt-3 text-lg text-slate-600 sm:mt-4 sm:text-xl md:text-2xl">
                        Your report is ready to download. Would you like to:
                    </p>
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-8">
                    {/* Download Report Option */}
                    <Link
                        href="/fullreport"
                        className="flex-1 rounded-2xl bg-slate-900 p-8 text-center shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <svg
                                className="h-12 w-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                            <h2 className="text-2xl font-semibold text-white">Download Report</h2>
                            <p className="text-slate-300">Get your complete doctor report now</p>
                        </div>
                    </Link>

                    {/* Continue Option */}
                    <Link
                        href="/"
                        className="flex-1 rounded-2xl bg-white p-8 text-center shadow-lg transition-all hover:shadow-xl"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <svg
                                className="h-12 w-12 text-slate-900"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <h2 className="text-2xl font-semibold text-slate-900">Continue</h2>
                            <p className="text-slate-600">Leave without downloading</p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default DiscardPage;
