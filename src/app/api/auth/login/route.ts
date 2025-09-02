
import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
// Nota: Necesitarás instalar bcryptjs: npm install bcryptjs @types/bcryptjs
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Correo y contraseña son requeridos' }, { status: 400 });
    }

    // Usamos la tabla correcta de tu base de datos: `seg_usuarios`
    const results: any = await executeQuery('SELECT * FROM seg_usuarios WHERE email = ?', [email]);

    if (results.length === 0) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    const user = results[0];

    // **NOTA PARA DESARROLLO**:
    // La siguiente línea está para cuando las contraseñas ESTÉN encriptadas.
    // const passwordIsValid = await bcrypt.compare(password, user.password);

    // Usaremos esta comparación simple MIENTRAS las contraseñas estén en texto plano.
    const passwordIsValid = (password === user.password);

    if (!passwordIsValid) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    // Es importante no enviar nunca la contraseña de vuelta al cliente
    const { password: _, ...userWithoutPassword } = user;

    // En un sistema de producción, aquí se generaría un token (JWT)
    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
