import axios from "axios"


class AuthService {

    baseUrl = "/v1/user"

    constructor() {
        axios.defaults.withCredentials = true;
    }

    async createAccount({ email, fullName, password }) {
        try {
            const response = await axios.post(`${this.baseUrl}/register`, {
                email,
                fullName,
                password
            })
            if (response.data) {
                return this.login({ email, password })
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {

        try {
            const response = await axios.post(`${this.baseUrl}/login`, {
                email,
                password
            })

            return response.data
        } catch (error) {
            throw error;

        }

    }

    async currentUser() {
        try {
            const response = await axios.get(`${this.baseUrl}/current-user`)
            return response.data

        } catch (error) {
            throw error;
        }
    }

    async refreshAccessToken() {
        try {
            const response = await axios.post(`${this.baseUrl}/refresh-token`)
            return response.data

        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService();

export default authService