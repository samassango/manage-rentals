import { NextRequest, NextResponse } from 'next/server'
import { getSessionData, verifyToken } from './app/actions/login'

export async function middleware(request: NextRequest) {
  try {
    const res= NextResponse.next()
    console.log({middleware: res})
    if(res.status === 401){
      res.cookies.delete('session')
      return res
    }

    if(request.nextUrl.pathname ==='/logout'){
        const response =NextResponse.next()
        response.cookies.delete('session')
        return response
    }

    const currentUser = await getSessionData()
    console.log({ request, currentUser })

    if (!currentUser) {
      return NextResponse.redirect(new URL('/logout', request.url))
    }

    let validToken = await verifyToken(currentUser.token)
    if (validToken && validToken.id) {
      return NextResponse.next()
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/logout', request.url))
  }


}

export const config = {
  matcher: ['/tenant', '/tenant-admin', '/my-listing', '/tenant-admin/[propertyId]', '/logout', '/tenant/[tenantId]' ],
}