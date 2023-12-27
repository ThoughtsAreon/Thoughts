//https://tales.infura-ipfs.io/ipfs/QmedpPDPhYpBTYgRMTeVSZeaPWaCHpTU7YR1CSP8VC4SxH
//https://ipfs.io/ipfs/QmedpPDPhYpBTYgRMTeVSZeaPWaCHpTU7YR1CSP8VC4SxH

export const getIpfsURL = (url : string | undefined) => {
    if(!url) return url
    //return "https://ipfs.io/ipfs/"+url
    return "https://nftstorage.link/ipfs/"+url
}