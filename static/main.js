function openTab(evt, tabName) {
    const tabContent = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

function openSubTab(evt, subTabName) {
    const subTabContent = document.getElementsByClassName('sub-tab-content');
    for (let i = 0; i < subTabContent.length; i++) {
        subTabContent[i].style.display = 'none';
    }
    const subTabButtons = document.getElementsByClassName('sub-tab-button');
    for (let i = 0; i < subTabButtons.length; i++) {
        subTabButtons[i].className = subTabButtons[i].className.replace(' active', '');
    }
    document.getElementById(subTabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('tab-button')[0].click();
    document.getElementsByClassName('sub-tab-button')[0].click();
});

let bets = [];
let fibonacciSequence = [1, 1];
let fibonacciIndex = 1;
let initialStake = 1;
let customWinMove = -2;
let customLossMove = 1;

function addBet() {
    const stake = parseFloat(document.getElementById('stake').value);
    const odds = parseFloat(document.getElementById('odds').value);
    const result = document.getElementById('result').value;

    if (isNaN(stake) || isNaN(odds)) {
        alert('Please enter valid numbers.');
        return;
    }

    bets.push({ stake, odds, result });

    const betsList = document.getElementById('betsList');
    const betItem = document.createElement('div');
    betItem.classList.add('bet-item');
    betItem.innerText = `Stake: ${stake}, Odds: ${odds}, Result: ${result}`;
    betsList.appendChild(betItem);

    document.getElementById('roiForm').reset();
}

function calculateROI() {
    let totalStake = 0;
    let totalReturn = 0;

    bets.forEach(bet => {
        totalStake += bet.stake;
        if (bet.result === 'win') {
            totalReturn += bet.stake * bet.odds;
        }
    });

    const profit = totalReturn - totalStake;
    const roi = (profit / totalStake) * 100;

    document.getElementById('roiResult').innerText = `Return on Investment (ROI): ${roi.toFixed(2)}%`;
}

function calculateROIProbability() {
    const stake = parseFloat(document.getElementById('roiStake').value);
    const odds = parseFloat(document.getElementById('roiOdds').value);
    const winProbability = parseFloat(document.getElementById('roiWinProbability').value) / 100;

    if (isNaN(stake) || isNaN(odds) || isNaN(winProbability)) {
        document.getElementById('roiProbabilityResult').innerText = 'Please enter valid numbers.';
        return;
    }

    const impliedProbability = 1 / odds;
    const roiProbability = (winProbability * odds - 1) * 100;

    document.getElementById('roiProbabilityResult').innerText = `ROI Probability: ${roiProbability.toFixed(2)}%`;
}

function calculateBreakEven() {
    const odds = parseFloat(document.getElementById('breakEvenOdds').value);

    if (isNaN(odds)) {
        document.getElementById('breakEvenResult').innerText = 'Please enter valid numbers.';
        return;
    }

    const breakEvenPercentage = (1 / odds) * 100;
    document.getElementById('breakEvenResult').innerText = `Break-Even Percentage: ${breakEvenPercentage.toFixed(2)}%`;
}

function calculateNoVig() {
    const odds1 = parseFloat(document.getElementById('odds1').value);
    const odds2 = parseFloat(document.getElementById('odds2').value);

    if (isNaN(odds1) || isNaN(odds2)) {
        document.getElementById('noVigResult').innerText = 'Please enter valid numbers.';
        return;
    }

    const impliedProbability1 = 1 / odds1;
    const impliedProbability2 = 1 / odds2;
    const totalImpliedProbability = impliedProbability1 + impliedProbability2;

    const noVigProbability1 = (impliedProbability1 / totalImpliedProbability) * 100;
    const noVigProbability2 = (impliedProbability2 / totalImpliedProbability) * 100;

    document.getElementById('noVigResult').innerText = `No Vig Probability: ${noVigProbability1.toFixed(2)}% / ${noVigProbability2.toFixed(2)}%`;
}

function calculateKellyCriterion(multiplier = 1) {
    const bankroll = parseFloat(document.getElementById('bankroll').value);
    const betOdds = parseFloat(document.getElementById('betOdds').value);
    const winProbability = parseFloat(document.getElementById('winProbability').value) / 100;
    const fractionalKelly = parseFloat(document.getElementById('fractionalKelly').value);

    if (isNaN(bankroll) || isNaN(betOdds) || isNaN(winProbability) || isNaN(fractionalKelly)) {
        document.getElementById('kellyCriterionResult').innerText = 'Please enter valid numbers.';
        return;
    }

    const kellyFraction = (winProbability * (betOdds - 1) - (1 - winProbability)) / (betOdds - 1);
    const optimalBetSize = bankroll * kellyFraction * fractionalKelly * multiplier;

    let resultMessage = `Optimal Bet Size (${multiplier}x Kelly): ${optimalBetSize.toFixed(2)}`;
    if (optimalBetSize < 1) {
        resultMessage += ' - It is advised not to bet if the optimal bet size is less than 1.';
    }

    document.getElementById('kellyCriterionResult').innerText = resultMessage;
}

function calculateKellyCriterionWithScaling(multiplier) {
    const bankroll = parseFloat(document.getElementById('bankroll').value);
    const betOdds = parseFloat(document.getElementById('betOdds').value);
    const winProbability = parseFloat(document.getElementById('winProbability').value) / 100;
    const fractionalKelly = parseFloat(document.getElementById('fractionalKelly').value);

    if (isNaN(bankroll) || isNaN(betOdds) || isNaN(winProbability) || isNaN(fractionalKelly)) {
        document.getElementById('kellyCriterionResult').innerText = 'Please enter valid numbers.';
        return;
    }

    const kellyFraction = (winProbability * (betOdds - 1) - (1 - winProbability)) / (betOdds - 1);
    const optimalBetSize = bankroll * kellyFraction * fractionalKelly * multiplier;

    let resultMessage = `Optimal Bet Size (${multiplier}x Kelly): ${optimalBetSize.toFixed(2)}`;
    if (optimalBetSize < 1) {
        resultMessage += ' - It is advised not to bet if the optimal bet size is less than 1.';
    }

    document.getElementById('kellyCriterionResult').innerText = resultMessage;
}

function calculateFibonacciBet() {
    initialStake = parseFloat(document.getElementById('initialStake').value);
    const sequenceLength = parseInt(document.getElementById('sequenceLength').value);
    const result = document.getElementById('result').value;

    if (isNaN(initialStake) || isNaN(sequenceLength)) {
        document.getElementById('fibonacciResult').innerText = 'Please enter valid numbers.';
        return;
    }

    fibonacciSequence = [1, 1];
    for (let i = 2; i < sequenceLength; i++) {
        fibonacciSequence.push(fibonacciSequence[i - 1] + fibonacciSequence[i - 2]);
    }

    let betSize;
    if (result === 'win') {
        betSize = initialStake * (fibonacciSequence[sequenceLength - 3] || 1);
    } else {
        betSize = initialStake * fibonacciSequence[sequenceLength - 1];
    }

    fibonacciIndex = sequenceLength - 1;
    document.getElementById('fibonacciResult').innerText = `Next Bet Size: ${betSize.toFixed(2)}`;
}

function addFibonacciResult(result) {
    const mode = document.getElementById('mode').value;
    let winMove = customWinMove;
    let lossMove = customLossMove;

    if (mode === 'optimal') {
        winMove = -2;
        lossMove = 1;
    } else {
        winMove = parseInt(document.getElementById('winMove').value);
        lossMove = parseInt(document.getElementById('lossMove').value);
    }

    if (isNaN(winMove) || isNaN(lossMove)) {
        document.getElementById('fibonacciResult').innerText = 'Please enter valid numbers for custom moves.';
        return;
    }

    if (result === 'win') {
        fibonacciIndex = Math.max(fibonacciIndex - winMove, 1);
    } else {
        fibonacciIndex += lossMove;
    }

    while (fibonacciIndex >= fibonacciSequence.length) {
        fibonacciSequence.push(fibonacciSequence[fibonacciSequence.length - 1] + fibonacciSequence[fibonacciSequence.length - 2]);
    }

    const nextBetSize = initialStake * fibonacciSequence[fibonacciIndex];
    document.getElementById('fibonacciResult').innerText = `Next Bet Size: ${nextBetSize.toFixed(2)}`;
}

function toggleCustomMode() {
    const mode = document.getElementById('mode').value;
    const customModeFields = document.getElementsByClassName('custom-mode');
    for (let i = 0; i < customModeFields.length; i++) {
        customModeFields[i].style.display = mode === 'custom' ? 'block' : 'none';
    }
}

function addParlayLeg() {
    const parlayOddsContainer = document.getElementById('parlayOddsContainer');
    const legCount = parlayOddsContainer.getElementsByClassName('form-group').length + 1;

    const newLeg = document.createElement('div');
    newLeg.classList.add('form-group');
    newLeg.innerHTML = `
        <label for="parlayOdds${legCount}">Odds for Event ${legCount}:</label>
        <input type="number" id="parlayOdds${legCount}" name="parlayOdds${legCount}" step="0.01" inputmode="decimal" required>
    `;
    parlayOddsContainer.appendChild(newLeg);
}

function calculateParlayProbability() {
    const parlayOddsContainer = document.getElementById('parlayOddsContainer');
    const oddsInputs = parlayOddsContainer.getElementsByTagName('input');
    const parlayOdds = parseFloat(document.getElementById('parlayOdds').value);

    let combinedProbability = 1;
    for (let i = 0; i < oddsInputs.length; i++) {
        const odds = parseFloat(oddsInputs[i].value);
        if (isNaN(odds)) {
            document.getElementById('parlayResult').innerText = 'Please enter valid numbers.';
            return;
        }
        combinedProbability *= 1 / odds;
    }

    if (isNaN(parlayOdds)) {
        document.getElementById('parlayResult').innerText = 'Please enter valid numbers.';
        return;
    }

    const impliedParlayProbability = 1 / parlayOdds;
    const edge = (combinedProbability - impliedParlayProbability) * 100;

    document.getElementById('parlayResult').innerText = `Combined Probability: ${(combinedProbability * 100).toFixed(2)}%, Edge: ${edge.toFixed(2)}%`;
}