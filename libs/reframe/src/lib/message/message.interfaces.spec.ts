import {
  Message,
  isLaunchMessage,
  isCancelMessage,
  isFinishMessage
} from './message.interfaces';

describe(`isCancelMessage()`, () => {
  it(`should return true for type: CANCEL`, () => {
    const msg: Message = { type: 'CANCEL', payload: undefined };
    expect(isCancelMessage(msg)).toBeTruthy();
  });

  it(`should return falsy for other`, () => {
    const msg: Message = { type: 'foo', payload: undefined };
    expect(isCancelMessage(msg)).toBeFalsy();
  });
});

describe(`isFinishMessage()`, () => {
  it(`should return true for type: FINISH`, () => {
    const msg: Message = { type: 'FINISH', payload: undefined };
    expect(isFinishMessage(msg)).toBeTruthy();
  });

  it(`should return falsy for other`, () => {
    const msg: Message = { type: 'foo', payload: undefined };
    expect(isFinishMessage(msg)).toBeFalsy();
  });
});

describe(`isLaunchMessage()`, () => {
  it(`should return true for type: LAUNCH`, () => {
    const msg: Message = { type: 'LAUNCH', payload: undefined };
    expect(isLaunchMessage(msg)).toBeTruthy();
  });

  it(`should return falsy for other`, () => {
    const msg: Message = { type: 'foo', payload: undefined };
    expect(isLaunchMessage(msg)).toBeFalsy();
  });
});
