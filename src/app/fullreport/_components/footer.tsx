import React from "react";
import { Download } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#0F152B] py-4">
            <div className="flex flex-col items-center gap-4">
                <button className="bg-white px-6 py-5 text-xl font-semibold rounded-lg">Scan Another Doctor</button>
                <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                    <Download size={24} />
                    <span>Download Report</span>
                </button>
            </div>
        </footer>
    )
}
export default Footer