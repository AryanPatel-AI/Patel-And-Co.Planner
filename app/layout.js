import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/header";


export const metadata = {
  title: "Patel & Co. Planer",
  description: "Plan your events with ease using Patel & Co. Planer, your ultimate event planning companion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
       className={`bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900
       text-white`}
      >  
        <ThemeProvider
         attribute="class"
          defaultTheme="dark"
         enableSystem
         disableTransitionOnChange
        >


          {/* Header */}
          <Header />


         <main className="relative min-h-screen container mx-auto pt-40 md:pt-32">
           {/* Background glow effects (behind everything) */}
           <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
           </div>
           
           {/* Page content (above glow) */}
           <div className="relative z-10 min-h-[70vh]">{children}</div>

           {/*Footer*/}
           <footer className="border-t border-gray-800/50 py-8 px-6 max-w-7xl mx-auto"> 
            <div className="text-sm text-gray-400"> Made with ❤️ by Aryan Patel</div>
           </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
