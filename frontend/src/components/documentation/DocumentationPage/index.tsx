import { useState } from "react";
import Footer from "../../Footer";
import Header from "../../Header";
import DocumentationAPI from "../DocumentationAPI";
import DocumentationIntroduction from "../DocumentationIntroduction";
import DocumentationRelease from "../DocumentationRelease";
import DocumentationSidebar from "../DocumentationSidebar";

const DocumentationPage = () => {
    const [activeMenuItem, setActiveMenuItem] = useState("Introduction");

    return (
        <div className="w-screen h-screen flex flex-col">
            <Header />
            <div className="relative flex h-[calc(100vh-56px)]">
                <DocumentationSidebar
                    activeMenuItem={activeMenuItem}
                    onChangeActiveMenuItem={(item) => setActiveMenuItem(item)}
                />
                {activeMenuItem === "Introduction" && (
                    <div className="flex-1 w-full flex flex-col px-20 pb-20 overflow-y-scroll">
                        <DocumentationIntroduction />
                        <Footer className="pt-10" />
                    </div>
                )}
                {activeMenuItem === "Release Notes" && (
                    <div className="flex-1 w-full flex flex-col px-20 pb-20 overflow-y-scroll">
                        <DocumentationRelease />
                        <Footer className="pt-10" />
                    </div>
                )}
                {activeMenuItem === "API" && (
                    <div className="flex-1 w-full flex flex-col px-20 pb-20 overflow-y-scroll">
                        <DocumentationAPI />
                        <Footer className="pt-10" />
                    </div>
                )}
            </div>
        </div>
    );
};
export default DocumentationPage;
