const langToggle = document.getElementById('langToggle');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');
const resultContent = document.getElementById('resultContent');
const wordOutput = document.getElementById('wordOutput');
const wordDefinition = document.getElementById('wordDefinition');
const mainTitle = document.getElementById('mainTitle');
const lblArEn = document.getElementById('lblArEn');
const lblEnAr = document.getElementById('lblEnAr');
const dictionaryContainer = document.getElementById('dictionaryContainer');
const resultBox = document.getElementById('resultBox');

let currentMode = 'ar-en';
let audioUrl = ""; 

// التبديل بين اللغات وعكس الاتجاهات
langToggle.addEventListener('change', () => {
    if (langToggle.checked) {
        currentMode = 'en-ar';
        document.body.style.direction = 'ltr';
        dictionaryContainer.className = "dictionary-container ltr-dir";
        searchInput.placeholder = "Type an English word & press Enter...";
        mainTitle.textContent = "Smart Dictionary";
        lblEnAr.classList.add('active');
        lblArEn.classList.remove('active');
    } else {
        currentMode = 'ar-en';
        document.body.style.direction = 'rtl';
        dictionaryContainer.className = "dictionary-container rtl-dir";
        searchInput.placeholder = "اكتب الكلمة العربية واضغط Enter...";
        mainTitle.textContent = "القاموس الذكي";
        lblArEn.classList.add('active');
        lblEnAr.classList.remove('active');
    }
    searchInput.value = '';
    resetResult();
});

// الاستماع لزر Enter لبدء البحث الفوري من الـ API
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let query = searchInput.value.trim();
        if (query === '') return;

        showLoader();

        if (currentMode === 'en-ar') {
            fetchEnglishWord(query.toLowerCase());
        } else {
            fetchArabicWord(query);
        }
    }
});

// 1. جلب بيانات الكلمات الإنجليزية (مع الصوت والأمثلة والقواعد)
async function fetchEnglishWord(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        const wordData = data[0];
        const definition = wordData.meanings[0].definitions[0].definition;
        const partOfSpeech = wordData.meanings[0].partOfSpeech;
        
        // العثور على ملف الصوت إن وجد
        const phoneticsWithAudio = wordData.phonetics.find(p => p.audio !== "");
        audioUrl = phoneticsWithAudio ? phoneticsWithAudio.audio : "";

        renderResult(wordData.word, definition, partOfSpeech, 'en');
    } catch (error) {
        showNotFound();
    }
}

// 2. جلب بيانات الكلمات العربية وترجمتها (باستخدام محرك ترجمة مجاني وسريع)
async function fetchArabicWord(word) {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=ar|en`);
        const data = await response.json();
        const translation = data.responseData.translatedText;

        if(translation === word || !translation) {
            throw new Error();
        }

        audioUrl = ""; // قواميس الترجمة الفورية لا تدعم نطق مباشر هنا، سنعتمد على متحدث المتصفح للغة العربية
        renderResult(word, translation, "اسم / فعل", 'ar');
    } catch (error) {
        showNotFound();
    }
}

// عرض النتيجة في الواجهة بشكل منسق
function renderResult(word, meaning, type, lang) {
    // بناء الهيكل الداخلي لصندوق النتيجة ديناميكياً لتفعيل الأزرار والمؤثرات
    resultBox.innerHTML = `
        <div class="word-header ${lang === 'en' ? 'ltr-dir' : 'rtl-dir'}">
            <div class="word-text">${word}</div>
            <button class="audio-btn" onclick="playAudio('${word}', '${lang}')" title="استمع">
                <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            </button>
        </div>
        <div class="word-details ${lang === 'en' ? 'ltr-dir' : 'rtl-dir'}">
            <span class="word-type">${type}</span>
            <div class="meaning-title">${lang === 'en' ? 'Meaning / Definition:' : 'الترجمة والمعنى:'}</div>
            <div class="meaning-text">${meaning}</div>
        </div>
    `;
}

// تشغيل الصوت (إما من الـ API أو عبر متحدث المتصفح الداخلي الذكي Text-to-Speech)
function playAudio(word, lang) {
    if (audioUrl && lang === 'en') {
        let audio = new Audio(audioUrl);
        audio.play();
    } else {
        // نطق صوتي ذكي عبر نظام التشغيل إذا لم يتوفر ملف صوتي جاهز
        let utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = lang === 'en' ? 'en-US' : 'ar-SA';
        window.speechSynthesis.speak(utterance);
    }
}

function showLoader() {
    resultBox.innerHTML = '<div class="loader"></div>';
}

function showNotFound() {
    resultBox.innerHTML = `<div class="empty-state">${currentMode === 'ar-en' ? "عذراً، لم نتمكن من العثور على الكلمة المطلوبة أو الترجمة." : "Sorry, we couldn't find definitions for this word."}</div>`;
}

function resetResult() {
    resultBox.innerHTML = `<div class="empty-state">${currentMode === 'ar-en' ? "اكتب الكلمة واضغط Enter واستمتع بالبحث الحي والصوت..." : "Type a word, hit Enter, and experience live lookup with audio..."}</div>`;
}
