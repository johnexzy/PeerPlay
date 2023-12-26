const { sql } = require('@vercel/postgres');

async function createPlays() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS plays (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id INT NOT NULL,
    link TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "plays" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

(async () => {
  await createPlays()
})();
