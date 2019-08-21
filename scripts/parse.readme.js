const fs = require('fs');

const markDownData = String(fs.readFileSync('js-questions.md'));

const data = markDownData.split('---');

const regExpForJSCode = /\```javascript\n(((?:\r|\n|.)+))\```/g
const regExpForQuestion = /[\.\s](((?:\r|.)+))\n/g;
const regExpDetailsText = /<details>(((?:\r|\n|.)+))<\/details>/g;
const regExpasnwerEXplanation = /<p>(((?:\r|\n|.)+))<\/p>/g;

data.shift();

const parsed = data.map(d => {
    const matchQuestion = d.match(regExpForQuestion);
    const matchesJSCODE = d.match(regExpForJSCode);

    const dataSplitedByNewLine = d.split('\n');
    const answerVariants = dataSplitedByNewLine.filter(line => {
        const regExp = new RegExp("^(- [A|B|C|D])", "i");
        return regExp.test(line);
    });

    console.log('Answer variants');
    console.log(answerVariants);

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

fs.writeFileSync('quizaData.json', JSON.stringify(parsed));
