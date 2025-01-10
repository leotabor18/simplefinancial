import { Business } from "@/app/util/types";
import API from "../external";
import request from "../request.server";
import { NextResponse } from "next/server";
import { BusinessesResponse } from "@/app/util/interfaces";

export const POST = async(req: Request) => {
  const body = await req.json();

  const response = await request<null, Business>({
    url: API.BUSINESSES_API,
    method: 'POST',
    body
  });

  return NextResponse.json(response);
}

export const GET = async(req: Request) => {
  const response = await request<null, BusinessesResponse>({
    method: 'GET',
    url: API.BUSINESSES_API,
  }) 

  const data: Business[] = response.businesses;

  return NextResponse.json(data);
}