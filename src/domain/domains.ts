
interface Account {
    id?: string;
    document: string;
    balance: number;
}

interface Deposit {
    id?: string;
    document: string;
    amount: number;
}

interface Withdraw {
    id?: string;
    document: string;
    amount: number;
}

interface Transfer {
    id: string;
    payer: string;
    receiver: string;
    amount: number
}

export {
    Account, 
    Deposit, 
    Withdraw, 
    Transfer
}