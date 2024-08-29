import { Auth0Provider } from "@auth0/auth0-react";
import { FC, ReactNode } from "react";

interface Auth0ProviderWithHistoryProps {
    children: ReactNode;
}

export const Auth0ProviderWithHistory: FC<Auth0ProviderWithHistoryProps> = ({
    children,
}) => {
    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "";
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "";

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri:
                    typeof window !== "undefined" ? window.location.origin : "",
                audience: process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE,
            }}
            useRefreshTokens={true}
            cacheLocation="localstorage"
        >
            {children}
        </Auth0Provider>
    );
};

