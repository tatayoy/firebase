import { Dispatch, SetStateAction } from "react";
import Text from "./Text";
import { useLocation } from "react-router-dom";
import Image from "./Image";
import imgProfile from "../assets/image/profile-image.png";

const Header = ({
  setIsClickLogin,
  isClickLogin,
  className,
}: {
  setIsClickLogin?: Dispatch<SetStateAction<boolean>>;
  isClickLogin?: boolean;
  className?: string;
}) => {
  const user = JSON.parse(localStorage.getItem("user") as string);

  const location = useLocation();

  const isProtectedRoute =
    location.pathname === "/protected/dashboard" ||
    location.pathname === "/protected/shipping-comps";

  return (
    <div className={className}>
      <Text label="KLEDO TEST" className="font-bold not-italic	text-2xl font-roboto text-white" />

      {isProtectedRoute ? (
        <div className="flex items-center gap-2">
          <Image
            width={40}
            height={40}
            src={user?.data?.data?.user.profile_image || imgProfile}
            alt="avatar"
          />

          <Text
            label={user?.data?.data?.user.name}
            className="text-lg not-italic font-normal font-roboto text-white"
          />
        </div>
      ) : (
        <div className="flex fixed top-0 right-4">
          <div
            onClick={() => setIsClickLogin && setIsClickLogin(false)}
            className={`${!isClickLogin && "bg-black"} py-4 px-4 cursor-pointer`}
          >
            <Text
              label="Profile"
              className="text-lg not-italic font-normal font-roboto text-white"
            />
          </div>

          <div
            onClick={() => setIsClickLogin && setIsClickLogin(true)}
            className={`${isClickLogin && "bg-black"} py-4 px-4 cursor-pointer`}
          >
            <Text label="Login" className="text-lg not-italic font-normal font-roboto text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
