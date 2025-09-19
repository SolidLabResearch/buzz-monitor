/**
 * Tests for type definitions and interfaces
 */

import { QueryConfig, QueryResult, MonitoringStats } from '../src/types';

describe('Type Definitions', () => {
  describe('QueryConfig', () => {
    it('should accept valid configuration', () => {
      const config: QueryConfig = {
        interval: 1000,
        maxQueries: 50,
        timeout: 5000
      };

      expect(config.interval).toBe(1000);
      expect(config.maxQueries).toBe(50);
      expect(config.timeout).toBe(5000);
    });
  });

  describe('QueryResult', () => {
    it('should accept valid query result with minimal properties', () => {
      const result: QueryResult = {
        id: 'test-query-1',
        status: 'pending',
        startTime: new Date()
      };

      expect(result.id).toBe('test-query-1');
      expect(result.status).toBe('pending');
      expect(result.startTime).toBeInstanceOf(Date);
    });

    it('should accept valid query result with all properties', () => {
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + 1000);
      
      const result: QueryResult = {
        id: 'test-query-2',
        status: 'success',
        executionTime: 1000,
        startTime,
        endTime
      };

      expect(result.id).toBe('test-query-2');
      expect(result.status).toBe('success');
      expect(result.executionTime).toBe(1000);
      expect(result.startTime).toBe(startTime);
      expect(result.endTime).toBe(endTime);
    });

    it('should accept error status with error message', () => {
      const result: QueryResult = {
        id: 'test-query-3',
        status: 'error',
        error: 'Connection timeout',
        startTime: new Date(),
        endTime: new Date()
      };

      expect(result.status).toBe('error');
      expect(result.error).toBe('Connection timeout');
    });

    it('should validate status values', () => {
      const validStatuses: Array<QueryResult['status']> = [
        'pending',
        'success', 
        'error',
        'timeout'
      ];

      validStatuses.forEach(status => {
        const result: QueryResult = {
          id: `test-${status}`,
          status,
          startTime: new Date()
        };
        expect(result.status).toBe(status);
      });
    });
  });

  describe('MonitoringStats', () => {
    it('should accept valid monitoring statistics', () => {
      const stats: MonitoringStats = {
        totalQueries: 100,
        successfulQueries: 90,
        failedQueries: 10,
        averageExecutionTime: 250.5,
        uptime: 60000
      };

      expect(stats.totalQueries).toBe(100);
      expect(stats.successfulQueries).toBe(90);
      expect(stats.failedQueries).toBe(10);
      expect(stats.averageExecutionTime).toBe(250.5);
      expect(stats.uptime).toBe(60000);
    });

    it('should accept zero values', () => {
      const stats: MonitoringStats = {
        totalQueries: 0,
        successfulQueries: 0,
        failedQueries: 0,
        averageExecutionTime: 0,
        uptime: 0
      };

      expect(stats.totalQueries).toBe(0);
      expect(stats.successfulQueries).toBe(0);
      expect(stats.failedQueries).toBe(0);
      expect(stats.averageExecutionTime).toBe(0);
      expect(stats.uptime).toBe(0);
    });
  });
});