"use client"

import { fakeAuthProvider } from "@/auth";
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ApplicationRaw, MessageRaw, fetches } from "@/helpers/request";
import { Bouble } from "@/modules/Bouble";
import { MainModule } from "@/modules/MainModule";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const applicationHolder: ApplicationRaw = {
  id: 0,
  status_id: 1,
  date: Date.now().toString(),
  name: "",
  maker_id: 0,
  taker_id: 0,
  description: "",
  maker: {
    id: 0,
    name: "",
    login: "",
    role_id: 0,
  },
  taker: {
    id: 0,
    name: "",
    login: "",
    role_id: 0,
  },
  status: {
    id: 0,
    name: ""
  }
}

// const messages = [
//   {
//     maker_id: 1,
//     text: 'sffefesf'
//   },
//   {
//     maker_id: 1,
//     text: 'Redfswefsfsefsdfsef'
//   },
//   {
//     maker_id: 2,
//     text: 'ssefsefsefsef'
//   }
// ]

const statuses: { id: number; name: string }[] = [
  {
    id: 1,
    name: 'Обрабатывается'
  },
  {
    id: 2,
    name: 'Принята'
  },
  {
    id: 3,
    name: 'Завершена'
  },
  {
    id: 4,
    name: 'Отменена'
  }

]

export function CardPage() {
  const { id } = useParams();
  const [message, setMessage] = useState('')
  const [application, setApplication] = useState<ApplicationRaw>(applicationHolder)
  const [status, setStatus] = useState('')
  const [messages, setMessages] = useState<MessageRaw[]>([])

  const updateApplication = () =>
    fetches.getApplication(Number(id)).then((result) => {
      setApplication(result)
      setMessages(result.messages)
    })

  useEffect(() => {
    updateApplication()
    const intervalId = setInterval(() => updateApplication(), 3000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    setStatus(statuses.find((val) => val.id == application.status.id)?.name || statuses[0].name)
    // console.log(statuses.find((val) => val.id == application.status.id)?.name)
  }, [application])

  const handleSend = async () => {
    const userId = Number(fakeAuthProvider.getId())
    if (message.trim().length === 0 || !id || !userId) return

    const messageToSend: MessageRaw = {
      id: Math.round(Math.random() * 10000),
      text: message,
      sender_id: userId,
      application_id: Number(id)
    }

    messages.push(messageToSend)
    fetches.sendMessage(messageToSend.text, messageToSend.sender_id, messageToSend.application_id)
    setMessage('');
  }

  const changeStatus = (statusName: string) => {
    const statusId = statuses.find((val) => val.name == statusName)?.id

    if (!statusId) return

    setStatus(statusName);
    fetches.changeStatus(Number(id), statusId)
  }

  return (
    <MainModule>
      <div className="flex flex-col w-full h-[1000px] lg:h-[full] bg-white rounded-xl shadow-md">
        <div className="flex flex-col h-full mx-10 my-5">
          <div className="w-fit mt-2 mb-3 lg:mb-6 text-xl lg:text-2xl font-bold">
            Заявка: {application.id}
          </div>
          <div className="mb-4 flex flex-col w-full">
            <div className="grid lg:grid-cols-12 gap-2 lg:gap-4 auto-rows-min text-sm lg:text-base">
              <p className="w-fit col-span-6 lg:col-span-2 self-center">
                Наименование:
              </p>
              <Bouble className="w-full col-span-6 lg:col-span-5 text-sm lg:text-base">
                {application.name}
              </Bouble>

              <p className="w-full lg:w-fit col-span-6 lg:col-span-2  lg:ml-6 self-center text-sm lg:text-base">
                Статус:
              </p>
              {fakeAuthProvider.getId() == application.taker_id ?
                <Select value={status} onValueChange={(val) => changeStatus(val)} >
                  <SelectTrigger className="w-full lg:col-span-3 col-span-6 rounded-lg border-slate-500/30 text-sm lg:text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) =>
                      <SelectItem value={status.name} key={status.name}>{status.name}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                :
                <Bouble className="w-full lg:col-span-3 col-span-6text-sm lg:text-base">
                  {application.status.name}
                </Bouble>
              }

              <p className="w-fit col-span-6 lg:col-span-2 self-center text-sm lg:text-base">
                Специалист:
              </p>
              <Bouble className="w-full col-span-6 lg:col-span-5 text-sm lg:text-base">
                {application.taker.name}
              </Bouble>

              <p className="w-fit col-span-6 lg:col-span-2 lg:ml-6 self-center text-sm lg:text-base">
                Дата создания:
              </p>
              <Bouble className="w-full lg:col-span-3 col-span-6 text-sm lg:text-base">
                {application.date}
              </Bouble>
            </div>
          </div>

          <p className="mb-2 text-sm lg:text-base">
            Описание заявки:
          </p>
          <ScrollArea className="w-full h-[300px] lg:h-[220px] rounded-lg border-slate-500/30 border-[1px]">
            <p className="whitespace-normal m-3 lg:m-4 text-sm lg:text-base">
              {application.description}
            </p>
          </ScrollArea>

          <div className="h-full flex flex-col mt-4 flex-grow-1">
            <p className="mb-2 text-sm lg:text-base">
              Чат решения проблемы:
            </p>
            <div className="relative h-full w-full">
              <div className="absolute top-0 bottom-0 overflow-y-scroll w-full rounded-lg border-slate-500/30 border-[1px]">
                <div className="flex flex-col gap-4 p-3 lg:p-6 min-h-full w-full ">
                  {messages.map((message) => (
                    <Bouble key={message.id} className={`w-fit bg-white text-sm lg:text-base ${message.sender_id == fakeAuthProvider.getId() ? 'ml-auto rounded-br-none' : 'rounded-es-none'}`}>
                      {message.text}
                    </Bouble>
                  )
                  )}
                </div>
              </div>
            </div>
          </div>
          <Textarea className="mt-4 text-sm lg:text-base" placeholder="Напишите..." value={message} onChange={(event) => setMessage(event.target.value)} />
          <div className="mt-4 flex justify-between items-center">
            <img className="ml-3 h-6" src="/clip.svg" alt="clip" />

            <Button className="" onClick={() => handleSend()}>Отправить</Button>
          </div>
        </div>
      </div>
    </MainModule>
  )
}