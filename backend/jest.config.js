export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true, isolatedModules: true }],
    },
    globalTeardown: '<rootDir>/tests/teardown.ts',
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
