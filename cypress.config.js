const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    username: 'cypress_admin',
    password: 'XG*EAXGB!yq8YtPkwB26HM2h'
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromeWebSecurity: false
});
