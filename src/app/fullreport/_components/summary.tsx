import React from "react";
import { Info } from "lucide-react";
const Summary = () => {
    return (
        <main className="bg-[#E5EEFB]">
            <div className="p-8">
                <h2 className="reports_heading px-8">Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20"> {/* Changed to 3 columns */}
                    <div className="px-4 mt-5 text-lg text-primary md:px-8 md:col-span-2"> {/* This will take 2/3 of space */}
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.</p>
                    </div>
                    <div className="px-4 md:px-8"> {/* This will take 1/3 of space */}
                        <h3 className="text-primary text-2xl font-semibold mb-3">Dr.Anna Bryson</h3>
                        <div className="flex items-center gap-4">
                            <div className="bg-green-600 text-white rounded-lg w-48 h-20 flex items-center justify-center">
                                <span className="text-5xl font-bold">9</span><span className="mt-4">/10</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            <Info className="bg-[#0F152B] text-white rounded-full w-4 h-4 text-primary" />
                            <p className="text-sm text-primary">See how we calculate the score</p>
                        </div>
                    </div>
                </div>
                <div className="mt-2 px-8 py-4">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold text-primary">Disclaimer: </span>
                        This is not medical advice. Please consult a healthcare professional for any medical concerns.
                    </p>
                </div>
            </div>
        </main>
    )
}
export default Summary