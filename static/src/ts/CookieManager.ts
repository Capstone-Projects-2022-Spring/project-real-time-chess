class CookieManager {
    static getCookie(cname: string) {
        const name = `${cname}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]!;
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    static setCookie(cname: string, cvalue: string, exdays?: number) {
        let expires = '';
        if (exdays) {
            const d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            expires = `expires=${d.toUTCString()}`;
        }
        document.cookie = `${cname}=${cvalue};${expires};path=/`;
    }

    static get uid(): string {
        let id = CookieManager.getCookie('uid');
        if (id.indexOf('j:"') === 0 && id.lastIndexOf('"') === id.length - 1) {
            id = id.substring(3, id.length - 1);
        }
        return id;
    }

    static set uid(uid: string) {
        CookieManager.setCookie('uid', uid);
    }

    static get auth(): string {
        return CookieManager.getCookie('auth');
    }

    static set auth(auth: string) {
        CookieManager.setCookie('auth', auth);
    }
}

export default CookieManager;
