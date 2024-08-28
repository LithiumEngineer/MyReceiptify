import { useDB } from "@/hooks/useDB";
import { selectReceipts } from "@/redux/selectors";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddReceipt from "../AddReceipt";
import DashboardHomepage from "../DashboardHomepage";
import EditReceipt from "../EditReceipt";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Dashboard = () => {
    const { onRefetch } = useDB();
    const { user, getAccessTokenSilently } = useAuth0();
    const [addingReceipt, setAddingReceipt] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
    const receipts = useSelector(selectReceipts);

    const onChangeActiveMenuItem = (activeMenuItem: string) => {
        if (activeMenuItem === "Dashboard") {
            setAddingReceipt(false);
        }
        setActiveMenuItem(activeMenuItem);
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                await onRefetch();
            } catch (error) {
                console.log("Error fetching receipts: ", error);
            }
        };
        fetch();
    }, [user?.sub, getAccessTokenSilently]);

    return (
        <div className="h-screen w-screen bg-slate-50">
            <Header
                onAddReceipt={() => {
                    onChangeActiveMenuItem("Dashboard");
                    setAddingReceipt(true);
                }}
            />

            <div className="relative flex h-[calc(100vh-56px)]">
                <Sidebar
                    className="h-full max-h-full"
                    receipts={receipts}
                    activeMenuItem={activeMenuItem}
                    onChangeActiveMenuItem={(item) =>
                        onChangeActiveMenuItem(item)
                    }
                />
                {activeMenuItem === "Dashboard" ? (
                    addingReceipt ? (
                        <AddReceipt
                            onDashboard={async () => {
                                setAddingReceipt(false);
                                onRefetch();
                            }}
                        />
                    ) : (
                        <DashboardHomepage
                            receipts={receipts}
                            setAddingReceipt={(open) => setAddingReceipt(open)}
                        />
                    )
                ) : (
                    <EditReceipt
                        key={activeMenuItem}
                        receiptId={activeMenuItem}
                    />
                )}
            </div>
        </div>
    );
};
export default Dashboard;
