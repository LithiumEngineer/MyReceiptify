const DocumentationIntroduction = () => {
    return (
        <>
            <div className="text-4xl md:text-5xl font-extrabold w-full h-fit mt-10">
                Documentation ✏️
            </div>
            <div className="w-full max-w-[70vw] mt-10">
                <p className="text-xl font-bold">Welcome to Receiptify!</p>
                <p className="text-slate-600 mt-4 leading-7">
                    Receiptify is your all-in-one platform for personal
                    financing. Upload receipts in just one click, and by
                    leveraging OpenCV&apos;s powerful computer vision library,
                    the app will automatically scan your receipt to collect
                    spendings to generate comprehensive spending reports. The
                    app also provides AI-powered personalized spending tips
                    tailored to your spending habits (coming soon) to help you
                    make better financial decisions.
                </p>
            </div>
            <div className="w-full max-w-[70vw] mt-10">
                <p className="text-xl font-bold">How is Receiptify built?</p>
                <div className="text-slate-600 mt-4 leading-7">
                    Receiptify is a full-stack application built off of
                    React/Tailwind CSS for frontend, Express.js and Node.js for
                    server backend, and Python for image processing backend.
                    Thanks to the following libraries (and many more) for making
                    this project possible:
                    <ul className="list-disc pl-10 mt-4 space-y-2">
                        <li>
                            OpenCV - for powerful image processing and giving
                            the app a pair of eyes
                        </li>
                        <li>
                            Tesseract - for OCR (optical character recognition,
                            like reading the words on your receipt)
                        </li>
                        <li>
                            Mongoose - for making server development a bit less
                            like untangling a mess of holiday lights
                        </li>
                        <li>
                            Auth0 - for making this app as secure as ever
                            through JWTs! 🔒🔒🔒
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full max-w-[70vw] mt-10">
                <p className="text-xl font-bold">Work in progress 🚧</p>
                <div className="text-slate-600 mt-4 leading-7">
                    This platform is under active development, and we are
                    excited to announce several features that will be coming
                    shortly:
                    <ul className="list-disc pl-10 mt-4 space-y-2">
                        <li>
                            More spendings widgets, and the ability to customize
                            your user dashboard
                        </li>
                        <li>
                            The ability to draw on receipts to highlight areas
                            of interests
                        </li>
                        <li>
                            A Receiptify API that allows the development of
                            third-party applications
                        </li>
                        <li>
                            Migrating the Computer Vision Python/Flask backend
                            to AWS Lambda to improve performance and reduce
                            latency
                        </li>
                        <li>Major UI improvements such as dark mode!</li>
                    </ul>
                </div>
            </div>
            <div className="w-full max-w-[70vw] mt-10">
                <div className="text-slate-600 mt-4 leading-7">
                    To view the source code for this project, please visit the{" "}
                    <a
                        href="https://github.com/LithiumEngineer/Receiptify"
                        target="_blank"
                    >
                        <p className="inline hover:underline text-blue-600 hover:cursor-pointer hover:text-blue-900">
                            Github repo
                        </p>
                    </a>
                    .
                </div>
                <div className="text-slate-600 mt-4 leading-7">
                    Have any questions? Reach out to me at{" "}
                    <a href="mailto:haochenkang@gmail.com" target="_blank">
                        <p className="inline hover:underline text-blue-600 hover:cursor-pointer hover:text-blue-900">
                            haochenkang@gmail.com
                        </p>
                    </a>
                    .
                </div>
            </div>
        </>
    );
};

export default DocumentationIntroduction;
