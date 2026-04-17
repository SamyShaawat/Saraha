/* eslint-disable */
export default {
  displayName: 'backend',
  preset: '../../jest.preset.cjs',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/backend',
  moduleNameMapper: {
    '^@saraha/dto$': '<rootDir>/../../libs/dto/src/index.ts',
    '^@saraha/utils$': '<rootDir>/../../libs/utils/src/index.ts',
    '^@saraha/data-access$': '<rootDir>/../../libs/data-access/src/index.ts',
  },
};
