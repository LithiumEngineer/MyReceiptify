import { useAuth0 } from "@auth0/auth0-react";
import SplashScreen from "../SplashScreen";
import Dashboard from "../Dashboard";

const HomeScreen = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    return isLoading ? (
        <></>
    ) : isAuthenticated ? (
        <Dashboard/>
    ) : (
        <SplashScreen />
    );
};

export default HomeScreen;
