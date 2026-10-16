class OrangeLogout {
    constructor(page) {
        this.page = page;
        this.userDropdown = page.locator('.oxd-userdropdown-tab');
        this.logoutLink = page.locator('a', { hasText: 'Logout' });
    }

    async logout() {
        await this.userDropdown.click();
        await this.logoutLink.click();
    }
}

module.exports = OrangeLogout;
