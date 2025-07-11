import { useState, useEffect, useRef } from "react";
import { RefreshCcw, SkipBack, SkipForward, Check, X } from "lucide-react";
import { questions } from "../lib/data";

export default function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [timer, setTimer] = useState(30);
  const timerRef = useRef();

  const currentQuestion = questions[current];
  const selected = answers[currentQuestion.id];

  // Timer
  useEffect(() => {
    if (showSummary) return;
    setTimer(30);
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleNext(true); // auto-advance
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [current, showSummary]);

  const handleNext = (auto = false) => {
    if (!auto && !selected) return;
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleRestart = () => {
    setCurrent(0);
    setAnswers({});
    setShowSummary(false);
    setTimer(30);
  };

  const handleAnswer = (selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[current].id]: selectedOption,
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const isSummary = showSummary;

  return (
    <>
      <div
        className="flex flex-col md:flex-row h-screen"
        style={{ display: "flex", fontFamily: "sans-serif" }}>
        {/* Left Side */}
        <div
          className="w-full md:w-[50%] bg-cover bg-no-repeat bg-center relative overflow-hidden select-none"
          style={{}}>
          <div className="z-40 h-full w-full relative">
            <img
              src="/public/images/Rising Strength in Red.png"
              alt=""
              className="absolute w-full h-full object-cover scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 h-500 bg-gradient-to-t from-black/40 to-transparent z-500 pointer-events-none" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white z-50 cursor-default backdrop-blur-md backdrop-saturate-150 rounded-t-sm">
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-green-600 transition-all duration-700 ease-in-out rounded-full shadow-md"
                style={{
                  width: `${(answeredCount / questions.length) * 100}%`,
                }}
              />
            </div>
            <p className="text-center text-white text-sm md:text-base font-semibold tracking-wide uppercase mt-1">
              {answeredCount} / {questions.length} Questions Answered
            </p>
          </div>
        </div>
        <div className="w-full md:w-[65%] h-screen relative overflow-hidden">
          {/* Background Circles */}
          <div className="absolute rounded-full bg-indigo-500 opacity-50 w-40 h-40 top-16 left-16 z-0 filter blur-3xl" />
          <div className="absolute rounded-full bg-pink-500 opacity-40 w-64 h-64 bottom-4 right-22 z-0 filter blur-2xl" />
          <div className="absolute rounded-full bg-blue-400 opacity-40 w-32 h-32 top-[20%] right-1/4 z-0 filter blur-xl" />

          {/* <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-black opacity-50 z-20" /> */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-white/10 backdrop-blur-md" />
          <div className="relative flex flex-col h-full z-20 bg-gradient-to-br from-white via-slate-100 to-purple-100 shadow-xl backdrop-blur-md rounded-md overflow-y-auto p-6 md:p-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 select-none">
              <h1 className="text-4xl font-bold text-black cursor-default">
                Quiz App
              </h1>
              {/* Restart */}
              {!showSummary && (
                <button
                  onClick={handleRestart}
                  aria-label="Restart Quiz"
                  className="bg-red-500 text-white px-4 py-2 rounded-md border-none inline-flex items-center gap-2 hover:bg-red-600 transition-colors cursor-pointer select-none">
                  <RefreshCcw size={18} />
                  Restart Quiz
                </button>
              )}
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center mt-6 mb-6 cursor-default">
              {isSummary ? (
                <>
                  <h2 className="text-3xl font-bold mb-6 cursor-default select-none">
                    Quiz Summary
                  </h2>
                  <p className="text-lg mb-4 select-none">
                    You scored{" "}
                    <strong>
                      {
                        questions.filter((q) => answers[q.id] === q.answer)
                          .length
                      }{" "}
                      / {questions.length}
                    </strong>
                  </p>

                  <div className="max-w-xl w-full text-left space-y-6 mt-4">
                    {questions.map((q) => {
                      const userAnswer = answers[q.id];
                      const isCorrect = userAnswer === q.answer;
                      return (
                        <div
                          key={q.id}
                          className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 flex items-center justify-between">
                          <div>
                            <p className="font-semibold cursor-pointer select-none">
                              {q.id}. {q.question}
                            </p>
                            <p>
                              <strong>Your answer: </strong>
                              <span
                                className={
                                  isCorrect ? "text-green-600" : "text-red-600"
                                }>
                                {userAnswer || (
                                  <em className="text-gray-700 cursor-default select-none">
                                    Not Answered
                                  </em>
                                )}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-blue-600 cursor-default select-none">
                                <strong>Correct answer: </strong> {q.answer}
                              </p>
                            )}
                          </div>
                          {isCorrect ? (
                            <Check
                              size={24}
                              className="text-green-600 ml-4 flex-shrink-0"
                            />
                          ) : (
                            <X
                              size={24}
                              className="text-red-600 ml-4 flex-shrink-0"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  {/* Question Content and Timer*/}
                  <div className="flex flex-col max-w-[700px] gap-8 items-center justify-between mt-6 mb-8">
                    <h2 className="text-2xl font-semibold text-start cursor-default select-none">
                      {current + 1}: {questions[current].question}
                    </h2>

                    <div className="flex flex-col gap-5 w-full select-none">
                      {questions[current].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(opt)}
                          className={`focus:outline-none focus-ring-2 focus-ring-blue-500 py-3 rounded-md border border-gray-700 transition-colors duration-200 ${
                            selected === opt ? "bg-blue-200" : "bg-slate-50"
                          } hover:bg-blue-100 hover:border-blue-400 w-full text-left px-4 sm:px-6 cursor-pointer`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                    <div
                      role="status"
                      aria-live="polite"
                      className={`text-2xl font-extrabold text-black font-mono self-end mt-4 select-none ${
                        timer <= 5 ? "animate-ping ring-red-600" : ""
                      }`}>
                      {timer}
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-white-500 transition-all duration-500"
                        style={{ width: `${(timer / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Navigation */}
            <div
              className={`flex ${
                isSummary ? "justify-center" : "justify-between"
              }`}>
              {!isSummary && (
                <button
                  onClick={handlePrev}
                  aria-label="Previous Question"
                  disabled={current === 0}
                  className={` focus:outline-none focus-ring-2 focus-ring-blue-500 text-black px-4 py-2 rounded-md border-none flex items-center gap-2 transition-colors cursor-pointer select-none ${
                    current === 0
                      ? "bg-gray-300 text-black cursor-not-allowed"
                      : "bg-gray-400 text-black cursor-pointer hover:bg-gray-500"
                  }`}>
                  <SkipBack size={18} />
                  Previous
                </button>
              )}

              {
                !isSummary ? (
                  <button
                    onClick={handleNext}
                    aria-label={
                      current === questions.length - 1
                        ? "Finish Quiz"
                        : "Go to Next Question"
                    }
                    disabled={!selected}
                    className={`focus:outline-none focus-ring-2 focus-ring-blue-500 px-4 py-2 rounded-md border-none inline-flex items-center gap-2 transition-colors select-none ${
                      selected
                        ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                        : "bg-gray-300 text-gray-700 cursor-not-allowed"
                    }`}>
                    {current === questions.length - 1 ? "Finish" : "Next"}
                    <SkipForward size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md border-none inline-flex items-center gap-2  hover:bg-red-600 transition-colors cursor-pointer select-none">
                    <RefreshCcw size={18} />
                    You're Done! Restart Quiz
                  </button>
                )
                // : (
                //   <span className="bg-yellow-400 text-black px-4 py-2 rounded-md border-none hover:bg-yellow-500 transition-colors cursor-default">
                //     You're Done
                //   </span>
                // )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
