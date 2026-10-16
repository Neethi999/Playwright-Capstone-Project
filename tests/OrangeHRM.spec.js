const {test,expect} = require('@playwright/test');
require("dotenv").config();

const OrangeLogin = require("../Page-Objects/Orangelogin");
const InvalidLogin = require("../Page-Objects/Invalidlogin");
const OrangeLogout = require("../Page-Objects/Orangelogout");
const OrangeAdmin = require("../Page-Objects/OrangeAdmin");
const AdminSearch = require('../Page-Objects/AdminSearch');

const users = require("../utils/JSONdata.json"); //importing user credentials JSON
const datasearch = require("../utils/SearchData.json"); //importing search user JSON
const { readExcelData } = require("../utils/ExcelReader"); //excel reader

users.forEach((user)=>{
    
test(`OrangeHRM E2E: ${user.username}`, async({page})=>{
test.setTimeout(180000);
const excelData = await readExcelData('C:/My Personal/Entri App - PlayWright Automation/Classes/Capstone Project/OrangeHRMUsersAdd.xlsx','Sheet1');
 const login = new OrangeLogin(page);
 const inv_user = new InvalidLogin(page);
 const logout = new OrangeLogout(page);
 const admin = new OrangeAdmin(page);
 const search = new AdminSearch(page);

 await login.goto();
try{
if (user.valid === true)
    {
        //User login
        await login.validlogin(user.username,user.password); 
        await expect(page).toHaveURL(/dashboard/);
        
        //Reading data from Excel to add the user from Admin tab
        for (const nUser of excelData) {
            const result = await admin.userAdd(nUser);

            if (result === 'exists') {
        console.log('Username already exists:', nUser['Username']);
                } 
            else if (result === 'added') {
                //await expect(page).toHaveURL('**/admin/viewSystemUsers', { timeout: 10000 });
                console.log('New username added:', nUser['Username']);
                } 
            else {
                    console.log('Skipped, invalid employee name:', nUser['Username']);
                }
        }     //end of Excel Loop

        //searching the user in Admin page
        
        for (const data of datasearch){
        const row = await search.searchUser(data.searchusername);
        await page.waitForTimeout(2000);   // let results load
        if (await row.isVisible()){
                    console.log("User found: ", data.searchusername);
                }
        else{
            console.log("User NOT found: ", data.searchusername);
            }
        }

        //User Logout
        await logout.logout();
        console.log("Valid user : ",`${user.username}`);
    }
else
    {
        const error = await inv_user.invaliduser(user.username,user.password);
        //expect(error).toContain("Invalid credentials");
        console.log("Invalid credential: ",`${user.username}`);
        expect(error).toContain("Invalid credentials");
        
    }
}
    catch(error){
        console.log(error.message);
        throw error;
        }
    finally{
        console.log('Execution completed....');
        }
});

});
