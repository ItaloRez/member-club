import { numberToOrdinal } from "../utils/numberToWords";

const userImage = document.getElementById("user-image");
const userName = document.getElementsByTagName("h1")[0];
const userSince = document.getElementById("user-since");

const historyCardList = document.getElementsByClassName("history-card-list")[0];
const historyQuantity = document.getElementById("history-quantity");

const cardId = document.getElementById("card-id");
const cardList = document.getElementsByClassName("card-content")[0];
const cardCutsNeeded = document.getElementById("cuts-needed");

const progressCutsRemaining = document.getElementById("cuts-remaining");
const progressCutsRemainingNumber = document.getElementById(
  "cuts-remaining-number"
);
const progressBarFill = document.getElementsByClassName("progress-bar-fill")[0];

export function loadClient(client) {
  loadUserInfos(client);
  loadHistory(client.appointmentHistory);
  cardId.textContent = `ID: ${client.id}`;
  loadCard(client.loyaltyCard);
  loadProgress(client.loyaltyCard);
}

function loadUserInfos(client) {
  userImage.src = `/src/assets/${client.id}.png`;
  userName.textContent = client.name;
  userSince.textContent = `Cliente desde ${client.clientSince}`;
}

function loadHistory(history) {
  historyCardList.innerHTML = "";
  historyQuantity.textContent = `${history.length} cortes`;

  history.forEach((card) => {
    const historyCard = document.createElement("div");
    historyCard.classList.add("history-card");

    const historyCardTitle = document.createElement("h3");
    historyCardTitle.textContent = card.date;

    const historyCardDescription = document.createElement("p");
    historyCardDescription.textContent = card.time;

    const checkIcon = document.createElement("img");
    checkIcon.src = "/src/assets/Check.svg";
    checkIcon.alt = "Check Icon";

    const container = document.createElement("div");

    container.appendChild(historyCardTitle);
    container.appendChild(historyCardDescription);

    historyCard.appendChild(container);
    historyCard.appendChild(checkIcon);

    historyCardList.appendChild(historyCard);
  });
}

function loadCard(card) {
  const cutsNeeded = card.cutsNeeded;
  const totalCuts = card.totalCuts;

  if (totalCuts === cutsNeeded) {
    alert("Parabéns! Seu próximo corte é gratuito!");
  }

  cardList.innerHTML = "";

  cardCutsNeeded.textContent = `Ao fazer cortes de cabelo, o ${numberToOrdinal(
    cutsNeeded
  )} sai de graça!`;

  for (let i = 0; i < cutsNeeded; i++) {
    const div = document.createElement("div");

    if (i < totalCuts) {
      const img = document.createElement("img");
      img.src = "/src/assets/PinCheck.png";
      img.alt = "";
      div.appendChild(img);
    } else if (i === cutsNeeded - 1) {
      const img = document.createElement("img");
      img.src = "/src/assets/GiftIcon.svg";
      img.alt = "";
      div.appendChild(img);
    } else {
      const anotherDiv = document.createElement("div");
      div.appendChild(anotherDiv);
    }

    cardList.appendChild(div);
  }
}

function loadProgress(progress) {
  const cutsRemaining = progress.cutsRemaining;
  const cutsNeeded = progress.cutsNeeded;
  const totalCuts = progress.totalCuts;
  const percentage = (totalCuts / cutsNeeded) * 100;

  console.log(percentage);

  progressCutsRemaining.textContent = `${cutsRemaining}`;
  progressCutsRemainingNumber.textContent = `${totalCuts} de ${cutsNeeded}`;

  progressBarFill.style.width = `${percentage}%`;
}
