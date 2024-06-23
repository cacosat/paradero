import React from "react";
import Image from "next/image";
import { Badge } from "./badge";

export default function BadgeCustom({content, edit}) {

    return <>
        <div>
            <Badge className="rounded-full gap-2 px-2">
                <div className="flex gap-1">
                    <Image src="/micro_white.png" alt="bus icon" width={16} height={16} className="dark:invert" />
                    <p>{content}</p>
                </div>
                {edit === 'true' ? (
                    <Image src="/cross.png" alt="exit icon" height={12} width={12} />
                ) : (
                    null
                )}
            </Badge>
        </div>
    </>
}