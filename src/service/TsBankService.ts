import { Account, Deposit } from "../domain/domains";
import { Operation } from "../domain/Operation";
import { randomId } from "../util/utis";

export class TsBankService {

    private database: Map<string, Map<string, Array<any>>>;

    public constructor() {
        this.database = new Map();
    }

    public createAccount(account: Account) {
        const dbAccount = this.findAccountByDocument(account.document);
        if (dbAccount) {
            throw new Error("Contta já existe");
        }
        return this._createAccount(account);
    }

    public findAccountByDocument(id: string): Account {
        const operations = this.getOperationsByType(id, Operation.CREATE_ACCOUNT)
        return operations.length ? operations[0] : null
    }

    private _createAccount(account: Account): Account {
        const accountCreated = {id: randomId(), ...account};
        return this.createOperationByAccount(accountCreated.document, Operation.CREATE_ACCOUNT, accountCreated)
    }

    private createOperationByAccount(accountId: string, operationType: Operation, operationEntity: any): Account {
        const newOperationEntity = {id: randomId(), ...operationEntity};
        
        let operationsByAccount = this.database.get(accountId)
        if (!operationsByAccount) {
            operationsByAccount = new Map<string, Array<any>>();
            this.database.set(accountId, operationsByAccount);
        }

        let operations = this.getOperationsByType(accountId, operationType);
        if (!operations.length) {
            operations.push(newOperationEntity)
            operationsByAccount.set(operationType, operations);
        }        
        
        return newOperationEntity;
    }

    private getOperationsByType(accountId: string, operationType: Operation) : Array<any> {
        const account = this.database.get(accountId)
        let operations

        if (account) {
            operations = account.get(operationType)
        }

        return !operations || !operations.length ? [] : operations
    }

    public deposit(deposit: Deposit): Deposit {
        const account = this.findAccountByDocument(deposit.document);

        if (!account) {
            throw new Error("Conta não existe")
        }

        if (!this.depositIsValid(deposit)) {
            throw new Error("Valor de deposito inválido")
        }

        const depositCreated = {id: randomId(), ...deposit}

        this.createOperationByAccount(account.document, Operation.DEPOSIT, depositCreated)
        account.balance += deposit.amount

        return deposit
    }

    private depositIsValid(deposit: Deposit) : boolean {
        return deposit.amount > 0
    }

}