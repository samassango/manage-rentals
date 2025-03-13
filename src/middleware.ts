import { NextRequest, NextResponse } from 'next/server'
import { getSessionData, verifyToken } from './app/actions/login'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  try {

    if(request.nextUrl.pathname ==='/logout'){
        const response =NextResponse.next()
        response.cookies.delete('session')
        return response
        // return NextResponse.redirect(new URL('/login', request.url))
    }

    const currentUser = await getSessionData()
    console.log({ request, currentUser })

    if (!currentUser) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    let validToken = await verifyToken(currentUser.token)
    if (validToken && validToken.id) {
      return NextResponse.next()
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }


}

export const config = {
  matcher: ['/tenant', '/tenant-admin', '/my-listing', '/tenant-admin/[propertyId]', '/logout' ],
}