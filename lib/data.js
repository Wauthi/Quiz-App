export const questions = [
  {
    id: 1,
    question:
      "What will happen if you update state directly instead of using setState or the updater function?",
    options: [
      "React will re-render the component immediately",
      "The component will not re-render and state may become inconsistent",
      "React will throw a runtime error",
      "The state will reset to initial value",
    ],
    answer:
      "The component will not re-render and state may become inconsistent",
  },
  {
    id: 2,
    question:
      "Which hook is the correct way to manage a mutable reference that does not trigger a re-render on change?",
    options: ["useState", "useEffect", "useRef", "useCallback"],
    answer: "useRef",
  },
  {
    id: 3,
    question:
      "How can you optimize a React component that receives large arrays as props to avoid unnecessary re-renders?",
    options: [
      "Use React.memo with a custom comparison function",
      "Always clone the array before passing it",
      "Avoid using arrays as props",
      "Use useState instead of props",
    ],
    answer: "Use React.memo with a custom comparison function",
  },
  {
    id: 4,
    question: "What does React's key prop help with during rendering?",
    options: [
      "Styling elements uniquely",
      "Tracking elements identity to optimize reconciliation",
      "Handling click events",
      "Passing data to child components",
    ],
    answer: "Tracking elements identity to optimize reconciliation",
  },
  {
    id: 5,
    question:
      "In a functional component, how can you perform a side effect only once after the initial render?",
    options: [
      "useEffect with empty dependency array",
      "useEffect without dependencies",
      "useMemo with empty dependencies",
      "useState with initial value",
    ],
    answer: "useEffect with empty dependency array",
  },
  {
    id: 6,
    question:
      "What is the difference between controlled and uncontrolled components in React?",
    options: [
      "Controlled components manage their own state internally; uncontrolled components rely on props",
      "Controlled components' state is managed by React; uncontrolled components store data in the DOM",
      "There is no difference",
      "Controlled components use refs; uncontrolled components use state",
    ],
    answer:
      "Controlled components' state is managed by React; uncontrolled components store data in the DOM",
  },
  {
    id: 7,
    question: "What is the primary purpose of React's Context API?",
    options: [
      "To manage local component state",
      "To pass data deeply without prop drilling",
      "To replace Redux in all cases",
      "To optimize performance of lists",
    ],
    answer: "To pass data deeply without prop drilling",
  },
  {
    id: 8,
    question: "How does React's concurrent mode improve user experience?",
    options: [
      "By blocking rendering until all data is loaded",
      "By allowing React to interrupt rendering to handle urgent updates",
      "By making components load faster initially",
      "By rendering components only once",
    ],
    answer: "By allowing React to interrupt rendering to handle urgent updates",
  },
  {
    id: 9,
    question:
      "Which hook would you use to memoize a callback function to prevent unnecessary re-renders?",
    options: ["useMemo", "useCallback", "useEffect", "useReducer"],
    answer: "useCallback",
  },
  {
    id: 10,
    question:
      "What happens if you call a state setter function inside a useEffect hook without a dependency array?",
    options: [
      "The effect runs only once",
      "It causes an infinite loop of rendering",
      "The state does not update",
      "The component unmounts",
    ],
    answer: "It causes an infinite loop of rendering",
  },
];
