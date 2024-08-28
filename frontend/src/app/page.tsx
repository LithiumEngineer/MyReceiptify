"use client";

import HomeScreen from "@/components/HomeScreen";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { Auth0ProviderWithHistory } from "./auth0";

export default function Home() {
    return (
        <Provider store={store}>
            <Auth0ProviderWithHistory>
                <HomeScreen />
            </Auth0ProviderWithHistory>
        </Provider>
    );
}
