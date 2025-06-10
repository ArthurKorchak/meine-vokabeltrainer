module.exports = {
  transformIgnorePatterns: ['node_modules/(?!(@ionic/angular|@ionic/core|ionicons|@stencil/core|@angular/*)/)'],
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom'
}
