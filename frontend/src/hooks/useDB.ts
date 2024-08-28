import { setReceipts } from "@/redux/slices";
import { ItemProps, ReceiptProps } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";

export const useDB = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();

    const onCreateReceipt = async (items: ItemProps[]) => {
        if (!user?.sub) return;

        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/upload`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ userId: user.sub, items }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
        } catch (error) {
            console.error("Error:", error);
        }

        await onRefetch?.();
    };

    const onRefetch = async () => {
        if (!user?.sub) return;
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/receipts/${user.sub}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = (await response.json()).sort(
                (a: ReceiptProps, b: ReceiptProps) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return dateA - dateB;
                }
            );
            dispatch(setReceipts(data));
        } catch (error) {
            console.log("Error fetching receipts: ", error);
        }
    };

    const onSaveReceipt = async ({
        id,
        newItems,
        receiptName,
    }: {
        id: string;
        newItems?: ItemProps[];
        receiptName?: string;
    }) => {
        try {
            
            const token = await getAccessTokenSilently();

            console.log("start")
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/receipts/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        items: newItems,
                        name: receiptName,
                    }),
                }
            );
            console.log("end");

            if (!response.ok) {
                throw new Error("Failed to update receipt");
            }
        } catch (error) {
            console.error("Error updating receipt:", error);
        }
        await onRefetch?.();
    };

    const onDeleteReceipt = async (id: string) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/receipts/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete receipt");
            }

            await onRefetch?.();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return {
        onCreateReceipt,
        onSaveReceipt,
        onRefetch,
        onDeleteReceipt,
    };
};
