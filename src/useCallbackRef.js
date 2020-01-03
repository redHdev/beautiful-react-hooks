import { useCallback, useRef } from 'react';

/**
 * Creates a callback reference that will live trough the component lifecycle.<br />
 * It returns the callback ref and a setter to change its value.<br />
 * The setter also makes sure the given callback is indeed a function, if not the callback ref won't change.<br />
 * Callback ref are quite useful when abstracting other custom hooks.

 * ### Usage in a custom hook:
 *
 * ```jsx harmony
 * const useSomething = () => {
 *   const [ callbackRef, setSomething ] = useCallbackRef();
 *
 *   useEffect(() => {
 *     if (callbackRef.current) {
 *       callbackRef.current();
 *     }
 *   }, [callbackRef]);
 *
 *   return setSomething;
 * }
 * ```
 *
 * ### Usage in a component:
 *
 * ```jsx harmony
 * const MyComponent = () => {
 *   const [ callbackRef, setCallbackRef ] = useCallbackRef();
 *
 *   setCallbackRef(() => console.log('A persistent callback'));
 *
 *   useEffect(callbackRef.current, []);
 *
 *   return (<div />)
 * }
 * ```
 */
const useCallbackRef = () => {
  const callbackRef = useRef();

  const setCallbackRef = useCallback((nextCallback) => {
    if (nextCallback !== callbackRef.current && typeof nextCallback === 'function') {
      callbackRef.current = nextCallback;
    }
  });

  return [callbackRef, setCallbackRef];
};

export default useCallbackRef;
