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
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface AlgoLiteSaleInterface extends ethers.utils.Interface {
  functions: {
    "purchase()": FunctionFragment;
    "purchaseWithTokens(uint256)": FunctionFragment;
    "saleInfo()": FunctionFragment;
    "setSaleNumbers(uint256,uint256)": FunctionFragment;
    "withdrawEth()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "purchase", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "purchaseWithTokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "saleInfo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setSaleNumbers",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawEth",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "purchase", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchaseWithTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "saleInfo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setSaleNumbers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawEth",
    data: BytesLike
  ): Result;

  events: {};
}

export class AlgoLiteSale extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: AlgoLiteSaleInterface;

  functions: {
    purchase(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    purchaseWithTokens(
      editions: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    saleInfo(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;

    setSaleNumbers(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawEth(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  purchase(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  purchaseWithTokens(
    editions: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  saleInfo(
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;

  setSaleNumbers(
    newPublicNumber: BigNumberish,
    newPrivateNumber: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawEth(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    purchase(overrides?: CallOverrides): Promise<void>;

    purchaseWithTokens(
      editions: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    saleInfo(
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]>;

    setSaleNumbers(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawEth(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    purchase(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    purchaseWithTokens(
      editions: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    saleInfo(overrides?: CallOverrides): Promise<BigNumber>;

    setSaleNumbers(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawEth(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    purchase(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    purchaseWithTokens(
      editions: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    saleInfo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setSaleNumbers(
      newPublicNumber: BigNumberish,
      newPrivateNumber: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawEth(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
