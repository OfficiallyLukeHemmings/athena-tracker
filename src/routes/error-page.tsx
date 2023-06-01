import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  
  return (
   
<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
<div className="text-center">
  <p className="text-lg font-semibold text-pink-600">{error.status}</p>
  <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{error.statusText || error.message}</h1>
  <p className="mt-6 text-lg leading-7 text-gray-600">Sorry, something has gone wrong</p>
  <div className="mt-10 flex items-center justify-center gap-x-6">
    <a href="/" className="px-16 py-4 m-auto mt-4 mb-6 bg-pink-700 hover:ring-pink-700 text-white hover:text-white rounded-lg ring ring-white ring-offset-2 transition ease-in-out duration-300">Go back to home</a>
  </div>
</div>
</main>
  )
  
}