import {defineStore} from 'pinia'

export const useAuth = defineStore({
    id: 'auth',
    state: () => ({
        db: null,
        initialized: false,
        authenticated: false,
        user: null
    }),
    actions: {
        setDb(db) {
            this.db = db
        },
        async refresh(db) {
            const result = await this.db.query('$auth.*')
            if (result[0]) {
                this.user = result[0]
                this.authenticated = true
            }
        },
        async signin(scope, username, password) {
            try {
                const token = await this.db.signin({
                    namespace: this.db.connection.namespace,
                    database: this.db.connection.database,
                    scope: scope,
                    username: username,
                    password: password
                })

                if (token) {
                    console.debug('Auth token', token)
                    await this.refresh()
                }

            } catch (e) {
                console.error(e)
            }
        },
        async signup(scope, name, username, password) {
            try {
                const token = await this.db.signup({
                    namespace: this.db.connection.namespace,
                    database: this.db.connection.database,
                    scope: scope,
                    name: name,
                    username: username,
                    password: password
                })

                if (token) {
                    console.debug('Auth token', token)
                    await this.refresh()
                }

            } catch (e) {
                console.error(e)
            }
        },
        async signout() {
            this.authenticated = false
            this.user = null
        }
    }
})