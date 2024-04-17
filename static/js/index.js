// 문제 정답
const answer = "APPLE";

// 색상
const green_color = "#6AAA64"; // 위치와 글자가 맞았을 경우 색깔
const yellow_color = "#C9B458"; // 글자만 맞을 경우
const gray_color = "#787C7E"; // 둘 다 아닌 경우

// 인덱스
let column = 0; // 세로 인덱스
let row = 0; // 가로 인덱스

// 게임 시작
function appStart() {
  // enter키를 입력했을 때
  const handleEnterKey = () => {
    // 맞은 개수
    let answer_count = 0;

    // 정답확인
    for (let i = 0; i < answer.length; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${column}${i}']`
      );
      console.log(block);

      const input_text = block.innerText; // 입력한 글자
      const answer_text = answer[i]; // 정답 글자

      // 위치와 글자가 맞을 경우 : 초록색 표시
      if (input_text === answer_text) {
        changeBlock(block, answer_text, green_color);
        answer_count++;
      }
      // 글자만 맞을 경우
      else if (answer.includes(input_text))
        changeBlock(block, answer_text, yellow_color);
      // 모두 틀린 경우
      else changeBlock(block, answer_text, gray_color);
    }

    // 종료 여부 확인
    if (answer_count === answer.length)
      gameover(); // 모두 정답일 경우 게임 종료
    else {
      animation(); // 오답 애니메이션
      nextLine(); // 다음줄 이동
    }
  };

  // 색상 변경
  const changeBlock = (block, answer_text, color) => {
    block.style.background = color; // 입력한 곳의 색깔 변경
    block.style.border = `3px solid ${color}`; // 입력한 곳의 색깔 변경
    block.style.color = "white";

    const key_block = document.querySelector(
      `.key-row__block[data-key='${answer_text}']`
    );
    key_block.style.background = `${color}`; // 자판의 색깔 변경
    key_block.style.border = `3px solid ${color}`; // 자판의 색깔 변경
  };

  // 다음 줄 이동
  const nextLine = () => {
    if (column === 6) gameover(); // 게임 종료

    column++;
    row = 0;
  };

  // 게임 종료
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
  };

  // 게임종료 화면
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content: center; align-items:center; position:absolute; top:40vh; left:45vw; background:white; heigth:30px";
    document.body.appendChild(div);
  };

  // 오답 시 흔들리는 애니메이션
  const animation = () => {
    const block = document.querySelector(`.board-row.row-${column}`);
    block.style.animationName = "shake"; // 애니메이션 이름 설정
    block.style.animationDuration = "0.5s"; // 애니메이션 지속 시간 설정
    block.style.animationTimingFunction = "ease-in-out"; // 애니메이션 타이밍 함수 설정
  };

  // backspace를 누른 경우(글자 지우기)
  const handleBackSpace = () => {
    if (row > 0) row--;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${column}${row}']`
    );
    thisBlock.innerText = ""; // 입력한 칸에 알파벳 입력
  };

  // 키입력
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase(); // 입력한 키(대문자로 변경)
    const keyCode = event.keyCode;

    if (key === "BACKSPACE") handleBackSpace(); // backspace를 누른 경우
    else if (row === 5) {
      if (event.key === "Enter") handleEnterKey(); // enter키를 눌렀을 경우
      else return; // 5번째 위치에서는 동작 X
    } else if (keyCode >= 65 && keyCode <= 90) {
      // 알파벳을 입력한 경우
      const thisBlock = document.querySelector(
        `.board-column[data-index='${column}${row}']`
      );
      thisBlock.innerText = key; // 입력한 칸에 알파벳 입력
      row += 1;
    }
  };

  // 마우스 입력
  const handleClick = (event) => {
    const key = event.target.innerText;

    if (event.target.classList.contains("key-row__wide-block-img"))
      handleBackSpace(); // backspace를 누른 경우
    else if (row === 5) {
      if (key === "ENTER") handleEnterKey(); // enter키를 눌렀을 경우
      else return; // 5번째 위치에서는 동작 X
    } else if (key.length === 1) {
      // 알파벳을 입력한 경우
      const thisBlock = document.querySelector(
        `.board-column[data-index='${column}${row}']`
      );
      thisBlock.innerText = key[0]; // 입력한 칸에 알파벳 입력
      row += 1;
    }
  };

  window.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleClick);
}

appStart();
