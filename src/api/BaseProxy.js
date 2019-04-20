class BaseProxy {
    store(itemName, itemData) {
        return localStorage.setItem(itemName, JSON.stringify(itemData));
    }

    find(itemName) {
        return JSON.parse(localStorage.getItem(itemName));
    }

    destroy(itemName) {
        return localStorage.removeItem(itemName);
    }
}

export default BaseProxy;
