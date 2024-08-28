"use client";

import DocumentationPage from "@/components/documentation/DocumentationPage";
import React from "react";
import { Auth0ProviderWithHistory } from "../auth0";

const Documentation = () => {
    return (
        <Auth0ProviderWithHistory>
            <DocumentationPage />
        </Auth0ProviderWithHistory>
    );
};

export default Documentation;
