class AdminSearch {
    constructor(page) {
        this.page = page;
        this.admin = page.getByRole('link', { name: 'Admin', exact: true });
        this.searchUsername = page.locator('.oxd-input-group', { hasText: 'Username' }).locator('input');
        this.searchButton = page.locator('button[type="submit"]');
        this.tableRows = page.locator('.oxd-table-body .oxd-table-card');
    }

    async searchUser(username) {
        await this.admin.click();
        await this.page.waitForURL(/viewSystemUsers/);
        await this.searchUsername.fill(username); //existing name
        await this.searchButton.click();
        return this.tableRows.filter({ hasText: username }).first();
    }
   
}

module.exports = AdminSearch;