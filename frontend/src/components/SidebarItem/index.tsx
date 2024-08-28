import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown } from "antd";
import { Poppins } from "next/font/google";
import { FC, ReactElement, ReactNode, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

export enum HeaderItemType {
    Title = "TITLE",
    Button = "BUTTON",
}

interface SidebarItemProps {
    type: HeaderItemType;
    text: string;
    icon?: ReactNode;
    className?: string;
    selected?: boolean;
    onClick?: () => void;
    dropdownItems?: ReactElement;
}

const poppins = Poppins({
    weight: ["400", "500", "700"], // Define the weights you need
    subsets: ["latin"], // Define subsets, typically 'latin'
});

const SidebarItem: FC<SidebarItemProps> = ({
    type,
    text,
    icon,
    className,
    selected,
    onClick,
    dropdownItems,
}) => {
    const { getAccessTokenSilently } = useAuth0();

    const [dropdownVisible, setDropdownVisible] = useState(false);

    return type === HeaderItemType.Button ? (
        <div
            onClick={onClick}
            className={`group flex items-center justify-around w-auto mx-4 px-2 py-2 rounded-sm hover:bg-slate-200 ${
                selected && "bg-slate-200"
            } active:bg-slate-300 hover:cursor-pointer ${className}`}
            onMouseLeave={() => setDropdownVisible(false)}
        >
            {icon}
            <p
                className={`${poppins.className} flex-1 text-slate-600 text-sm overflow-hidden whitespace-nowrap`}
            >
                {text}
            </p>
            {dropdownItems && (
                <Dropdown
                    overlay={dropdownItems}
                    trigger={["click"]}
                    overlayClassName="bg-white w-28 px-2 rounded-sm shadow-lg"
                    open={dropdownVisible}
                    onOpenChange={(visible) => setDropdownVisible(visible)}
                >
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        <div
                            className={`justify-around items-center min-w-8 rounded-sm hover:cursor-pointer group-hover:flex group-hover:visible ${
                                dropdownVisible ? "flex" : "hidden"
                            } `}
                        >
                            <AiOutlineEllipsis className="w-5 h-5" />
                        </div>
                    </a>
                </Dropdown>
            )}
        </div>
    ) : (
        <div className="flex items-center h-5 w-auto mx-4 px-2 mt-5">
            <p
                className={`${poppins.className} text-slate-600 text-xs font-semibold overflow-hidden whitespace-nowrap`}
            >
                {text}
            </p>
        </div>
    );
};

export default SidebarItem;
