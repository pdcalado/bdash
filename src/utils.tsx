import React, { Component, ErrorInfo, ReactNode } from "react";

export type FetchState = {
  loading: boolean;
  done: boolean;
};

export const emptyFetchState: FetchState = {
  loading: false,
  done: false,
};

export const truncate = (str: string, n: number) => {
  return str.length > n ? str.substring(0, n - 1) + "..." : str;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    return decoded.exp < Date.now() / 1000;
  } catch (e) {
    return false;
  }
};

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return <div>"Sorry there was an error"</div>;
    }

    return this.props.children;
  }
}
