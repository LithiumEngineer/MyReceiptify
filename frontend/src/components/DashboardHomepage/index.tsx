import { ReceiptProps } from "@/types/types";
import { FC } from "react";
import AddReceiptButton from "../AddReceiptButton";
import SpendingGraph from "../SpendingGraph";
import SpendingRaw from "../SpendingRaw";

interface DashboardHomepageProps {
    receipts?: ReceiptProps[];
    setAddingReceipt?: (open: boolean) => void;
}

const DashboardHomepage: FC<DashboardHomepageProps> = ({
    receipts,
    setAddingReceipt,
}) => {
    return (
        <div className="relative flex-1 px-10 overflow-y-scroll pb-32">
            <SpendingRaw receipts={receipts} />
            <SpendingGraph receipts={receipts} />
            <AddReceiptButton
                onAddReceipt={() => {
                    setAddingReceipt?.(true);
                }}
            />
            <div className="h-72 min-w-96 bg-white flex shadow-lg rounded-xl items-center justify-around mt-6">
                <p className="text-center text-base text-slate-700">
                    New features coming soon. Stay tuned!
                </p>
            </div>
        </div>
    );
};
export default DashboardHomepage;
