import DashBoardButton from "../../../components/DashBoardButton";
import dashboard from "../../style/dashboard.module.css";
import { getBalance } from "../transfer/page";

export default async function DashBoard() {
    const balance = await getBalance();


    return (
        <div className={dashboard.dash_board}>
            <div className={dashboard.dash_board_container}>
                {/* Row 1 */}
                <div className={`${dashboard.dash_board_item} ${dashboard.dash_board_row1_col1} ${dashboard.dash_board_row1_col1_design}`}>
                    <div className={`${dashboard.dash_board_row1_col1_design1}`}>
                        <h1>Transfer Money From Bank</h1>
                        <p>Manage your finances with ease using our secure and user-friendly payment application.</p>
                    </div>
                    <div className={`${dashboard.dash_board_row1_col1_design2}`}>
                        <h5>Available Balance : {balance.amount/100}</h5>
                        <div><DashBoardButton href="/transfer" name="Transfer Money" /></div>
                    </div>
                </div>
                <div className={`${dashboard.dash_board_item} ${dashboard.dash_board_row1_col2} ${dashboard.dash_board_row1_col1_design}`}>
                    <div className={dashboard.dash_board_row1_col1_design1}>
                    <h1>Your Locked Balance</h1>   
          
                    </div>
                    <div className={`${dashboard.dash_board_row1_col1_design2}`}>
                        <h5>Locked Balance : 0</h5>
                        <div><DashBoardButton href="/p2p" name="Send Money"/></div>
                    </div>
                </div>

{/*           
                <div className={`${dashboard.dash_board_item} ${dashboard.dash_board_row2_col1}`}>
                    Section 3
                </div>
                <div className={`${dashboard.dash_board_item} ${dashboard.dash_board_row2_col2}`}>
                    Section 4
                </div> */}



                <div className={`${dashboard.dash_board_item} ${dashboard.dash_board_row3_col1} flex justify-center items-center h-full`}>
                    <h1 className="text-4xl">Welcome To Paytm Wallet </h1>
                </div> 
            </div>
        </div>
    );
}




