import {test, expect} from '@playwright/test'
import { AddUserPage } from '../../PageObjects/Registration/AddUser'
import {faker} from '@faker-js/faker'


test('Create new user',async({page})=>
{

    const adduserspage = new AddUserPage(page)
    await adduserspage.Load_Add_new_user_page()
    await adduserspage.AddNewUser(faker.person.firstName(), faker.person.lastName(), faker.number.int({min: 20, max: 60}).toString(),
                                  faker.internet.email(), "Bolivia","images/avatar1.jpg")
    await adduserspage.Verify_Registration()
        
})
