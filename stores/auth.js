import {defineStore} from 'pinia'
import {useStickies} from "~/stores/stickies.js";

export const useAuth = defineStore({
    id: 'auth',
    state: () => ({
        db: null,
        initialized: false,
        authenticated: false,
        user: null,
        authInProgress: false
    }),
    actions: {
        setDb(db) {
            this.db = db
        },
        async init() {
            if (this.initialized === true) return

            const token = localStorage.getItem('surrealDbAuthToken')

            if (token) {
                console.log('Found SurrealDB auth token. Re-Authenticating')
                try {
                    await this.db.authenticate(token)
                    await this.refresh()
                } catch (e) {
                    console.error(e)
                }
            }

            this.initialized = true
        },
        async refresh(db) {
            const result = await this.db.query('$auth.*')
            if (result[0]) {
                this.user = result[0]
                this.authenticated = true
            }
            const stickies = useStickies()
            await stickies.load();
        },
        async signin(scope, username, password) {
            if (this.authInProgress === true) return
            this.authInProgress = true

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
                    localStorage.setItem('surrealDbAuthToken', token)
                    await this.refresh()
                }

            } catch (e) {
                console.error(e)
            }
            this.authInProgress = false
        },
        async signup(scope, name, username, password) {
            if (this.authInProgress === true) return
            this.authInProgress = true

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
                    localStorage.setItem('surrealDbAuthToken', token)
                    await this.refresh()
                }

            } catch (e) {
                console.error(e)
            }
            this.authInProgress = false
        },
        async signout() {
            this.authenticated = false
            this.user = null
            localStorage.removeItem('surrealDbAuthToken')
            await this.db.invalidate()
        }
    }
})