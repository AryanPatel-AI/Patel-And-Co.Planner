"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";
import { Building, Plus, Ticket } from "lucide-react";

const Header = () => {
  
  const { isLoading } = useStoreUser();



  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"} className="flex items-center">
            <Image
                src="/PACo.png"
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
            <div className="flex items-center">

            <Link href="/pricing" className="mr-2">
              <Button variant={"ghost"} size="sm">Pricing</Button>
            </Link>

            <Link href="/explore" className="mr-2">
              <Button variant={"ghost"} size="sm">Explore</Button>
            </Link>

            <Authenticated>
              <Link href="/create-event" className="mr-4">
                <Button size="sm" className="flex gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Event</span>
                </Button>
              </Link>

              {/* Create Event */}

              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Tickets"
                    labelIcon={<Ticket size={16} />}
                    href="/my-tickets"
                  />

                  <UserButton.Link
                    label="My Events"
                    labelIcon={<Building size={16} />}
                    href="/my-events"
                  />

                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Authenticated>

          

            <Unauthenticated>
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </Unauthenticated>
           
            </div>


        </div>

        {/* Mobile Search & Location */}

        {/* Loader */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width={"100%"} color="#a855f7"/>
          </div>
        )}

      </nav>

      {/* Modals */}


    </>
  )
}

export default Header; 