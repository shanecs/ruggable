import { API_PREFIX } from '../shared/constants/global.constants';
import { Config } from './config.interface';


export const GLOBAL_CONFIG: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Ruggable Coding Challenge | Shane Selig',
    description: 'An API endpoint to give a sorted print list to the requestor.',
    version: '1.0',
    path: API_PREFIX,
  },
  security: {
    expiresIn: 3600 * 24, // 24h
    bcryptSaltOrRound: 10,
  },
};
