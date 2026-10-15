document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.textContent = "☰";
    });
  });

  const toast = document.getElementById("toast");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2600);
  }

  const copyButton = document.getElementById("copySql");
  const sqlSnippet = document.getElementById("sqlSnippet");
  copyButton.addEventListener("click", async () => {
    const text = sqlSnippet.innerText;
    try {
      await navigator.clipboard.writeText(text);
      showToast("Exemplo SQL copiado para a área de transferência.");
    } catch (error) {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand("copy");
      area.remove();
      showToast(copied ? "Exemplo SQL copiado." : "Não foi possível copiar. Selecione o código manualmente.");
    }
  });

  const questions = [
    {
      question: "O que a Primeira Forma Normal (1FN) exige?",
      options: [
        "Que cada célula tenha um valor atômico, sem listas de valores repetidos.",
        "Que todas as tabelas tenham exatamente cinco colunas.",
        "Que não seja permitido usar chaves estrangeiras."
      ],
      correct: 0,
      explanation: "Correto! A 1FN busca valores atômicos e elimina grupos repetidos dentro de uma célula."
    },
    {
      question: "Quando uma tabela viola a ideia central da 2FN?",
      options: [
        "Quando possui uma chave primária simples.",
        "Quando um atributo não-chave depende apenas de parte de uma chave candidata composta.",
        "Quando uma coluna usa o tipo VARCHAR."
      ],
      correct: 1,
      explanation: "Isso mesmo. A 2FN remove dependências parciais de atributos não-chave em relação a chaves candidatas compostas."
    },
    {
      question: "Qual situação a 3FN procura evitar?",
      options: [
        "O uso de SELECT em consultas.",
        "A existência de uma chave primária.",
        "Dependências transitivas de atributos não-chave em relação à chave."
      ],
      correct: 2,
      explanation: "Correto! A 3FN trata dependências transitivas indevidas entre atributos não-chave."
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const item = questions[currentQuestion];
    const card = document.getElementById("quizCard");
    card.innerHTML = `
      <div class="quiz-progress">
        <span id="quizProgressLabel">PERGUNTA ${currentQuestion + 1} DE ${questions.length}</span>
        <div class="progress-track"><span id="quizProgressBar" style="width:${((currentQuestion + 1) / questions.length) * 100}%"></span></div>
      </div>
      <h3 id="questionText"></h3>
      <div id="answerOptions" class="answer-options"></div>
      <div id="quizFeedback" class="quiz-feedback" aria-live="polite"></div>
      <div class="quiz-controls">
        <span id="questionCounter">${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}</span>
        <button class="button button-primary" id="nextQuestion" disabled>${currentQuestion === questions.length - 1 ? "Ver resultado →" : "Próxima pergunta →"}</button>
      </div>`;
    document.getElementById("questionText").textContent = item.question;

    const optionsContainer = document.getElementById("answerOptions");
    item.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      const letter = document.createElement("span");
      letter.className = "option-letter";
      letter.textContent = String.fromCharCode(65 + index);
      const text = document.createElement("span");
      text.textContent = option;
      button.append(letter, text);
      button.addEventListener("click", () => selectAnswer(index));
      optionsContainer.appendChild(button);
    });

    document.getElementById("nextQuestion").addEventListener("click", () => {
      if (!answered) return;
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
      } else {
        renderResult();
      }
    });
    answered = false;
  }

  function selectAnswer(index) {
    if (answered) return;
    answered = true;
    const item = questions[currentQuestion];
    const buttons = [...document.querySelectorAll("#answerOptions .answer-option")];
    buttons.forEach((button, buttonIndex) => {
      button.disabled = true;
      if (buttonIndex === item.correct) button.classList.add("correct");
      if (buttonIndex === index && index !== item.correct) button.classList.add("incorrect");
    });

    const feedback = document.getElementById("quizFeedback");
    if (index === item.correct) {
      score++;
      feedback.textContent = item.explanation;
      feedback.classList.add("good");
    } else {
      feedback.textContent = `Não foi dessa vez. ${item.explanation}`;
      feedback.classList.add("bad");
    }
    document.getElementById("nextQuestion").disabled = false;
  }

  function renderResult() {
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById("quizCard").innerHTML = `
      <div class="quiz-result">
        <div class="result-icon" aria-hidden="true">${percentage >= 67 ? "✓" : "↻"}</div>
        <span class="panel-label">RESULTADO FINAL</span>
        <h3>Você acertou ${score} de ${questions.length} perguntas</h3>
        <p>${percentage >= 67 ? "Bom trabalho! Você já reconhece os fundamentos das formas normais." : "Continue estudando os exemplos de 1FN, 2FN e 3FN e tente novamente."}</p>
        <div class="progress-track"><span style="display:block;width:${percentage}%;height:100%;background:linear-gradient(90deg,var(--purple),var(--blue));"></span></div>
        <p><strong>${percentage}% de aproveitamento</strong></p>
        <button class="button button-primary" id="restartQuiz">Refazer quiz ↻</button>
      </div>`;
    document.getElementById("restartQuiz").addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      renderQuestion();
    });
  }

  renderQuestion();
});
