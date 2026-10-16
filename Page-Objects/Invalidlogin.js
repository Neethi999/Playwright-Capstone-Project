
class InvalidLogin{
    constructor(page){
        this.page = page;

        this.username = page.locator('input[placeholder="Username"]');
       this.password = page.locator('input[placeholder="Password"]');
       this.loginbutton = page.getByRole('button',{name:'Login'});
       this.errormsg = page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text');
    }

    async invaliduser(user,pass)
    {
        await this.username.fill(user);
        await this.password.fill(pass);

        await this.loginbutton.click();
        
        await (this.errormsg).waitFor(); //waits for the error to appear
        return await this.errormsg.textContent(); // sends the text back to the spec file
    }
    
}
module.exports = InvalidLogin;