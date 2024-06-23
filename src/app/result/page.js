"use client"

import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";  
import { Progress } from "@/components/ui/progress"

export default function ResultPage() {
    const rawStopData = useSearchParams();
    const stopData = rawStopData.get('data');
    const parsed_results = transformData(JSON.parse(stopData).results)
    console.log(parsed_results)
    const stop = rawStopData.get("stop");
    const parsed_stop = JSON.parse(stop);

    const active_routes = 'NA';

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
            } else if (inputString.startsWith("No")) {
                return "Fuera";
            }
        }
    }

    return <div className="min-h-screen flex flex-col justify-center items-center">
        <Card>
            <CardHeader>
                <CardTitle>{parsed_stop.toUpperCase()}</CardTitle>
                {/* TODO map over buses to assign each a badge */}
            </CardHeader>
            <div className="w-[75%] border-t-[2px] border-white/5 rounded-full"></div>
            <CardContent>
                <p>{`${active_routes} recorridos activos de ${parsed_results.length}: `}</p>
                <Badge className={`rounded-full`}>Bus</Badge>
            </CardContent>
        </Card>
        <div className="">
                {parsed_results.map((route, index) => {
                    const buses = route.incoming;
                    return <div>
                        <p key={index}>{route.route_id}</p>
                        <Card className="p-0">
                        <Table>
                            <TableBody>
                                {buses.map((bus, index) => {
                                    return <TableRow className="border-b dark:border-white/10">
                                        <TableCell className="font-medium">{bus.bus_plate_number}</TableCell>
                                        <TableCell className="flex gap-2 items-center">
                                            {bus.bus_distance >= 3000 ? (
                                                <p>{bus.bus_distance}</p>
                                            ) : ( bus.bus_distance === null ? (
                                                'eliminar'
                                            ) : (
                                                <div className="flex gap-2 items-center">
                                                    <Progress value={progressToStop(bus.bus_distance, 3000)} className="h-[3px] min-w-[25px]" />
                                                    <p>{bus.bus_distance}</p>
                                                </div>
                                            )
                                            )}
                                        </TableCell>
                                        <TableCell>{checkInputString(bus.arrival_estimation)}</TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                        </Card>
                    </ div> 
                })}
        </div>
    </div>
}