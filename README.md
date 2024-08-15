# SurreadDB Nuxt.js Stickies Example

This is an adaptation of the official SurrealDB [stickies v2 example](https://github.com/surrealdb/examples/tree/main/notes-v2)
created using Nuxt and Vue.

**This is not mean for productive use**

The example aims to demonstrate the following:

* How to set up a nuxt project with SurrealDB
* How to manage frontend users using SurrealDB
* Using surrealdb.js

Note from the author: My personal goal was to understand SurrealDB better and find a way to use it as a no fuss backend
for future web applications.

## Usage

Starting the nuxt dev script starts the entire application including the SurrealDB daemon. The daemon is configured to
use `dev.db` as a persistent file storage. You'll find that directory in the project root once SurrealDB was started.

```bash
npm run dev
```

Once SurrealDB is running import the `surql` files:

```bash
find _surql/ -maxdepth 1 -iname "*.surql" -exec surreal import --conn http://localhost:3001 --user root --pass root --ns test --db test {} \;
```

