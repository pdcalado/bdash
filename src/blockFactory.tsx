import { useEffect, useState } from "react";
import ReactGridLayout from "react-grid-layout";
import styled from "styled-components";
import getter from "getter";
import { emptyFetchState, FetchState } from "utils";

export type Block = {
  kind: string;
  background_color?: string;
  color?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  static?: boolean;
  path_url?: string;
  props: any; // props are dependent on the block kind
};

export type Grid = {
  layouts: ReactGridLayout.Layouts;
  children: JSX.Element[];
};

type StyledDivProps = {
  background_color?: string;
  color?: string;
};

const setImportantOrInherit = (value?: string) => {
  return value ? value + " !important" : "inherit";
};

const StyledDiv = styled.div<StyledDivProps>`
  background-color: ${(props) => setImportantOrInherit(props.background_color)};
  color: ${(props) => setImportantOrInherit(props.color)};
  display: grid;
`;

const Wrapper = ({
  props,
  path_url,
  Child,
}: {
  props: any;
  path_url?: string;
  Child: any;
}) => {
  const [response, setResponse] = useState<string | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>(emptyFetchState);

  useEffect(() => {
    if (path_url && !fetchState.done && !fetchState.loading) {
      setFetchState({ loading: true, done: false });
      getter
        .get(process.env.REACT_APP_BLOCK_URL_PATH + path_url)
        .then((text) => {
          setResponse(text);
          setFetchState({ loading: false, done: true });
        })
        .catch((error) => console.error(error));
    }
  }, [fetchState, path_url]);

  return <Child response={response} {...props} />;
};

export const makeBlocks = (blocks: Block[]): Grid => {
  const children = blocks.map((block, index) => {
    const { kind, ...other } = block;
    const Block = require(`./blocks/${kind}`).default;

    return (
      <StyledDiv
        key={index}
        background_color={other.background_color}
        color={other.color}
      >
        <Wrapper props={other.props} path_url={other.path_url} Child={Block} />
      </StyledDiv>
    );
  });

  const layouts = blocks.map((block, index) => {
    const { kind, ...props } = block;
    return {
      i: index.toString(),
      x: props.x || 0,
      y: props.y || 0,
      w: props.width || 1,
      h: props.height || 1,
      static:
        props.static === undefined || props.static === null || props.static,
    };
  });

  return {
    layouts: {
      lg: layouts,
    },
    children,
  };
};
