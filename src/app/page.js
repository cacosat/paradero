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
  return (
    <main className="flex flex-col h-screen max-w-[1440px] mx-auto pt-10">
        <div className="self-end justify-self-start mx-8">
          <ModeToggle />
        </div>
      <div className="flex justify-center items-center h-full">
        <Card>
          <Tabs defaultValue="stop" className="w-[400px]">
            <div class="flex justify-between">
              <TabsList>
                <TabsTrigger value="stop">Paradero</TabsTrigger>
                <TabsTrigger value="bus">Recorrido</TabsTrigger>
                <TabsTrigger value="both">Ambos</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="stop">
        
              <CardHeader>
                <CardTitle>Paradero</CardTitle>
                <CardDescription>Ingresa el número de paradero (ej.: PA100)</CardDescription>
              </CardHeader>
              <CardContent>
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
              <CardFooter>
                <Button>Buscar</Button>
              </CardFooter>
            </TabsContent>
            <TabsContent value="bus">
              <CardHeader>
                <CardTitle>Bus</CardTitle>
                <CardDescription>Ingresa el recorrido / bus</CardDescription>
              </CardHeader>
              <CardContent>
                <Input />
              </CardContent>
              <CardFooter>
                <Button>Buscar</Button>
              </CardFooter>
            </TabsContent>
            <TabsContent value="both">
              <CardHeader>
                <CardTitle>Paradero</CardTitle>
                <CardDescription>Ingresa el número de paradero (ej.: PA100)</CardDescription>
              </CardHeader>
              <CardContent>
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
              <CardContent>
                <Input />
              </CardContent>
              <CardFooter>
                <Button>Buscar</Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  )
} 