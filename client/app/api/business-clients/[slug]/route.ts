import { Business } from "@/app/util/types";
import API from "../../external";
import request from "../../request.server";
import { NextResponse } from "next/server";
import { Client } from "@/app/util/interfaces";

export const GET = async(req: Request,
  { params }: { params: Promise<{ slug: string }> }) => {
  const businessId = (await params).slug;

  const response = await request<null, Client[]>({
    url: `${API.BUSINESSES_API}/${businessId}/clients`,
    method: 'GET',
  });

  return NextResponse.json(response);
}