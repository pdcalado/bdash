import styled from "styled-components";
import { truncate } from "utils";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const Title = styled.div`
  font-size: 18px;
  color: white;
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
  color: white;
  margin-right: 8px;
`;

const Icon = styled.span`
  font-size: 36px;
  color: white;
`;

const TitleNumberIcon = ({
  title,
  value,
  icon,
  response,
}: {
  title: string;
  value: string;
  icon: string;
  response?: string;
}) => (
  <Block>
    <Title>{title}</Title>
    <Info>
      <Number>{truncate(response || value, 15)}</Number>
      <Icon>{icon}</Icon>
    </Info>
  </Block>
);

export default TitleNumberIcon;
