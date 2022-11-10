let fromLang = document.getElementById('from-lang');
let toLang = document.getElementById('to-lang');
let btnTranslate = document.getElementById('btnTranslate');
let fromText = document.getElementById('from-text');
let toText = document.getElementById('to-text');
let exchange = document.querySelector('.exchange');
let icons = document.querySelectorAll('.icons');

for(var lang in languages){
    // console.log(lang, languages[lang]);

    let option = `<option value="${lang}">${languages[lang]}</option> `;

    fromLang.insertAdjacentHTML('beforeend', option);
    toLang.insertAdjacentHTML('beforeend', option);

    fromLang.value = "az-AZ"; 
    toLang.value = "en-GB"; 
};

btnTranslate.addEventListener('click', function(){
    var text = fromText.value;
    var from = fromLang.value;
    var to = toLang.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;

    fetch(url)
        .then((response) => response.json())
        .then(data => {
            toText.value = data.responseData.translatedText
        });
});

exchange.addEventListener('click', () => {{
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;
    
    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang
}})

for(let icon of icons){
    icon.addEventListener('click', function(element) {
        if(element.target.classList.contains('fa-copy')){
            if(element.target.id == "from"){
               navigator.clipboard.writeText(fromText.value);
            } else{
                navigator.clipboard.writeText(toText.value);
            }
        } else{
            let utterance;
            if(element.target.id == "from"){
               utterance = new SpeechSynthesisUtterance(fromText.value);
               utterance.lang = fromLang.value;
            } else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance);
        }
    });

}