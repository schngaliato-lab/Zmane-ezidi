const langToggle = document.getElementById('langToggle');
const searchInput = document.getElementById('searchInput');
const mainTitle = document.getElementById('mainTitle');
const lblArEn = document.getElementById('lblArEn');
const lblEnAr = document.getElementById('lblEnAr');
const dictionaryContainer = document.getElementById('dictionaryContainer');
const resultBox = document.getElementById('resultBox');

let currentMode = 'ar-en'; 
let currentAudioUrl = ""; 

// التبديل الكلي للواجهات واللغات عند تغيير التوجيه
langToggle.addEventListener('change', () => {
    if (langToggle.checked) {
        currentMode = 'en-ar';
        dictionaryContainer.className = "dictionary-container ltr-dir";
        searchInput.placeholder = "Type an English word & press Enter...";
        mainTitle.textContent = "Smart Dictionary";
        lblEnAr.classList.add('active');
        lblArEn.classList.remove('active');
    } else {
        currentMode = 'ar-en';
        dictionaryContainer.className = "dictionary-container rtl-dir";
        searchInput.placeholder = "اكتب الكلمة العربية واضغط Enter...";
        mainTitle.textContent = "القاموس الذكي";
        lblArEn.classList.add('active');
        lblEnAr.classList.remove('active');
    }
    searchInput.value = '';
    resetResult();
});

// تشغيل عملية البحث فور الضغط على زر Enter
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

// جلب ترجمة الكلمات الإنجليزية الشاملة من الـ API
async function fetchEnglishWord(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        const wordData = data[0];
        const definition = wordData.meanings[0].definitions[0].definition;
        const partOfSpeech = wordData.meanings[0].partOfSpeech;
        
        // تصفية استخراج الملف الصوتي الخاص بالنطق
        const phoneticsWithAudio = wordData.phonetics.find(p => p.audio && p.audio !== "");
        currentAudioUrl = phoneticsWithAudio ? phoneticsWithAudio.audio : "";

        renderResult(wordData.word, definition, partOfSpeech, 'en');
    } catch (error) {
        showNotFound();
    }
}

// جلب معاني وترجمة الكلمات العربية عبر الـ API الفوري
async function fetchArabicWord(word) {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=ar|en`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        const translation = data.responseData.translatedText;

        if (!translation || translation.toLowerCase() === word.toLowerCase()) {
            throw new Error();
        }

        currentAudioUrl = ""; 
        renderResult(word, translation, "كلمة / لفظ", 'ar');
    } catch (error) {
        showNotFound();
    }
}

// بناء وعرض المكونات الإبداعية للنتائج بشكل منظم ومناسب للاتجاهين
function renderResult(word, meaning, type, lang) {
    const isEn = (lang === 'en');
    resultBox.innerHTML = `
        <div class="word-header ${isEn ? 'ltr-dir' : 'rtl-dir'}">
            <div class="word-text">${word}</div>
            <button class="audio-btn" id="playAudioBtn" title="${isEn ? 'Listen' : 'استمع'}">
                <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            </button>
        </div>
        <div class="word-details ${isEn ? 'ltr-dir' : 'rtl-dir'}">
            <span class="word-type">${type}</span>
            <div class="meaning-title">${isEn ? 'Meaning / Definition:' : 'الترجمة والمعنى المتوقع:'}</div>
            <div class="meaning-text">${meaning}</div>
        </div>
    `;

    // ربط الحدث بالزر ديناميكياً لتجنب مشاكل النطاق (Scope) في الملفات المنفصلة
    document.getElementById('playAudioBtn').addEventListener('click', () => {
        playAudio(word, lang);
    });
}

// معالجة النطق التلقائي للصوت
function playAudio(word, lang) {
    if (lang === 'en' && currentAudioUrl) {
        let audio = new Audio(currentAudioUrl);
        audio.play().catch(() => useSpeechSynthesis(word, lang));
    } else {
        useSpeechSynthesis(word, lang);
    }
}

// المساعد الاحتياطي للمتصفح لإنتاج صوت بشري دقيق
function useSpeechSynthesis(word, lang) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = (lang === 'en') ? 'en-US' : 'ar-SA';
        window.speechSynthesis.speak(utterance);
    }
}

function showLoader() {
    resultBox.innerHTML = '<div class="loader"></div>';
}

function showNotFound() {
    resultBox.innerHTML = `<div class="empty-state">${currentMode === 'ar-en' ? "عذراً، لم نتمكن من العثور على ترجمة هذه الكلمة. تحقق من الإملاء." : "Sorry, we couldn't find definitions for this word."}</div>`;
}

function resetResult() {
    resultBox.innerHTML = `<div class="empty-state">${currentMode === 'ar-en' ? "اكتب الكلمة واضغط Enter واستمتع بالبحث الحي الفوري المرفق بالصوت..." : "Type a word, hit Enter, and experience live lookup with audio..."}</div>`;
}

