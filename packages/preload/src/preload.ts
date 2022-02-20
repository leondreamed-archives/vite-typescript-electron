import { contextBridge } from 'electron';
import * as bootstrapModule from './modules/bootstrap.js';

contextBridge.exposeInMainWorld('bootstrapModule', bootstrapModule);
