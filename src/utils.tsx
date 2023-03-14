import React, { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";

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

const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  return `${hours}h ${minutes}m`;
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

const TimeSinceLabel = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 14px;
  color: inherit;
`;

export const TimeSince = ({ timestamp }: { timestamp: string | number }) => {
  const now = new Date();
  const then = new Date(timestamp);
  const duration = now.getTime() - then.getTime();
  const durationText = formatDuration(duration);

  return <TimeSinceLabel>since {durationText} ago</TimeSinceLabel>;
};
