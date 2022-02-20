import { contextBridge } from 'electron';
import * as bootstrapModule from './modules/bootstrap.js';
import * as stdinModule from './modules/stdin.js';

contextBridge.exposeInMainWorld('bootstrapModule', bootstrapModule);
contextBridge.exposeInMainWorld('stdinModule', stdinModule);
