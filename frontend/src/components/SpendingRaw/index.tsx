import { ItemProps, ReceiptProps } from "@/types/types";
import { receiptAge } from "@/utils/functions";
import { FC, useEffect, useState } from "react";

interface SpendingRawProps {
    receipts?: ReceiptProps[];
}

const SpendingRaw: FC<SpendingRawProps> = ({ receipts }) => {
    const [weeklySpending, setWeeklySpending] = useState(0);
    const [averageWeeklySpending, setAverageWeeklySpending] = useState(0);
    const [monthlySpending, setMonthlySpending] = useState(0);
    const [averageMonthlySpending, setAverageMonthlySpending] = useState(0);

    useEffect(() => {
        if (receipts === undefined || receipts?.length === 0) {
            setWeeklySpending(0);
            setAverageWeeklySpending(0);
            setMonthlySpending(0);
            setAverageMonthlySpending(0);
            return;
        }
        let week = 0,
            month = 0,
            total = 0,
            totalDays = receiptAge(receipts[0].date) + 1;
        receipts?.forEach((receipt) => {
            let totalPrice = 0;
            receipt.items.forEach(
                (item: ItemProps) => (totalPrice += item.price ?? 0)
            );
            if (receiptAge(receipt.date) <= 7) week += totalPrice;
            if (receiptAge(receipt.date) <= 30) month += totalPrice;
            total += totalPrice;
        });
        setWeeklySpending(Math.trunc(week));
        setMonthlySpending(Math.trunc(month));

        setAverageWeeklySpending(
            Math.trunc((total / 7) * Math.ceil(totalDays / 7) * 7)
        );
        setAverageMonthlySpending(
            Math.trunc((total / 30) * Math.ceil(totalDays / 30) * 30)
        );
    }, [receipts]);

    return (
        <div className="h-36 min-w-96 flex justify-between mt-6">
            <div className="flex flex-col items-center justify-around bg-white flex-1 mr-2 rounded-xl shadow-lg text-center">
                <p className="text-xs text-slate-500 font-sans">
                    This week, you spent
                </p>
                <p className="text-5xl text-gray-600 font-sans">
                    ${weeklySpending}
                </p>
                <div className="text-sm">
                    <p className="inline text-slate-500">You are spending </p>
                    <p
                        className={`inline ${
                            weeklySpending > averageWeeklySpending
                                ? "text-orange-400"
                                : "text-blue-400"
                        }`}
                    >
                        ${Math.abs(weeklySpending - averageWeeklySpending)}{" "}
                        {weeklySpending > averageWeeklySpending
                            ? "more"
                            : "less"}{" "}
                    </p>
                    <p className="inline text-slate-500">than usual.</p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-around bg-white flex-1 ml-2 rounded-xl shadow-lg text-center">
                <p className="text-xs text-slate-500 font-sans">
                    This month, you spent
                </p>
                <p className="text-5xl text-gray-600 font-sans">
                    ${monthlySpending}
                </p>
                <div className="text-sm">
                    <p className="inline text-slate-500">You are spending </p>
                    <p
                        className={`inline ${
                            monthlySpending > averageMonthlySpending
                                ? "text-orange-400"
                                : "text-blue-400"
                        }`}
                    >
                        ${Math.abs(monthlySpending - averageMonthlySpending)}{" "}
                        {monthlySpending > averageMonthlySpending
                            ? "more"
                            : "less"}{" "}
                    </p>
                    <p className="inline text-slate-500">than usual.</p>
                </div>
            </div>
        </div>
    );
};

export default SpendingRaw;
