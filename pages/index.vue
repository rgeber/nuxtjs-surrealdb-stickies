<template>
  <main>
    <section title="login" class="flex flex-col md:flex-row md:mt-8 md:gap-4">
      <auth-login class="md:w-1/2 mx-auto bg-amber-200 p-5 rounded-3xl shadow-xl"/>
      <auth-signup class="md:w-1/2 mx-auto bg-emerald-200 p-5 rounded-3xl shadow-xl"/>
    </section>
  </main>
</template>

<script setup>
import Surreal, {RecordId, Table} from "surrealdb.js";

onBeforeMount(async () => {
  // const db = new Surreal();
  //
  // await db.connect("http://127.0.0.1:3001/rpc");
  //
  // await db.use({
  //   namespace: "test",
  //   database: "test"
  // });
  //
  // await db.signup({
  //   namespace: 'test',
  //   database: 'test',
  //   scope: 'user',
  //   name: 'hans',
  //   username: 'hans',
  //   password: '123'
  // })

//
// // Signin as a namespace, database, or root user
//   await db.signin({
//     username: "root",
//     password: "root",
//   });
//
// // Create a new person with a random id
//   let created = await db.create("person", {
//     title: "Founder & CEO",
//     name: {
//       first: "Tobie",
//       last: "Morgan Hitchcock",
//     },
//     marketing: true,
//   });
//
//   console.log(created)
//
// // Update a person record with a specific id
//   let updated = await db.merge(new RecordId('person', 'jaime'), {
//     marketing: true,
//   });
//
//   console.log(updated)
//
// // Select all people records
//   let people = await db.select("person");
//
//   console.log(people)
//
// // Perform a custom advanced query
//   let groups = await db.query(
//       "SELECT marketing, count() FROM $tb GROUP BY marketing",
//       {
//         tb: new Table("person"),
//       },
//   );
//
//   console.log(groups)
})
</script>
