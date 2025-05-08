import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import axios from "axios";



const BASE_URLL = process.env.BASE_URL || "";
const SPRINT_URL = process.env.SPRINT_URL || "";
const SPRINT_STATUSES_URL = process.env.SPRINT_STATUSES_URL || "";
const URL = `${BASE_URLL}${SPRINT_URL}/${SPRINT_STATUSES_URL}`;

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {

        const response = await axios.get(URL +"/all", {
            headers: {
                Authorization: session.accessToken,
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Failed to fetch sprints statuses", error);
        return NextResponse.json(
            { error: "Failed to fetch tasks " + error },
            { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
        );
    }
}