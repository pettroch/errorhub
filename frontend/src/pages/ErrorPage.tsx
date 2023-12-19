"use client"

import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gray-200">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h1 className="mb-20 text-5xl font-bold">404 - Not Found</h1>
        <Button className="" onClick={() => navigate("/")}>На главную</Button>
      </div>
    </div>
  )
}