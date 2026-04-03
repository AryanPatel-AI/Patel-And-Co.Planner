import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"} className="flex items-center">
            <Image
                src="/app.png"
                alt="P&C Logo"
                width={500}
                height={500}
              className="w-full h-11"
              priority
            />
          </Link>


            {/* Search & Location - Desktop Only */}
            {/* <div className="hidden md:flex flex-1 justify-center">
             <SearchLocationBar />
            </div> */}


            {/* Right Side Actions */}


        </div>

        {/* Mobile Search & Location */}

      </nav>

      {/* Modals */}


    </>
  )
}

export default Header; 