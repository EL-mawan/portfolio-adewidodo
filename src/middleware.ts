import { NextRequest, NextResponse } from 'next/server'

// Simple JWT decoder
function decodeJWT(token: string): { exp?: number; id?: string; email?: string } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = parts[1]
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('utf8'))
    return decoded
  } catch {
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
