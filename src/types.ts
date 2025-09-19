/**
 * Type definitions for the buzz-monitor application
 */

/**
 * Configuration interface for query monitoring
 */
export interface QueryConfig {
  /** Monitoring interval in milliseconds */
  interval: number;
  /** Maximum number of queries to monitor */
  maxQueries: number;
  /** Timeout for individual queries in milliseconds */
  timeout: number;
}

/**
 * Interface for query results
 */
export interface QueryResult {
  /** Unique identifier for the query */
  id: string;
  /** Query execution status */
  status: 'pending' | 'success' | 'error' | 'timeout';
  /** Query execution time in milliseconds */
  executionTime?: number;
  /** Error message if status is 'error' */
  error?: string;
  /** Timestamp when query was started */
  startTime: Date;
  /** Timestamp when query was completed */
  endTime?: Date;
}

/**
 * Interface for monitoring statistics
 */
export interface MonitoringStats {
  /** Total number of queries processed */
  totalQueries: number;
  /** Number of successful queries */
  successfulQueries: number;
  /** Number of failed queries */
  failedQueries: number;
  /** Average execution time in milliseconds */
  averageExecutionTime: number;
  /** Uptime in milliseconds */
  uptime: number;
}