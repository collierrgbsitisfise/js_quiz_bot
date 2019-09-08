const fs = require('fs');
const path = require('path');

const pathToREADME = path.join(__dirname, '/../data/js-questions.md');
const pathToJSON = path.join(__dirname, '/../data/quizaData.json');
const markDownData = String(fs.readFileSync(pathToREADME));

const data = markDownData.split('---');

const regExpForJSCode = /\```(javascript|html)\n(((?:\r|\n|.)+))\```/g
const regExpForQuestion = /[\.\s](((?:\r|.)+))\n/g;
const regExpDetailsText = /<details>(((?:\r|\n|.)+))<\/details>/g;
const regExpasnwerEXplanation = /<p>(((?:\r|\n|.)+))<\/p>/g;
const regExpToGetPartBetweenQuestionAndAnswer = /######(((?:\r|\n|.)+))Answer:/g

data.shift();

const parsed = data.map((d, idx) => {
    const matchQuestion = d.match(regExpForQuestion);
    const textBetweenQuestionAndAnswer = d.match(regExpToGetPartBetweenQuestionAndAnswer);
    console.log(textBetweenQuestionAndAnswer);
    const matchesJSCODE = textBetweenQuestionAndAnswer[0].match(regExpForJSCode);

    if (idx === 58) {
        console.log(matchesJSCODE);
    }
    const dataSplitedByNewLine = d.split('\n');
    const answerVariants = dataSplitedByNewLine.filter(line => {
        const regExp = new RegExp("^(- [A|B|C|D])", "i");
        return regExp.test(line);
    });

    const matchAnseer = dataSplitedByNewLine.filter(line => line.includes('Answer:'));
    const detailsText = d.match(regExpDetailsText);
    const answerExplanation = detailsText[0].match(regExpasnwerEXplanation);

    return {
        answerVariants,
        question: matchQuestion[0],
        jsCode: matchesJSCODE && matchesJSCODE[0],
        answer: matchAnseer[0],
        explanation: answerExplanation[0],
    }

});

fs.writeFileSync(pathToJSON, JSON.stringify(parsed));
