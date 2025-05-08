import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "../auth/[...nextauth]/authOptions";


const BASE_URLL = process.env.BASE_URL || "";
const SPRINT_URL = process.env.SPRINT_URL || "";
const URL = `${BASE_URLL}${SPRINT_URL}`;

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const response = await axios.get(URL, {
            headers: {
                Authorization: session.accessToken,
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch tasks " + error },
            { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
        );
    }
}


export async function POST(  req: NextRequest
) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);

        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const response = await axios.post(
            URL + "/create", body,
            {
                headers: {
                    Authorization: session.accessToken,
                    "Content-Type": "application/json",
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create sprint " + error },
            { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
        );
    }
}