// DOM
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newGameBtn = document.querySelector("#newbtn");
const msgContainer = document.querySelector(".msgcontainer");
const msg = document.querySelector("#msg");

let turn0 = true; 
let gameOver = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]           
];


boxes.forEach((box, idx) => {
  box.addEventListener("click", () => {
    if (gameOver) return;
    if (box.disabled) return;

    box.innerText = turn0 ? "O" : "X";
    box.disabled = true;

    
    checkWinOrDraw();

    if (!gameOver) turn0 = !turn0;
  });
});

const resetGame = () => {
  turn0 = true;
  gameOver = false;
  hideMessage();
  enableBoxes();
};

const enableBoxes = () => {
  boxes.forEach(b => {
    b.disabled = false;
    b.innerText = "";
  });
};

const disableBoxes = () => {
  boxes.forEach(b => b.disabled = true);
};

const showWinner = (winnerText) => {
  msg.innerText = winnerText;
  msgContainer.classList.remove("hide");
  disableBoxes();
  gameOver = true;
};

const hideMessage = () => {
  msgContainer.classList.add("hide");
};

// check for win or draw
const checkWinOrDraw = () => {

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const valA = boxes[a].innerText;
    const valB = boxes[b].innerText;
    const valC = boxes[c].innerText;

    if (valA !== "" && valA === valB && valB === valC) {
      showWinner(`Bravo! The winner is ${valA}`);
      return;
    }
  }
  const allFilled = Array.from(boxes).every(box => box.innerText !== "");
  if (allFilled) {
    showWinner("It's a Draw!");
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


hideMessage();
