import type { NextRequest } from 'next/server'
import { getSessionData } from './app/actions/login'
 
export async function middleware(request: NextRequest) {
  const currentUser = await getSessionData()
// console.log({currentUser})
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: ['/tenant','/tenant-admin','/my-listing'],
}