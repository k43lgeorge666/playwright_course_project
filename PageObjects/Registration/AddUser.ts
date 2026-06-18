import { expect, Locator, Page } from "@playwright/test"


export class AddUserPage
{
    private readonly page: Page
    private readonly UserName:Locator
    private readonly LastName:Locator
    private readonly UserAge:Locator
    private readonly Country:Locator
    private readonly UserSex:Locator
    private readonly Email:Locator
    private readonly DayChecked1:Locator
    private readonly DayChecked2:Locator
    private readonly Picture:Locator
    private readonly Savebutton: Locator

    constructor(page:Page)
    {
        this.page = page
        this.UserName = page.locator("id=name")
        this.LastName = page.locator("id=last-name")
        this.UserAge = page.locator("id=age")
        this.Country = page.locator("id=country")
        this.UserSex = page.locator("id=sex-m")
        this.Email = page.locator("id=email")
        this.DayChecked1 = page.locator("id=monday")
        this.DayChecked2 = page.locator("id=wednesday")
        this.Picture = page.locator("id=picture")
        this.Savebutton = page.locator("id=save-btn")

    }

    async Load_Add_new_user_page()
    {
        await this.page.goto("http://127.0.0.1:5500/register.html")
    }

    async AddNewUser(name:string, lastname:string, age:string, email:string, country:string, picture:string)
    {
        await this.UserName.fill(name)
        await this.LastName.fill(lastname)
        await this.UserAge.fill(age)
        await this.Country.selectOption(country)
        await this.UserSex.click()
        await this.Email.fill(email)
        await this.DayChecked1.click()
        await this.DayChecked2.click()
        await this.Picture.setInputFiles(picture)
        await this.Savebutton.click()
        
    }

    async Verify_Registration()
    {
        const [summaryPage] = await Promise.all(
        [
            this.page.waitForEvent('popup')

        ]
    )
        await summaryPage.waitForLoadState()
        await expect(summaryPage).toHaveTitle('Summary')
        await expect(summaryPage).toHaveURL('http://127.0.0.1:5500/summary.html')
    }
    


}