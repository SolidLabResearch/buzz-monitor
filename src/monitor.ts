/**
 * Streaming Query Monitor implementation
 */

import { QueryConfig, QueryResult, MonitoringStats } from './types';

/**
 * Main class for monitoring streaming queries
 */
export class StreamingQueryMonitor {
  private config: QueryConfig;
  private isRunning: boolean;
  private queryResults: Map<string, QueryResult>;
  private startTime: Date;
  private intervalId?: NodeJS.Timeout;

  constructor(config: QueryConfig) {
    this.config = config;
    this.isRunning = false;
    this.queryResults = new Map();
    this.startTime = new Date();
  }

  /**
   * Start the monitoring process
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      throw new Error('Monitor is already running');
    }

    this.isRunning = true;
    this.startTime = new Date();
    
    console.log(`Starting monitor with interval: ${this.config.interval}ms`);
    
    this.intervalId = setInterval(() => {
      this.performMonitoringCheck();
    }, this.config.interval);
  }

  /**
   * Stop the monitoring process
   */
  async stop(): Promise<void> {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    
    console.log('Monitor stopped');
  }

  /**
   * Get current monitoring statistics
   */
  getStats(): MonitoringStats {
    const now = new Date();
    const results = Array.from(this.queryResults.values());
    const successfulQueries = results.filter(r => r.status === 'success');
    const failedQueries = results.filter(r => r.status === 'error' || r.status === 'timeout');
    
    const totalExecutionTime = successfulQueries
      .filter(r => r.executionTime !== undefined)
      .reduce((sum, r) => sum + (r.executionTime || 0), 0);
    
    const averageExecutionTime = successfulQueries.length > 0 
      ? totalExecutionTime / successfulQueries.length 
      : 0;

    return {
      totalQueries: results.length,
      successfulQueries: successfulQueries.length,
      failedQueries: failedQueries.length,
      averageExecutionTime,
      uptime: now.getTime() - this.startTime.getTime()
    };
  }

  /**
   * Check if the monitor is currently running
   */
  isMonitorRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Get a specific query result by ID
   */
  getQueryResult(id: string): QueryResult | undefined {
    return this.queryResults.get(id);
  }

  /**
   * Get all query results
   */
  getAllQueryResults(): QueryResult[] {
    return Array.from(this.queryResults.values());
  }

  /**
   * Perform a monitoring check cycle
   */
  private performMonitoringCheck(): void {
    const queryId = this.generateQueryId();
    const startTime = new Date();
    
    // Simulate query execution
    this.executeQuery(queryId, startTime);
  }

  /**
   * Execute a simulated query
   */
  private async executeQuery(id: string, startTime: Date): Promise<void> {
    const queryResult: QueryResult = {
      id,
      status: 'pending',
      startTime
    };
    
    // Clean up old results if we exceed maxQueries BEFORE adding new one
    if (this.queryResults.size >= this.config.maxQueries) {
      const oldestId = Array.from(this.queryResults.keys())[0];
      this.queryResults.delete(oldestId);
    }
    
    this.queryResults.set(id, queryResult);
    
    try {
      // Simulate async query execution
      const executionTime = await this.simulateQueryExecution();
      
      queryResult.status = 'success';
      queryResult.executionTime = executionTime;
      queryResult.endTime = new Date();
      
    } catch (error) {
      queryResult.status = 'error';
      queryResult.error = error instanceof Error ? error.message : 'Unknown error';
      queryResult.endTime = new Date();
    }
  }

  /**
   * Simulate query execution with random timing and occasional failures
   */
  private simulateQueryExecution(): Promise<number> {
    return new Promise((resolve, reject) => {
      const executionTime = Math.random() * 1000 + 100; // 100-1100ms
      const shouldFail = Math.random() < 0.1; // 10% failure rate
      
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Simulated query failure'));
        } else {
          resolve(executionTime);
        }
      }, executionTime);
    });
  }

  /**
   * Generate a unique query ID
   */
  private generateQueryId(): string {
    return `query-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}