'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();
  const redirectUrl = searchString
    ? `/?${searchString}`
    : '/';
  const customAuthParams = {
    "ext-seminaltype": searchParams.get("seminaltype") || "defaultSeminalType",
    "ext-test": searchParams.get("test") || "defaultTest",
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">    
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {session ? <>
          <b>Welcome {session?.user?.name} !!</b> <br />
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="#"         
            rel="noopener noreferrer"
            onClick={() =>  signOut()}            
          >
            
            Logout
          </a>
          </> : 
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="#"         
            rel="noopener noreferrer"
            onClick={() => 
              signIn('auth0', {
                  callbackUrl: redirectUrl,
              }, {
                authorizationParams: customAuthParams
              })}
            
          >
            
            Login In
          </a>
          }
          
        </div>
      </main>
      
    </div>
  );
}
