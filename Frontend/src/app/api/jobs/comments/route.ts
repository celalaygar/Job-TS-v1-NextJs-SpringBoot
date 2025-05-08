import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import axios from "axios";

const BASE_URLL = process.env.BASE_URL || "";
const COMMENT_URL = process.env.COMMENT_URL || "";
const BASE_URL = `${BASE_URLL}${COMMENT_URL}`;

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: session.accessToken,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments " + error },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const response = await axios.post(BASE_URL, body, {
      headers: {
        Authorization: session.accessToken,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create comment " + error },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const response = await axios.put(`${BASE_URL}/${id}`, body, {
      headers: {
        Authorization: session.accessToken,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update comment " + error },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: session.accessToken,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete comment " + error },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}
