import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URLL = process.env.BASE_URL || "";
const URL = `${BASE_URLL}`;



export async function POST(  req: NextRequest
) {
    try {
        const body = await req.json();

        console.log("register")
        console.log(URL + "auth/register")
        console.log(body)
        const response = await axios.post(
            URL + "auth/register", body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(response.data)

        return NextResponse.json(response.data);
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to create sprint " + error },
            { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
        );
    }
}