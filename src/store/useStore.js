import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      theme: 'dark', // Default to dark
      toggleTheme: () => {
        const currentTheme = get().theme;
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        console.log('Explicitly switching theme from', currentTheme, 'to', nextTheme);
        set({ theme: nextTheme });
      },
      
      playgroundState: {
        query: 'SELECT * FROM users WHERE age > 25',
        tables: [
          {
            name: 'users',
            columns: ['id', 'name', 'age', 'city'],
            data: [
              { id: 1, name: 'Alice', age: 25, city: 'New York' },
              { id: 2, name: 'Bob', age: 30, city: 'London' },
              { id: 3, name: 'Charlie', age: 35, city: 'Tokyo' },
              { id: 4, name: 'David', age: 28, city: 'Paris' },
              { id: 5, name: 'Eve', age: 22, city: 'Berlin' },
            ]
          },
          {
            name: 'orders',
            columns: ['id', 'user_id', 'amount', 'status'],
            data: [
              { id: 101, user_id: 1, amount: 250, status: 'Completed' },
              { id: 102, user_id: 2, amount: 450, status: 'Pending' },
              { id: 103, user_id: 1, amount: 120, status: 'Completed' },
            ]
          }
        ]
      },
      setQuery: (query) => set((state) => ({ 
        playgroundState: { ...state.playgroundState, query } 
      })),
    }),
    {
      name: 'sql-cosmos-storage-v2', // New key to clear old state
    }
  )
);
