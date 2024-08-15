import {defineStore} from 'pinia'

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
                        break;
                    case 'UPDATE':
                        console.debug('Live query Update', result)
                        break;
                    case 'Delete':
                        console.debug('Live query Delete', result)
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

            const sticky = {
                ...getDefaultSticky(),
                author: auth.user.id
            }

            console.log(sticky)
            this.stickies.push(sticky)
            await this.db.create('sticky', sticky)
        },
        remove() {
            console.debug('Remove Sticky')
        },
        update() {
            console.debug('Update Sticky')
        },
    }
})