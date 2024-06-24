"use client"

import React from "react";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
    Table,
    TableBody,
    TableCell,
    TableRow,
  } from "@/components/ui/table"  
import BadgeCustom from "@/components/ui/badge-custom";  
import { Progress } from "@/components/ui/progress"

function Result() {
    const [editBadge, setEditBadge] = useState("false")
    const rawStopData = useSearchParams();
    const stopData = rawStopData.get('data');
    const parsed_results = transformData(JSON.parse(stopData).results)
    const stop = rawStopData.get("stop");
    const parsed_stop = JSON.parse(stop);
    const active_routes = parsed_results.length;

    function transformData(dataArray) {
        let result = [];
        dataArray.forEach(data => {
            let existingRoute = result.find(route => route.route_id === data.route_id);
            if (existingRoute) {
                existingRoute.incoming.push({
                    "bus_distance": data.bus_distance,
                    "arrival_estimation": data.arrival_estimation,
                    "bus_plate_number": data.bus_plate_number,
                });
            } else {
                result.push({
                    "route_id": data.route_id,
                    "incoming": [{
                        "bus_distance": data.bus_distance,
                        "arrival_estimation": data.arrival_estimation,
                        "bus_plate_number": data.bus_plate_number,
                    }],
                    "calculated_at": data.calculated_at,
                    "is_live": data.is_live
                });
            }
        });
        return result;
    }

    function progressToStop(distance_left, limit_distance) {
        if (distance_left >= limit_distance) {
            return null;
        } else if (distance_left <= 0) {
            return 100;
        } else {
            return 100 - (distance_left / limit_distance) * 100;
        }
    }

    function checkInputString(inputString) {
        const twoDigitNumbers = inputString.match(/\b\d{2}\b/g);
        const oneNumber = inputString.match(/\b\d+\b/g);
        const words = inputString.match(/\b[a-zA-Z]+\b/g);

        if (twoDigitNumbers && twoDigitNumbers.length === 2) {
            return `${twoDigitNumbers[0]}-${twoDigitNumbers[1]} min.`;
        } else if (oneNumber && oneNumber.length === 1) {
            return `${oneNumber} min.`;
        } else if (words) {
            if (words.includes("Llegando")) {
                return "Llegando";
            } else if (inputString.startsWith("No") || inputString.startsWith("Servicio")) {
                return <Image src="/micro_fuera.png" alt="icono micro" height={32} width={32} />;
            }
        }
    }

    return (
    <div className="min-h-screen flex flex-col gap-12 justify-center items-center">
        <div className="flex flex-col gap-8">
            <Card className="flex flex-col gap-8">
                <CardHeader className="p-0">
                    <Suspense>
                        <CardTitle className="text-4xl font-semibold tracking-wide">{parsed_stop.toUpperCase()}</CardTitle>
                    </Suspense>
                </CardHeader>
                <div className="w-[75%] border-t-[2px] border-black/10 dark:border-white/10 rounded-full"></div>
                <CardContent className="flex flex-col p-0 gap-4">
                    <Suspense>
                        <p className="text-neutral-500 font-light text-sm">{`${active_routes} recorridos: `}</p>
                        <div className="flex gap-2 flex-wrap">
                            {parsed_results.map((item, index) => {
                                return <BadgeCustom key={index} content={item.route_id} edit={editBadge} className={`rounded-full w-fit`} />
                            })}
                        </div>
                    </Suspense>
                </CardContent>
            </Card>
            <div className="flex flex-col gap-8">
                <Suspense>
                    {parsed_results.map((route, index) => {
                        const buses = route.incoming;
                        return (
                        <div key={route.route_id} className="flex flex-col gap-2">
                            <div className="flex gap-1 items-center">
                                <Image src="/micro_black.png" alt="bus icon" width={32} height={32} className="dark:invert" />
                                <p className="text-2xl font-semibold" key={index}>{route.route_id}</p>
                            </div>
                            <Card className="p-0 overflow-hidden">
                                <Table >
                                    <TableBody className="">
                                        {buses.map((bus, index) => {
                                            return <TableRow key={bus.bus_plate_number} className="border-b dark:border-white/10 text-sm">
                                                <TableCell className="font-medium">
                                                    {bus.bus_distance === null ? (
                                                        <Image src="/micro_fuera.png" alt="icono bus" height={32} width={32} />
                                                        // <p className="">-</p>
                                                    ) : (
                                                        <div className="flex gap-2 items-center justify-start">
                                                            <p>{bus.bus_plate_number}</p>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="flex gap-2 h-[45px] justify-center items-center">
                                                        {bus.bus_distance >= 3000 ? (
                                                                <p>{`${bus.bus_distance} mts.`}</p>
                                                        ) : ( bus.bus_distance === null ? (
                                                            // <Image src="/micro_fuera.png" alt="icono bus" height={32} width={32} />
                                                            <p className="">-</p>
                                                        ) : (
                                                            <div className="flex gap-2 items-center">
                                                                <Progress value={progressToStop(bus.bus_distance, 3000)} className="h-[3px] min-w-[40px]" />
                                                                <p className=" text-nowrap">{bus.bus_distance} mts.</p>
                                                            </div>
                                                        )
                                                        )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end">{checkInputString(bus.arrival_estimation)}</div>
                                                </TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            </Card>
                        </ div>
                        )
                    })}
                </Suspense>
            </div>
        </div>
    </div>
    )
}

export default function ResultPage() {
    return <Suspense>
        <Result />
    </Suspense>
}