const dictionary = {
    "مرحبا": "𐺁𐺀𐺒𐺨",
    "كتاب": "𐺝𐺄𐺨𐺁",
    "مدرسة": "𐺡𐺦𐺝𐺄𐺀𐺁",
    "قلم": "Pen",
    "سيارة": "Car",
    "ماء": "Water",
    "شمس": "Sun",
    "قمر": "Moon",
    "بيت": "House",
    "طعام": "Food"
};

function translateWord() {
    const word = document.getElementById("wordInput").value.trim();
    const result = document.getElementById("result");

    if (dictionary[word]) {
        result.style.color = "green";
        result.innerHTML = الترجمة: ${dictionary[word]};
    } else {
        result.style.color = "red";
        result.innerHTML = "الكلمة غير موجودة في القاموس";
    }
}
