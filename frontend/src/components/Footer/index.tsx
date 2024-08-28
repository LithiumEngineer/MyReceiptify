import { FC } from "react";

interface FooterProps {
    className?: string;
}
const Footer: FC<FooterProps> = ({ className }) => {
    return (
        <div
            className={`w-full h-14 flex justify-around items-center text-sm text-gray-500 mt-5 ${className}`}
        >
            <div>
                <p className="inline">Made with ❤️ by </p>
                <a href="https://www.kevinkang.me/" target="_blank">
                    <p className="inline underline hover:text-black hover:cursor-pointer duration-200">
                        Kevin Kang
                    </p>
                </a>
            </div>
        </div>
    );
};
export default Footer;
