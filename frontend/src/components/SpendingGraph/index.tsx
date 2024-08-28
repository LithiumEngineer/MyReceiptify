import { ItemProps, ReceiptProps } from "@/types/types";
import { receiptAge } from "@/utils/functions";
import {
    Chart as ChartJS,
    LineElement,
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { FC, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
    LineElement,
    PointElement,
    TimeScale,
    LinearScale,
    Title,
    Tooltip
);

interface SpendingGraphProps {
    receipts?: ReceiptProps[];
}

const SpendingGraph: FC<SpendingGraphProps> = ({ receipts }) => {
    // TODO: instead of hardcoding week, month, year, all-time, change it to a Record that's passed as a prop.
    const [interval, setInterval] = useState("Week");
    const [maxYValue, setMaxYValue] = useState(20);
    const [chartData, setChartData] = useState<any>();

    useEffect(() => {
        let map = new Map();

        const today = new Date();

        receipts
            ?.filter((receipt) => {
                if (interval === "Week" && receiptAge(receipt.date) <= 7)
                    return true;
                else if (interval === "Month" && receiptAge(receipt.date) <= 30)
                    return true;
                else if (interval === "Year" && receiptAge(receipt.date) <= 365)
                    return true;
                else if (interval === "All-time") return true;
                return false;
            })
            ?.forEach((receipt) => {
                const label = new Date(receipt.date).toLocaleDateString();
                let totalPrice = 0;
                receipt.items.forEach(
                    (item: ItemProps) => (totalPrice += item.price ?? 0)
                );
                if (!map.has(label)) map.set(label, 0);
                map.set(label, map.get(label) + totalPrice);
            });

        if (interval === "Week") {
            const firstDay = new Date(
                new Date().setDate(today.getDate() - 7)
            ).toLocaleDateString();
            if (!map.has(firstDay)) map.set(firstDay, 0);
        } else if (interval === "Month") {
            const firstDay = new Date(
                new Date().setDate(today.getDate() - 30)
            ).toLocaleDateString();
            if (!map.has(firstDay)) map.set(firstDay, 0);
        } else if (interval === "Year") {
            const firstDay = new Date(
                new Date().setDate(today.getDate() - 365)
            ).toLocaleDateString();
            if (!map.has(firstDay)) map.set(firstDay, 0);
        }
        if (!map.has(new Date().toLocaleDateString())) {
            map.set(new Date().toLocaleDateString(), 0);
        }

        let cumulative = Array.from(map, ([label, value]) => {
            return {
                label,
                value,
            };
        }).sort((a, b) => a.label.localeCompare(b.label));
        let cumulativeSum = 0;
        for (let i = 0; i < cumulative.length; i++) {
            cumulative[i] = {
                ...cumulative[i],
                value: cumulative[i].value + cumulativeSum,
            };
            cumulativeSum = cumulative[i].value;
        }

        const labels = cumulative.map((a) => a.label);
        const values = cumulative.map((a) => Math.trunc(a.value));

        const newChartData = {
            labels,
            datasets: [
                {
                    label: "Data",
                    data: values,
                    borderColor: "orange",
                    borderWidth: 1,
                    tension: 0,
                    pointRadius: 2,
                },
            ],
        };

        setChartData(newChartData);
    }, [receipts, interval]);

    return (
        <div className="h-72 min-w-96 flex flex-col justify-around mt-6 px-8 py-4 bg-white shadow-lg rounded-xl">
            <div className="flex w-full h-fit justify-start text-xs text-slate-500 space-x-3">
                <p
                    className={`${
                        interval === "Week" && "text-black"
                    } hover:text-black hover:cursor-pointer duration-200`}
                    onClick={() => setInterval("Week")}
                >
                    Week
                </p>
                <p
                    className={`${
                        interval === "Month" && "text-black"
                    } hover:text-black hover:cursor-pointer duration-200`}
                    onClick={() => setInterval("Month")}
                >
                    Month
                </p>
                <p
                    className={`${
                        interval === "Year" && "text-black"
                    } hover:text-black hover:cursor-pointer duration-200`}
                    onClick={() => setInterval("Year")}
                >
                    Year
                </p>
                <p
                    className={`${
                        interval === "All-time" && "text-black"
                    } hover:text-black hover:cursor-pointer duration-200`}
                    onClick={() => setInterval("All-time")}
                >
                    All-time
                </p>
            </div>
            <div className="flex-1 mt-2">
                {chartData && (
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (tooltipItem) =>
                                            `$${tooltipItem.raw}`,
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    type: "time",
                                    time: {
                                        unit: "day",
                                        tooltipFormat: "PP",
                                    },
                                    grid: {
                                        display: false,
                                    },
                                    ticks: {
                                        autoSkip: false,
                                        source: "data",
                                        callback: function (
                                            value,
                                            index,
                                            values
                                        ) {
                                            const date = new Date(value);
                                            if (index === 0)
                                                return date.toLocaleDateString();
                                            else if (
                                                index ===
                                                values.length - 1
                                            )
                                                return "Today";
                                            return "";
                                        },
                                    },
                                },
                                y: {
                                    grid: {
                                        display: false,
                                    },
                                    ticks: {
                                        callback: (value) => {
                                            return value === maxYValue
                                                ? value
                                                : "";
                                        },
                                    },
                                },
                            },
                            animation: {
                                duration: 200,
                            },
                        }}
                        className="max-h-full max-w-full"
                    />
                )}
            </div>
        </div>
    );
};

export default SpendingGraph;
