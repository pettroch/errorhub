"use client"

import { Application, DataTable } from '../modules/table/DataTable'
import { MainModule } from "@/modules/MainModule";
import { useEffect, useState } from "react";
import { ApplicationRaw, fetches } from "@/helpers/request";
import { fakeAuthProvider } from "@/auth";

function applicationRawToBase(data: ApplicationRaw[]): Application[] {
  const applications: Application[] = []

  for (const raw of data) {
    applications.push({
      id: raw.id,
      status: raw.status.name,
      title: raw.name
    })
  }

  return applications
}


export function CardsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const userId = fakeAuthProvider.getId()
    if (!userId) return

    if (fakeAuthProvider.getRole() == 'Оператор') {
      fetches.getAllAdminApplication(userId).then((data) => setApplications(applicationRawToBase(data)));
    } else {
      fetches.getAllUserApplication(userId).then((data) => setApplications(applicationRawToBase(data)));
    }
  }, [])

  return (
    <MainModule>
      <DataTable className="w-full px-6 lg:px-10 py-5  rounded-xl shadow-md" data={applications} />
    </MainModule>
  )
}