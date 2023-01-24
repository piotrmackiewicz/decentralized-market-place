import { Typography } from 'antd';

interface Props {
  type: 'address';
  value: string;
  display?: string;
}

export const EtherscanLink = ({ type, value, display }: Props) => {
  const href = `https://etherscan.io/${type}/${value}`;

  return (
    <Typography.Link href={href} target='_blank'>
      {display || value}
    </Typography.Link>
  );
};
