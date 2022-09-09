<template>
  <div id="no-encryption-container">
    <div id="log">
      <pre>
        <p>{{log}}</p>
      </pre>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, getCurrentInstance } from "vue";

export default defineComponent({
  name: "NoEncryptionTest",
  setup() {
    const log = ref("");
    const app = getCurrentInstance();
    const sqlite = app?.appContext.config.globalProperties.$sqlite;
    onMounted(async () => {
      const platform = (await sqlite.getPlatform()).platform;
      console.log(`platform ${platform}`);

      log.value = log.value.concat("* After  useSQLite definition *\n");
      const retNoEncryption = await noEncryptionTest(log, sqlite, platform);
      if (!retNoEncryption) {
        log.value = log.value.concat("* testDatabaseNoEncryption failed*\n");
        log.value = log.value.concat("\n* The set of tests failed *\n");
        console.log("The set of tests failed");
      } else {
        log.value = log.value.concat("\n* The set of tests was successful *\n");
        console.log("The set of tests was successful");
      }
    });
    return { log };
  },
});
async function noEncryptionTest(log, sqlite, platform) {
  try {
    let res = await sqlite.echo("Hello from echo");
    if (res.value !== "Hello from echo") {
      log.value = log.value.concat(`> Echo not returning "Hello from echo"\n`);
      return false;
    }

    log.value = log.value.concat("> Echo successful\n");
    // create a connection for NoEncryption
    const db = await sqlite.createConnection("NoEncryption");
    log.value = log.value.concat(
      "> createConnection " + " 'NoEncryption' successful\n"
    );
    // open NoEncryption database
    await db.open();
    log.value = log.value.concat("> open 'NoEncryption' successful\n");
    const createTablesNoEncryption = `
      CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      company TEXT,
      size FLOAT,
      age INTEGER,
      last_modified INTEGER DEFAULT (strftime('%s', 'now'))
      );
      CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY NOT NULL,
      userid INTEGER,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      last_modified INTEGER DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (userid) REFERENCES users(id) ON DELETE SET DEFAULT
      );
      CREATE INDEX IF NOT EXISTS users_index_name ON users (name);
      CREATE INDEX IF NOT EXISTS users_index_last_modified ON users (last_modified);
      CREATE INDEX IF NOT EXISTS messages_index_last_modified ON messages (last_modified);
      CREATE TRIGGER IF NOT EXISTS users_trigger_last_modified 
      AFTER UPDATE ON users
      FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
      BEGIN  
          UPDATE users SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
      END;      
      CREATE TRIGGER IF NOT EXISTS messages_trigger_last_modified AFTER UPDATE ON messages
      FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
      BEGIN  
          UPDATE messages SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
      END;      
      PRAGMA user_version = 1;
    `;
    const importTwoUsers = `
      DELETE FROM users;
      INSERT INTO users (name,email,age) VALUES ("Whiteley","Whiteley.com",30);
      INSERT INTO users (name,email,age) VALUES ("Jones","Jones.com",44);
    `;
    const importThreeMessages = `
      DELETE FROM messages;
      INSERT INTO messages (userid,title,body) VALUES (1,"test post 1","content test post 1");
      INSERT INTO messages (userid,title,body) VALUES (2,"test post 2","content test post 2");
      INSERT INTO messages (userid,title,body) VALUES (1,"test post 3","content test post 3");
    `;
    const dropTablesTablesNoEncryption = `
      PRAGMA foreign_keys = OFF;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS messages;
      PRAGMA foreign_keys = ON;
    `;
    // Drop tables if exists
    res = await db.execute(dropTablesTablesNoEncryption, false);
    console.log(`drop tables res: ${JSON.stringify(res)}`);
    log.value = log.value.concat(`drop tables res: ${JSON.stringify(res)}\n`);
    if (res.changes.changes < 0) {
      log.value = log.value.concat(" Execute1 failed\n");
      return false;
    }
    // Create tables
    res = await db.execute(createTablesNoEncryption);
    if (res.changes.changes !== 0 && res.changes.changes !== 1) {
      log.value = log.value.concat(" Execute2 failed\n");
      return false;
    }
    // Insert two users with execute method
    res = await db.execute(importTwoUsers);
    if (res.changes.changes !== 2) {
      log.value = log.value.concat(" Execute3 failed\n");
      return false;
    }
    if (platform === "web") {
      // save the database
      await sqlite.saveToStore("NoEncryption");
    }

    // Select all Users
    res = await db.query("SELECT * FROM users");
    if (
      res.values.length !== 2 ||
      res.values[0].name !== "Whiteley" ||
      res.values[1].name !== "Jones"
    ) {
      log.value = log.value.concat(" Select1 failed\n");
      return false;
    }
    // add one user with statement and values
    let sqlcmd = "INSERT INTO users (name,email,age) VALUES (?,?,?)";
    let values = ["Simpson", "Simpson@example.com", 69];
    res = await db.run(sqlcmd, values);
    if (res.changes.changes !== 1 || res.changes.lastId !== 3) {
      log.value = log.value.concat(" Run1 failed\n");
      return false;
    }
    // add one user with statement
    sqlcmd = `INSERT INTO users (name,email,age) VALUES `;
    sqlcmd += `("Brown","Brown@example.com",15)`;
    res = await db.run(sqlcmd);
    if (res.changes.changes !== 1 || res.changes.lastId !== 4) {
      log.value = log.value.concat(" Run2 failed\n");
      return false;
    }
    // Select all Users
    res = await db.query("SELECT * FROM users");
    if (res.values.length !== 4) {
      log.value = log.value.concat(" Select2 failed\n");
      return false;
    }
    // Select Users with age > 35
    sqlcmd = "SELECT name,email,age FROM users WHERE age > ?";
    values = ["35"];
    res = await db.query(sqlcmd, values);
    if (res.values.length !== 2) {
      log.value = log.value.concat(" Select with filter on age failed\n");
      return false;
    }
    // Import three messages
    res = await db.execute(importThreeMessages);
    if (res.changes.changes !== 3) {
      log.value = log.value.concat(" Insert messages failed\n");
      return false;
    }
    // Select all Messages
    res = await db.query("SELECT * FROM messages");
    if (
      res.values.length !== 3 ||
      res.values[0].title !== "test post 1" ||
      res.values[1].title !== "test post 2" ||
      res.values[2].title !== "test post 3"
    ) {
      log.value = log.value.concat(" Select messages failed\n");
      return false;
    }

    // Close Connection NoEncryption
    await sqlite.closeConnection("NoEncryption");

    log.value = log.value.concat("* Ending testDatabaseNoEncryption *\n");
    return true;
  } catch (err) {
    log.value = log.value.concat(`\n* Error ${err} *\n`);
    return false;
  }
}
</script>
