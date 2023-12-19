"use client"

import { fakeAuthProvider } from "@/auth";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetches } from "@/helpers/request";
import { MainModule } from "@/modules/MainModule";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export function CreateCardPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSend = async () => {
    const userId = await fakeAuthProvider.getId()
    if (!userId) {
      return
    }

    const result = await fetches.createApplication(title, description, userId, 2)
    console.log(result)

    if (!result) {
      return
    }

    navigate(`/card/${result.aid}`)
  }

  return (
    <MainModule>
      <div className="flex flex-col w-full bg-white rounded-xl shadow-md">
        <div className="w-fit px-10 py-6 border-2 rounded-xl text-xl font-bold">
          Новая заявка
        </div>
        <div className="flex flex-col h-full mx-10 my-5 ">
          <div className="flex flex-col">
            <div className="mb-4">
              <p className="mb-2">
                Наименование:
              </p>
              <Input placeholder="Назовите проблему..." value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <p className="mb-2">
              Описание заявки:
            </p>
          </div>
          <Textarea className="h-full" placeholder="Опишите свою проблему здесь..." value={description} onChange={(event) => setDescription(event.target.value)} />
          <div className="mt-4 flex justify-between items-center">
            скрепка
            <Button className="" onClick={() => handleSend()}>Отправить</Button>
          </div>
        </div>
      </div>
    </MainModule>
  )
}