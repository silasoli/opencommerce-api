/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const { execSync } = require('child_process');
const args = process.argv.slice(2);

const command = args[0];

switch (command) {
  case 'generate':
    const generateName = args[1] || 'newmigration';
    execSync(
      `npm run migration:generate ./src/database/migrations/${generateName}`,
      { stdio: 'inherit' },
    );
    break;

  case 'create':
    const migrationName = args[1] || 'newmigration';
    execSync(
      `npm run migration:create ./src/database/migrations/${migrationName}`,
      { stdio: 'inherit' },
    );
    break;

  default:
    console.error(`Comando não reconhecido: ${command}`);
    break;
}
