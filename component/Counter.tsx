/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import counterSlice from '../ducks/counter/slice';
import { useCounterState } from '../ducks/counter/selector';
import { Button, Flex, Box } from '@chakra-ui/react';
import { asyncIncrementCounter } from '../ducks/counter/asyncActions';

const Counter: React.FC = () => {
  
  const dispatch = useDispatch()
  const state = useCounterState().counter

  const [count, setCount] = useState<number>(0)

  const handleIncrement = () => {
    dispatch(counterSlice.actions.incremented())
  }

  const handleDecrement = () => {
    dispatch(counterSlice.actions.decremented())
  }

  const handleAnyIncrement = () => {
    dispatch(counterSlice.actions.added(count))
  }

  const reset = () => {
    dispatch(counterSlice.actions.reset())
  }

  const inputCount = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(event.target.value));
  }, [setCount])

  const onClickAsyncIncrement = async () => {
    await dispatch(asyncIncrementCounter(10));
  }

  return (
    <Box>
      <Flex>
        <Button colorScheme="blue" onClick={handleIncrement}>CountUp</Button>
        <Button colorScheme="red" onClick={handleDecrement}>CountDown</Button>
      </Flex>
      <br />
      <input type="text" name="text" onChange={inputCount}></input>
      <button onClick={handleAnyIncrement}>any count you like</button>
      <br />
      <button onClick={reset}>reset</button><br/><br/>
      <button
        type="button"
        onClick={onClickAsyncIncrement}
        disabled={state.loading}
      >
        asyncronous countup
      </button>
      <h3>count of {state.count}</h3>
      {state.loading ? <p>通信中</p> : ''}
      {state.error ? (
        <p css={css`color: red; font-weight: bold`}>問題が発生しました。 {state.errorMessage}</p> 
      ) : (
        ''
      )}
    </Box>
  )
}

export default Counter