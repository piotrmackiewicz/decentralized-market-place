/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Shop, ShopInterface } from "../Shop";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "_paymentAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "OfferArchived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "contentId",
        type: "string",
      },
    ],
    name: "OfferContentChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shopId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "images",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "string",
        name: "contentId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "category",
        type: "uint256",
      },
    ],
    name: "OfferCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "OfferPriceChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "OffersSuspended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "OffersUnsuspended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shopId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newQuantity",
        type: "uint256",
      },
    ],
    name: "SaleCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "archiveOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_offerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
    ],
    name: "buyProduct",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_contentId",
        type: "string",
      },
    ],
    name: "changeOfferContent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "changeOfferPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "_images",
        type: "string[]",
      },
      {
        internalType: "string",
        name: "_contentId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_category",
        type: "uint256",
      },
    ],
    name: "createOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getIsOffersSuspended",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getOffer",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "contentId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "category",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "archived",
            type: "bool",
          },
        ],
        internalType: "struct Shop.Offer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOffersCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPaymentAddress",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getSale",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "offerId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
        ],
        internalType: "struct Shop.Sale",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSalesCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "suspend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unsuspend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200290c3803806200290c83398181016040528101906200003791906200037f565b8360008190555082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816002908162000090919062000651565b5080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060048190555060006006819055506000600860006101000a81548160ff0219169083151502179055505050505062000738565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b62000130816200011b565b81146200013c57600080fd5b50565b600081519050620001508162000125565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001838262000156565b9050919050565b620001958162000176565b8114620001a157600080fd5b50565b600081519050620001b5816200018a565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200021082620001c5565b810181811067ffffffffffffffff82111715620002325762000231620001d6565b5b80604052505050565b60006200024762000107565b905062000255828262000205565b919050565b600067ffffffffffffffff821115620002785762000277620001d6565b5b6200028382620001c5565b9050602081019050919050565b60005b83811015620002b057808201518184015260208101905062000293565b60008484015250505050565b6000620002d3620002cd846200025a565b6200023b565b905082815260208101848484011115620002f257620002f1620001c0565b5b620002ff84828562000290565b509392505050565b600082601f8301126200031f576200031e620001bb565b5b815162000331848260208601620002bc565b91505092915050565b6000620003478262000156565b9050919050565b62000359816200033a565b81146200036557600080fd5b50565b60008151905062000379816200034e565b92915050565b600080600080608085870312156200039c576200039b62000111565b5b6000620003ac878288016200013f565b9450506020620003bf87828801620001a4565b935050604085015167ffffffffffffffff811115620003e357620003e262000116565b5b620003f18782880162000307565b9250506060620004048782880162000368565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200046357607f821691505b6020821081036200047957620004786200041b565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004e37fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620004a4565b620004ef8683620004a4565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620005326200052c62000526846200011b565b62000507565b6200011b565b9050919050565b6000819050919050565b6200054e8362000511565b620005666200055d8262000539565b848454620004b1565b825550505050565b600090565b6200057d6200056e565b6200058a81848462000543565b505050565b5b81811015620005b257620005a660008262000573565b60018101905062000590565b5050565b601f8211156200060157620005cb816200047f565b620005d68462000494565b81016020851015620005e6578190505b620005fe620005f58562000494565b8301826200058f565b50505b505050565b600082821c905092915050565b6000620006266000198460080262000606565b1980831691505092915050565b600062000641838362000613565b9150826002028217905092915050565b6200065c8262000410565b67ffffffffffffffff811115620006785762000677620001d6565b5b6200068482546200044a565b62000691828285620005b6565b600060209050601f831160018114620006c95760008415620006b4578287015190505b620006c0858262000633565b86555062000730565b601f198416620006d9866200047f565b60005b828110156200070357848901518255600182019150602085019450602081019050620006dc565b868310156200072357848901516200071f601f89168262000613565b8355505b6001600288020188555050505b505050505050565b6121c480620007486000396000f3fe6080604052600436106100f75760003560e01c80638c644f361161008a578063e294e4b811610059578063e294e4b814610304578063e2b0213f1461032d578063e6400bbe14610358578063f8639dac1461036f576100fe565b80638c644f36146102485780639d265e5814610271578063d8f6d5961461029c578063dd8027db146102d9576100fe565b80635c58ce87116100c65780635c58ce87146101b25780635d1ca631146101c9578063893d20e8146101f45780638a1801c61461021f576100fe565b806317d7de7c146101035780632f2e7b751461012e5780634579268a1461015957806353b6286614610196576100fe565b366100fe57005b600080fd5b34801561010f57600080fd5b50610118610398565b604051610125919061113a565b60405180910390f35b34801561013a57600080fd5b5061014361042a565b6040516101509190611175565b60405180910390f35b34801561016557600080fd5b50610180600480360381019061017b91906111d0565b610434565b60405161018d91906112fa565b60405180910390f35b6101b060048036038101906101ab919061131c565b610536565b005b3480156101be57600080fd5b506101c76108aa565b005b3480156101d557600080fd5b506101de610983565b6040516101eb9190611175565b60405180910390f35b34801561020057600080fd5b5061020961098c565b604051610216919061139d565b60405180910390f35b34801561022b57600080fd5b506102466004803603810190610241919061131c565b6109b6565b005b34801561025457600080fd5b5061026f600480360381019061026a91906115d3565b610a9e565b005b34801561027d57600080fd5b50610286610c42565b6040516102939190611706565b60405180910390f35b3480156102a857600080fd5b506102c360048036038101906102be91906111d0565b610c6c565b6040516102d09190611798565b60405180910390f35b3480156102e557600080fd5b506102ee610d17565b6040516102fb9190611175565b60405180910390f35b34801561031057600080fd5b5061032b600480360381019061032691906117b3565b610d21565b005b34801561033957600080fd5b50610342610e18565b60405161034f919061187d565b60405180910390f35b34801561036457600080fd5b5061036d610e2f565b005b34801561037b57600080fd5b50610396600480360381019061039191906111d0565b610f08565b005b6060600280546103a7906118c7565b80601f01602080910402602001604051908101604052809291908181526020018280546103d3906118c7565b80156104205780601f106103f557610100808354040283529160200191610420565b820191906000526020600020905b81548152906001019060200180831161040357829003601f168201915b5050505050905090565b6000600454905090565b61043c61102d565b600560008381526020019081526020016000206040518060c001604052908160008201548152602001600182018054610474906118c7565b80601f01602080910402602001604051908101604052809291908181526020018280546104a0906118c7565b80156104ed5780601f106104c2576101008083540402835291602001916104ed565b820191906000526020600020905b8154815290600101906020018083116104d057829003601f168201915b505050505081526020016002820154815260200160038201548152602001600482015481526020016005820160009054906101000a900460ff1615151515815250509050919050565b6000600560008481526020019081526020016000209050600860009054906101000a900460ff161561059d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059490611944565b60405180910390fd5b8060050160009054906101000a900460ff16156105ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105e6906119b0565b60405180910390fd5b8181600201541015610636576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062d90611a1c565b60405180910390fd5b610644816003015483611001565b3414610685576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067c90611a88565b60405180910390fd5b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16346040516106cd90611ad9565b60006040518083038185875af1925050503d806000811461070a576040519150601f19603f3d011682016040523d82523d6000602084013e61070f565b606091505b5050905080610753576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161074a90611b3a565b60405180910390fd5b6000610763836002015485611017565b90508083600201819055506040518060a001604052806006548152602001846000015481526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018460030154815260200185815250600760006006548152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160030155608082015181600401559050507fb61ca311a8ee5ca9f69e4b5edaefd3a9ef49ddf0a7266e060477266f8ac4063a600654600054856000015433876003015489876040516108839796959493929190611b5a565b60405180910390a16006600081548092919061089e90611bf8565b91905055505050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461093a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093190611c8c565b60405180910390fd5b6000600860006101000a81548160ff0219169083151502179055507f72f836930f38a51ef2e3475d39ba46d581418e0b19e8de70aac92a199206a35c60405160405180910390a1565b60008054905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a46576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3d90611c8c565b60405180910390fd5b8060056000848152602001908152602001600020600301819055507f4fc41712e825807740fbb87fb35ee2daae5f94d1092db5328f8f16e3c7c9fa3c8282604051610a92929190611cac565b60405180910390a15050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b2e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b2590611c8c565b60405180910390fd5b6040518060c00160405280600454815260200185815260200184815260200183815260200182815260200160001515815250600560006004548152602001908152602001600020600082015181600001556020820151816001019081610b949190611e81565b5060408201518160020155606082015181600301556080820151816004015560a08201518160050160006101000a81548160ff0219169083151502179055509050507fbbf8ab281839926703d4cffaf646ebec9c06e467e9fbf0c2f40c2b5bf510e2ba60045460005489898989898989604051610c1999989796959493929190612015565b60405180910390a160046000815480929190610c3490611bf8565b919050555050505050505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610c74611065565b600760008381526020019081526020016000206040518060a001604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600382015481526020016004820154815250509050919050565b6000600654905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610db1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610da890611c8c565b60405180910390fd5b80600560008681526020019081526020016000206001019081610dd49190611e81565b507fcddecdff91213f5776a899fd21177d9be2559b0fe09a17eee6ecebfb4d65d3cb84848484604051610e0a94939291906120be565b60405180910390a150505050565b6000600860009054906101000a900460ff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ebf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eb690611c8c565b60405180910390fd5b6001600860006101000a81548160ff0219169083151502179055507f3fe01a2653957cf9b5a156e0858efd01f9aec9f389684f81cc2f1177a126cfd460405160405180910390a1565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f98576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f8f90611c8c565b60405180910390fd5b60016005600083815260200190815260200160002060050160006101000a81548160ff0219169083151502179055507fa33f0b04c6c835b269f6c13ba58e4f4e418ae539fb8bf29344b45d13b39f34e081604051610ff69190611175565b60405180910390a150565b6000818361100f9190612118565b905092915050565b60008183611025919061215a565b905092915050565b6040518060c0016040528060008152602001606081526020016000815260200160008152602001600081526020016000151581525090565b6040518060a001604052806000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b600081519050919050565b600082825260208201905092915050565b60005b838110156110e45780820151818401526020810190506110c9565b60008484015250505050565b6000601f19601f8301169050919050565b600061110c826110aa565b61111681856110b5565b93506111268185602086016110c6565b61112f816110f0565b840191505092915050565b600060208201905081810360008301526111548184611101565b905092915050565b6000819050919050565b61116f8161115c565b82525050565b600060208201905061118a6000830184611166565b92915050565b6000604051905090565b600080fd5b600080fd5b6111ad8161115c565b81146111b857600080fd5b50565b6000813590506111ca816111a4565b92915050565b6000602082840312156111e6576111e561119a565b5b60006111f4848285016111bb565b91505092915050565b6112068161115c565b82525050565b600082825260208201905092915050565b6000611228826110aa565b611232818561120c565b93506112428185602086016110c6565b61124b816110f0565b840191505092915050565b60008115159050919050565b61126b81611256565b82525050565b600060c08301600083015161128960008601826111fd565b50602083015184820360208601526112a1828261121d565b91505060408301516112b660408601826111fd565b5060608301516112c960608601826111fd565b5060808301516112dc60808601826111fd565b5060a08301516112ef60a0860182611262565b508091505092915050565b600060208201905081810360008301526113148184611271565b905092915050565b600080604083850312156113335761133261119a565b5b6000611341858286016111bb565b9250506020611352858286016111bb565b9150509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006113878261135c565b9050919050565b6113978161137c565b82525050565b60006020820190506113b2600083018461138e565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6113fa826110f0565b810181811067ffffffffffffffff82111715611419576114186113c2565b5b80604052505050565b600061142c611190565b905061143882826113f1565b919050565b600067ffffffffffffffff821115611458576114576113c2565b5b611461826110f0565b9050602081019050919050565b82818337600083830152505050565b600061149061148b8461143d565b611422565b9050828152602081018484840111156114ac576114ab6113bd565b5b6114b784828561146e565b509392505050565b600082601f8301126114d4576114d36113b8565b5b81356114e484826020860161147d565b91505092915050565b600067ffffffffffffffff821115611508576115076113c2565b5b602082029050602081019050919050565b600080fd5b600061153161152c846114ed565b611422565b9050808382526020820190506020840283018581111561155457611553611519565b5b835b8181101561159b57803567ffffffffffffffff811115611579576115786113b8565b5b80860161158689826114bf565b85526020850194505050602081019050611556565b5050509392505050565b600082601f8301126115ba576115b96113b8565b5b81356115ca84826020860161151e565b91505092915050565b600080600080600080600060e0888a0312156115f2576115f161119a565b5b600088013567ffffffffffffffff8111156116105761160f61119f565b5b61161c8a828b016114bf565b975050602088013567ffffffffffffffff81111561163d5761163c61119f565b5b6116498a828b016114bf565b965050604088013567ffffffffffffffff81111561166a5761166961119f565b5b6116768a828b016115a5565b955050606088013567ffffffffffffffff8111156116975761169661119f565b5b6116a38a828b016114bf565b94505060806116b48a828b016111bb565b93505060a06116c58a828b016111bb565b92505060c06116d68a828b016111bb565b91505092959891949750929550565b60006116f08261135c565b9050919050565b611700816116e5565b82525050565b600060208201905061171b60008301846116f7565b92915050565b61172a8161137c565b82525050565b60a08201600082015161174660008501826111fd565b50602082015161175960208501826111fd565b50604082015161176c6040850182611721565b50606082015161177f60608501826111fd565b50608082015161179260808501826111fd565b50505050565b600060a0820190506117ad6000830184611730565b92915050565b600080600080608085870312156117cd576117cc61119a565b5b60006117db878288016111bb565b945050602085013567ffffffffffffffff8111156117fc576117fb61119f565b5b611808878288016114bf565b935050604085013567ffffffffffffffff8111156118295761182861119f565b5b611835878288016114bf565b925050606085013567ffffffffffffffff8111156118565761185561119f565b5b611862878288016114bf565b91505092959194509250565b61187781611256565b82525050565b6000602082019050611892600083018461186e565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806118df57607f821691505b6020821081036118f2576118f1611898565b5b50919050565b7f4f6666657273206172652073757370656e646564000000000000000000000000600082015250565b600061192e6014836110b5565b9150611939826118f8565b602082019050919050565b6000602082019050818103600083015261195d81611921565b9050919050565b7f4f66666572206973206172636869766564000000000000000000000000000000600082015250565b600061199a6011836110b5565b91506119a582611964565b602082019050919050565b600060208201905081810360008301526119c98161198d565b9050919050565b7f4e6f7420656e6f756768207175616e7469747900000000000000000000000000600082015250565b6000611a066013836110b5565b9150611a11826119d0565b602082019050919050565b60006020820190508181036000830152611a35816119f9565b9050919050565b7f496e76616c696420457468657220616d6f756e74000000000000000000000000600082015250565b6000611a726014836110b5565b9150611a7d82611a3c565b602082019050919050565b60006020820190508181036000830152611aa181611a65565b9050919050565b600081905092915050565b50565b6000611ac3600083611aa8565b9150611ace82611ab3565b600082019050919050565b6000611ae482611ab6565b9150819050919050565b7f4661696c656420746f2073656e64204574686572000000000000000000000000600082015250565b6000611b246014836110b5565b9150611b2f82611aee565b602082019050919050565b60006020820190508181036000830152611b5381611b17565b9050919050565b600060e082019050611b6f600083018a611166565b611b7c6020830189611166565b611b896040830188611166565b611b96606083018761138e565b611ba36080830186611166565b611bb060a0830185611166565b611bbd60c0830184611166565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611c038261115c565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611c3557611c34611bc9565b5b600182019050919050565b7f4e6f74206f776e65720000000000000000000000000000000000000000000000600082015250565b6000611c766009836110b5565b9150611c8182611c40565b602082019050919050565b60006020820190508181036000830152611ca581611c69565b9050919050565b6000604082019050611cc16000830185611166565b611cce6020830184611166565b9392505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302611d377fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611cfa565b611d418683611cfa565b95508019841693508086168417925050509392505050565b6000819050919050565b6000611d7e611d79611d748461115c565b611d59565b61115c565b9050919050565b6000819050919050565b611d9883611d63565b611dac611da482611d85565b848454611d07565b825550505050565b600090565b611dc1611db4565b611dcc818484611d8f565b505050565b5b81811015611df057611de5600082611db9565b600181019050611dd2565b5050565b601f821115611e3557611e0681611cd5565b611e0f84611cea565b81016020851015611e1e578190505b611e32611e2a85611cea565b830182611dd1565b50505b505050565b600082821c905092915050565b6000611e5860001984600802611e3a565b1980831691505092915050565b6000611e718383611e47565b9150826002028217905092915050565b611e8a826110aa565b67ffffffffffffffff811115611ea357611ea26113c2565b5b611ead82546118c7565b611eb8828285611df4565b600060209050601f831160018114611eeb5760008415611ed9578287015190505b611ee38582611e65565b865550611f4b565b601f198416611ef986611cd5565b60005b82811015611f2157848901518255600182019150602085019450602081019050611efc565b86831015611f3e5784890151611f3a601f891682611e47565b8355505b6001600288020188555050505b505050505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000611f8b838361121d565b905092915050565b6000602082019050919050565b6000611fab82611f53565b611fb58185611f5e565b935083602082028501611fc785611f6f565b8060005b858110156120035784840389528151611fe48582611f7f565b9450611fef83611f93565b925060208a01995050600181019050611fcb565b50829750879550505050505092915050565b60006101208201905061202b600083018c611166565b612038602083018b611166565b818103604083015261204a818a611101565b9050818103606083015261205e8189611101565b905081810360808301526120728188611fa0565b905081810360a08301526120868187611101565b905061209560c0830186611166565b6120a260e0830185611166565b6120b0610100830184611166565b9a9950505050505050505050565b60006080820190506120d36000830187611166565b81810360208301526120e58186611101565b905081810360408301526120f98185611101565b9050818103606083015261210d8184611101565b905095945050505050565b60006121238261115c565b915061212e8361115c565b925082820261213c8161115c565b9150828204841483151761215357612152611bc9565b5b5092915050565b60006121658261115c565b91506121708361115c565b925082820390508181111561218857612187611bc9565b5b9291505056fea2646970667358221220127661e74daf8072c4fdc9367e8851f16066e697266ba26231c0894da7634f9364736f6c63430008110033";

type ShopConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ShopConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Shop__factory extends ContractFactory {
  constructor(...args: ShopConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _id: PromiseOrValue<BigNumberish>,
    _owner: PromiseOrValue<string>,
    _name: PromiseOrValue<string>,
    _paymentAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Shop> {
    return super.deploy(
      _id,
      _owner,
      _name,
      _paymentAddress,
      overrides || {}
    ) as Promise<Shop>;
  }
  override getDeployTransaction(
    _id: PromiseOrValue<BigNumberish>,
    _owner: PromiseOrValue<string>,
    _name: PromiseOrValue<string>,
    _paymentAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _id,
      _owner,
      _name,
      _paymentAddress,
      overrides || {}
    );
  }
  override attach(address: string): Shop {
    return super.attach(address) as Shop;
  }
  override connect(signer: Signer): Shop__factory {
    return super.connect(signer) as Shop__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ShopInterface {
    return new utils.Interface(_abi) as ShopInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Shop {
    return new Contract(address, _abi, signerOrProvider) as Shop;
  }
}