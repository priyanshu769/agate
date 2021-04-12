export const users = [
    {
        username: "priyanshu",
        password: "priyanshu"
    },
    {
        username: "admin",
        password: "admin"
    },
    {
        username: "ktmduke",
        password: "390"
    }
]

const finduser = (username) => users.find(user => user.username === username)

const FakeAuthApi = (username, password) => {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            const user = finduser(username)
            if (user && password === user.password) {
                resolve({success: true, status: 200})
            } reject({success: false, status: 401})
        }, 3000)
    })
}

export default FakeAuthApi;