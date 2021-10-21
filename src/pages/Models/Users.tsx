export default class User {
    id: any
    username: any
    email: any
    role: any
    constructor(product: { id: any; username: any; email: any; role: any }) {
        this.id = product.id
        this.username = product.username
        this.email = product.email
        this.role = product.role
    }
}