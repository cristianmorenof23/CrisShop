"use client"
import { login } from "@/actions/auth/login"
import { registerUser } from "@/actions/auth/register"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { toast } from "sonner"


interface FormInputs {
  name: string
  email: string
  password: string
}


export default function RegisterForm() {

  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
  const onSubmit = async (data: FormInputs) => {

    const { name, email, password } = data
    const response = await registerUser(name, email, password)
    
    if (!response.ok) {
      toast.error(response.message)
      return
    }

    if (response.ok) {
      toast.success(response.message)
      return
    }

    await login(email.toLowerCase(), password)
    router.replace('/')
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: any) => {
    if (errors.name) toast.error('El nombre es obligatorio');
    if (errors.email) toast.error('Email inválido');
    if (errors.password) toast.error('La contraseña es obligatoria o muy corta');
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit, onError)}>

        <label htmlFor="nombre">Nombre Completo</label>
        <input
          className={clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
            'border-red-500 focus:ring-red-600 ': errors.name
          }
          )}
          type="nombre"
          id='nombre'
          placeholder='Cristian....'
          autoFocus
          {...register('name', { required: true })}
        />

        <label htmlFor="email">Email</label>
        <input
          className={clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
            'border-red-500 focus:ring-red-600 ': errors.email,
          }
          )}
          type="email"
          id='email'
          {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
          placeholder='correo@correo.com'
        />


        <label htmlFor="contraseña">Contraseña</label>
        <input
          className={clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
            'border-red-500 focus:ring-red-600 ': errors.password
          }
          )}
          type="password"
          id='contraseña'
          {...register('password', { required: true, minLength: 6 })}
          placeholder="Ingresa tu contraseña"
        />

        <button

          className="btn-primary hover:cursor-pointer">
          Crear Cuenta
        </button>


        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login"
          className="btn-secondary text-center">
          Ingresar
        </Link>

      </form>
    </>
  )
}
