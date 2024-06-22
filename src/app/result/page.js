"use client"

import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
    const rawStopData = useSearchParams();
    const stopData = rawStopData.get('data');
    const parsed_results = JSON.parse(stopData).results
    const stop = rawStopData.get("stop");
    const parsed_stop = JSON.parse(stop);

    return <div>
        <div className="min-h-screen flex flex-col justify-center items-center">
            <p>{parsed_stop}</p>
            {parsed_results.map((item, index) => {
                return <p key={index}>{item.route_id}</p>
            })}
        </div>
    </div>
}