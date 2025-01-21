// import { SendCard } from "../../../components/SendCard";

// export default function() {
//     return <div className="w-full"> 
//         <SendCard />
//     </div>
// }



import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnP2PTransactions } from "../../../components/OnP2PTransactions";
import { BalanceCard } from "../../../components/BalanceCard";



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

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
  
    const txns = await prisma.p2pTransfer.findMany({
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
  
    return txns.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      to: t.toUserId,
      phNumber: t.toUser?.number, // Include the `number` field from the `toUser`
    }));
  }



  
  

export default async function() {
    const transactions = await getP2PTransactions()
    const balance=await getBalance();

    return (
        <div className="w-screen">
        <div className="text-4xl text-[#6a51a6]  mb-8 font-bold">
            P2P Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
            <SendCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
               
                <div className="pt-4">
                   
                    <OnP2PTransactions transactions={transactions}/>
                </div> 
            </div>
        </div>
    </div>
    )
}



