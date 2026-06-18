import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'
import { AddProductsPage } from '../../PageObjects/Shopping_cart/AddProducts'


test('Buying Products',async({page})=>
{
    const addproducts = new AddProductsPage(page)
    
    await addproducts.LoadWebPage()
    await addproducts.AddProducts()
    await addproducts.VerifyTotal('$110.00')
    await addproducts.DoCheckout(faker.person.fullName(), faker.internet.email(), faker.location.streetAddress(),
        faker.finance.creditCardNumber(), '12-2027', faker.finance.creditCardCVV())

    await addproducts.VerifyCheckOut()

})