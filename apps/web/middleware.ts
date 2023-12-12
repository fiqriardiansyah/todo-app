import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
        return NextResponse.next();
    }

    const refreshToken = () =>
        fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/refresh', {
            headers: {
                Cookie: cookies().toString(),
            },
        });

    if (pathname.startsWith('/auth')) {
        try {
            const req = await refreshToken();
            if (!req.ok) throw new Error();
            return NextResponse.redirect(new URL('/', request.url));
        } catch (e: any) {
            return NextResponse.next();
        }
    }

    try {
        const req = await refreshToken();
        if (!req.ok) throw new Error();
        return NextResponse.next();
    } catch (e: any) {
        const response = NextResponse.redirect(new URL('/auth/signin', request.url));
        response.cookies.delete('jwt');
        return response;
    }
}
