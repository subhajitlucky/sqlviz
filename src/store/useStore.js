import { create } from 'zustand';

export const useStore = create((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  
  currentPath: null,
  setCurrentPath: (path) => set({ currentPath: path }),
  
  playgroundState: {
    tables: [
      { 
        name: 'users', 
        columns: ['id', 'name', 'age', 'email'], 
        data: [
          { id: 1, name: 'Alice', age: 24, email: 'alice@cosmos.io' },
          { id: 2, name: 'Bob', age: 29, email: 'bob@cosmos.io' },
          { id: 3, name: 'Charlie', age: 31, email: 'charlie@cosmos.io' },
          { id: 4, name: 'David', age: 22, email: 'david@cosmos.io' },
          { id: 5, name: 'Eve', age: 27, email: 'eve@cosmos.io' }
        ]
      },
      { 
        name: 'orders', 
        columns: ['id', 'user_id', 'amount'], 
        data: [
          { id: 101, user_id: 1, amount: 250 },
          { id: 102, user_id: 1, amount: 450 },
          { id: 103, user_id: 2, amount: 150 },
          { id: 104, user_id: 5, amount: 300 }
        ]
      }
    ],
    query: 'SELECT * FROM users WHERE age > 25',
    executionSteps: [],
    isExecuting: false,
  },
  
  setQuery: (query) => set((state) => ({ 
    playgroundState: { ...state.playgroundState, query } 
  })),

  setIsExecuting: (isExecuting) => set((state) => ({
    playgroundState: { ...state.playgroundState, isExecuting }
  })),
  
  setExecutionSteps: (steps) => set((state) => ({
    playgroundState: { ...state.playgroundState, executionSteps: steps }
  })),
}));
