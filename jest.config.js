/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'junit-TEST.xml',
      },
    ],
  ],
  // setupFiles: ['./jest.setup-file.ts']
};