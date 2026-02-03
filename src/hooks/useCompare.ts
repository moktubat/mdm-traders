'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types/product'

interface CompareStore {
    compareProducts: Product[]
    addToCompare: (product: Product) => void
    removeFromCompare: (productId: string) => void
    toggleCompare: (product: Product) => void
    clearCompare: () => void
    isInCompare: (productId: string) => boolean
}

export const useCompare = create<CompareStore>()(
    persist(
        (set, get) => ({
            compareProducts: [],

            addToCompare: (product) => {
                const { compareProducts } = get()

                // Maximum 4 products
                if (compareProducts.length >= 4) {
                    return
                }

                // Don't add duplicates
                if (compareProducts.some(p => p._id === product._id)) {
                    return
                }

                set({ compareProducts: [...compareProducts, product] })
            },

            removeFromCompare: (productId) => {
                const { compareProducts } = get()
                set({
                    compareProducts: compareProducts.filter(p => p._id !== productId)
                })
            },

            toggleCompare: (product) => {
                const { compareProducts, addToCompare, removeFromCompare } = get()

                if (compareProducts.some(p => p._id === product._id)) {
                    removeFromCompare(product._id)
                } else {
                    addToCompare(product)
                }
            },

            clearCompare: () => {
                set({ compareProducts: [] })
            },

            isInCompare: (productId) => {
                const { compareProducts } = get()
                return compareProducts.some(p => p._id === productId)
            },
        }),
        {
            name: 'compare-storage', // LocalStorage key
        }
    )
)