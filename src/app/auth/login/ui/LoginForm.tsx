"use client"

import Link from 'next/link';
import { useActionState } from "react";
import { useEffect } from "react";
import { authenticate } from '@/actions/auth/login';
import { IoInformationOutline } from 'react-icons/io5';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';

export default function LoginForm() {

  const [state, dispatch] = useActionState(authenticate, undefined)

  useEffect(() => {
    if (!state) return;
    if (state === 'Success') {
      window.location.replace('/');
    }
  }, [state]);


  return (
    <>
      <form action={dispatch} className="flex flex-col">

        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
          type="email"
          id='email'
          name='email'
          placeholder='correo@correo.com'
        />


        <label htmlFor="contraseña">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
          type="password"
          name='password'
          id='contraseña'
          placeholder='Ingresa tu contraseña'
        />

        <div className='flex h-8 items-end space-x-1' aria-live='polite' aria-atomic='true'>
          {
            (state === 'Invalid credentials.' || state === 'Something went wrong.') && (
              <>
                <div className='flex flex-row mb-2'>
                  <IoInformationOutline className='h-5 w-5 text-red-500' />
                  <p className='text-sm text-red-500'>{state}</p>
                </div>
              </>
            )
          }
        </div>

        {/* <button
          type='submit'
          className="btn-primary hover:cursor-pointer hover:shadow-lg">
          Ingresar
        </button> */}
        <LoginButton />

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account"
          className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>

      </form>
    </>
  )
}




function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending} // Esto lo desactiva funcionalmente
      className={clsx({
        "btn-primary hover:cursor-pointer": !pending,
        "opacity-50 cursor-not-allowed": pending
      }
      )}
    >
      Ingresar
    </button>
  );
}
