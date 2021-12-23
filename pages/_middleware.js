import { NextResponse, NextRequest } from "next/server";

export async function middleware(req, res) {
  const { pathname } = req.nextUrl;
  if (pathname == "/") {
    return NextResponse.redirect("/posts/1");
  }
  return NextResponse.next();
}
