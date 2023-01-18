import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    localhost: {},
    ganache: {
      url: 'http://127.0.0.1:7545',
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
