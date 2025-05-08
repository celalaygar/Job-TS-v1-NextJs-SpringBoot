import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "../../auth/[...nextauth]/authOptions";


const BASE_URLL = process.env.BASE_URL || "";
const SPRINT_URL = process.env.SPRINT_URL || "";
const URL = `${BASE_URLL}${SPRINT_URL}`;

export async function POST(
    req: NextRequest
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await req.json();
        console.log(body);
        console.log(URL + "/assign-task");
        const response = await axios.post(
            URL + "/assign-task" , body,
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