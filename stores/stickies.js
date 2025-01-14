import {defineStore} from 'pinia'
import {RecordId} from "surrealdb.js";

const getDefaultSticky = () => ({
    content: '',
    color: 'light',
    author: null,
    created: null,
    updated: null,
})

export const useStickies = defineStore({
    id: 'stickies',
    state: () => ({
        db: null,
        stickies: []
    }),
    actions: {
        setDb(db) {
            this.db = db
        },
        init() {
            console.debug('Init stickies')
            this.db.live('sticky', (action, result) => {
                switch (action) {
                    case 'CREATE':
                        console.debug('Live query Create', result)
                        {
                            const localIndex = this.stickies.findIndex(sticky => sticky.id.id === result.id.id)
                            if (localIndex < 0) this.stickies.push(result)
                        }
                        break;
                    case 'UPDATE':
                        console.debug('Live query Update', result)
                        {
                            const localIndex = this.stickies.findIndex(sticky => sticky.id.id === result.id.id)
                            if (localIndex >= 0) this.stickies[localIndex] = result
                        }
                        break;
                    case 'DELETE':
                        console.debug('Live query Delete', result)
                        {
                            const localIndex = this.stickies.findIndex(sticky => sticky.id.id === result.id.id)
                            if (localIndex >= 0) this.stickies.splice(localIndex, 1)
                        }
                        break;
                }
            })
        },
        async load() {
            console.debug('Loading stickies')
            const auth = useAuth()

            const res = await this.db.query("SELECT * FROM sticky WHERE author=type::thing($author);", {
                author: auth.user.id
            })
            this.stickies = res[0]
        },
        async add() {
            console.debug('Add Sticky')
            const auth = useAuth()

            const response =await this.db.create('sticky', {
                ...getDefaultSticky(),
                author: auth.user.id
            })

            this.stickies.push(response)

        },
        async remove(index) {
            console.debug('Remove Sticky', index)
            try {
                const result = await this.db.delete(this.stickies[index].id)
                this.stickies.splice(index, 1)
                console.debug('Sticky removed in database', result)
            } catch (e) {
                console.error(e)
            }
        },
        async update(index, bodyContent) {
            console.debug('Update Sticky')
            const sticky = this.stickies[index]
            sticky.content = bodyContent
            await this.db.merge(
                sticky.id,
                sticky
            )
        },
    }
})