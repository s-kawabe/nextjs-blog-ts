import { createAsyncThunk } from '@reduxjs/toolkit'

const sleep = (microSecond: number) => {
  // Promiseオブジェクトを返す
  // resolve：処理
  // microSecond：遅らせる時間
  return new Promise((resolve) => setTimeout(resolve, microSecond))
}

// 非同期のAction これをcreateSliceのextraReducersで使用する。
export const asyncIncrementCounter = createAsyncThunk<number, number>(
  'counter/asyncINcrementCounter',
  async (arg: number): Promise<number> => {
    await sleep(1000)

    // エラーが起きた時の動きを確認する為、一定確率でエラーが起きるようにする
    const randNum = Math.floor(Math.random() * Math.floor(10));
    if(randNum == 0 || randNum == 5 || randNum == 1) {
      return Promise.reject(new Error('asyncIncrementCounter Error!'))
    }

    return arg;
  }
)
