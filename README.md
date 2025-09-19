# Buzz Monitor

Experimentation and Evaluation setup for the Streaming Query Hive.

This is a TypeScript project with Jest testing and ESLint support for monitoring streaming queries.

## Features

- 🚀 **TypeScript**: Full TypeScript support with type definitions
- 🧪 **Jest Testing**: Comprehensive test suite with coverage reporting
- 📏 **ESLint**: Code linting for consistent code style
- 📊 **Monitoring**: Real-time streaming query monitoring capabilities
- 📈 **Statistics**: Performance metrics and monitoring statistics

## Getting Started

### Prerequisites

- Node.js (>=16.0.0)
- npm

### Installation

```bash
npm install
```

### Development

Build the project:
```bash
npm run build
```

Run in development mode with file watching:
```bash
npm run dev
```

Start the application:
```bash
npm start
```

### Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Linting

Check code style:
```bash
npm run lint
```

Fix linting issues automatically:
```bash
npm run lint:fix
```

### Cleaning

Clean build artifacts:
```bash
npm run clean
```

## Project Structure

```
├── src/                    # Source code
│   ├── index.ts           # Main entry point
│   ├── monitor.ts         # StreamingQueryMonitor class
│   └── types.ts           # TypeScript type definitions
├── tests/                 # Test files
│   ├── monitor.test.ts    # Monitor class tests
│   └── types.test.ts      # Type definition tests
├── dist/                  # Compiled JavaScript (generated)
├── coverage/              # Test coverage reports (generated)
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest testing configuration
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore rules
└── package.json          # Project dependencies and scripts
```

## Usage

### Basic Example

```typescript
import { StreamingQueryMonitor } from './monitor';
import { QueryConfig } from './types';

const config: QueryConfig = {
  interval: 5000,    // Check every 5 seconds
  maxQueries: 100,   // Keep last 100 query results
  timeout: 30000     // 30 second timeout per query
};

const monitor = new StreamingQueryMonitor(config);

// Start monitoring
await monitor.start();

// Get statistics
const stats = monitor.getStats();
console.log('Monitoring Stats:', stats);

// Stop monitoring
await monitor.stop();
```

### Configuration Options

The `QueryConfig` interface supports the following options:

- `interval`: Monitoring interval in milliseconds
- `maxQueries`: Maximum number of query results to keep in memory
- `timeout`: Timeout for individual queries in milliseconds

### API Reference

#### StreamingQueryMonitor

- `start()`: Start the monitoring process
- `stop()`: Stop the monitoring process  
- `getStats()`: Get current monitoring statistics
- `isMonitorRunning()`: Check if monitor is currently running
- `getQueryResult(id)`: Get a specific query result by ID
- `getAllQueryResults()`: Get all query results

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for your changes
5. Run the test suite: `npm test`
6. Run the linter: `npm run lint`
7. Submit a pull request

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run build:watch` | Compile with file watching |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run clean` | Remove build artifacts |
| `npm run dev` | Development mode with watching |
| `npm start` | Start the application |

## License

MIT
