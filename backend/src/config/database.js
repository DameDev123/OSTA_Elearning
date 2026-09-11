// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const isProduction = process.env.NODE_ENV === 'production';

// let pool;

// if (process.env.DATABASE_URL) {
//   pool = mysql.createPool(process.env.DATABASE_URL);
// } else {
//   pool = mysql.createPool({
//     host: process.env.DB_HOST || 'localhost',
//     port: Number(process.env.DB_PORT) || 3308,
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'OSTA_E_learning',

//     waitForConnections: true,
//     connectionLimit: isProduction ? 20 : 10,
//     queueLimit: 0,

//     connectTimeout: 15000,
//     enableKeepAlive: true,
//     keepAliveInitialDelay: 0,
//     charset: 'utf8mb4',
//     timezone: '+00:00',
//     dateStrings: false,

//     ssl:
//       process.env.DB_SSL === 'true'
//         ? { rejectUnauthorized: false }
//         : undefined,
//   });
// }

// /* =========================================================
//    DATABASE CONNECTION
// ========================================================= */

// async function testDatabaseConnection() {
//   try {
//     const connection = await pool.getConnection();

//     await connection.ping();
//     connection.release();

//     console.log('✅ MySQL database connected successfully.');
//   } catch (error) {
//     console.error('❌ MySQL database connection failed:', {
//       message: error.message,
//       code: error.code,
//       errno: error.errno,
//       sqlState: error.sqlState,
//     });
//   }
// }

// /* =========================================================
//    SCHEMA HELPERS
// ========================================================= */

// async function tableExists(table) {
//   const [rows] = await pool.execute(
//     `
//     SELECT COUNT(*) AS count
//     FROM INFORMATION_SCHEMA.TABLES
//     WHERE TABLE_SCHEMA = DATABASE()
//       AND TABLE_NAME = ?
//     `,
//     [table]
//   );

//   return Number(rows[0].count) > 0;
// }

// async function columnExists(table, column) {
//   const [rows] = await pool.execute(
//     `
//     SELECT COUNT(*) AS count
//     FROM INFORMATION_SCHEMA.COLUMNS
//     WHERE TABLE_SCHEMA = DATABASE()
//       AND TABLE_NAME = ?
//       AND COLUMN_NAME = ?
//     `,
//     [table, column]
//   );

//   return Number(rows[0].count) > 0;
// }

// /*
//  * Returns the correct ALTER TABLE statement.
//  *
//  * If the requested AFTER column exists, we use AFTER.
//  * If it does not exist, the new column is added at the end.
//  *
//  * This prevents Railway migrations from failing because a
//  * previous schema version does not contain the expected anchor column.
//  */
// async function buildAddColumnDDL({
//   table,
//   column,
//   definition,
//   after,
// }) {
//   let ddl = `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`;

//   if (after && (await columnExists(table, after))) {
//     ddl += ` AFTER \`${after}\``;
//   }

//   return ddl;
// }

// /* =========================================================
//    SAFE SCHEMA MIGRATIONS
// ========================================================= */

// async function applySchemaMigrations() {
//   const migrations = [
//     {
//       table: 'events',
//       column: 'capacity',
//       definition: 'INT UNSIGNED NOT NULL DEFAULT 100',
//       after: 'location_or_link',
//     },

//     {
//       table: 'events',
//       column: 'banner_image',
//       definition: 'VARCHAR(500) DEFAULT NULL',
//       after: 'capacity',
//     },

//     {
//       table: 'lesson_progress',
//       column: 'progress_percent',
//       definition: 'DECIMAL(5,2) NOT NULL DEFAULT 0.00',
//       after: 'completed',
//     },

//     {
//       table: 'lesson_progress',
//       column: 'last_position_seconds',
//       definition: 'INT UNSIGNED NOT NULL DEFAULT 0',
//       after: 'progress_percent',
//     },

//     {
//       table: 'discussion_topics',
//       column: 'category',
//       definition: "VARCHAR(100) NOT NULL DEFAULT 'General'",
//       after: 'title',
//     },

//     {
//       table: 'discussion_topics',
//       column: 'body',
//       definition: 'TEXT DEFAULT NULL',
//       after: 'category',
//     },

//     {
//       table: 'certificates',
//       column: 'certificate_number',
//       definition: 'VARCHAR(200) DEFAULT NULL',
//       after: 'course_id',
//     },

//     {
//       table: 'certificates',
//       column: 'recipient_name',
//       definition: 'VARCHAR(200) DEFAULT NULL',
//       after: 'certificate_number',
//     },

//     {
//       table: 'certificates',
//       column: 'completion_date',
//       definition: 'DATE DEFAULT NULL',
//       after: 'recipient_name',
//     },

//     {
//       table: 'certificates',
//       column: 'score',
//       definition: 'DECIMAL(5,2) DEFAULT NULL',
//       after: 'completion_date',
//     },

//     {
//       table: 'certificates',
//       column: 'skills',
//       definition: 'TEXT DEFAULT NULL',
//       after: 'score',
//     },

//     {
//       table: 'course_sections',
//       column: 'section_order',
//       definition: 'INT UNSIGNED NOT NULL DEFAULT 1',
//       after: 'title',
//     },

//     {
//       table: 'quizzes',
//       column: 'lesson_id',
//       definition: 'BIGINT UNSIGNED DEFAULT NULL',
//       after: 'course_id',
//     },
//   ];

//   let applied = 0;
//   let alreadyPresent = 0;
//   let skipped = 0;
//   let failed = 0;

//   console.log('🔄 Starting safe database schema migrations...');

//   for (const migration of migrations) {
//     const { table, column, definition, after } = migration;

//     try {
//       /* -----------------------------------------------------
//          1. Check table
//       ----------------------------------------------------- */

//       const exists = await tableExists(table);

//       if (!exists) {
//         skipped += 1;

//         console.warn(
//           `⚠️ Migration skipped: table ${table} does not exist.`
//         );

//         continue;
//       }

//       /* -----------------------------------------------------
//          2. Check column
//       ----------------------------------------------------- */

//       const hasColumn = await columnExists(table, column);

//       if (hasColumn) {
//         alreadyPresent += 1;

//         console.log(
//           `ℹ️ Schema already up to date: ${table}.${column}`
//         );

//         continue;
//       }

//       /* -----------------------------------------------------
//          3. Build safe ALTER TABLE query
//       ----------------------------------------------------- */

//       const ddl = await buildAddColumnDDL({
//         table,
//         column,
//         definition,
//         after,
//       });

//       /* -----------------------------------------------------
//          4. Apply migration
//       ----------------------------------------------------- */

//       await pool.execute(ddl);

//       applied += 1;

//       console.log(
//         `✅ Schema migration applied: ${table}.${column}`
//       );

//       /* -----------------------------------------------------
//          5. Verify migration
//       ----------------------------------------------------- */

//       const verified = await columnExists(table, column);

//       if (!verified) {
//         console.warn(
//           `⚠️ Migration applied but verification failed: ${table}.${column}`
//         );
//       }
//     } catch (error) {
//       failed += 1;

//       console.error(
//         `❌ Schema migration FAILED for ${table}.${column}`
//       );

//       console.error('   Error:', error.message);
//       console.error('   Code:', error.code || 'N/A');
//       console.error('   SQL State:', error.sqlState || 'N/A');
//     }
//   }

//   console.log('');
//   console.log('==========================================');
//   console.log('📊 DATABASE MIGRATION SUMMARY');
//   console.log('==========================================');
//   console.log(`✅ Applied:          ${applied}`);
//   console.log(`ℹ️ Already present:  ${alreadyPresent}`);
//   console.log(`⚠️ Skipped:          ${skipped}`);
//   console.log(`❌ Failed:           ${failed}`);
//   console.log('==========================================');

//   if (failed === 0) {
//     console.log('🎉 Database schema migrations completed safely.');
//   } else {
//     console.warn(
//       `⚠️ Database migrations completed with ${failed} failure(s).`
//     );
//   }
// }

// /* =========================================================
//    STARTUP
// ========================================================= */

// async function initializeDatabase() {
//   await testDatabaseConnection();

//   try {
//     await applySchemaMigrations();
//   } catch (error) {
//     console.error(
//       '❌ Unexpected database migration error:',
//       error.message
//     );
//   }
// }

// initializeDatabase();

// /* =========================================================
//    EXPORT
// ========================================================= */

// module.exports = pool;



const mysql = require('mysql2/promise'); 
require('dotenv').config(); 
 
const isProduction = process.env.NODE_ENV === 'production'; 
 
/* 
 * Production: 
 *   Railway provides DATABASE_URL through: 
 *   ${{MySQL.MYSQL_PRIVATE_URL}} 
 * 
 * Local development: 
 *   Uses DB_HOST, DB_PORT, DB_USER, DB_PASSWORD and DB_NAME 
 *   from backend/.env 
 */ 
 
let pool; 
 
if (process.env.DATABASE_URL) { 
  pool = mysql.createPool(process.env.DATABASE_URL); 
} else { 
  pool = mysql.createPool({ 
    host: process.env.DB_HOST || 'localhost', 
    port: Number(process.env.DB_PORT) || 3308, 
    user: process.env.DB_USER || 'root', 
    password: process.env.DB_PASSWORD || '', 
    database: process.env.DB_NAME || 'OSTA_E_learning', 
 
    waitForConnections: true, 
    connectionLimit: isProduction ? 20 : 10, 
    queueLimit: 0, 
 
    connectTimeout: 15000, 
    enableKeepAlive: true, 
    keepAliveInitialDelay: 0, 
    charset: 'utf8mb4', 
    timezone: '+00:00', 
    dateStrings: false, 
 
    ssl: 
      process.env.DB_SSL === 'true' 
        ? { rejectUnauthorized: false } 
        : undefined, 
  }); 
} 
 
async function testDatabaseConnection() { 
  try { 
    const connection = await pool.getConnection(); 
 
    await connection.ping(); 
    connection.release(); 
 
    console.log('✅ MySQL database connected successfully.'); 
  } catch (error) { 
    console.error('❌ MySQL database connection failed:', { 
      message: error.message, 
      code: error.code, 
      errno: error.errno, 
      sqlState: error.sqlState, 
    }); 
  } 
} 
 
/** 
 * Checks INFORMATION_SCHEMA directly instead of relying on 
 * "ADD COLUMN IF NOT EXISTS" — that syntax only exists on MySQL 8.0.29+, 
 * and fails with a plain syntax error on older MySQL and on MariaDB. This 
 * approach works on every version, since INFORMATION_SCHEMA.COLUMNS has 
 * been standard since MySQL 5.x. 
 */ 
async function columnExists(table, column) { 
  const [rows] = await pool.execute( 
    ` 
    SELECT COUNT(*) AS count 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = ? 
      AND COLUMN_NAME = ? 
    `, 
    [table, column] 
  ); 
 
  return rows[0].count > 0; 
} 
 
async function applySchemaMigrations() { 
  const migrations = [ 
    { 
      table: 'events', 
      column: 'capacity', 
      ddl: "ALTER TABLE events ADD COLUMN capacity INT UNSIGNED NOT NULL DEFAULT 100 AFTER location_or_link", 
    }, 
    { 
      table: 'events', 
      column: 'banner_image', 
      ddl: "ALTER TABLE events ADD COLUMN banner_image VARCHAR(500) DEFAULT NULL AFTER capacity", 
    }, 
    { 
      table: 'lesson_progress', 
      column: 'progress_percent', 
      ddl: "ALTER TABLE lesson_progress ADD COLUMN progress_percent DECIMAL(5,2) NOT NULL DEFAULT 0.00 AFTER completed", 
    }, 
    { 
      table: 'lesson_progress', 
      column: 'last_position_seconds', 
      ddl: "ALTER TABLE lesson_progress ADD COLUMN last_position_seconds INT UNSIGNED NOT NULL DEFAULT 0 AFTER progress_percent", 
    }, 
    { 
      table: 'discussion_topics', 
      column: 'category', 
      ddl: "ALTER TABLE discussion_topics ADD COLUMN category VARCHAR(100) NOT NULL DEFAULT 'General' AFTER title", 
    }, 
    { 
      table: 'discussion_topics', 
      column: 'body', 
      ddl: "ALTER TABLE discussion_topics ADD COLUMN body TEXT DEFAULT NULL AFTER category", 
    }, 
    { 
      table: 'certificates', 
      column: 'certificate_number', 
      ddl: "ALTER TABLE certificates ADD COLUMN certificate_number VARCHAR(200) DEFAULT NULL AFTER course_id", 
    }, 
    { 
      table: 'certificates', 
      column: 'recipient_name', 
      ddl: "ALTER TABLE certificates ADD COLUMN recipient_name VARCHAR(200) DEFAULT NULL AFTER certificate_number", 
    }, 
    { 
      table: 'certificates', 
      column: 'completion_date', 
      ddl: "ALTER TABLE certificates ADD COLUMN completion_date DATE DEFAULT NULL AFTER recipient_name", 
    }, 
    { 
      table: 'certificates', 
      column: 'score', 
      ddl: "ALTER TABLE certificates ADD COLUMN score DECIMAL(5,2) DEFAULT NULL AFTER completion_date", 
    }, 
    { 
      table: 'certificates', 
      column: 'skills', 
      ddl: "ALTER TABLE certificates ADD COLUMN skills TEXT DEFAULT NULL AFTER score", 
    }, 
    { 
      table: 'course_sections', 
      column: 'section_order', 
      ddl: "ALTER TABLE course_sections ADD COLUMN section_order INT UNSIGNED NOT NULL DEFAULT 1 AFTER title", 
    }, 
    { 
      table: 'quizzes', 
      column: 'lesson_id', 
      ddl: "ALTER TABLE quizzes ADD COLUMN lesson_id BIGINT UNSIGNED DEFAULT NULL AFTER course_id", 
    }, 
  ]; 
 
  let applied = 0; 
  let alreadyPresent = 0; 
  let failed = 0; 
 
  for (const { table, column, ddl } of migrations) { 
    try { 
      const exists = await columnExists(table, column); 
 
      if (exists) { 
        alreadyPresent += 1; 
        continue; 
      } 
 
      await pool.execute(ddl); 
      applied += 1; 
      console.log(`✅ Schema migration applied: ${table}.${column}`); 
    } catch (error) { 
      // A real failure now (bad DDL, permissions, wrong AFTER column, 
      // etc.) is loud and specific — not lumped in with the normal 
      // "already exists" case like it was before. 
      failed += 1; 
      console.error( 
        `❌ Schema migration FAILED for ${table}.${column}:`, 
        error.message, 
        '\n   Query:', 
        ddl 
      ); 
    } 
  } 
 
  console.log( 
    `Schema migrations: ${applied} applied, ${alreadyPresent} already up to date, ${failed} failed.` 
  ); 
} 
 
testDatabaseConnection();   
applySchemaMigrations(); 
 
module.exports = pool;  