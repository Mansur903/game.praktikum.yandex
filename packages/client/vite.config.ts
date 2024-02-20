import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: Number(process.env.CLIENT_PORT) || 3000
	},
	define: {
		__SERVER_PORT__: process.env.SERVER_PORT
	},
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @import "./src/styles/vars.scss";
        `
			}
		}
	}
})
