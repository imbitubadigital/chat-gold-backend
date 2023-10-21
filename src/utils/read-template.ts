import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export const readTemplate = (templateName: string): string => {
  try {
    const location = path.resolve(
      __dirname,
      '..',
      '..',
      'templates',
      `${templateName}.html`,
    );

    return fs.readFileSync(location).toString('utf8');
  } catch (error) {
    Logger.error(
      `Não foi possível carregar o template '${templateName}'`,
      error,
    );
  }
};
