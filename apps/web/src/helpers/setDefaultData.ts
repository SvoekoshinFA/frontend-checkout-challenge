import { useState } from "react";
import type { Data } from "../types/Data";

export default function setDefaultData<T>() {
    const data: Data<T> = {
        Data: undefined,
        Error: undefined,
        Loading: false
    }
    return useState(data);
}