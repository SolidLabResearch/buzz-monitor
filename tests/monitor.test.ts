/**
 * Tests for the StreamingQueryMonitor class
 */

import { StreamingQueryMonitor } from '../src/monitor';
import { QueryConfig } from '../src/types';

describe('StreamingQueryMonitor', () => {
  let monitor: StreamingQueryMonitor;
  let config: QueryConfig;

  beforeEach(() => {
    config = {
      interval: 100, // Short interval for testing
      maxQueries: 10,
      timeout: 1000
    };
    monitor = new StreamingQueryMonitor(config);
  });

  afterEach(async () => {
    if (monitor.isMonitorRunning()) {
      await monitor.stop();
    }
  });

  describe('constructor', () => {
    it('should create a monitor with the provided config', () => {
      expect(monitor).toBeInstanceOf(StreamingQueryMonitor);
      expect(monitor.isMonitorRunning()).toBe(false);
    });
  });

  describe('start and stop', () => {
    it('should start the monitor successfully', async () => {
      await monitor.start();
      expect(monitor.isMonitorRunning()).toBe(true);
    });

    it('should stop the monitor successfully', async () => {
      await monitor.start();
      await monitor.stop();
      expect(monitor.isMonitorRunning()).toBe(false);
    });

    it('should throw error when starting an already running monitor', async () => {
      await monitor.start();
      await expect(monitor.start()).rejects.toThrow('Monitor is already running');
    });

    it('should not throw error when stopping a stopped monitor', async () => {
      await expect(monitor.stop()).resolves.not.toThrow();
    });
  });

  describe('getStats', () => {
    it('should return initial stats for a new monitor', () => {
      const stats = monitor.getStats();
      expect(stats.totalQueries).toBe(0);
      expect(stats.successfulQueries).toBe(0);
      expect(stats.failedQueries).toBe(0);
      expect(stats.averageExecutionTime).toBe(0);
      expect(stats.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should update stats after running for a while', async () => {
      await monitor.start();
      
      // Wait for some queries to be processed
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const stats = monitor.getStats();
      expect(stats.totalQueries).toBeGreaterThan(0);
      expect(stats.uptime).toBeGreaterThan(0);
      
      await monitor.stop();
    });
  });

  describe('query results', () => {
    it('should initially have no query results', () => {
      const results = monitor.getAllQueryResults();
      expect(results).toHaveLength(0);
    });

    it('should store query results after running', async () => {
      await monitor.start();
      
      // Wait for some queries to be processed
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const results = monitor.getAllQueryResults();
      expect(results.length).toBeGreaterThan(0);
      
      // Check that each result has required properties
      results.forEach(result => {
        expect(result.id).toBeDefined();
        expect(result.status).toMatch(/pending|success|error|timeout/);
        expect(result.startTime).toBeInstanceOf(Date);
      });
      
      await monitor.stop();
    });

    it('should limit query results to maxQueries', async () => {
      const smallConfig: QueryConfig = {
        interval: 50,
        maxQueries: 3,
        timeout: 1000
      };
      const smallMonitor = new StreamingQueryMonitor(smallConfig);
      
      await smallMonitor.start();
      
      // Wait for more queries than maxQueries
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const results = smallMonitor.getAllQueryResults();
      expect(results.length).toBeLessThanOrEqual(3);
      
      await smallMonitor.stop();
    });
  });

  describe('getQueryResult', () => {
    it('should return undefined for non-existent query ID', () => {
      const result = monitor.getQueryResult('non-existent-id');
      expect(result).toBeUndefined();
    });
  });
});