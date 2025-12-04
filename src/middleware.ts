import { NextRequest, NextResponse } from 'next/server'

// Simple JWT decoder (Edge runtime compatible)
function decodeJWT(token: string): { exp?: number; id?: string; email?: string } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = parts[1]
    // Replace URL-safe base64 chars and decode
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    const decoded = JSON.parse(jsonPayload)
    return decoded
  } catch (e) {
    console.error('JWT decode error:', e)
    return null
  }
}

function isTokenValid(token: string): boolean {
  const decoded = decodeJWT(token)
  if (!decoded) return false
  if (!decoded.exp || !decoded.id || !decoded.email) return false
  
  const now = Math.floor(Date.now() / 1000)
  if (decoded.exp < now) return false
  
  return true
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /login/admin routes
  if (pathname.startsWith('/login/admin')) {
    const token = request.cookies.get('auth-token')?.value

    // No token or invalid token -> redirect to login
    if (!token || !isTokenValid(token)) {
      const loginUrl = new URL('/login', request.url)
      const response = NextResponse.redirect(loginUrl)
      if (token) {
        response.cookies.delete('auth-token')
      }
      return response
    }

    // Token valid, allow access
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login/admin',
    '/login/admin/:path*'
  ]
}
