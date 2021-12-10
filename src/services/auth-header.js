export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        console.log(user.accessToken)
        return 'Bearer ' + user.accessToken;
    } else {
        return '';
    }
}
