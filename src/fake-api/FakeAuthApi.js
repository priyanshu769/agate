export const user = {
    username: "priyanshu",
    password: "priyanshu"
}

const FakeAuthApi = (username, password) => {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            if (username === user.username && password === user.password) {
                resolve({success: true, status: 200})
            } reject({success: false, status: 401})
        }, 2000)   
    })
}

export default FakeAuthApi;