import { useEffect, useState } from "react";
import { StyledGridLayout } from "./styledGridLayout";
import { Block, makeBlocks } from "blockFactory";
import { emptyFetchState, FetchState } from "utils";
import getter from "getter";

const defaultBlocks: Block[] = [
  {
    kind: "titleSubtitle",
    props: {
      title: "Bdash",
      subtitle: "Welcome",
    },
    background_color: "darkslategray",
    width: 12,
    height: 1,
    static: true,
  },
];

const Dashboard = () => {
  const [fetchState, setFetchState] = useState<FetchState>(emptyFetchState);
  const [blocks, setBlocks] = useState<Block[]>(defaultBlocks);

  useEffect(() => {
    if (!fetchState.done && !fetchState.loading) {
      setFetchState({ loading: true, done: false });

      getter
        .get(process.env.REACT_APP_CONFIG_URL_PATH!)
        .then((response) => {
          const json = JSON.parse(response);
          setBlocks(json.blocks);
          setFetchState({ loading: false, done: true });
        })
        .catch((error) => console.error(error));
    }
  }, [fetchState]);

  const grid = makeBlocks(blocks);

  return (
    <div className="App">
      <StyledGridLayout layouts={grid.layouts}>
        {grid.children!}
      </StyledGridLayout>
    </div>
  );
};

export default Dashboard;
