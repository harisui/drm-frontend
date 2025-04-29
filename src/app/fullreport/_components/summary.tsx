import React from "react";
const Summary = () => {
    return (
        <main className="bg-[#E5EEFB]">
            <div className="p-8">
                <h2 className="reports_heading px-8">Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <p className="px-4 md:px-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit asperiores illo tenetur quas nulla architecto. Quos itaque sapiente, cumque praesentium, fugiat molestias tempore maiores perferendis tenetur architecto, temporibus dolore sed.</p>
                    <div className="px-4 md:px-8">
                        <h3 className="text-primary text-3xl font-bold mb-4">Dr.Anna Bryson</h3>
                        <div className="flex items-center gap-4">
                            <div className="bg-green-600 text-white rounded-lg w-20 h-20 flex items-center justify-center">
                                <span className="text-2xl font-bold">4.8</span>
                            </div>
                            <div>
                                <p className="text-gray-600">Overall Rating</p>
                                <p className="text-sm text-gray-500">Based on 120 reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 px-8 py-4">
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