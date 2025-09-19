/**
 * Main entry point for the buzz-monitor application
 */

import { StreamingQueryMonitor } from './monitor';
import { QueryConfig } from './types';

/**
 * Main function to start the application
 */
async function main(): Promise<void> {
  console.log('Starting Buzz Monitor...');
  
  const config: QueryConfig = {
    interval: 5000,
    maxQueries: 100,
    timeout: 30000
  };

  const monitor = new StreamingQueryMonitor(config);
  
  try {
    await monitor.start();
    console.log('Buzz Monitor started successfully');
  } catch (error) {
    console.error('Failed to start Buzz Monitor:', error);
    process.exit(1);
  }
}

// Run the application
if (require.main === module) {
  main().catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export { main };