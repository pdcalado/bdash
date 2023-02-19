import { Responsive, WidthProvider } from "react-grid-layout";
import "./styledGridLayout.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const StyledGridLayout = ({
  children,
  layouts,
}: {
  children: JSX.Element | JSX.Element[];
  layouts: ReactGridLayout.Layouts | undefined;
}) => {
  return (
    <ResponsiveReactGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      {children}
    </ResponsiveReactGridLayout>
  );
};
