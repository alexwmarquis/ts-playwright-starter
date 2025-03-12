import console from "node:console";

async function globalSetup() {
    console.log("🚀 Global setup is starting...");
    // Initialize resources here (e.g., database connection, server setup)
    console.log("✅ Global setup completed!");
}

export default globalSetup;
