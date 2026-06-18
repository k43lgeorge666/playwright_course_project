import { expect, Locator, Page } from "@playwright/test"

export class AddTransactionsPage 
{

    private readonly AddTransactionButton:Locator
    private readonly TransactionDate:Locator
    private readonly TransactionAmount:Locator
    private readonly TransactionDescription:Locator
    private readonly SaveTransactionButton:Locator

    private readonly ActualDate:Locator
    private readonly ActualAMount:Locator
    private readonly ActualDescription: Locator

    constructor(page: Page)
    {
        this.AddTransactionButton = page.locator("//button[contains(text(),'Añadir transacción')]")
        this.TransactionDate = page.locator("//*[@id='date']")
        this.TransactionAmount = page.locator('id=amount')
        this.TransactionDescription = page.locator('id=description')
        this.SaveTransactionButton = page.locator('//button[contains(text(),\'Guardar\')]')

        this.ActualDate = page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]")
        this.ActualAMount = page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]")
        this.ActualDescription = page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]")
    }

    async FillTransaction(date:string, amount:string, description:string)
    {
        await this.AddTransactionButton.click()
        await this.TransactionDate.fill(date)
        await this.TransactionAmount.fill(amount)
        await this.TransactionDescription.fill(description)
        await this.SaveTransactionButton.click()
    }
    
    async VerifyTransaction(actualdate:string, actualamount:string, actualdesc:string)
    {
        const currentDate = await this.ActualDate.textContent()
        const currentAmount = await this.ActualAMount.textContent()
        const currentDescription = await this.ActualDescription.textContent()

        expect(currentDate).toEqual(actualdate)
        expect(currentAmount).toEqual(actualamount)
        expect(currentDescription).toEqual(actualdesc)
    }

}