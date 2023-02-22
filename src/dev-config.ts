const data = {
  "/config": {
    blocks: [
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
        y: 1,
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
        y: 1,
        x: 0,
      },
    ],
  },
  "/network-usage": "5400 bytes",
  "/health": "OK",
};

export default data;
