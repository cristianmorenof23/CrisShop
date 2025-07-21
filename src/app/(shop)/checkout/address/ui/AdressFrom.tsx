'use client'
import { setUserAddress } from '@/actions/address/set-user-address';
import { Country } from '@/interfaces/country-interface';
import { useAddressStore } from '@/store/address/adress-store';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { deleteUserAddress } from '@/actions/address/delete-user-address';
import { toast } from 'sonner';
import { Address } from '@/interfaces/address-interface';
import { useRouter } from 'next/navigation';


type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAdress?: boolean;
}

interface Props {
  country: Country[]
  userStoreAddress?: Partial<Address>
}

export default function AdressFrom({ country, userStoreAddress = {} }: Props) {
  const router = useRouter()

  const { setAddress, address } = useAddressStore()
  const { data: session } = useSession({
    required: true
  })

  const { handleSubmit, register, formState: { isValid, errors }, reset } = useForm<FormInputs>({
    defaultValues: {
      ...(userStoreAddress as Partial<FormInputs>),
      rememberAdress: false
    }
  })

  useEffect(() => {
    if (address.firstName) {
      reset(address)
    }
  }, [address, reset])




  const onSubmit = async (data: FormInputs) => {
    const { rememberAdress, ...rest } = data
    setAddress(rest)

    if (rememberAdress) {
      // TODO: server action
      await setUserAddress(rest, session?.user.id || '');
      toast.success('Dirección guardada correctamente')
    } else {
      // TODO: server action
      await deleteUserAddress(session?.user.id || '')
    }
    router.push('/checkout')
  }


  return (
    <>
      <form className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col mb-2">
          <label htmlFor="nombres" >Nombres</label>
          <input
            id="nombres"
            type="text"
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
              'border-red-500 focus:ring-red-600 ': errors.firstName
            }
            )} {...register('firstName', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            id="apellidos"
            type="text"
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
              'border-red-500 focus:ring-red-600 ': errors.lastName
            }
            )}
            {...register('lastName', { required: true })
            }
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="direccion">Dirección</label>
          <input
            id="direccion"
            type="text"
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
              'border-red-500 focus:ring-red-600 ': errors.address
            }
            )}
            {...register('address', { required: true })
            }
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="direcciondos">Dirección 2 (opcional)</label>
          <input
            id="direcciondos"
            type="text"
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
              'border-red-500 focus:ring-red-600 ': errors.address2
            }
            )}
            {...register('address2')
            }
          />
        </div>


        <div className="flex flex-col mb-2">
          <label htmlFor="codigopostal">Código postal</label>
          <input
            id="codigopostal"
            type="text"
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
              'border-red-500 focus:ring-red-600 ': errors.postalCode
            }
            )}
            {...register('postalCode', { required: true })
            }
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            id="ciudad"
            type="text"
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
              'border-red-500 focus:ring-red-600 ': errors.city
            }
            )}
            {...register('city', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="pais">País</label>
          <select
            id="pais"
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
              'border-red-500 focus:ring-red-600 ': errors.country
            }
            )}
            {...register('country', { required: true })}
          >
            <option value="">[ Seleccione ]</option>

            {country.map((country) => (
              <option value={country.id} key={country.id}>{country.name}</option>
            ))}



          </select>
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            type="text"
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent", {
              'border-red-500 focus:ring-red-600 ': errors.phone
            }
            )}
            {...register('phone', { required: true })
            }
          />
        </div>


        <div className="inline-flex items-center mb-10">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
            data-ripple-dark="true"
          >

            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              {...register('rememberAdress')}
            // checked
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>

          <span>¿Recordar Direccion?</span>
        </div>


        <div className="flex flex-col mb-2 sm:mt-10">
          <button
            disabled={!isValid}
            type='submit'
            className={
              clsx({
                'btn-primary hover:cursor-pointer': isValid,
                'bg-gray-700 text-white shadow-lg   font-bold rounded-lg px-4 py-2': !isValid
              })
            }>
            Siguiente
          </button>
        </div>


      </form>
    </>
  )
}
