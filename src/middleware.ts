import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the request is for the admin area
  if (pathname.startsWith('/admin')) {
    // For now, we'll allow access without authentication
    // In production, you should implement proper authentication
    // This is a simple check - you can enhance it later
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}