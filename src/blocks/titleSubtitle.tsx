import styled from "styled-components";
import { truncate, TimeSince } from "utils";

const TitleSubtitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 28px;
  text-align: center;
  margin: 0;
`;

const Subtitle = styled.h3`
  font-size: 18px;
  text-align: center;
  margin: 0;
  margin-top: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

type BlockData = {
  subtitle: string;
  ts: string | number;
};

const TitleSubtitleComponent = ({
  title,
  subtitle,
  object,
  response,
}: {
  title: string;
  subtitle: string;
  object: boolean;
  response?: string;
}) => {
  const subtitleValue: string | undefined =
    response && object
      ? (JSON.parse(response) as BlockData)?.subtitle
      : (response as string);
  const ts: number =
    response && object
      ? new Date((JSON.parse(response) as BlockData).ts).getTime()
      : 0;

  return (
    <TitleSubtitle>
      <Title>{title}</Title>
      <Subtitle>{truncate(subtitleValue || subtitle, 20)}</Subtitle>
      {ts > 0 && <TimeSince timestamp={ts} />}
    </TitleSubtitle>
  );
};

export default TitleSubtitleComponent;
