"use client"

import React from "react";
import {useState, useEffect} from 'react';
import Image from "next/image"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (newOtp) => {
    if (newOtp.length <= 6 || newOtp.length < otp.length) {  // Allow changes that reduce the length
      setOtp(newOtp);  // Set the new OTP directly
    }
  };

  return (
    <main className="flex flex-col h-screen min-w-[300px] max-w-[1440px] mx-auto pt-10">
        <div className="self-end justify-self-start mx-2 sm:mx-8">
          <ModeToggle />
        </div>
      <div className="flex justify-center items-center h-full mx-2">
        <Card>
          <Tabs defaultValue="stop" className="flex flex-col max-w-[400px]">
            <div className="self-center">
              <TabsList className="">
                <TabsTrigger value="stop">Paradero</TabsTrigger>
                <TabsTrigger value="bus">Recorrido</TabsTrigger>
                <TabsTrigger value="both">Ambos</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="stop" className="flex flex-col">
        
              <CardHeader>
                <CardTitle>Paradero</CardTitle>
                <CardDescription>Ingresa el número de paradero (ej.: PA100)</CardDescription>
              </CardHeader>
              <CardContent className="self-center">
                <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0}  />
                    <InputOTPSlot index={1}  />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="hover:bg-neutral-950 active:bg-neutral-950 transition-all">Buscar</Button>
              </CardFooter>
            </TabsContent>
            <TabsContent value="bus" className="flex flex-col">
              <CardHeader>
                <CardTitle>Bus</CardTitle>
                <CardDescription>Ingresa el recorrido / bus</CardDescription>
              </CardHeader>
              <CardContent className="self-center">
                <Input />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="hover:bg-neutral-950 active:bg-neutral-950 transition-all">Buscar</Button>
              </CardFooter>
            </TabsContent>
            <TabsContent value="both" className="flex flex-col">
              <CardHeader>
                <CardTitle>Paradero</CardTitle>
                <CardDescription>Ingresa el número de paradero (ej.: PA100)</CardDescription>
              </CardHeader>
              <CardContent className="self-center">
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </CardContent>
              <CardHeader>
                <CardTitle>Bus</CardTitle>
                <CardDescription>Ingresa el recorrido / bus</CardDescription>
              </CardHeader>
              <CardContent className="self-center">
                <Input />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="hover:bg-neutral-950 active:bg-neutral-950 transition-all">Buscar</Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  )
} 