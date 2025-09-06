
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// Esta función se ejecuta para cada ruta que coincida con el "matcher"
export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session')?.value;
  const loginUrl = new URL('/login', request.url);

  // 1. Si no hay token y no estamos en la página de login, redirigir a login.
  if (!sessionToken) {
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginUrl);
  }

  // 2. Verificar el token JWT
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jose.jwtVerify(sessionToken, secret);

    // 3. Si el token es válido y el usuario intenta acceder a /login, redirigir al dashboard.
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 4. Si el token es válido, permitir el acceso a la ruta solicitada.
    return NextResponse.next();

  } catch (error) {
    // 5. Si el token es inválido (expirado, malformado), eliminar la cookie y redirigir a login.
    console.error('Error de verificación de JWT en middleware:', error);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set('session', '', { httpOnly: true, maxAge: 0 });
    return response;
  }
}

// Configuración del Matcher
// Especifica qué rutas deben ser protegidas por este middleware.
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de petición excepto las que empiezan por:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (icono de la página)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
