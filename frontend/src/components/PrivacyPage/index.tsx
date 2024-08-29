import { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";

const DocumentationPage = () => {
    const [activeMenuItem, setActiveMenuItem] = useState("Introduction");

    return (
        <div className="w-screen h-screen flex flex-col">
            <Header />
            <div className="flex-1 w-full flex flex-col px-20 pb-20 overflow-y-scroll">
                <>
                    <div className="text-4xl md:text-5xl font-extrabold w-full h-fit mt-10">
                        Privacy Policy 🔒
                    </div>
                    <div className="w-full max-w-[70vw] flex-1 mt-10">
                        <p className="text-xl font-bold">
                            Keeping your data secure
                        </p>
                        <p className="text-slate-600 mt-4 leading-7">
                            Receiptify™ has built-in features to help keep your
                            data safe and secure. From using JWTs authentication
                            and RS256 algorithm, we want to keep your data as
                            secure as possible. However, when using our service,
                            please ensure that the images of receipts you upload
                            do not contain any sensitive or personal
                            information. Although the Computer Vision software
                            aims to extract only relevant data from receipts
                            such as item names and prices, please be aware that
                            any information present within your receipt may be
                            extracted and stored in the database.
                        </p>
                        <div className="text-slate-600 mt-4 leading-7">
                            This means that when taking pictures of receipts,
                            ensure that only the items and their prices are
                            included in the frame, and any other information
                            should be excluded from view. If at any time you
                            would like your data to be removed, please contact{" "}
                            <a
                                href="mailto:receiptifyinquiries@gmail.com"
                                target="_blank"
                            >
                                <p className="inline hover:underline text-blue-600 hover:cursor-pointer hover:text-blue-900">
                                    receiptifyinquiries@gmail.com
                                </p>
                            </a>
                            .
                        </div>
                    </div>
                </>
                <Footer className="pt-10" />
            </div>
        </div>
    );
};
export default DocumentationPage;
