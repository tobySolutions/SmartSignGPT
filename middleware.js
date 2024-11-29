// app/middleware.js
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request) {
  const token = request.cookies.get('token')?.value

  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const publicPaths = ['/', '/auth/signin', '/auth/signup']
  
  // Check if path is public
  const isPublicPath = publicPaths.includes(path)

  if (!token && !isPublicPath) {
    // Redirect to signin if trying to access protected route without token
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (token && isPublicPath) {
    try {
      // Verify token
      jwt.verify(token, process.env.JWT_SECRET)
      // Redirect to dashboard if token is valid and trying to access public route
      return NextResponse.redirect(new URL('/routes/dashboard', request.url))
    } catch {
      // If token is invalid, continue to public route
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

// Updated matcher configuration
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - static files
     * - image files
     * - favicon
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/',
    '/auth/:path*',
    '/routes/:path*'
  ]
}