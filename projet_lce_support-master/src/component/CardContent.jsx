import React from 'react'

export default function CardContent({children, title}) {
  return (
     <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">

        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {children}
    </div>
        </div>
  )
}
