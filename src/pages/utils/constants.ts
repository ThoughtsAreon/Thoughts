import { Author } from "types/types";

export const demoPost = {
    authorAddress: "0x12Ab345Cd67890EF",
    authorName: "John Doe",
    authorDesc: "A passionate writer with over 10 years of experience in the field",
    authorImg: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg",
    title: "The Power of Web3: A Comprehensive Guide",
    content: {
      time: 1635603431943,
      blocks: [
        {
          id: "sheNwCUP5A",
          type: "header",
          data: {
            text: "Editor.js",
            level: 1
          }
        }
      ]
    },
    coverImg: "https://www.goodmorningimagesforlover.com/wp-content/uploads/2018/11/jfgjkld22cv.jpg",
    readTime: 20,
    createdAt: "2022-02-12T09:00:00.000Z",
    id: "123",
    likes: 0,
    price: 0
  }
  
export const demoAuthor = {
  name: "Gaurav",
  email: "",
  date: "",
  address: "",
  description: "",
  img: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"
};
  
export const defaultAuthor: Author = {
  name: "",
  userName: "",
  walletAddress: "",
  address: "",
  description: "",
  img: "",
  findName: ""
}

export const ACCESS_NODE_URLS: any = {
  'local': 'http://localhost:8888',
  'testnet': 'https://rest-testnet.onflow.org',
  'mainnet': 'https://rest-mainnet.onflow.org'
}

export const BLOCK_EXPLORER_URLS = {
  'testnet': 'https://testnet.flowscan.org',
  'mainnet': 'https://flowscan.org'
}


const profile = {
  findName: "bjartek",
  createdAt: "find",
  address: "0x886f3aeaf848c535",
  name: "bjartek",
  gender: "",
  description: "creator of .find, co-owner of versus. #SODA father. Co-author of metadata flow flip. OnFlow Community Rep. Service-Account signer.",
  tags: [
      "find",
      "versus",
      "overflow",
      "flovatar-maxi",
      "neo-team-8"
  ],
  avatar: "https://flovatar.com/api/image/95",
  links: {
      "Homepage": {
          "url": "https://bjartek.org",
          "title": "Homepage",
          "type": "globe"
      },
      "Twitter": {
          "url": "https://twitter.com/0xBjartek",
          "title": "Twitter",
          "type": "twitter"
      }
  },
  "wallets": [
      {
          "name": "FUSD",
          "balance": "1.09999994",
          "accept": "A.3c5959b568896393.FUSD.Vault",
          "tags": [
              "fusd",
              "stablecoin"
          ]
      },
      {
          "name": "Flow",
          "balance": "334.17593528",
          "accept": "A.1654653399040a61.FlowToken.Vault",
          "tags": [
              "flow"
          ]
      },
      {
          "name": "USDC",
          "balance": "0.00000000",
          "accept": "A.b19436aae4d94622.FiatToken.Vault",
          "tags": [
              "usdc",
              "stablecoin"
          ]
      }
  ],
  "following": [""],
  "followers": [
      {
          "follower": "0xdec5369b36230285",
          "following": "0x886f3aeaf848c535",
          "tags": [""]
      },
      {
          "follower": "0xf4c99941cd3ae3d5",
          "following": "0x886f3aeaf848c535",
          "tags": [""]
      }
  ],
  "allowStoringFollowers": true
}

export const pinataTokenJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NTBhNDU2NS02ZjM0LTQ1YTYtYmVmOS04ZmIxMGE0NmVlN2EiLCJlbWFpbCI6ImdhdXJhdmRoYWxsYTE0OTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijk2ZmUyNTE3MTViNTU4NGE0MTk1Iiwic2NvcGVkS2V5U2VjcmV0IjoiMWM1MjFiMDRiMjUyODM5MGU4MTkwNDU0NDk4MmYyNjJlMmZkY2JkNzc0YjI1YzI2YjQxM2RjM2VjODgzNzk1YSIsImlhdCI6MTY3NzQzNTY2N30.w8elVwSZ_U62af_MVKlVcawik9dQ-eLsoUVE4osqzlc"
export const pinataApiKey = "96fe251715b5584a4195"
export const pinataApiSecret = "1c521b04b2528390e81904544982f262e2fdcbd774b25c26b413dc3ec883795a"


export const subscribeEndpoint = "http://localhost:5001/app/subscribe"
export const getSubscribersEndpoint = "http://localhost:5001/app/all-subscribers"