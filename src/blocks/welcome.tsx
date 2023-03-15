import TitleSubtitleComponent from "./titleSubtitle";

const WelcomeComponent = ({ title }: { title: string }) =>
  TitleSubtitleComponent({
    title,
    subtitle: "v" + process.env.REACT_APP_VERSION!.replace(/^v/, ""),
    object: false,
  });

export default WelcomeComponent;
