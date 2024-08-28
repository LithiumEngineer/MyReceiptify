import { useDB } from "@/hooks/useDB";
import { Category, ItemProps, ReceiptProps } from "@/types/types";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, InputNumber, Select } from "antd";
import { Poppins } from "next/font/google";
import { FC, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TrophySpin } from "react-loading-indicators";
import Picture from "../icons/Picture";

const poppins = Poppins({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
});

const EMOJI: Partial<Record<Category, string>> = {
    [Category.Food]: "🍔",
    [Category.Education]: "🏫",
    [Category.Entertainment]: "🎮",
    [Category.None]: "None",
};

interface UploadImageProps {
    onDashboard: () => void;
}

const AddReceipt: FC<UploadImageProps> = ({ onDashboard }) => {
    const { onCreateReceipt } = useDB();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File>();
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [items, setItems] = useState<ItemProps[]>([]);

    const onItemChange = (idx: number, value: ItemProps) => {
        setItems(
            items.map((item, i) => {
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
            })
        );
    };

    const onDeleteItem = (idx: number) => {
        setItems(items.filter((_, i) => i !== idx));
    };

    const onAddItem = () => {
        setItems([...items, { name: "", price: 0.0, category: Category.None }]);
    };

    const onDrop = (acceptedFiles: File[]) => {
        if (!acceptedFiles.length) {
            return;
        }
        const img = acceptedFiles[0];
        setFile(img);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(img);
    };

    const onSubmitFile = async () => {
        if (file) {
            setIsLoading(true);
            try {
                setSubmitted(true);
                const formData = new FormData();
                formData.append("image", file);

                const res = await fetch("http://127.0.0.1:5000/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                const items = data.items.map((item: string[]) => {
                    return {
                        name: item[0],
                        price: +item[1],
                        category: (item[2] as Category) || Category.None,
                    } as ItemProps;
                });
                setItems(items);
            } catch (error) {
                console.log("Error: ", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
        },
        disabled: submitted,
    });

    const openFilePicker = () => {
        //@ts-expect-error ignore
        fileInputRef.current?.click();
    };

    return (
        <div
            className="flex-1 flex items-center justify-evenly"
            onDragOver={(e) => e.preventDefault()}
        >
            {isLoading ? (
                <div className="h-fit w-fit flex flex-col items-center">
                    <TrophySpin
                        color="#32cd32"
                        size="medium"
                        text=""
                        textColor=""
                    />
                    <div
                        className={`text-2xl mt-5 font-serif ${poppins.className} text-green-900 font-bold text-center mx-5`}
                    >
                        Hold on! The money munchkins are scanning your receipt!
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="w-[50%] h-[80%] max-w-96 flex flex-col items-center transition-all duration-400"
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <div
                            className={`container ${
                                isDragActive
                                    ? "bg-blue-50 border-2 border-blue-400"
                                    : "bg-white"
                            } rounded-lg flex-1 relative shadow-2xl min-w-40 mx-10`}
                        >
                            <div
                                {...getRootProps()}
                                className={`absolute inset-8 rounded-lg ${
                                    imagePreview
                                        ? ""
                                        : `border-[3px] border-dashed ${
                                              isDragActive
                                                  ? "border-blue-300"
                                                  : "border-gray-200"
                                          }`
                                } flex justify-around items-center overflow-hidden`}
                            >
                                <input
                                    {...getInputProps()}
                                    ref={fileInputRef}
                                />
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        className="h-full w-full object-cover"
                                    ></img>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Picture className="w-14 h-14" />
                                        <div className="text-blue-950 text-xl mt-4 text-center">
                                            Drag & Drop
                                        </div>
                                        <div className="text-md">
                                            <p className="inline">or </p>
                                            <p
                                                className="inline text-blue-500 hover:underline hover:cursor-pointer"
                                                onClick={openFilePicker}
                                            >
                                                browse
                                            </p>
                                        </div>
                                        <div className="text-gray-500 text-xs mt-5 text-center">
                                            Supports: PNG, JPEG, JPG
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {!submitted && (
                            <div
                                className={`group w-full h-12 shadow-2xl border-2 border-solid ${
                                    file
                                        ? "border-green-400 bg-green-400 hover:cursor-pointer hover:bg-white"
                                        : "border-green-200 bg-green-200 hover:cursor-not-allowed"
                                } mt-4 rounded-md flex justify-around items-center duration-200`}
                                onClick={onSubmitFile}
                            >
                                <p
                                    className={`text-white ${
                                        file
                                            ? "group-hover:text-green-400"
                                            : "text-opacity-60"
                                    }`}
                                >
                                    DONE
                                </p>
                            </div>
                        )}
                    </div>
                    {submitted && (
                        <div className="flex flex-col w-[50%] h-[80%] min-w-96 px-3 rounded-md">
                            <div className="flex-1 overflow-y-scroll">
                                <div className="h-8 w-full flex justify-between items-center space-x-3 text-center text-gray-700 text-sm">
                                    <p className="flex-1">Name</p>
                                    <p className="w-20">Price</p>
                                    <p className="w-20">Category</p>
                                    <p className="w-4 pr-8"></p>
                                </div>
                                {items.map((item, idx) => {
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
                                                style={{ width: 250 }}
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
                                                // defaultValue={Category.None}
                                                className="custom-select"
                                                style={{ minWidth: 80 }}
                                                dropdownStyle={{
                                                    minWidth: 200,
                                                }}
                                                onChange={(value) =>
                                                    onItemChange(idx, {
                                                        category:
                                                            value as Category,
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

                            <div className="min-h-12 w-full mt-4 flex justify-between">
                                <div
                                    className="flex-1 mr-2 text-center content-center rounded-md bg-white border-2 border-solid border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-200 hover:cursor-pointer"
                                    onClick={onDashboard}
                                >
                                    Discard
                                </div>
                                <div
                                    className="flex-1 ml-2 text-center content-center rounded-md bg-sky-400 text-white border-2 border-solid border-sky-400 hover:bg-white hover:text-sky-400 duration-200  hover:cursor-pointer"
                                    onClick={async () => {
                                        await onCreateReceipt(items);
                                        onDashboard();
                                    }}
                                >
                                    Save
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AddReceipt;
