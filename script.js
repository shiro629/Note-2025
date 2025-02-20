const noteInput = document.getElementById("noteInput");
const imageInput = document.getElementById("imageInput");
const addNoteButton = document.getElementById("addNote");
const notesList = document.getElementById("notesList");

// تحميل الملاحظات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", loadNotes);

// عند الضغط على زر "إضافة ملاحظة"
addNoteButton.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    const imageFile = imageInput.files[0];

    if (noteText === "" && !imageFile) return;

    if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
            const imageData = reader.result;
            addNote(noteText, imageData);
            saveNoteToLocalStorage(noteText, imageData);
        };
    } else {
        addNote(noteText, null);
        saveNoteToLocalStorage(noteText, null);
    }

    noteInput.value = "";
    imageInput.value = "";
});

// وظيفة لإضافة ملاحظة جديدة إلى القائمة
function addNote(text, imageData) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    let noteContent = `<p>${text}</p>`;
    if (imageData) {
        noteContent += `<img src="${imageData}" alt="صورة الملاحظة">`;
    }
    noteContent += `<button class="delete-btn">حذف</button>`;

    noteDiv.innerHTML = noteContent;
    notesList.appendChild(noteDiv);

    // عند الضغط على زر الحذف
    noteDiv.querySelector(".delete-btn").addEventListener("click", () => {
        noteDiv.remove();
        removeNoteFromLocalStorage(text, imageData);
    });
}

// حفظ الملاحظة في التخزين المحلي
function saveNoteToLocalStorage(text, imageData) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ text, imageData });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// تحميل الملاحظات المحفوظة
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(note => addNote(note.text, note.imageData));
}

// إزالة الملاحظة من التخزين المحلي
function removeNoteFromLocalStorage(text, imageData) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.text !== text || note.imageData !== imageData);
    localStorage.setItem("notes", JSON.stringify(notes));
}