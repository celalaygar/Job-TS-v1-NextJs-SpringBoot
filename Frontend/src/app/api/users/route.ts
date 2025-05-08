import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import axios from "axios";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const response = await axios.get(URL + "auth/user/all", {
            headers: {
                Authorization: session.accessToken, // Spring Boot JWT'yi buraya ekliyoruz
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch users " + error },
            { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
        );
    }
}
