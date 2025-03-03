import { NextResponse } from 'next/server';

export const middleware = (request: Request) => {
  const url = new URL(request.url);
  const path = url.pathname;

  const response = NextResponse.next();
  response.headers.set('x-current-path', path);

  return response;
}