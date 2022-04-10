import { browser } from 'webextension-polyfill-ts';

const injectedScript = document.createElement('script');
injectedScript.src = browser.runtime.getURL('index.js');
(document.head || document.documentElement).appendChild(injectedScript);
