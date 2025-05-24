"use client"
import React from 'react'
import { useRouter, useSearchParams } from "next/navigation";


const EmailReport = () => {
  const searchParams = useSearchParams()
  const router = useRouter();

  const doctorName = searchParams.get('_nme')

  const navigateToFullReport = () => {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('slug') && searchParams.has('_sr')) {
      router.push(`/fullreport?${searchParams.toString()}`)
    } else {
      console.warn("No identifier to navigate with")
    }
  }
  return (
<section className="flex min-h-screen items-center justify-center bg-sky-100 p-6 sm:p-10 lg:p-20">
  <div className="w-full max-w-4xl space-y-8 lg:space-y-10">
    <div className="text-center lg:text-left">
      <h1 className="text-4xl font-bold text-black sm:text-5xl md:text-6xl">
        Success!
      </h1>
      <p className="mt-3 text-lg text-black sm:mt-4 sm:text-xl md:text-2xl">
        The report on {doctorName} has been generated.
      </p>
    </div>

    <form className="flex w-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg sm:flex-row sm:items-stretch sm:gap-4 sm:p-6 md:rounded-3xl">
      <div className="flex-1">
        <label htmlFor="emailInput" className="sr-only">Email address</label>
        <input 
          type="email" 
          id="emailInput"
          placeholder="Enter your email to get the report"
          className="h-full w-full py-4 text-lg placeholder-gray-400 focus:outline-none sm:py-5 sm:text-xl md:py-6"
          aria-label="Enter your email address to receive the report"
        />
      </div>
      
      <button 
        type='button'
        onClick={() => navigateToFullReport()}
        className="w-full rounded-xl bg-slate-900 px-6 py-4 text-lg font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 sm:w-auto sm:px-8 sm:py-5 md:py-6 md:text-xl"
      >
        Get Report
      </button>
    </form>
  </div>
</section>
  )
}

export default EmailReport