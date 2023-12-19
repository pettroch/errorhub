"use client"

import { InfoCard, InfoCardData } from "@/modules/info-card/InfoCard";
import { cn } from "@/lib/utils";
import { fakeAuthProvider } from "@/auth";
import { useEffect, useState } from "react";

const profileData: InfoCardData = {
  title: "Профиль",
  items: [
    {
      name: 'ID:',
      value: String(fakeAuthProvider.getId() || 0)
    },
    {
      name: 'Имя:',
      value: fakeAuthProvider.getName() || ''
    },
    {
      name: 'Роль:',
      value: fakeAuthProvider.getRole() || ''
    }
  ]
}

const contactsData: InfoCardData = {
  title: "Контакты техподдержки",
  items: [
    {
      name: 'Телефон:',
      value: '8 (434) 435 32 20'
    },
    {
      name: 'Email:',
      value: 'support@errorhub.com'
    },
  ]
}

export function MainModule({ className = "", children }) {
  const [profile, setProfile] = useState<InfoCardData>(profileData)

  useEffect(() => {
    const profileD: InfoCardData = {
      title: "Профиль",
      items: [
        {
          name: 'ID:',
          value: String(fakeAuthProvider.getId() || 0)
        },
        {
          name: 'Имя:',
          value: fakeAuthProvider.getName() || ''
        },
        {
          name: 'Роль:',
          value: fakeAuthProvider.getRole() || ''
        }
      ]
    }

    setProfile(profileD);
  }, [])

  return (
    <div className={cn("w-[90%] 3xl:w-9/12 h-[94%] 3xl:h-[82%] flex justify-center items-center", className)}>
      <div className="w-full h-full flex justify-center gap-10 transition-all duration-500">
        <div className="hidden flex-col gap-10 lg:flex">
          <InfoCard data={profile} className="shadow-md rounded-xl" />
          <InfoCard data={contactsData} className="shadow-md rounded-xl" />
        </div>
        <div className="h-full w-full flex">
          {children}
        </div>
      </div>
    </div>
  )
}
