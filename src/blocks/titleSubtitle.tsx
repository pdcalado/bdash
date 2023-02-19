import styled from "styled-components";
import { truncate } from "utils";

const TitleSubtitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 28px;
  color: white;
  text-align: center;
  margin: 0;
`;

const Subtitle = styled.h3`
  font-size: 18px;
  color: white;
  text-align: center;
  margin: 0;
  margin-top: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TitleSubtitleComponent = ({
  title,
  subtitle,
  response,
}: {
  title: string;
  subtitle: string;
  response?: string;
}) => {
  return (
    <TitleSubtitle>
      <Title>{title}</Title>
      <Subtitle>{truncate(response || subtitle, 20)}</Subtitle>
    </TitleSubtitle>
  );
};

export default TitleSubtitleComponent;
