type LogLevel = 'info' | 'warn' | 'error';

class LoggerService {
  private log(level: LogLevel, message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    // Facade pattern: In production, substitute this with Sentry/Datadog logic
    if (process.env.NODE_ENV !== 'test') {
       // eslint-disable-next-line no-console
       console[level](`[${timestamp}] [${level.toUpperCase()}]: ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]) {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log('error', message, ...args);
  }
}

export const Logger = new LoggerService();
