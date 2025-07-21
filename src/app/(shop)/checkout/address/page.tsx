import Title from "@/components/ui/title/Title";
import AdressFrom from "./ui/AdressFrom";
import { getCountries } from "@/actions/country/get-countrys";
import { auth } from "@/auth.config";
import { getUserAddress } from "@/actions/address/get-user-address";

export default async function AdressPage() {

  const country = await getCountries()
  const session = await auth()

  if (!session?.user) {
    return (
      <h3 className="text-5xl font-bold">No hay sesion de usuario</h3>
    )
  }


  const userAddressRaw = await getUserAddress(session.user.id)

  const userAddress = userAddressRaw
    ? {
      ...userAddressRaw,
      address2: userAddressRaw.address2 ?? undefined, // ⬅️ si es null, lo pasa a undefined
    }
    : undefined;

  return (
    <>
      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0 bg-white shadow-lg rounded-lg">
        <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

          <Title title="Dirección" subtitle="Dirección de entrega" />
          <AdressFrom country={country} userStoreAddress={userAddress} />
        </div>

      </div>
    </>
  )
}
