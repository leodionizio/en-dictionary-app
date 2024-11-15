"use client";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AiFillBook } from "react-icons/ai";
import { AuthContext } from "@/app/contexts/auth-context";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { clearToken } = useContext(AuthContext);
  const router = useRouter();

  const menuItems = [
    { text: "Word List", route: "/dictionary" },
    { text: "Profile", route: "/user/profile" },
    { text: "Favorites", route: "/user/favorites" },
    { text: "SignOut", route: "/signout" },
  ];

  const redirectTo = (route: string) => {
    setIsMenuOpen(false);
    if (route === "/signout") {
      clearToken();
      router.replace("/signin");
      return;
    }
    router.replace(route);
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="shadow"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <AiFillBook size={24} />
          <p className="font-bold text-inherit pl-2">English Dictionary</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.text}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              onClick={() => redirectTo(item.route)}
              size="lg"
              aria-label="Close menu"
            >
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
