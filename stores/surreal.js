import { defineStore } from 'pinia'
import Surreal from "surrealdb.js";

export const useSurreal = defineStore({
    id: 'surreal',
    state: () => ({
        db: null,
        config: {
            uri: 'ws://localhost:3001/rpc',
            namespace: 'test',
            database: 'test',
        }
    }),
    actions: {
        async connect() {
            this.db = new Surreal()
            await this.db.connect(this.config.uri)
            await this.db.use({
                namespace: this.config.namespace,
                database: this.config.database
            })
        },
        setConfig(key, value) {
            this.config[key] = value
            return this.config
        },
    }
})