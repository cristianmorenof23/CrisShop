import { titleFont } from '@/app/config/fonts';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <div className="flex flex-col">

        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
          type="email"
          id='email'
          placeholder='correo@correo.com'
        />


        <label htmlFor="contraseña">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
          type="password"
          id='contraseña'
        />

        <button

          className="btn-primary hover:cursor-pointer">
          Ingresar
        </button>


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

      </div>
    </div>
  );
}