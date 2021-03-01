class Word {

  constructor(word) {
    this.id = word.id;
    this.word = word.word;
    this.definition = word.definition;
    this.pos = word.pos;
    Word.wordsArray.push(this)
  }
  
  static wordDisplay = () => document.getElementById('word');
  static posDisplay = () => document.getElementById('word-pos');
  static definitionDisplay = () => document.getElementById('word-definition');
  static entryWord = () => document.getElementById('word-input');
  static wordWrapper = () => document.getElementById('word-wrapper');
  static wordBtn = () => document.getElementById('word-btn');
  static wordId = () => document.getElementById('word-id');
  

  static randomWord() {
    const currentWordIndex = Math.floor(Math.random() * Word.wordsArray.length)
    Word.wordDisplay().innerText = Word.wordsArray[currentWordIndex].word
    Word.posDisplay().innerText = 'Part of Speech: ' + Word.wordsArray[currentWordIndex].pos
    Word.definitionDisplay().innerText = 'Definition: ' + Word.wordsArray[currentWordIndex].definition
    Word.entryWord().innerText = Word.wordsArray[currentWordIndex].word
    Word.wordId().innerText = Word.wordsArray[currentWordIndex].id
    //Location.reload()
  }
}
  Word.wordsArray = [];

  // const wordsArray = { "words": [
  //  { 
  //    'headword': {
  //       'word' : 'Maca',
  //       'pos': 'noun',
  //       'definition': 'Red fruit that grows on a tree. Apple'
  //    }    
  //   },
  //   { 
  //     'headword': {
  //       'word' : 'Pessego',
  //       'pos': 'noun',
  //       'definition': 'Fuzzy fruit that is good in pies. Peach'
  //     }  
  //   },
  //   { 
  //     'headword': {
  //       'word' : 'Pera',
  //       'pos': 'noun',
  //       'definition': "Green fruit that's similar to an apple. Pear"  
  //   }},
  //   {
  //     'headword': {
  //       'word' : 'Ananas',
  //       'pos': 'noun',
  //       'definition': 'Tropical fruit with a big crown. Pineapple.'
  //     }
  //   }
  // ]
  // };
 

//we want to click a button
//randomWord to trigger
//grab a word from the array
//display this word in the div

//What should happen?  press a button to generate a word
//what is the cause?  click the button
//when should this happen? when the page loads

