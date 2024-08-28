import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import Footer from "../Footer";
import Header from "../Header";

const SplashScreen = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-col flex-1 items-center h-auto w-auto mx-auto mt-[20vh]">
                <div className="group flex items-center rounded-full border border-solid border-gray-200 px-4 py-1 h-fit w-fit hover:border-gray-300 hover:bg-gray-50 duration-200">
                    <img src="./opencv.png" className="h-5 w-5 mr-2"></img>
                    <p className="text-xs text-gray-500 group-hover:text-gray-700 duration-200">
                        Powered by OpenCV
                    </p>
                </div>
                <div className="text-6xl font-extrabold w-fit h-fit mt-4">
                    Receiptify
                </div>
                <div className="mt-5 text-2xl w-fit h-fit text-center">
                    You personal finance assistant. Wherever. Whenever.
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => loginWithRedirect()}
                        className="flex items-center justify-around mx-2 px-8 py-2 text-white rounded-lg bg-cyan-400 border-2 border-cyan-400 border-solid hover:bg-white hover:text-cyan-400 duration-200 hover:cursor-pointer"
                    >
                        Get started
                    </button>
                    <Link href="/documentation" target="_blank">
                        <button className="flex items-center justify-around mx-2 px-8 py-2 text-slate-500 rounded-lg border-2 border-slate-500 border-solid hover:border-slate-800 hover:text-slate-800 duration-200 hover:cursor-pointer">
                            Documentation
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default SplashScreen;
