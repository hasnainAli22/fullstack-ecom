"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import {logout as setLogout} from "@/redux/features/authSlice"
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import CartModel from "./CartModel";
// import CartModal from "@/components/CartModal";
// import { useWixClient } from "@/hooks/useWixClient";
// import Cookies from "js-cookie";
// import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()


//   const wixClient = useWixClient();
  // const isLoggedIn = wixClient.auth.loggedIn();


  const handleProfile = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      setIsProfileOpen((prev) => !prev);
     // router.push("/dashboard")
    }
  };

  // AUTH WITH WIX-MANAGED AUTH

  // const wixClient = useWixClient();

  // const login = async () => {
  //   const loginRequestData = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000"
  //   );

  //   console.log(loginRequestData);

  //   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
  //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
  //   window.location.href = authUrl;
  // };

  const handleLogout = async () => {
    setIsLoading(true)
    logout(undefined).unwrap().then(()=>{
      dispatch(setLogout())
    })
    setIsProfileOpen((prev)=>!prev)
    setIsLoading(fasle)
  };


//   const { cart, counter, getCart } = useCartStore();

//   useEffect(() => {
//     getCart(wixClient);
//   }, [wixClient, getCart]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">

      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        // onClick={login}
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/dashboard">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {/* {counter} */}
        </div>
      </div>
      {isCartOpen && <CartModel />} 
    </div>
  );
};

export default NavIcons;
