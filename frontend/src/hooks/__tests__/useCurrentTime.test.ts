import { act, renderHook } from '@testing-library/react';
import { useCurrentTime } from '../useCurrentTime';

jest.useFakeTimers();

describe('useCurrentTime test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should match the pattern', () => {
        const { result } = renderHook(useCurrentTime);
        expect(result.current).toMatch(/\d{2}:\d{2}:\d{2}/);
    });

    it('should change time every second', () => {
        const toLocaleTimeStringMock = jest.spyOn(
            Date.prototype,
            'toLocaleTimeString'
        );

        const initialTime = '18:01:10';
        const updatedTime = '18:01:11';

        toLocaleTimeStringMock
            .mockReturnValueOnce(initialTime)
            .mockReturnValueOnce(updatedTime);

        const { result } = renderHook(useCurrentTime);

        expect(result.current).toBe(initialTime);
        act(() => jest.advanceTimersByTime(1000));
        expect(result.current).toBe(updatedTime);
    });

    it('should use clearInterval every second', () => {
        const toLocaleTimeStringMock = jest.spyOn(global, 'clearInterval');

        renderHook(useCurrentTime);

        expect(toLocaleTimeStringMock).not.toBeCalled();
        act(() => jest.advanceTimersByTime(1000));
        expect(toLocaleTimeStringMock).toBeCalledTimes(1);
    });
});
