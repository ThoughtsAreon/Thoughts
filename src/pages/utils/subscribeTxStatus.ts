// @ts-ignore
import { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

// https://github.com/orgs/community/discussions/57395
export const subscribeTxStatus = async (txId: string, provider: any, navigate?: NavigateFunction) => {
    let receipt = null;
    let attempts = 0;
    let maxAttempts = 50;
    let revertCount = 0;
    const loaderId = toast.loading('Transaction in process...')
    while ((receipt === "REVERT" || receipt == null) && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        let transaction = null
        try { transaction = await provider.trx.getTransaction(txId);} catch(e) { console.log(e); continue; }
        if (transaction && transaction.ret && transaction.ret.length > 0) {
          receipt = transaction.ret[0].contractRet;
        }
        if (receipt === "REVERT") {
            if(revertCount === 10) break;
            revertCount+= 1
            await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second
        }
        attempts++;
    }
    toast.dismiss(loaderId)
    if(receipt === "SUCCESS") {
        toast.success('Transaction executed successfully')
        navigate ? navigate('/dashboard') : window.location.reload()
    } else {
        toast.error('Transaction failed')
    }
}