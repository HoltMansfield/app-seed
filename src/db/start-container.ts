import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

let startedContainer: StartedPostgreSqlContainer

const main = async () => {
    // Create a new PostgreSQL container
    const container = new PostgreSqlContainer()
    .withDatabase('testdb')
    .withUsername('test')
    .withPassword('test');

    startedContainer = await container.start();

    console.log(`[start-container] Container started with ID: ${startedContainer.getId()}`);
    //process.stdin.resume(); // keep this process alive
}

// Add a cleanup handler for tests
if (typeof process !== 'undefined') {
    process.on('SIGINT', async () => {
        console.log(`[start-container]:SIGINT Stopping container with ID: ${startedContainer.getId()}`);
        await startedContainer.stop();
        console.log(`[start-container]:SIGINT Container stopped with ID: ${startedContainer.getId()}`);
        process.exit(0);
    });
  
    process.on('SIGTERM', async () => {
        console.log(`[start-container]:SIGTERM Stopping container with ID: ${startedContainer.getId()}`);
        await startedContainer.stop();
        console.log(`[start-container]:SIGTERM Container stopped with ID: ${startedContainer.getId()}`);
        process.exit(0);
    });
}

main();

