import { useEffect, useMemo, useState } from "react";
import { atom, useRecoilState } from "recoil";

const userWallet = atom<any>({
  key: "userWallet",
  default: null,
});

export default function useCurrentUser() {
  const [user, setUser] = useRecoilState(userWallet);

  return user;
}

// export function useCurrentWallet1() {
//   const [account, setAccount] = useState<string | null>(null);
//   const [netwok, setNetwork] = useState<Object | null>();
//   const [connected, setConnected] = useState<boolean>(false);

//   const adapter = useMemo(() => new TronLinkAdapter(), []);

//   useEffect(() => {
//     adapter.on("connect", async () => {
//       setAccount(adapter.address);
//     });

//     adapter.on("accountsChanged", (_) => {
//       setAccount(adapter.address);
//     });

//     adapter.on("chainChanged", async (_) => {
//       let networkData = await adapter.network()
//       setNetwork(networkData);
//     });

//     adapter.on("disconnect", () => {
//       setAccount(null)
//       setNetwork(null)
//     });

//     return () => {
//       adapter.removeAllListeners();
//     };
//   }, []);

//   useEffect(() => {
//     setConnected(adapter.connected);
//   }, [adapter.connected])

//   return {
//     netwok,
//     address: account,
//     connected,
//     adapter,
//     connect: () => adapter.connect(),
//     disconnect: () => adapter.disconnect(),
//   };
// }
