import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import counterSlice from '../ducks/counter/slice';
import { useCounterState } from '../ducks/counter/selector';
import { Button, Flex, Box } from '@chakra-ui/react';

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
      <button onClick={reset}>reset</button>
      <h3>count of {state.count}</h3>
    </Box>
  )
}

export default Counter