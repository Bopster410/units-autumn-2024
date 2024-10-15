import { renderHook } from '@testing-library/react';
import { useProducts } from '../useProducts';

describe('useProducts test', () => {
    it('should return array of items of type Product', () => {
        const { result } = renderHook(useProducts);
        result.current.forEach((product) => {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('description');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('category');
        });
    });

    it('should not be empty', () => {
        const { result } = renderHook(useProducts);
        expect(result.current.length).not.toBe(0);
    });
});
