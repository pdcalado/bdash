const data = {
  "/config": {
    blocks: [
      {
        kind: "welcome",
        props: {
          title: "Bdash",
        },
        background_color: "darkslategray",
        width: 12,
        height: 1,
        static: true,
      },
      {
        kind: "titleSubtitle",
        props: {
          title: "Health",
          subtitle: "-1",
        },
        background_color: "palevioletred",
        path_url: "/health",
        width: 2,
        height: 1,
        x: 0,
        y: 1,
        static: false,
      },
      {
        kind: "titleNumberIcon",
        props: {
          title: "Network Usage",
          value: "-1",
          icon: "🖧",
        },
        background_color: "#1b263b",
        path_url: "/network-usage",
        width: 2,
        height: 1,
        x: 2,
        y: 1,
        static: false,
      },
      {
        kind: "titleSubtitle",
        props: {
          title: "Data Backend",
          subtitle: "-1",
        },
        background_color: "coral",
        path_url: "/backend",
        width: 2,
        height: 1,
        x: 4,
        y: 1,
        static: false,
      },
      {
        kind: "titleNumberIcon",
        props: {
          title: "Weather",
          value: "-1",
          icon: "☀️",
        },
        background_color: "cadetblue",
        path_url: "/weather",
        width: 2,
        height: 1,
        x: 6,
        y: 1,
        static: false,
      },
    ],
  },
  "/network-usage": "5400 bytes",
  "/health": "OK",
  "/weather": "Sunny",
  "/backend": "SessionStorage",
};

export default data;
