"use client";
import { Separator } from "../../ui/separator";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer id="footer" className={`py-24 sm:py-32 ${
      theme === 'dark' ? 'bg-dark-background text-light-text' : 'bg-light-background text-dark-text'
    }`}>
      <div className={`container p-10 border rounded-2xl ${
        theme === 'dark' ? 'bg-dark-card border-dark-border' : 'bg-light-card border-light-border'
      }`}>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="#" className="flex font-bold items-center">
              <Image
                src="/lopop.png"
                alt="Logo"
                width={72}
                height={72}
                className="w-18 h-18"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <div>
              <Link href="https://github.com/Audran-wol" className="opacity-60 hover:opacity-100">
                Github
              </Link>
            </div>
            <div>
              <Link href="https://x.com/WolfhardsA?s=09" className="opacity-60 hover:opacity-100">
                Twitter
              </Link>
            </div>
            <div>
              <Link href="https://www.instagram.com/audran_germany?igsh=MXhzczd5NHhnYXB5Nw==" className="opacity-60 hover:opacity-100">
                Instagram
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Support Developer</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100 flex items-center gap-2">
                <Image
                  src="/support.png"
                  alt="Support Developer"
                  width={20}
                  height={80}
                />
                Support Us
              </Link>
            </div>
          </div>
        </div>

        <Separator className={`my-6 ${
          theme === 'dark' ? 'bg-dark-border' : 'bg-light-border'
        }`} />
        
        <section>
          <h3>
            &copy; 2024 Designed and developed by
            <Link
              target="_blank"
              href="https://github.com/Audran-wol"
              className={`text-primary transition-all border-primary hover:border-b-2 ml-1 ${
                theme === 'dark' ? 'text-dark-primary' : 'text-light-primary'
              }`}
            >
              Audran Tiedang
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};
