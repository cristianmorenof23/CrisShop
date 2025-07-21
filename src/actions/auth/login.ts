'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
): Promise<string> {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      return 'Success'
    }

    return 'Invalid credentials.'

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }

    console.error('Unexpected error:', error)
    return 'Something went wrong.'
  }
}




export const login = async (email : string, password : string) => {
  
  try {
    await signIn('credentials', {email, password})

    return {
      ok : true
    }
  } catch (error) {
    console.log(error);
    return {
      ok : false,
      message : 'No se pudo iniciar sesión, intente más tarde'
    }
  }
}