import console from "node:console";

async function globalTeardown() {
    console.log("🛑 Global teardown is starting...");
    // Cleanup resources here (e.g., closing database, server shutdown)
    console.log("✅ Global teardown completed!");
}

export default globalTeardown;
