import React from "react";
import { MapPin } from "lucide-react";
import "./style.css"

const Intro = () => {
    return (
        <div className="dr_intro">
            <h1>Dr.Anna Bryson</h1>
            <div className="flex justify-between items-center">
                <p>Dentist</p>
                <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Barcelona,Spain</span>
                </div>
            </div>
        </div>
    )
}
export default Intro