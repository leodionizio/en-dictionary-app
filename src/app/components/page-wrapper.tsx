"use client";
import { ReactNode, useEffect, useState } from "react";
import { Header } from "./header";
import { usePathname } from "next/navigation";

type PageWrapperProps = {
  children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setDisplayMenu(!["/signin", "/signup"].includes(pathname));
  }, [pathname]);

  return (
    <>
      {displayMenu && <Header />}
      <div className="flex flex-col p-6 max-w-sm mx-auto">{children}</div>
    </>
  );
};
