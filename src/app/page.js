"use client"

import React from "react";
import {useState, useEffect} from 'react';
import Image from "next/image"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import InputOtpCustom from "@/components/ui/input-otp-custom";
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const regexOtpPatternOTP = /^[0-9a-zA-Z]+$/;
  const regexInputValidation = /^[a-zA-Z]{2}[0-9]+$/;
  const isInputValid = (input) => regexInputValidation.test(input)
  const [buttonLoading, setButtonLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleOtpChange = (newOtp) => {
    if (newOtp.length <= 6 || newOtp.length < otp.length) {  // Allow changes that reduce the length
      setOtp(newOtp);  // Set the new OTP directly
      // console.log(newOtp);
    }
  };

  useEffect(() => {
    console.log(buttonLoading);
  }, [buttonLoading]);

  const handleSubmit = async (event, redirect) => {
    const value = otp; // dependent on state hook otp
    if (value.length >= 3) {
      if (!regexInputValidation.test(value)) {
        // input validation
        toast({
          title: "Debe tener 2 letras y el resto números",
          description: "Ingresa un valor del tipo 'pc1000, pa251, pa10, etc.'"
        });
      } else {
        // console.log("correct")}
        setButtonLoading(true);
        try {
          const response = await fetch(`https://red-api.chewy.workers.dev/stops/${otp}/next_arrivals`);
          if (response.ok) {
            const response_data = await response.json();
            const serialized_response = encodeURIComponent(JSON.stringify(response_data));
            const serialized_stop = encodeURIComponent(JSON.stringify(otp));
            router.push(`/result?stop=${serialized_stop}&data=${serialized_response}`);
          } else {
            toast({
              title: "Error al buscar información (HTTP)",
              description: "Hubo un error, intenta de nuevo más tarde."
            });
          }
        } catch (error) {
          // Handle fetch errors here
          toast({
            title: "Error al buscar información (Network)",
            description: "Please check your internet connection."
          });
        } finally {
          setButtonLoading(false); // Set loading to false when the fetch is complete
        }
      }
    } else {
      toast({
        title: "Debe tener al menos 3 caracteres (ej.: pa1)",
        description: "Ingresa un valor del tipo 'pc1000, pa251, pa10, etc.'"
      });
    }
  }

  return (
    <main className="flex flex-col h-screen min-w-[300px] max-w-[1440px] mx-auto pt-2">
        <div className="self-end justify-self-start mx-2 sm:mx-8">
          <ModeToggle />
        </div>
      <div className="flex justify-center items-center my-auto mx-2">
        <Card className="">
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
                <CardTitle>Código de Paradero</CardTitle>
                <CardDescription className="">2 letras y al menos un número (ej: pc1, Pa10, etc.)</CardDescription>
              </CardHeader>
              <CardContent className="self-center">

                <InputOtpCustom pattern={regexOtpPatternOTP} maxLength={6} value={otp} onChange={handleOtpChange} />

              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  disabled={!isInputValid(otp) || buttonLoading} 
                  onClick={handleSubmit} 
                  className="flex hover:bg-neutral-950 active:bg-neutral-950 transition-all"
                >
                  {buttonLoading ? (
                    <Loader2 className="m-2 h-4 w-4 animate-spin" /> 
                  ) : (
                    <p>Buscar</p>
                  )}
                </Button>
              </CardFooter>
            </TabsContent>
            <TabsContent value="bus" className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <p>Bus</p> 
                  <p className="text-red-800 font-light text-xs">(Inhabilitado)</p>
                </CardTitle>
                <CardDescription>Ingresa el recorrido / bus</CardDescription>
              </CardHeader>
              <CardContent className="self-center">
                <Input />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button disabled className="hover:bg-neutral-950 active:bg-neutral-950 transition-all">
                  {buttonLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <p>Inhabilitado</p>
                  )}
                </Button>
              </CardFooter>
            </TabsContent>
            <TabsContent value="both" className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <p>Código de Paradero</p>
                  <p className="text-red-800 font-light text-xs">(Inhabilitado)</p>  
                </CardTitle>
                <CardDescription className="">2 letras y al menos un número (ej: pc1, Pa10, etc.)</CardDescription>
              </CardHeader>
              <CardContent className="self-center">
                <InputOtpCustom pattern={regexOtpPatternOTP} value={otp} onChange={handleOtpChange} />
              </CardContent>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <p>Bus</p> 
                  <p className="text-red-800 font-light text-xs">(Inhabilitado)</p>
                </CardTitle>
                <CardDescription>Ingresa el recorrido / bus</CardDescription>
              </CardHeader>
              <CardContent className="self-center">
                <Input />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button disabled onClick={handleSubmit} className="hover:bg-neutral-950 active:bg-neutral-950 transition-all">
                  {buttonLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <p>Inhabilitado</p>
                  )}
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  )
} 