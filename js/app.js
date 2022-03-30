let userMove = [
  {
    title: "rock",
    image: "images/rock2.png",
  },
  {
    title: "scissors",
    image: "images/scissors2.png",
  },
  {
    title: "paper",
    image: "images/paper2.png",
  },
];

let pcMove = [
  {
    title: "rock",
    image: "images/rock1.png",
  },
  {
    title: "scissors",
    image: "images/scissors1.png",
  },
  {
    title: "paper",
    image: "images/paper1.png",
  },
];

let $ = document;

const rockUser = $.querySelector(".rock-user");
const scissorsUser = $.querySelector(".scissors-user");
const paperUser = $.querySelector(".paper-user");
const userImage = $.querySelector(".user-image");
const pcImage = $.querySelector(".pc-image");
const scoreUser = $.querySelector(".score-user");
const scoreTies = $.querySelector(".score-ties");
const scorePc = $.querySelector(".score-pc");
const startBaner = $.querySelector(".start-images");
const startGameButton = $.querySelector(".start-game");
const rounds = $.querySelector(".rounds-result");
const sound = $.querySelector("audio");
const mute_Music = $.querySelector(".mute-music");
const arrow_Mute = $.querySelector(".arrow");
let mute = $.getElementById("mute");

let userTitle;
let counterUser = 0;
let counterPc = 0;
let counterTies = 0;
let counterRound = 0;
let isMute = false;

function timeToPcMove() {
  setTimeout(function () {
    let randomImagePc = Math.floor(Math.random() * pcMove.length);

    let randomTitle = pcMove[randomImagePc].title;
    pcImage.setAttribute("src", pcMove[randomImagePc].image);
    counterRound++;

    if (userTitle === randomTitle) {
      counterTies++;
      scoreUpdateHandler();
    }

    if (
      (userTitle === "rock" && randomTitle === "scissors") ||
      (userTitle === "paper" && randomTitle === "rock") ||
      (userTitle === "scissors" && randomTitle === "paper")
    ) {
      counterUser++;
      scoreUpdateHandler();
    }

    if (
      (userTitle === "rock" && randomTitle === "paper") ||
      (userTitle === "paper" && randomTitle === "scissors") ||
      (userTitle === "scissors" && randomTitle === "rock")
    ) {
      counterPc++;
      scoreUpdateHandler();
    }
  }, 300);
}

function scoreUpdateHandler() {
  scoreTies.innerHTML = counterTies;
  scorePc.innerHTML = counterPc;
  scoreUser.innerHTML = counterUser;
  rounds.innerHTML = counterRound;

  if (counterUser > counterPc) {
    scoreUser.style.color = "#00a10d";
    scorePc.style.color = "#ff0000";
  } else if (counterUser < counterPc) {
    scorePc.style.color = "#00a10d";
    scoreUser.style.color = "#ff0000";
  } else {
    scorePc.style.color = "#3381ff";
    scoreUser.style.color = "#3381ff";
  }
}

rockUser.addEventListener("click", function () {
  userImage.setAttribute("src", userMove[0].image);
  userTitle = userMove[0].title;
  sound.play();
  timeToPcMove();
});
scissorsUser.addEventListener("click", function () {
  userImage.setAttribute("src", userMove[1].image);
  userTitle = userMove[1].title;
  sound.play();
  timeToPcMove();
});
paperUser.addEventListener("click", function () {
  userImage.setAttribute("src", userMove[2].image);
  userTitle = userMove[2].title;
  sound.play();
  timeToPcMove();
});

startGameButton.addEventListener("click", function () {
  startBaner.classList.add("play");
});

function muteMusicHandler() {
  mute_Music.classList.toggle("show-mute");
  arrow_Mute.classList.toggle("arrow-class");
}

function muteHandler() {
  if (!isMute) {
    mute.className = "fas fa-volume-mute";
    sound.muted = true;
    navigator.vibrate(200)
    isMute = true;
  } else {
    mute.className = "fas fa-volume-up";
    sound.muted = false;
    isMute = false;
  }
  mute_Music.classList.remove("show-mute");
  arrow_Mute.classList.remove("arrow-class");
}

arrow_Mute.addEventListener("click", muteMusicHandler);
mute.addEventListener("click", muteHandler);
