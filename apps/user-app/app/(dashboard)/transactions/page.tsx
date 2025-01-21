
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { TotalTransactons } from "../../../components/TotalTransactons";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}
export async function getTransactions() {
    const session = await getServerSession(authOptions);
  
    // Fetch OnRamp Transactions
    const onRampTxns = await prisma.onRampTransaction.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
    });
  
    // Map OnRamp Transactions
    const onRampTransactions = onRampTxns.map((t) => ({
      type: "OnRamp",
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }));

   
  
    // Fetch P2P Transactions
    const p2pTxns = await prisma.p2pTransfer.findMany({
      where: {
        fromUserId: Number(session?.user?.id),
      },
      include: {
        toUser: {
          select: {
            number: true, // Fetch the `number` field of the `toUser`
          },
        },
      },
    });
  
    // Map P2P Transactions
    const p2pTransactions = p2pTxns.map((t) => ({
      type: "P2P",
      time: t.timestamp,
      amount: t.amount,
      to: t.toUserId,
      phNumber: t.toUser?.number,
      
    }));
  
    // Combine both transactions into a single array
    const combinedTransactions = [...onRampTransactions, ...p2pTransactions];
  
    return combinedTransactions;
  }
  
export default async function() {
    const balance = await getBalance();
    const transactions2=await getTransactions()
    return <div className="w-screen flex items-center flex-col">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
           All Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 p-4 w-[60%] max-w-4xl">
           
            <div >
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <TotalTransactons transactions={transactions2} />
                </div>
            </div>
        </div>
    </div>
}