import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Posts } from '../../pages/index';

export type ArticleState = Posts[]

export const initialState: {article: ArticleState} ={
  article: [{
    id: '',
    title: '',
    date: ''
  }]
}


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setAllPosts: (state, action: PayloadAction<Posts[]>) => ({
      ...state,
      article: [...action.payload]
    }) 
  },
  // 記事の取得処理は非同期じゃなかった！
  // extraReducers: (builder) => {
  //   builder.addCase()
  // }
})

export default postsSlice