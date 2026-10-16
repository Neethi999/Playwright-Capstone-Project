class OrangeLogin{
    constructor(page){
        this.page = page;
       this.username = page.locator('input[placeholder="Username"]');
       this.password = page.locator('input[placeholder="Password"]');
       this.loginbutton = page.getByRole('button',{name:'Login'});
    }

    async goto() {
        await this.page.goto(process.env.URL);
    }

    async validlogin(username,password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginbutton.click();
    }
}
module.exports = OrangeLogin;