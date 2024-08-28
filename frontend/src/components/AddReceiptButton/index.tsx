import { FC } from "react";
import { FiPlus } from "react-icons/fi";

interface AddReceiptProps {
    onAddReceipt?: () => void;
}
const AddReceiptButton: FC<AddReceiptProps> = ({ onAddReceipt }) => {
    return (
        <div
            className="fixed bottom-10 right-10 w-16 h-16 flex items-center justify-around rounded-full border-4 border-solid border-sky-400 bg-sky-400 hover:cursor-pointer"
            onClick={onAddReceipt}
        >
            <FiPlus color="white" size={30} />
        </div>
    );
};
export default AddReceiptButton;
