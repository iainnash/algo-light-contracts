/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface AlgoLightSaleInterface extends ethers.utils.Interface {
  functions: {
    "owner()": FunctionFragment;
    "purchase()": FunctionFragment;
    "purchaseWithToken()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "saleInfo()": FunctionFragment;
    "setSaleNumbers(uint256,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "purchase", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "purchaseWithToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "saleInfo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setSaleNumbers",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "purchase", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchaseWithToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "saleInfo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setSaleNumbers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class AlgoLightSale extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: AlgoLightSaleInterface;

  functions: {
    owner(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "owner()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    purchase(overrides?: PayableOverrides): Promise<ContractTransaction>;

    "purchase()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

    purchaseWithToken(
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "purchaseWithToken()"(
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    saleInfo(overrides?: CallOverrides): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
    }>;

    "saleInfo()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
    }>;

    setSaleNumbers(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setSaleNumbers(uint256,uint256)"(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  purchase(overrides?: PayableOverrides): Promise<ContractTransaction>;

  "purchase()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

  purchaseWithToken(overrides?: PayableOverrides): Promise<ContractTransaction>;

  "purchaseWithToken()"(
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  saleInfo(overrides?: CallOverrides): Promise<{
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
  }>;

  "saleInfo()"(overrides?: CallOverrides): Promise<{
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
  }>;

  setSaleNumbers(
    newPublicNumber: BigNumberish,
    newPrivateNumber: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setSaleNumbers(uint256,uint256)"(
    newPublicNumber: BigNumberish,
    newPrivateNumber: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    purchase(overrides?: CallOverrides): Promise<void>;

    "purchase()"(overrides?: CallOverrides): Promise<void>;

    purchaseWithToken(overrides?: CallOverrides): Promise<void>;

    "purchaseWithToken()"(overrides?: CallOverrides): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    saleInfo(overrides?: CallOverrides): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
    }>;

    "saleInfo()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
    }>;

    setSaleNumbers(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setSaleNumbers(uint256,uint256)"(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;
  };

  estimateGas: {
    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    purchase(overrides?: PayableOverrides): Promise<BigNumber>;

    "purchase()"(overrides?: PayableOverrides): Promise<BigNumber>;

    purchaseWithToken(overrides?: PayableOverrides): Promise<BigNumber>;

    "purchaseWithToken()"(overrides?: PayableOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    saleInfo(overrides?: CallOverrides): Promise<BigNumber>;

    "saleInfo()"(overrides?: CallOverrides): Promise<BigNumber>;

    setSaleNumbers(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setSaleNumbers(uint256,uint256)"(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    purchase(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    "purchase()"(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    purchaseWithToken(
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "purchaseWithToken()"(
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    saleInfo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "saleInfo()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setSaleNumbers(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setSaleNumbers(uint256,uint256)"(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
