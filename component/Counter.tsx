import { useDispatch, useSelector } from 'react-redux'
import counterSlice from '../ducks/counter/slice';
import { CounterState } from '../ducks/counter/slice';
import { useCounterState } from '../ducks/counter/selector';
import { Button, Flex, Box } from '@chakra-ui/react';

const Counter: React.FC = () => {
  
  const dispatch = useDispatch()
  const state = useCounterState().counter

  const handleIncrement = () => {
    dispatch(counterSlice.actions.incremented())
  }

  const handleDecrement = () => {
    dispatch(counterSlice.actions.decremented())
  }

  return (
    <Box>
      <Flex>
        <Button colorScheme="blue" onClick={handleIncrement}>CountUp</Button>
        <Button colorScheme="red" onClick={handleDecrement}>CountDown</Button>
      </Flex>
      <h3>count of {state.count}</h3>
    </Box>
  )
}

export default Counter