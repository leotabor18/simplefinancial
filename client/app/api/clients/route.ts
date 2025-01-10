import API from "../external";
import request from "../request.server";

export const POST = async(req: Request) => {
  const body = await req.json();

  const response = await request({
    url: API.CLIENTS_API,
    method: 'POST',
    body
  });

  return Response.json({ response })
}