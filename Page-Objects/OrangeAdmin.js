class OrangeAdmin {
    constructor(page) {
        this.page = page;
        this.admin = page.getByRole('link', { name: 'Admin', exact: true });
        this.empadd = page.locator('button:has-text("Add")');

        this.userrole = page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text');
        this.empname = page.getByPlaceholder('Type for hints...');
        this.status = page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text');
        this.username = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
        this.password = page.locator('.oxd-input-group').filter({ hasText: /^Password/ }).locator('input');
        this.confirmpswd = page.locator('.oxd-input-group').filter({ hasText: 'Confirm Password' }).locator('input');
        this.save = page.getByRole('button', { name: ' Save ', exact: true });
    }

    async userAdd(data) {
        await this.admin.click();
        await this.page.waitForURL(/viewSystemUsers/); //wait for the Admin page to load
        await this.empadd.click();

        await this.userrole.click();
        await this.page.getByRole('option', { name: data['User Role'] }).click();

        //Already existing employee search
        await this.empname.fill(data['Employee Name']);
        await this.page.waitForTimeout(1500); //waiting for the user record to show

        const noRecord = (await this.page.getByText('No Records Found').count()) > 0; // if no record found
        if (noRecord) { 
        console.log('Employee not found: ', data['Employee Name']);
        return false;
                }
        await this.page.getByRole('option', { name: data['Employee Name'] }).first().click();

        //status drop-down
        await this.status.click();
        await this.page.getByRole('option', { name: data['Status'] }).click();

        //user and password enter
        await this.username.fill(String(data['Username']));
        await this.password.fill(String(data['Password']));
        await this.confirmpswd.fill(String(data['Confirm Password']));

        

        //If the user already exists
        await this.page.waitForTimeout(1000); // give the validation message a moment to show
        const exists = (await this.page.getByText('Already exists').count()) > 0;

        if(exists){
            return 'exists';
        }

        await this.save.click();
        return 'added';
    }
    

}

module.exports = OrangeAdmin;
//this code is to add the existing user as Admin or ESS
