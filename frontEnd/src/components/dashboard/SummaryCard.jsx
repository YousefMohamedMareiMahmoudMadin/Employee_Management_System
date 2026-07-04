import React from 'react'

const SummaryCard = ({ icon, text, number, iconBg }) => {
  return (
    <div className="flex items-center bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden h-20 w-full">
      <div className={`p-5 flex items-center justify-center text-white text-2xl h-full w-16 ${iconBg}`}>
        {icon}
      </div>
      <div className="pl-4 flex-1">
        <p className="text-sm font-bold text-gray-500">{text}</p>
        <p className="text-xl font-black text-gray-800 mt-0.5">{number}</p>
      </div>
    </div> 
  )
}

export default SummaryCard