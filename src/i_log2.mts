/**
  * Copyright 2023 Adligo Inc / Scott Morgan
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *     http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

export const DEFAULT_FORMAT = '<logName/> <level/>: <message/>';
export const INVALID_LOG_FORMAT = 'Invalid log format ';
export const LEVEL = '<level/>';
export const LOGNAME = '<logname/>';
export const MESSAGE = '<message/>';
export const ROOT = 'ROOT';

/**
 * This interface allows concurrent logging from different parts of the system
 * to use the same I_Log, so that the disparate concurrent log message are less
 * jumbly / out of order in the console.
 */
export interface I_LogSegment {
  /**
   * 
   * @param message 
   */
  write(message: string): void;
  /**
   * write the buffered group of log messages to the console, file, http stream etc.
   */
  flush(): void;
}
export interface I_Log {
  debug(message : string, logSegment?: I_LogSegment ): void
  error(message : string, logSegment?: I_LogSegment): void
  getFormat(): string
  getLevel(): LogLevel
  getName(): string
  info(message : string, logSegment?: I_LogSegment): void
  isDebug(): boolean
  isError(): boolean
  isInfo(): boolean
  isTrace(): boolean
  isWarn(): boolean
  trace(message : string, logSegment?: I_LogSegment): void
  warn(message : string, logSegment?: I_LogSegment): void
}

  
export interface I_LogCtx {
  getLog(logName: string): I_Log;
}

export interface I_LogConfig {
  getLevel(logName: string): LogLevel | undefined;
  getFormat(): string;
}

export enum LogLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4
}