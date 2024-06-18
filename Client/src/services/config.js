import axios from "axios";

class CurdService {

    baseUrl = "/v1/url"

    constructor() {
        axios.defaults.withCredentials = true;
    }

    async createShortUrl({ redirectURL }) {
        try {
            const response = await axios.post(`${this.baseUrl}`, { redirectURL })
            return response.data
        } catch (error) {
            throw error
        }

    }

    async getRedirectUrl(shortId) {
        try {
            const response = await axios.get(`${this.baseUrl}/${shortId}`)
            return response.data

        } catch (error) {
            throw error
        }
    }

    async getUserUrls() {
        try {
            const response = await axios.get(`${this.baseUrl}`)
            return response.data

        } catch (error) {
            throw error
        }
    }

}

const curdService = new CurdService();

export default curdService;
