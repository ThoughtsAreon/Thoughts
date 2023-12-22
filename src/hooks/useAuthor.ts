import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultAuthor, demoAuthor } from "pages/utils/constants";
import { Author } from "types/types";
import { useCurrentWallet } from "WalletProvider";
import { getAuthorDetails } from "scripts";
import { getIpfsURL } from "pages/utils/ipfs";

export type useAuthorType = {
    author: Author
    isAuthorLoading: boolean
}

export const useAuthor = (): useAuthorType => {
    const { wallet, address, connected } = useCurrentWallet();
    const [currAuthor, setCurrAuthor] = useState<any>()
    const [isAuthorLoading, setIsAuthorLoading] = useState<boolean>(true)

    const getProfile = async () => {
        const tempAuthor = defaultAuthor
        setIsAuthorLoading(true)
        try {
            const result = await getAuthorDetails(wallet);
            tempAuthor.name = result.name
            tempAuthor.userName = result.userName
            tempAuthor.description = result.description
            tempAuthor.walletAddress = address
            tempAuthor.img = result.img 
            setCurrAuthor(tempAuthor)
        } catch(e) {
            setCurrAuthor(undefined)
        } finally {
            setIsAuthorLoading(false)
        }
    }

    useEffect(() => {
        if (address && connected&& wallet) getProfile()
    }, [address, connected, wallet])

    return { author: currAuthor, isAuthorLoading: isAuthorLoading }
}

