import { ethers } from 'ethers';
import { makeAutoObservable } from 'mobx';
import { fetchAccount } from '../api/accounts';
import { Account } from '../types';

export class Web3Store {
  public provider: ethers.providers.Web3Provider | null = null;
  public network: ethers.providers.Network | null = null;
  public account: Account = { address: '', isSeller: false };
  public signer: ethers.providers.JsonRpcSigner | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public loadProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.provider = provider;
  };

  public loadNetwork = async () => {
    if (!this.provider) return;
    const network = await this.provider.getNetwork();
    this.network = network;
  };

  public loadAccount = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = await fetchAccount({ address: accounts[0] });
    this.account = { address: accounts[0], isSeller: account.isSeller };
  };

  public loadSigner = () => {
    if (!this.provider) return;
    const signer = this.provider.getSigner();
    this.signer = signer;
  };
}

const web3Store = new Web3Store();
export default web3Store;
