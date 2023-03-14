import styled from "styled-components";
import { truncate, TimeSince } from "utils";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const Title = styled.div`
  font-size: 18px;
  text-align: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

const Number = styled.span`
  font-size: 24px;
  margin-right: 8px;
`;

const Icon = styled.span`
  font-size: 36px;
`;

type BlockData = {
  number: string;
  ts: string | number;
};

const TitleNumberIcon = ({
  title,
  value,
  icon,
  object,
  response,
}: {
  title: string;
  value: string;
  icon: string;
  object: boolean;
  response?: string;
}) => {
  const number: string | undefined =
    response && object
      ? (JSON.parse(response) as BlockData)?.number
      : (response as string);
  const ts: number =
    response && object
      ? new Date((JSON.parse(response) as BlockData).ts).getTime()
      : 0;

  return (
    <Block>
      <Title>{title}</Title>
      <Info>
        <Number>{truncate(number || value, 15)}</Number>
        <Icon>{icon}</Icon>
      </Info>
      {ts > 0 && <TimeSince timestamp={ts} />}
    </Block>
  );
};

export default TitleNumberIcon;
