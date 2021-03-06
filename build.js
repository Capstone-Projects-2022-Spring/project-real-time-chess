const { exit } = require('process');

const exec = require('child_process').exec;
const checks = {};

function printPhase(phase, task, command) {
    console.log(`[${phase}]`);
    console.log(`           ${task}`);
    console.log(`           ${command}`);
}

async function runPhase(phase, task, command, checkName) {
    printPhase(phase, task, command);
    return new Promise((resolve, reject) => {
        exec(command, (error, _, stderr) => {
            if (error) {
                console.log(stderr);
                console.log('🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨');
                console.log(error);
                console.log('🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨');
                reject({
                    error,
                    stderr,
                });
            } else {
                checks[checkName] = true;
                console.log(`✅  PHASE COMPLETE: ${phase}`);
                console.log(`              TASK: ${task}`);
                console.log(`              COMMAND: ${command}`);
                resolve();
            }
        });
    });
}

console.log(`
============================
||                        ||
||      Building RTC      ||
||                        ||
============================
`);

runPhase('DEPS', 'Installing NPM Dependencies', 'npm install', 'installation')
    .then(() => {
        runPhase('LINT', 'Linting all TS(X) source files', 'npm run lint', 'lint')
            .then(() => {
                Promise.all([
                    runPhase(
                        'BUILD',
                        'Building server-side TS project',
                        'npm run build:server',
                        'tsc',
                    ),
                    runPhase('BUILD', 'Building client-side TS project', 'webpack', 'webpack'),
                    runPhase('BUILD', 'Building SCSS files > CSS', 'npm run build:scss', 'sass'),
                ])
                    .then(() => {
                        runPhase('TEST', 'Running server-side tests', 'npm run test', 'tests')
                            .then(() => {
                                console.log('✅ Build completed!');
                            })
                            .catch(() => {
                                console.error('❌ Build failed in TEST phase.');
                                console.warn(
                                    '⚠️  This is due to issues with failing Mocha Unit Tests.',
                                );
                                exit(1);
                            });
                    })
                    .catch(() => {
                        console.error('❌ Build failed in BUILD phase.');
                        console.warn(
                            '⚠️  This is due to compilation errors in TS(X)/SCSS source files.',
                        );
                        exit(1);
                    });
            })
            .catch(() => {
                console.error('❌ Build failed in LINT phase.');
                console.warn('⚠️  Run `npm run lint` to see errors.');
                exit(1);
            });
    })
    .catch(err => {
        console.error('❌ Build failed in DEPS phase.');
        console.warn('⚠️  Run `npm install` to see errors.');
        exit(1);
    });
