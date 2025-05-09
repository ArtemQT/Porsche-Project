export class TokenService{
    static async verifyToken(token){
        const verifyUrl = 'http://localhost:3000/API/verifyJwt'
        const response = await fetch(verifyUrl, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    }

    static async refreshToken(){
        const refreshUrl = 'http://localhost:3000/API/refreshJwt';
        const response = await fetch(refreshUrl, {
            method: "GET",
            credentials: "include",

            headers: {
                "content-type": "application/json",
            },
        })

        return response;
    }
}