"use client";

import Link from "next/link";
import { useActionState, useEffect } from 'react';
import { authenticate } from '@/actions';
import { useSearchParams,  } from 'next/navigation';
import { IoInformationOutline } from "react-icons/io5";


export const LoginForm = () => {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  // const router = useRouter();

  useEffect(() => {
    if (errorMessage === 'Success') {
      // redireccionar
      // router.replace('/')
      window.location.replace('/');
    }
    
  }, [errorMessage]);
  


  return (
    <form action={ formAction }className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 bg-gray-200 rounded mb-5 border-gray-300 border"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 bg-gray-200 rounded mb-5 border-gray-300 border"
        type="password"
        name="password"
      />
       <div
          className="flex h-8 items-end space-x-1 mb-2"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">Credenciales no son correctas</p>
            </>
          )}
        </div>

      <input type="hidden" name="redirectTo" value={callbackUrl} />    
      <button type="submit"
       aria-disabled={isPending}
       className="btn-primary">Ingresar</button>
         

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
