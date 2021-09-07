
interface Account {
    id?: string;
    document: string;
    balance: number;
}

interface Deposit {
    id?: string;
    account: Account;
    amount: number;
}

interface Withdraw {
    id?: string;
    account: Account;
    amount: number;
}

interface Transfer {
    id: string;
    payer: Account;
    receiver: Account;
    amount: number
}

export {
    Account, 
    Deposit, 
    Withdraw, 
    Transfer
}