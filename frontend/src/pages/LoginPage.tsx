"use client"
import {
  useNavigate,
} from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { fakeAuthProvider } from "@/auth";

export function LoginPage() {
  const navigate = useNavigate();

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const errorResult = await fakeAuthProvider.signin(login, password);

    if (errorResult) {
      setError(errorResult);
    }

    return navigate("/");
  }

  return (
    <div className="h-screen w-screen bg-gray-200">
      <div className="h-full w-full flex justify-center items-center">
        <Card className="w-[420px] py-4 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl text-center font-bold">ErrorHub</CardTitle>
            <CardDescription className="text-base text-center">
              Авторизация
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Логин</Label>
              <Input id="email" type="email" placeholder="m@example.com" value={login} onChange={(val) => setLogin(val.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" value={password} onChange={(val) => setPassword(val.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="relative mt-10 flex flex-col justify-center items-center">
            {error !== '' &&
              <p className="absolute -top-8 text-red-600">
                {error}
              </p>
            }
            <Button className="w-full" onClick={() => handleLogin()}>Войти</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
