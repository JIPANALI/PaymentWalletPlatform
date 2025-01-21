import { Card } from "@repo/ui/card"

export const TotalTransactons = ({
    transactions
}: {
    transactions: {
        type:string,
        time:Date,
        phNumber:number
        amount:number,
        provider:string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
    <div className="pt-2">
        {transactions.map((t) => (
            <div
                className="grid items-center py-1"
                style={{ gridTemplateColumns: "35% 30% 35%" }} // Setting column widths
            >
                {/* First Column */}
                <div className="flex flex-col">
                    <div className="text-sm">
                        {t.type === "P2P" ? <>Send INR</> : <>Received INR</>}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>

                {/* Second Column */}
                <div className="text-left">
                    Rs{" "}
                    {t.type === "P2P" ? (<>
                        <span className="text-red-700">- {t.amount / 100}</span>INR</>
                    ) : (<>
                        <span className="text-green-600">+ {t.amount / 100} </span> INR</>
                    )}
                </div>

                {/* Third Column */}
                <div className="flex flex-col text-right">
                    {t.type === "P2P" ? <>{t.phNumber}</> : <>{t.provider}</>}
                </div>
            </div>
        ))}
    </div>
</Card>


}