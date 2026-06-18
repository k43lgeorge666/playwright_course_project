import { expect, Locator, Page } from "@playwright/test"

export class LoginPage
{
    private readonly page: Page

    private readonly usernameTextbox:Locator
    private readonly passwordTextbox:Locator 
    private readonly LoginButton:Locator

    private readonly TransactionsText:Locator
    private readonly FailedMessage:Locator
    
    
    constructor(page: Page)
    {
        this.page = page
        this.usernameTextbox = page.locator('input#username')
        this.passwordTextbox = page.locator('input#password')
        this.LoginButton = page.locator('//button[@type=\'submit\']')

        this.TransactionsText = page.locator("//h2[contains(text(),'Transacciones')]")
        this.FailedMessage = page.locator("//div[contains(text(),'Nombre de usuario o contraseña inválidos')]")

    }

    async LoadWebPage()
    {
        await this.page.goto('http://127.0.0.1:5500/login.html')
    }

    async DoLogin(username: string, password:string)
    {
        await this.usernameTextbox.fill(username)
        await this.passwordTextbox.fill(password)
        await this.LoginButton.click()
    }

    async VerifyLogin(transactiontext:string)
    {
        const currentText = await this.TransactionsText.textContent()
        expect(currentText).toEqual(transactiontext)
    }
    
    async VerifyInvalidCredentials(failedmessage:string)
    {
        await expect(this.FailedMessage).toHaveText(failedmessage)
    }
    

}
