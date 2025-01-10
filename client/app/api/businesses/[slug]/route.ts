import { Business } from "@/app/util/types";
import { NextResponse } from "next/server";
import API from "../../external";
import request from "../../request.server";

export const PATCH = async(req: Request,
  { params }: { params: Promise<{ slug: string }> }) => {
  
  const businessId = (await params).slug;
  const body = await req.json();

  const response = await request<null, Business>({
    url: `${API.BUSINESSES_API}/${businessId}`,
    method: 'PATCH',
    body
  });

  return NextResponse.json(response);
}


export const DELETE = async(req: Request,
  { params }: { params: Promise<{ slug: string }> }) => {
  const businessId = (await params).slug;

  await request<null, Business[]>({
    url: `${API.BUSINESSES_API}/${businessId}`,
    method: 'DELETE',
  });

  return NextResponse.json({});
}