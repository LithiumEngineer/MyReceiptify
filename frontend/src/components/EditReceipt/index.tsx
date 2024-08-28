import { DEFAULT_RECEIPT, EMOJI } from "@/constants/constants";
import { useDB } from "@/hooks/useDB";
import { selectReceipts } from "@/redux/selectors";
import { Category, ItemProps, ReceiptProps } from "@/types/types";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, InputNumber, Select } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useSelector } from "react-redux";

interface EditReceiptProps {
    receiptId?: string;
}

const EditReceipt: FC<EditReceiptProps> = ({ receiptId }) => {
    const { onSaveReceipt } = useDB();
    const [saved, setSaved] = useState(true);
    const autosaveTimeout = useRef<NodeJS.Timeout>();
    const allReceipts = useSelector(selectReceipts);
    const [receipt, setReceipt] = useState<ReceiptProps>(DEFAULT_RECEIPT);

    useEffect(() => {
        const receipt = allReceipts?.find((r) => r._id === receiptId);
        setReceipt(receipt || DEFAULT_RECEIPT);
    }, [receiptId, allReceipts]);

    const onItemChange = (idx: number, value: ItemProps) => {
        setSaved(false);
        clearTimeout(autosaveTimeout.current);

        const newItems = receipt?.items.map((item, i) => {
            return i === idx
                ? {
                      ...item,
                      ...(value.name !== undefined && { name: value.name }),
                      ...(value.price !== undefined && {
                          price: value.price,
                      }),
                      ...(value.category !== undefined && {
                          category: value.category,
                      }),
                  }
                : item;
        });

        setReceipt({ ...receipt, items: newItems });

        autosaveTimeout.current = setTimeout(async () => {
            if (!receipt?._id) return;
            await onSaveReceipt({ id: receipt._id, newItems });
            setSaved(true);
        }, 1000);
    };

    const onReceiptChange = ({ receiptName }: { receiptName: string }) => {
        setSaved(false);
        clearTimeout(autosaveTimeout.current);
        setReceipt({ ...receipt, name: receiptName });

        autosaveTimeout.current = setTimeout(async () => {
            if (!receipt?._id) return;
            await onSaveReceipt({ id: receipt._id, receiptName });
            setSaved(true);
        }, 1000);
    };

    const onDeleteItem = (idx: number) => {
        setSaved(false);
        clearTimeout(autosaveTimeout.current);

        const newItems = receipt.items.filter((_, i) => i !== idx);
        setReceipt({ ...receipt, items: newItems });

        autosaveTimeout.current = setTimeout(async () => {
            if (!receipt?._id) return;
            await onSaveReceipt({ id: receipt._id, newItems });
            setSaved(true);
        }, 1000);
    };

    const onAddItem = () => {
        setSaved(false);
        clearTimeout(autosaveTimeout.current);

        const newItems = [
            ...receipt.items,
            { name: "", price: 0.0, category: Category.None },
        ];
        setReceipt({ ...receipt, items: newItems });

        autosaveTimeout.current = setTimeout(async () => {
            if (!receipt?._id) return;
            await onSaveReceipt({ id: receipt._id, newItems });
            setSaved(true);
        }, 1000);
    };

    useEffect(() => {
        return () => {
            clearTimeout(autosaveTimeout.current);
        };
    }, []);

    return (
        <div className="relative flex-1" onDragOver={(e) => e.preventDefault()}>
            <div className="absolute flex flex-col inset-10 bg-white shadow-2xl rounded-xl px-8">
                <div className="h-fit w-fit mt-4 flex flex-col">
                    <div className="text-xs text-slate-500 ml-3">
                        {saved ? (
                            "Saved!"
                        ) : (
                            <div className="flex items-center">
                                <FiRefreshCw className="w-3 h-3 mr-2" />
                                Saving...
                            </div>
                        )}
                    </div>
                    <Input
                        className="bg-transparent border-none font-mono text-lg w-80 rounded-none text-slate-600 focus:text-slate-900 hover:bg-slate-100 focus:border-black focus:ring-blue-500 focus:ring-2 focus:bg-white focus:shadow-none"
                        placeholder="Name"
                        value={receipt.name}
                        onChange={(e) =>
                            onReceiptChange({ receiptName: e.target.value })
                        }
                    />
                </div>
                {receipt.items && (
                    <div className="flex flex-col flex-1 min-w-96 mt-5 mb-10 rounded-md overflow-y-scroll">
                        <div className="flex-1 ">
                            <div className="h-8 w-full flex justify-between items-center space-x-3 text-center text-gray-700 text-sm">
                                <p className="flex-1">Name</p>
                                <p className="w-20">Price</p>
                                <p className="w-20">Category</p>
                                <p className="w-4 pr-8"></p>
                            </div>
                            {receipt.items.map((item, idx) => {
                                return (
                                    <div className="h-fit w-full flex justify-between space-x-3 mb-2">
                                        <Input
                                            value={item.name}
                                            placeholder="Name"
                                            onChange={(e) =>
                                                onItemChange(idx, {
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                        <InputNumber<number>
                                            value={item.price}
                                            style={{ width: 128 }}
                                            formatter={(value) =>
                                                `$ ${value}`.replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    ","
                                                )
                                            }
                                            parser={(value) =>
                                                value?.replace(
                                                    /\$\s?|(,*)/g,
                                                    ""
                                                ) as unknown as number
                                            }
                                            onChange={(value) =>
                                                onItemChange(idx, {
                                                    price: value ?? 0,
                                                })
                                            }
                                        />
                                        <Select
                                            className="custom-select"
                                            style={{ minWidth: 80 }}
                                            dropdownStyle={{
                                                minWidth: 200,
                                            }}
                                            onChange={(value) =>
                                                onItemChange(idx, {
                                                    category: value as Category,
                                                })
                                            }
                                            suffixIcon={null}
                                            value={
                                                EMOJI[
                                                    item.category ??
                                                        Category.None
                                                ]
                                            }
                                            options={[
                                                {
                                                    value: Category.Education,
                                                    label: "Education",
                                                },
                                                {
                                                    value: Category.Food,
                                                    label: "Food",
                                                },
                                                {
                                                    value: Category.Entertainment,
                                                    label: "Entertainment",
                                                },
                                                {
                                                    value: Category.None,
                                                    label: "None",
                                                },
                                            ]}
                                        />
                                        <div className="w-fit h-fit pr-4">
                                            <DeleteOutlined
                                                className="hover:text-red-500 hover:cursor-pointer"
                                                onClick={() =>
                                                    onDeleteItem(idx)
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            <div
                                className="group min-h-8 w-full flex justify-around items-center rounded-md border-2 border-dashed border-gray-300 text-gray-400 hover:border-green-500 duration-200 hover:cursor-pointer"
                                onClick={onAddItem}
                            >
                                <PlusOutlined className="group-hover:text-green-500 duration-200" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditReceipt;
