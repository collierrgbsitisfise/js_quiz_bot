
# TELEGRAM JS QUIZ BOT

[![CircleCI](https://circleci.com/gh/collierrgbsitisfise/js_quiz_bot.svg?style=svg)](https://circleci.com/gh/collierrgbsitisfise/js_quiz_bot)

### Questions(with answers) are parsed from next repo: https://github.com/lydiahallie/javascript-questions

##### Main flow

  - Get questions
  ![Alt text](docs/getQuestion.png?raw=true 'Title')
  - Select answer from provided variants
  ![Alt text](docs/getVariants.png?raw=true 'Title')
  - Receive correct answer with explanation
  ![Alt text](docs/answerWithExplanation.png?raw=true 'Title')

#### Requirements !

  - node >= 8.x
  - redis (is used to persist user answer), by default settings answer should be send in terms of 5 minutes

### Provide next env variabels

```sh
$ export botToken=<tokenValue> # bot token (https://tlgrm.ru/docs/bots)
$ export redisHost=<hostValue> # default fallback is 'localhost'
$ export redisPort=<porttValue> # default fallback is 6379
```

### Parse questions from .md[format] in .json[format]

  - provide valid .md 'data/js-questions.md' https://github.com/lydiahallie/javascript-questions
  - run parse command
    ```sh
    $ npm run parse-md-in-json
    ```

### Installation and run

```sh
$ npm i
$ npm run start:dev
```
