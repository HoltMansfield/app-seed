// This file extends the type definition for process.env.NODE_ENV to include 'e2e'.
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test" | "e2e";
    // Add other environment variables here as needed
  }
}
