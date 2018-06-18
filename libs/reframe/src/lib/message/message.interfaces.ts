import { ParsedUrl } from '../reframe.interfaces';

export enum MessageTypes {
  LAUNCH = 'LAUNCH',
  FINISH = 'FINISH',
  CANCEL = 'CANCEL'
}

export interface Message {
  type: string;
  payload: any;
}

export interface LaunchMessage {
  type: MessageTypes.LAUNCH;
  payload: ParsedUrl;
}

export interface CancelMessage {
  type: MessageTypes.CANCEL;
  payload: ParsedUrl;
}

export interface FinishMessage {
  type: MessageTypes.FINISH;
  payload: ParsedUrl;
}

export function isLaunchMessage(value: any): value is LaunchMessage {
  return value !== undefined && value.type === MessageTypes.LAUNCH;
}

export function isCancelMessage(value: any): value is CancelMessage {
  return value !== undefined && value.type === MessageTypes.CANCEL;
}

export function isFinishMessage(value: any): value is FinishMessage {
  return value !== undefined && value.type === MessageTypes.FINISH;
}
