/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface MarketInterface extends utils.Interface {
  functions: {
    "createCategory(string)": FunctionFragment;
    "createStore(string,address)": FunctionFragment;
    "getCategories()": FunctionFragment;
    "getOwner()": FunctionFragment;
    "getShopAddress(uint256)": FunctionFragment;
    "getShopsCount()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createCategory"
      | "createStore"
      | "getCategories"
      | "getOwner"
      | "getShopAddress"
      | "getShopsCount"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createCategory",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "createStore",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCategories",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getShopAddress",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getShopsCount",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createCategory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createStore",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCategories",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getShopAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getShopsCount",
    data: BytesLike
  ): Result;

  events: {
    "CategoryCreated(uint256,string)": EventFragment;
    "ShopCreated(uint256,address,address,string,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CategoryCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ShopCreated"): EventFragment;
}

export interface CategoryCreatedEventObject {
  id: BigNumber;
  name: string;
}
export type CategoryCreatedEvent = TypedEvent<
  [BigNumber, string],
  CategoryCreatedEventObject
>;

export type CategoryCreatedEventFilter = TypedEventFilter<CategoryCreatedEvent>;

export interface ShopCreatedEventObject {
  id: BigNumber;
  shopAddress: string;
  owner: string;
  name: string;
  paymentAddress: string;
}
export type ShopCreatedEvent = TypedEvent<
  [BigNumber, string, string, string, string],
  ShopCreatedEventObject
>;

export type ShopCreatedEventFilter = TypedEventFilter<ShopCreatedEvent>;

export interface Market extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createCategory(
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createStore(
      _name: PromiseOrValue<string>,
      _paymentAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getCategories(overrides?: CallOverrides): Promise<[string[]]>;

    getOwner(overrides?: CallOverrides): Promise<[string]>;

    getShopAddress(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getShopsCount(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  createCategory(
    _name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createStore(
    _name: PromiseOrValue<string>,
    _paymentAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getCategories(overrides?: CallOverrides): Promise<string[]>;

  getOwner(overrides?: CallOverrides): Promise<string>;

  getShopAddress(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getShopsCount(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    createCategory(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    createStore(
      _name: PromiseOrValue<string>,
      _paymentAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getCategories(overrides?: CallOverrides): Promise<string[]>;

    getOwner(overrides?: CallOverrides): Promise<string>;

    getShopAddress(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getShopsCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "CategoryCreated(uint256,string)"(
      id?: null,
      name?: null
    ): CategoryCreatedEventFilter;
    CategoryCreated(id?: null, name?: null): CategoryCreatedEventFilter;

    "ShopCreated(uint256,address,address,string,address)"(
      id?: null,
      shopAddress?: null,
      owner?: null,
      name?: null,
      paymentAddress?: null
    ): ShopCreatedEventFilter;
    ShopCreated(
      id?: null,
      shopAddress?: null,
      owner?: null,
      name?: null,
      paymentAddress?: null
    ): ShopCreatedEventFilter;
  };

  estimateGas: {
    createCategory(
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createStore(
      _name: PromiseOrValue<string>,
      _paymentAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getCategories(overrides?: CallOverrides): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getShopAddress(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getShopsCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createCategory(
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createStore(
      _name: PromiseOrValue<string>,
      _paymentAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getCategories(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getShopAddress(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getShopsCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
