import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  // base: '/ERP/',

  plugins: [react()],
});

// export default defineConfig({
//   plugins: [react({
//     include: "**/*.jsx",
//   })]
// })
