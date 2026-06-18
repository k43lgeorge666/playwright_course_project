import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'
import { AddTransactionsPage } from '../../PageObjects/Transactions/AddTransactions'
import { LoginPage } from '../../PageObjects/Login/LoginPage'


test('Create Transactions',async({page})=>
{ 

    const username = "user"
    const password = "pass" 

    const date = "2026-12-31"
    const amount = "10"
    const desc = "test"

    const loginpage = new LoginPage(page)
    await loginpage.LoadWebPage()
    await loginpage.DoLogin(username, password)

    const transactionpage = new AddTransactionsPage(page)
    await transactionpage.FillTransaction(date, amount, desc)

    //Verify the transaction

    await transactionpage.VerifyTransaction(date, amount, desc)

    //Add more transactions

    for(let i=0; i<=10; i++)
    {
      await transactionpage.FillTransaction(date, faker.number.int({min: 100, max: 200}).toString(), faker.person.firstName())
    }

    //await page.pause()

})
    
    




