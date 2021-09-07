import { Account } from "../domain/domains";
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
            throw Error("Account already exists");
        }
        return this._createAccount(account);
    }

    public findAccountByDocument(id: string): Account {
        return this.database
            .get(id)
            .get(Operation.CREATE_ACCOUNT)
            .map(a => a as Account)[0];
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

        let operations = operationsByAccount.get(operationType);
        if (!operations || !operations.length) {
            operations = []
            operationsByAccount.set(operationType, operations);
        }

        operations.push(newOperationEntity)
        
        return newOperationEntity;
    }

}