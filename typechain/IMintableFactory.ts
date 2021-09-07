/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IMintable } from "./IMintable";

export class IMintableFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMintable {
    return new Contract(address, _abi, signerOrProvider) as IMintable;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];