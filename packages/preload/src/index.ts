import { contextBridge } from 'electron';
import * as myModule from './modules/my-module.js';

contextBridge.exposeInMainWorld('myModule', myModule);
