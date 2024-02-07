import { type SaveItemParams } from './types'

export const useStorage = () => {
    const isChromeExtension = () => {
        return typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;
    }

    const isExtension = isChromeExtension();

    const saveItem = ({ name, item }: SaveItemParams) => {
        return new Promise<void>((resolve, reject) => {
            if (isExtension) {
                chrome.storage.local.set({ [name]: item }, function () {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        console.log("Item has been saved");
                        resolve();
                    }
                });
            } else {
                try {
                    localStorage.setItem(name, JSON.stringify(item));
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        });
    }

    const getItem = (name: string) => {
        return new Promise<any>((resolve, reject) => {
            if (isExtension) {
                chrome.storage.local.get(name, function (result) {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else if (name in result) {
                        resolve(result[name]);
                    } else {
                        resolve(null);
                    }
                });
            } else {
                const item = localStorage.getItem(name);
                resolve(item ? JSON.parse(item) : null);
            }
        });
    }
    
    const removeItem = (name: string) => {
        if (isExtension) {
            chrome.storage.local.remove(name, function () {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                } else {
                    console.log("Item has been removed");
                }
            });
        } else {
            localStorage.removeItem(name);
        }
    }

    return { saveItem, removeItem, getItem, isExtension }
}
