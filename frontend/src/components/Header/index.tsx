import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Dropdown, Switch } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FaBell, FaRegBell, FaUserAlt } from "react-icons/fa";
import { HiOutlinePlusSm } from "react-icons/hi";

interface HeaderProps {
    onAddReceipt?: () => void;
}
const Header: FC<HeaderProps> = ({ onAddReceipt }) => {
    const router = useRouter();
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const [darkMode, setDarkMode] = useState(false);

    const profileMenu = (
        <>
            <div className="px-4 text-xs text-slate-500">Settings</div>
            <div className="px-4 text-xs text-slate-400">{user?.name}</div>
            <button
                className="w-72 px-4 py-2 flex items-center justify-between hover:cursor-not-allowed"
                onClick={() => setDarkMode(!darkMode)}
                disabled
            >
                <p>Dark mode (Coming soon)</p>{" "}
                <Switch value={darkMode} disabled />
            </button>
            <div className="mx-1 h-[1px] bg-slate-200"></div>
            <div
                className="px-4 py-2 bg-whte hover:bg-slate-100 hover:cursor-pointer active:bg-slate-200"
                onClick={() => logout()}
            >
                Log out
            </div>
        </>
    );

    const notificationMenu = (
        <>
            <div className="w-72 h-20 px-4 py-2 flex flex-col items-center justify-around text-slate-500">
                <FaBell className="w-8 h-8" />
                <div>You have no new notifications</div>
            </div>
        </>
    );

    const handleLogin = async () => {
        await loginWithRedirect({
            authorizationParams: {
                prompt: "login",
                audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
            },
        });
    };

    return (
        <div className="w-full h-14 min-h-14 flex justify-between items-center border-b-[1px] border-gray-100 shadow-sm">
            <div
                className="ml-4 text-gray-500 font-extrabold hover:cursor-pointer"
                onClick={() => router.push("/")}
            >
                Receiptify
            </div>
            <div className="flex text-gray-500 text-sm font-light items-center">
                {isAuthenticated ? (
                    <>
                        <div
                            className="w-9 h-9 mr-2 flex justify-around items-center rounded-full hover:bg-slate-100 active:bg-slate-200 hover:cursor-pointer"
                            onClick={onAddReceipt}
                        >
                            <HiOutlinePlusSm className="w-8 h-8" />
                        </div>
                        <Dropdown
                            overlay={notificationMenu}
                            trigger={["click"]}
                            overlayClassName="bg-white py-2 rounded-sm shadow-lg"
                        >
                            <div className="w-9 h-9 mr-2 flex justify-around items-center rounded-full hover:bg-slate-100 active:bg-slate-200 hover:cursor-pointer">
                                <FaRegBell className="w-5 h-5 " />
                            </div>
                        </Dropdown>
                        <Dropdown
                            overlay={profileMenu}
                            trigger={["click"]}
                            overlayClassName="bg-white py-2 rounded-sm shadow-lg"
                        >
                            <Avatar
                                size={40}
                                className="mr-8 hover:cursor-pointer border-4 border-solid border-slate-50 hover:border-slate-100 active:border-slate-200"
                                style={{
                                    backgroundColor: "#34dbeb",
                                    color: "#ffffff",
                                }}
                            >
                                {user?.nickname?.toUpperCase().charAt(0) ?? (
                                    <FaUserAlt />
                                )}
                            </Avatar>
                        </Dropdown>
                    </>
                ) : (
                    <>
                        <a
                            href="https://github.com/LithiumEngineer/Receiptify"
                            target="blank"
                        >
                            <p className="hover:text-black hover:cursor-pointer">
                                Github
                            </p>
                        </a>
                        <Link href="/documentation" target="_blank">
                            <p className="ml-4 hover:text-black hover:cursor-pointer">
                                Documentation
                            </p>
                        </Link>
                        <button
                            onClick={async () => handleLogin()}
                            className="flex items-center justify-around mx-4 px-8 py-2 rounded-full border-2 border-cyan-400 border-solid hover:bg-cyan-400 hover:text-white duration-200 hover:cursor-pointer"
                        >
                            Log in
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
export default Header;
