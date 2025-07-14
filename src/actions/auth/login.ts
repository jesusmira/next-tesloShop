'use server';
 
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
import { sleep } from '@/utils/sleep';
import { ok } from 'assert';
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // await sleep(2);

    await signIn('credentials',{
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';
    
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'CredentialsSignin';
        default:
          return 'Error desconocido';
      }
    }
    
  }
}


export const login = async (email: string, password: string) => {

  try {
     await signIn('credentials', { email, password });

     return {  ok: true };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo iniciar sesión"
    }
  }
}