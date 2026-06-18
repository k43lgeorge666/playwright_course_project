import {test, expect} from '@playwright/test'
import { LoginPage } from '../../PageObjects/Login/LoginPage';

test('login success',async({page})=>
{
    const loginpage = new LoginPage(page)
    await loginpage.LoadWebPage()

    //Enter valid credentials
    await loginpage.DoLogin('user','pass')

    //verify login successful
    await loginpage.VerifyLogin('Transacciones')

    //await page.pause()


})

test('Invalid Credentials',async({page})=>
{
    const loginpage = new LoginPage(page)
    await loginpage.LoadWebPage()

    await loginpage.DoLogin('admin','admin')
    await loginpage.VerifyInvalidCredentials("Nombre de usuario o contraseña inválidos")
})

test('Invalid Username',async({page})=>
{
    const loginpage = new LoginPage(page)
    await loginpage.LoadWebPage()

    await loginpage.DoLogin('admin','pass')
    await loginpage.VerifyInvalidCredentials("Nombre de usuario o contraseña inválidos")
})

test('Invalid Password',async({page})=>
{
    const loginpage = new LoginPage(page)
    await loginpage.LoadWebPage()

    await loginpage.DoLogin('user','admin')
    await loginpage.VerifyInvalidCredentials("Nombre de usuario o contraseña inválidos")
    
})

