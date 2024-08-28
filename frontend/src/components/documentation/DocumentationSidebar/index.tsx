import { FC, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import SidebarItem, { HeaderItemType } from "../../SidebarItem";

interface DocumentationSidebarProps {
    className?: string;
    onChangeActiveMenuItem: (item: string) => void;
    activeMenuItem: string;
}

const DocumentationSidebar: FC<DocumentationSidebarProps> = ({
    className,
    onChangeActiveMenuItem,
    activeMenuItem,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const [showCollapsed, setShowCollapsed] = useState(false);
    const collapsedTimeout = useRef<NodeJS.Timeout>();

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
                        className="mt-6"
                        type={HeaderItemType.Title}
                        text="Basic"
                    />
                    <SidebarItem
                        type={HeaderItemType.Button}
                        selected={activeMenuItem === "Introduction"}
                        text="Introduction"
                        onClick={() => onChangeActiveMenuItem("Introduction")}
                    />
                    <SidebarItem
                        className="mt-1"
                        type={HeaderItemType.Button}
                        selected={activeMenuItem === "Release Notes"}
                        text="Release Notes"
                        onClick={() => onChangeActiveMenuItem("Release Notes")}
                    />

                    <SidebarItem
                        className="mt-6"
                        type={HeaderItemType.Title}
                        text="API"
                    />
                    <SidebarItem
                        className="mt-1"
                        type={HeaderItemType.Button}
                        selected={activeMenuItem === "API"}
                        text="API"
                        onClick={() => onChangeActiveMenuItem("API")}
                    />
                </>
            )}
        </div>
    );
};
export default DocumentationSidebar;
