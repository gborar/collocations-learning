const collocations = {
    "make": ["make a decision", "make a cake", "make a mistake"],
    "take": ["take a break", "take a chance", "take a seat"],
    "do": ["do homework", "do the dishes", "do business"],
    "have": ["have a party", "have a baby", "have a good time"]
};

let currentWord = "";
let correctAnswer = "";
let score = 0;
let questionCount = 0;
const totalQuestions = 5;

function startPractice() {
    document.getElementById("question-area").style.display = "block";
    document.getElementById("score").innerText = `Score: ${score}`;
    loadQuestion();
}

function loadQuestion() {
    if (questionCount >= totalQuestions) {
        document.getElementById("question").innerText = "Practice Complete!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("feedback").innerText = `Final Score: ${score}/${totalQuestions}`;
        return;
    }

    const words = Object.keys(collocations);
    currentWord = words[Math.floor(Math.random() * words.length)];
    correctAnswer = collocations[currentWord][Math.floor(Math.random() * collocations[currentWord].length)];

    document.getElementById("question").innerText = `Which of the following is a correct collocation for '${currentWord}'?`;
    const options = generateOptions();
    displayOptions(options);
}

function generateOptions() {
    const otherWords = Object.keys(collocations).filter(word => word !== currentWord);
    const wrongOptions = [];

    while (wrongOptions.length < 2) {
        const wrongWord = otherWords[Math.floor(Math.random() * otherWords.length)];
        const wrongCollocation = collocations[wrongWord][Math.floor(Math.random() * collocations[wrongWord].length)];
        if (!wrongOptions.includes(wrongCollocation)) {
            wrongOptions.push(wrongCollocation);
        }
    }

    return [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
}

function displayOptions(options) {
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    options.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.innerText = option;
        optionElement.onclick = () => selectOption(optionElement);
        optionsDiv.appendChild(optionElement);
    });
}

function selectOption(selectedElement) {
    document.querySelectorAll(".option").forEach(option => option.classList.remove("selected"));
    selectedElement.classList.add("selected");
}

function checkAnswer() {
    const selectedOption = document.querySelector(".option.selected");
    const feedback = document.getElementById("feedback");

    if (selectedOption) {
        if (selectedOption.innerText === correctAnswer) {
            feedback.innerText = "Correct!";
            feedback.style.color = "green";
            score++;
        } else {
            feedback.innerText = `Wrong! The correct collocation is '${correctAnswer}'.`;
            feedback.style.color = "red";
        }
        questionCount++;
        document.getElementById("score").innerText = `Score: ${score}`;
        setTimeout(loadQuestion, 1000);
    } else {
        feedback.innerText = "Please select an option.";
        feedback.style.color = "orange";
    }
}
