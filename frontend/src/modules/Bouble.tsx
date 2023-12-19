"use client"

import { useNavigate } from "react-router-dom";
import { DataTable } from './table/DataTable'
import { InfoCard, InfoCardData } from "@/modules/info-card/InfoCard";
import { cn } from "@/lib/utils";


export function Bouble({ className = "", children }) {
  return (
    <div className={cn("rounded-lg border-slate-500/30 border-[1px] py-1 px-2", className)}>
      {children}
    </div>
  )
}
