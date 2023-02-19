import "./App.css";
import { useEffect } from "react";
import { ErrorBoundary, isTokenExpired } from "utils";
import { Loading } from "loading";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Dashboard from "dashboard";

const sessionTokenIsValid = (): boolean => {
  const token = sessionStorage.getItem("token");
  return token ? !isTokenExpired(token) : false;
};

const Routed = () => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    error,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE!,
        },
      })
        .then((token) => sessionStorage.setItem("token", token))
        .catch((error) => {
          console.error("error: ", error);
        });
      return;
    }

    if (sessionTokenIsValid()) return;

    if (isLoading) return;

    const loc = window.location;

    loginWithRedirect({
      appState: {
        targetUrl: loc.pathname + loc.hash + loc.search,
      },
    });
  }, [isAuthenticated, loginWithRedirect, isLoading, getAccessTokenSilently]);

  if (!isAuthenticated && sessionTokenIsValid()) {
    return <Dashboard />;
  }

  if (error) {
    return <div>Auth failed... {error.message}</div>;
  }

  if (isLoading || !isAuthenticated) {
    return <Loading />;
  }

  return <Dashboard />;
};

function App() {
  return (
    <ErrorBoundary>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN!}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: process.env.REACT_APP_AUTH0_AUDIENCE!,
        }}
      >
        <Routed />
      </Auth0Provider>
    </ErrorBoundary>
  );
}

export default App;
