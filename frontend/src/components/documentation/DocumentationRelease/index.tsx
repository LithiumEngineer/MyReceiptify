const DocumentationRelease = () => {
    return (
        <>
            <div className="text-4xl md:text-5xl font-extrabold w-full h-fit mt-10">
                Release Notes 📝
            </div>
            <div className="w-full max-w-[70vw] mt-10 flex-1">
                <p className="text-xl font-bold">
                    Release 1.0 - August 27, 2024
                </p>
                <p className="text-slate-600 mt-4 leading-7">
                    After some 4AM intense debugging sessions and countless
                    number of coffees, this is it! Release 1.0 is the first
                    publicly accessible version of Receiptify. All the basic
                    features of the app is now ready for production, including:
                    <ul className="list-disc pl-10 mt-4 space-y-2">
                        <li>
                            The app uses Computer Vision and Machine Learning to
                            automatically scan user-uploaded receipts
                        </li>
                        <li>
                            The user dashboard provides a comprehensive report
                            of a user&apos;s weekly, monthly, and yearly
                            spendings through widgets
                        </li>
                        <li>Users may edit past receipt names or items</li>
                        <li>
                            Server API has been set up, although it still
                            requires some work before it is fully ready for
                            third-party usage
                        </li>
                        <li>
                            In the process of migrating the python/flask backend
                            to AWS Lambda to drastically improve performance and
                            reduce latency
                        </li>
                    </ul>
                </p>
            </div>
        </>
    );
};
export default DocumentationRelease;
