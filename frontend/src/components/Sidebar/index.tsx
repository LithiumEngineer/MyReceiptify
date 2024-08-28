import { useDB } from "@/hooks/useDB";
import { receiptAge } from "@/utils/functions";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import SidebarItem, { HeaderItemType } from "../SidebarItem";

interface ReceiptProps {
    userId: string;
    _id: string;
    date?: string;
    items?: ItemProps[];
    name?: string;
}

interface ItemProps {
    name?: string;
    price?: number;
    category?: string;
}

interface CategoriesProps {
    Today: ReceiptProps[];
    Yesterday: ReceiptProps[];
    "Last 7 Days": ReceiptProps[];
    "Last 30 Days": ReceiptProps[];
    [year: string]: ReceiptProps[];
}

interface SidebarProps {
    className?: string;
    receipts?: ReceiptProps[];
    activeMenuItem?: string;
    onChangeActiveMenuItem?: (id: string) => void;
    onRefetch?: () => void;
}

const Sidebar: FC<SidebarProps> = ({
    receipts,
    className,
    activeMenuItem,
    onChangeActiveMenuItem,
    onRefetch,
}) => {
    const { logout } = useAuth0();
    const [categorizedReceipts, setCategorizedReceipts] =
        useState<CategoriesProps>();
    const [collapsed, setCollapsed] = useState(false);
    const [showCollapsed, setShowCollapsed] = useState(false);
    const collapsedTimeout = useRef<NodeJS.Timeout>();
    const { onDeleteReceipt } = useDB();

    useEffect(() => {
        if (!receipts) return;

        const categories: CategoriesProps = {
            Today: [] as ReceiptProps[],
            Yesterday: [] as ReceiptProps[],
            "Last 7 Days": [] as ReceiptProps[],
            "Last 30 Days": [] as ReceiptProps[],
        };
        const copy = [...receipts];
        copy.sort((a, b) => {
            if (!a.date || !b.date) return 0;
            if (a.date < b.date) return -1;
            return 1;
        });
        copy.forEach((r) => {
            if (receiptAge(r.date) === 0) categories["Today"].push(r);
            else if (receiptAge(r.date) <= 1) categories["Yesterday"].push(r);
            else if (receiptAge(r.date) <= 7) categories["Last 7 Days"].push(r);
            else if (receiptAge(r.date) <= 30)
                categories["Last 30 Days"].push(r);
            else {
                const year = r.date?.substr(0, 4) ?? new Date().getFullYear();
                if (!categories[year]) {
                    categories[year] = [];
                }
                categories[year].push(r);
            }
        });
        setCategorizedReceipts(categories);
    }, [receipts]);

    return (
        <div
            className={`${className} ${
                collapsed ? "w-6 min-w-6" : "w-64 min-w-64"
            } relative flex flex-col bg-slate-100 border-r-2 border-solid border-slate-200 select-none duration-200`}
            onMouseEnter={() => {
                clearTimeout(collapsedTimeout.current);
                setShowCollapsed(true);
            }}
            onMouseLeave={() => {
                collapsedTimeout.current = setTimeout(() => {
                    setShowCollapsed(false);
                }, 1000);
            }}
        >
            <div
                className={`absolute z-10 flex justify-around items-center -right-3 top-20 w-6 h-6 rounded-full bg-white border-[1px] border-solid border-gray-400 ease-in-out ${
                    showCollapsed || collapsed
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                } hover:bg-slate-100 hover:cursor-pointer duration-200`}
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? <BiChevronRight /> : <BiChevronLeft />}
            </div>
            {!collapsed && (
                <>
                    <SidebarItem
                        className="mt-10"
                        type={HeaderItemType.Button}
                        text="Dashboard"
                        icon={<MdSpaceDashboard className="w-6 h-6 mr-2" />}
                        selected={activeMenuItem === "Dashboard"}
                        onClick={() => onChangeActiveMenuItem?.("Dashboard")}
                    />

                    <div className="flex-1 overflow-y-scroll">
                        {Object.entries(categorizedReceipts ?? {})?.map(
                            ([category, receipts]) => {
                                if (!receipts.length) return;
                                return (
                                    <>
                                        <SidebarItem
                                            type={HeaderItemType.Title}
                                            text={category}
                                        />
                                        {[...receipts].reverse().map((r) => {
                                            return (
                                                <SidebarItem
                                                    type={HeaderItemType.Button}
                                                    text={
                                                        r?.name
                                                            ? r.name
                                                            : "Untitled"
                                                    }
                                                    selected={
                                                        activeMenuItem === r._id
                                                    }
                                                    onClick={() =>
                                                        onChangeActiveMenuItem?.(
                                                            r._id
                                                        )
                                                    }
                                                    dropdownItems={
                                                        <>
                                                            <div
                                                                className="h-8 w-full flex justify-around items-center rounded-md hover:bg-slate-50 active:bg-slate-100 hover:cursor-pointer"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    onDeleteReceipt(
                                                                        r._id
                                                                    );
                                                                    onChangeActiveMenuItem?.(
                                                                        "Dashboard"
                                                                    );
                                                                }}
                                                            >
                                                                <IoTrashOutline className="text-red-500 h-5 w-5" />
                                                                <p className="text-red-500 text-sm font-light ">
                                                                    Delete
                                                                </p>
                                                            </div>
                                                            <div
                                                                className="h-8 w-full mt-2 flex justify-around items-center rounded-md hover:cursor-not-allowed"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                }}
                                                            >
                                                                <FaShare className="h-5 w-5 text-slate-400" />
                                                                <p className="text-sm font-light ">
                                                                    Share
                                                                </p>
                                                            </div>
                                                        </>
                                                    }
                                                />
                                            );
                                        })}
                                    </>
                                );
                            }
                        )}
                    </div>

                    <SidebarItem
                        className="my-6"
                        type={HeaderItemType.Button}
                        text="Log out"
                        icon={<SlLogout className="w-5 h-5 mr-2" />}
                        onClick={() => logout()}
                    />
                </>
            )}
        </div>
    );
};
export default Sidebar;
