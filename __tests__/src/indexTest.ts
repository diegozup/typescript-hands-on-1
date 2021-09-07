import { TsBankService } from "../../src/service/TsBankService";

let bankService = new TsBankService();

test("create a account", () => {
    let account = { "document": "123456", "balance": 100 };
    let accountCreated = bankService.createAccount(account);
    expect(accountCreated.document).toBe(account.document);
    expect(accountCreated.balance).toBe(account.balance);
})