import { configureStore } from '@reduxjs/toolkit'
import userReducer from './entities/user/model'

export default configureStore({
  reducer: {
    user: userReducer
  }
})
