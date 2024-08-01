import React, { useState } from 'react';

const questions = [
  {
    question: "Qual é a capital da França?",
    options: ["Londres", "Berlim", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Marte", "Júpiter", "Saturno"],
    answer: "Júpiter"
  },
  {
    question: "Quem escreveu 'Dom Casmurro'?",
    options: ["Machado de Assis", "José de Alencar", "Carlos Drummond", "Clarice Lispector"],
    answer: "Machado de Assis"
  },
  {
    question: "Qual é a fórmula química da água?",
    options: ["CO2", "H2O", "O2", "N2"],
    answer: "H2O"
  },
  {
    question: "Em que ano o homem pisou na Lua?",
    options: ["1965", "1969", "1972", "1980"],
    answer: "1969"
  },
  {
    question: "Qual é o elemento mais abundante no universo?",
    options: ["Oxigênio", "Hidrogênio", "Carbono", "Hélio"],
    answer: "Hidrogênio"
  },
  {
    question: "Qual é o idioma oficial do Brasil?",
    options: ["Espanhol", "Inglês", "Português", "Francês"],
    answer: "Português"
  },
  {
    question: "Qual é o rio mais longo do mundo?",
    options: ["Amazonas", "Nilo", "Yangtzé", "Mississipi"],
    answer: "Nilo"
  },
  {
    question: "Quem pintou a Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "Qual é o país mais populoso do mundo?",
    options: ["Índia", "Estados Unidos", "Brasil", "China"],
    answer: "China"
  }
];

// const questions = [
//   {
//     question: "O que é o React?",
//     options: ["Biblioteca JavaScript", "Linguagem de Programação", "Framework CSS", "Banco de Dados"],
//     answer: "Biblioteca JavaScript"
//   },
//   {
//     question: "Qual hook é usado para gerenciar estado em um componente funcional?",
//     options: ["useState", "useEffect", "useContext", "useReducer"],
//     answer: "useState"
//   },
//   {
//     question: "Como você pode passar dados para um componente filho?",
//     options: ["Usando Props", "Usando State", "Usando Context", "Usando Reducers"],
//     answer: "Usando Props"
//   },
//   {
//     question: "Qual hook é usado para efeitos colaterais em componentes funcionais?",
//     options: ["useState", "useEffect", "useMemo", "useRef"],
//     answer: "useEffect"
//   },
//   {
//     question: "O que é JSX?",
//     options: ["Uma extensão de sintaxe para JavaScript", "Uma nova linguagem de programação", "Um banco de dados", "Um framework CSS"],
//     answer: "Uma extensão de sintaxe para JavaScript"
//   },
//   {
//     question: "Qual comando é usado para criar um novo projeto React?",
//     options: ["npx create-react-app", "npm init react-app", "npx init react", "npm create-react"],
//     answer: "npx create-react-app"
//   },
//   {
//     question: "Como você pode definir um estado inicial em um componente de classe?",
//     options: ["this.state", "this.setState", "useState", "useEffect"],
//     answer: "this.state"
//   },
//   {
//     question: "Qual hook é usado para acessar o valor mais recente de uma variável sem disparar uma re-renderização?",
//     options: ["useState", "useEffect", "useRef", "useMemo"],
//     answer: "useRef"
//   },
//   {
//     question: "Qual método do ciclo de vida é chamado após a montagem do componente?",
//     options: ["componentDidUpdate", "componentDidMount", "componentWillUnmount", "componentWillMount"],
//     answer: "componentDidMount"
//   },
//   {
//     question: "O que é um componente de ordem superior (HOC)?",
//     options: ["Uma função que toma um componente e retorna um novo componente", "Um hook que gerencia estado", "Um método de ciclo de vida", "Uma ferramenta de roteamento"],
//     answer: "Uma função que toma um componente e retorna um novo componente"
//   }
// ];

function Quizz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerOptionClick = (selectedOption) => {
    setSelectedAnswer(selectedOption);

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setAnswerHistory([...answerHistory, {
      question: questions[currentQuestion].question,
      selectedAnswer: selectedOption,
      correctAnswer: questions[currentQuestion].answer
    }]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      }, 3000); // Delay of 3 seconds before moving to the next question
    } else {
      setTimeout(() => {
        setShowScore(true);
      }, 3000);
    }
  };

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <p>Você acertou {score} de {questions.length} perguntas.</p>
          <h3>Histórico de Respostas:</h3>
          <ul>
            {answerHistory.map((entry, index) => (
              <li key={index}>
                {entry.question} - Sua resposta: {entry.selectedAnswer} - Resposta correta: {entry.correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Pergunta {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option)} disabled={selectedAnswer !== null}>
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <div className="feedback-section">
              {selectedAnswer === questions[currentQuestion].answer ? "Correto!" : "Errado!"}
              <p>A resposta correta é: {questions[currentQuestion].answer}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quizz;