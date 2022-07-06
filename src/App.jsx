import React, { useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import { ExecuteQuery, ReduceData} from "./PowerBi";
import Button from "react-bootstrap/Button";
import "./styles/App.css";
import OuterTabs from './OuterTabs';
import Typography from '@mui/material/Typography';

const AuthenticatedContent = () => {
    const { instance, accounts } = useMsal();
    const [accountData, setAccountData] = useState(null);

    function RequestAccountData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            ExecuteQuery(response.accessToken).then(response => {
              setAccountData(ReduceData(response));
              console.log("setting account data")
            });
        });
    }

    return (
        <>
            {accountData ? 
                <OuterTabs accountData={accountData} />
                :
                <Button variant="secondary" onClick={RequestAccountData}>Load Account Data From PowerBi</Button>
            }
        </>
    );
};

/**
 * If a user is authenticated the AuthenticatedContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
export default function App() {
    return (
        <PageLayout>
          <div className="App">
              <AuthenticatedTemplate>
                  <AuthenticatedContent />
              </AuthenticatedTemplate>

              <UnauthenticatedTemplate>
                  <Typography>Please sign-in to view account data from Power BI</Typography>
              </UnauthenticatedTemplate>
          </div>
        </PageLayout>
    );
}
