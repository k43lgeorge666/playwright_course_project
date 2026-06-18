import { expect, Locator, Page } from "@playwright/test"

export class AddProductsPage
{
    private readonly page: Page

    private readonly Addtocart1:Locator
    private readonly Addtocart2:Locator
    private readonly Addtocart3:Locator
    private readonly Viewcartbutton:Locator
    private readonly Checkoutbutton: Locator
    private readonly Totalprice: Locator
    private readonly Namefield: Locator
    private readonly Emailfield: Locator
    private readonly Addressfield: Locator
    private readonly PaymentInfo: Locator
    private readonly CardNumber: Locator
    private readonly CardExpiration: Locator
    private readonly Cardcvc: Locator
    private readonly PlaceOrderButton: Locator
    private readonly FinalMessage: Locator



    constructor(page:Page)
    {
        this.page = page
        this.Addtocart1 = page.locator("//h5[contains(.,'Producto 1')]/ancestor::div[contains(@class, 'card-body')]//button")
        this.Addtocart2 = page.locator("//h5[contains(.,'Producto 2')]/ancestor::div[contains(@class, 'card-body')]//button")
        this.Addtocart3 = page.locator("//h5[contains(.,'Producto 3')]/ancestor::div[contains(@class, 'card-body')]//button")
        this.Viewcartbutton = page.locator('id=view-cart-btn')
        this.Totalprice = page.locator("//strong[.='$110.00']")
        
        this.Checkoutbutton = page.locator("id=checkout-btn")
        this.Namefield = page.locator("id=name")
        this.Emailfield = page.locator("id=email")
        this.Addressfield = page.locator("id=address")

        this.PaymentInfo = page.locator("//*[@href='#paymentInfo']")
        this.CardNumber = page.locator("id=card-number")
        this.CardExpiration = page.locator("id=card-expiry")
        this.Cardcvc = page.locator("id=card-cvc")
        this.PlaceOrderButton = page.locator("id=place-order-btn")
        this.FinalMessage = page.locator("//h4[contains(.,'Tu compra fue exitosa!')]")


    }

    async LoadWebPage()
    {
        await this.page.goto('http://127.0.0.1:5500/')
    }

    async AddProducts()
    {
        for(let i=0; i<=5; i++)
        {
              await this.Addtocart1.click()
        }
        await this.Addtocart2.click()
        await this.Addtocart3.click()
    }

    //Verify the quantity
    async VerifyTotal(totalprice:string)
    {
        await this.Viewcartbutton.click()
        await expect(this.Totalprice).toHaveText(totalprice)
    
    }
    
    async DoCheckout(name:string, email:string, address:string, cardnumber:string, cardexpiration:string, cardcvv:string)
    {
        await this.Checkoutbutton.click()
        await this.Namefield.fill(name)
        await this.Emailfield.fill(email)
        await this.Addressfield.fill(address)
        await this.PaymentInfo.click()
        await this.CardNumber.fill(cardnumber)
        await this.CardExpiration.fill(cardexpiration)
        await this.Cardcvc.fill(cardcvv)
        await this.PlaceOrderButton.click()
    }
    async VerifyCheckOut()
    {
        await expect(this.FinalMessage).toBeVisible()
    }

}