module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@ionic/angular|@ionic/core|ionicons|@stencil/core|@ngx-translate/core|@angular)/)'
  ]
}
