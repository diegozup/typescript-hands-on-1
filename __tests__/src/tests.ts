import { TsBankService } from "../../src/service/TsBankService";
import { randomId } from "../../src/util/utis";

let bankService = new TsBankService();

describe('create account tests', () => {

    test("create a account", () => {
        const document = randomId()
        let account = { "document": document, "balance": 100 };
        const accountCreated = bankService.createAccount(account);
        expect(accountCreated.document).toBe(account.document);
        expect(accountCreated.balance).toBe(account.balance);
    })

    test("create a account", () => {
        const document = randomId()
        let account1 = { "document": document, "balance": 100 };
        let account2 = { "document": document, "balance": 100 };
        const accountCreated1 = bankService.createAccount(account1);
        expect(() => bankService.createAccount(account2)).toThrow()
    })
})

describe('deposit tests', () => {

    test('create a deposit', () => {
        const document = randomId()
        let account = { "document": document, "balance": 100 };
        bankService.createAccount(account);

        let deposit = { "type": "DEPOSIT", "document": document, "amount": 100 }
        const depositDone = bankService.deposit(deposit)
        expect(depositDone.id).not.toBeNull()

        let accountResult = bankService.findAccountByDocument(document)
        expect(accountResult.balance).toBe(account.balance + depositDone.amount)
    })

    test('create a deposit with invalid amount', () => {
        const document = randomId()
        let account = { "document": document, "balance": 100 };
        const accountCreated = bankService.createAccount(account);

        let deposit = { "type": "DEPOSIT", "document": document, "amount": -100 }
        expect(() => bankService.deposit(deposit)).toThrow()
    })

    test('create a deposit without account', () => {
        const document = randomId()
        let deposit = { "type": "DEPOSIT", "document": document, "amount": 100 }
        expect(() => bankService.deposit(deposit)).toThrow()
    })
})

