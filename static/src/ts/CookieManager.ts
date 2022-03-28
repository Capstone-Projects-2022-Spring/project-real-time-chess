/**
 * A utility class which provides client-side access to cookies.
 */
class CookieManager {
    /**
     * Gets a cookies.
     *
     * @param cname - The cookie name.
     * @returns The value of the cookie.
     */
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

    /**
     * Sets a cookie.
     *
     * @param cname - The cookie name.
     * @param cvalue - The cookie's value.
     * @param exdays - The number of days until the cookie expires.
     */
    static setCookie(cname: string, cvalue: string, exdays?: number) {
        let expires = '';
        if (exdays) {
            const d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            expires = `expires=${d.toUTCString()}`;
        }
        document.cookie = `${cname}=${cvalue};${expires};path=/`;
    }

    /**
     * Gets the UID cookie.
     */
    static get uid(): string {
        let id = CookieManager.getCookie('uid');
        if (id.indexOf('j:"') === 0 && id.lastIndexOf('"') === id.length - 1) {
            id = id.substring(3, id.length - 1);
        }
        return id;
    }

    /**
     * Sets the UID cookie.
     */
    static set uid(uid: string) {
        CookieManager.setCookie('uid', uid);
    }

    /**
     * Gets the auth cookie.
     */
    static get auth(): string {
        return CookieManager.getCookie('auth');
    }

    /**
     * Sets the auth cookie.
     */
    static set auth(auth: string) {
        CookieManager.setCookie('auth', auth);
    }
}

export default CookieManager;
