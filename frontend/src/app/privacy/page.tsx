"use client";

import PrivacyPage from "@/components/PrivacyPage";
import { Auth0ProviderWithHistory } from "../auth0";

const Privacy = () => {
    return (
        <Auth0ProviderWithHistory>
            <PrivacyPage />
        </Auth0ProviderWithHistory>
    );
};

export default Privacy;
