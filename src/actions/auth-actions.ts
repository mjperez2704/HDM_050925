
'use server';

import { z } from 'zod';
import db from '@/lib/db';

const LoginSchema = z.object({
  email: z.string().email({ message: 'Por favor, ingrese un correo electrónico válido.' }),
  password: z.string().min(1, { message: 'La contraseña es requerida.' }),
});

type LoginInput = z.infer<typeof LoginSchema>;

export async function login(credentials: LoginInput): Promise<{ success: boolean; message: string }> {
  const validatedFields = LoginSchema.safeParse(credentials);

  if (!validatedFields.success) {
    return { success: false, message: 'Campos inválidos.' };
  }

  const { email, password } = validatedFields.data;

  try {
    const [rows]: any = await db.query(
      'SELECT * FROM seg_usuarios WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return { success: false, message: 'El correo electrónico no está registrado.' };
    }

    const user = rows[0];

    // NOTA: Esta es una comparación de texto plano.
    // En un entorno de producción, las contraseñas deben ser hasheadas.
    // Ejemplo: const passwordMatch = await bcrypt.compare(password, user.password_hash);
    const passwordMatch = user.password_hash === password;

    if (!passwordMatch) {
      return { success: false, message: 'La contraseña es incorrecta.' + user.password_hash + '\n' + password};
    }

    // Aquí se debería crear una sesión o token (ej. JWT, Next-Auth)
    // Por ahora, solo confirmamos que la autenticación fue exitosa.

    return { success: true, message: 'Inicio de sesión exitoso.' };

  } catch (error) {
    console.error('Error de autenticación:', error);
    return { success: false, message: 'Error del servidor al intentar iniciar sesión.' };
  }
}
