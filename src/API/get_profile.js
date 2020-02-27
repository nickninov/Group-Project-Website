
import { apiProfile } from './dictionary';

async function getProfile() {
    try {
        let data = await (await fetch(apiProfile())).json();
        return data;
    } catch (e) {
        console.log("getProfile() error:\n" + e);
    }
}

export default getProfile;
