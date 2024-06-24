"use client"

import React from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"

export default function InputOtpCustom(props) {

    return <>
            <InputOTP inputMode="text" maxLength={6} pattern={props.pattern} value={props.value} onChange={props.onChange}>
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
    </>
}