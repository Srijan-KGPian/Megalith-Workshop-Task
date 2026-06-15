const addButton = document.querySelector('#add_note');
const container = document.querySelector('.body_minus_header');
// const header = document.querySelector('.header');

const currentUser =
localStorage.getItem(
'currentUser'
);


// if not logged in
if(!currentUser){

window.location.href =
'login.html';

}

//update LocalStorage
const updateData = () => {
    const notes = [];
    document.querySelectorAll('.note').forEach((note) => {
        const heading = note.querySelector('.h1').value;
        const content = note.querySelector('.content').value;

        notes.push({
            heading: heading,
            content: content
        });
    });
    localStorage.setItem(`notes_${currentUser}`,JSON.stringify(notes));
};

// new note block
const addNewNote = (noteData = { heading: '', content: '' }) => {
    const note = document.createElement('div');
    note.classList.add('note');

    // const htmlData = `
    //     <div class="operation_title">
            // <div class="virtual_textarea_h1 hidden"></div>
    //         <textarea class="h1" placeholder="Heading">${noteData.heading}</textarea>
    //         <div class="notes_buttons">
    //             <button class="edit">
    //                 <i class="fas fa-edit"></i>
    //             </button>
    //             <button class="delete">
    //                 <i class="fas fa-trash-alt"></i>
    //             </button>
    //             <button class="size">
    //                 <i class="fa-solid fa-maximize"></i>
    //             </button>
    //         </div>
    //     </div>
        // <div class="virtual_textarea_content hidden"></div>
    //     <textarea class="content" placeholder="Content...">${noteData.content}</textarea>
    // `;


    const htmlData = `
        <div class="operation_title">
            <div class="virtual_textarea_h1 hidden"></div>
            <textarea class="h1" placeholder="Heading">${noteData.heading}</textarea>
            <div class="notes_buttons">
                <button class="edit">
                    <i class="fas fa-edit" id="edit"></i>
                </button>
                <button class="delete">
                    <i class="fas fa-trash-alt" id="delete"></i>
                </button>
                <button class="size">
                    <i class="fa-solid fa-maximize" id="size"></i>
                </button>
            </div>
        </div>
        <div class="virtual_textarea_content hidden"></div>
        <textarea class="content" placeholder="Content...">${noteData.content}</textarea>
    `;

    note.innerHTML = htmlData;


    // Buttons
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const sizeButton = note.querySelector('.size');



    // Content areas
    const textarea = note.querySelector('.content');
    const mainDiv = note.querySelector('.virtual_textarea_content');
    // Heading areas
    const headingTextarea = note.querySelector('.h1');
    const headingDiv = note.querySelector('.virtual_textarea_h1');


    // syncing the saved virtual preview content
    mainDiv.innerHTML = noteData.content.replaceAll('\n', '<br>');
    headingDiv.innerHTML = noteData.heading;


    // DELETE
    deleteButton.addEventListener('click', () => {
        note.remove();
        updateData();
    });




    // EDIT / SAVE WITH TOGGLE
    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
        headingDiv.classList.toggle('hidden');
        headingTextarea.classList.toggle('hidden');
    });





    // SIZE BUTTON & MODAL
    sizeButton.addEventListener('click', () => {
        const heading = headingTextarea.value || headingDiv.innerText;
        const content = textarea.value || mainDiv.innerText;

        // Put inside modal
        const modalHeading = document.querySelector('#modalHeading');
        const modalContent = document.querySelector('#modalContent');


        modalHeading.value = heading;
        modalContent.value = content;


        // Sync modal heading -> main note
        const syncHeading = () => {
            headingTextarea.value = modalHeading.value;
            headingDiv.innerHTML = modalHeading.value;
            updateData();
        };

        // Sync modal content -> main note
        const syncContent = () => {
            textarea.value = modalContent.value;
            mainDiv.innerHTML = modalContent.value.replaceAll('\n', '<br>');
            updateData();
        };

        // Remove old listeners to prevent duplicates and append fresh sync actions
        modalHeading.removeEventListener('input', modalHeading._handler || (() => {}));
        modalContent.removeEventListener('input', modalContent._handler || (() => {}));

        modalHeading.addEventListener('input', syncHeading);
        modalContent.addEventListener('input', syncContent);

        modalHeading._handler = syncHeading;
        modalContent._handler = syncContent;

        // Open modal
        const modal = new bootstrap.Modal(document.getElementById('noteModal'));
        modal.show();
    });

    // LIVE CONTENT UPDATE
    textarea.addEventListener('input', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value.replaceAll('\n', '<br>');
        updateData();
    });

    // LIVE HEADING UPDATE
    headingTextarea.addEventListener('input', (event) => {
        headingDiv.innerHTML = event.target.value;
        updateData(); 
    });

    container.insertBefore(note, addButton);
};

// LocalStorage
const notes =JSON.parse(localStorage.getItem(`notes_${currentUser}`));

if (notes) {
    notes.forEach((note) => addNewNote(note));
}

// ADD NEW BLANK NOTE
addButton.addEventListener('click', () => {
    addNewNote();
    updateData();
});


// SEARCH

const searchInput = document.querySelector('input[type="search"]');

searchInput.addEventListener('input', (event) => {
    //const query = event.target.value.toLowerCase();
    const query = event.target.value.toLowerCase().trim();
    const allNotes = document.querySelectorAll('.note');

    allNotes.forEach((note) => {
        const headingText = (note.querySelector('.h1').value || note.querySelector('.virtual_textarea_h1').innerText).toLowerCase();
        const contentText = (note.querySelector('.content').value || note.querySelector('.virtual_textarea_content').innerText).toLowerCase();

       
        if (headingText.includes(query) || contentText.includes(query)) {
            note.classList.remove('hide-note');
        } else {
            note.classList.add('hide-note');   
        }
    // })
    });
});


// Logout button

const logoutBtn =
document.getElementById(
'logoutBtn'
);

logoutBtn.addEventListener(
'click',
() => {

localStorage.removeItem(
'currentUser'
);

window.location.href =
'login.html';

});



// FEATURE NOT AVAILABLE TOAST(for profile and all)

const featureButtons =
document.querySelectorAll(
'.feature-btn'
);

const toastElement =
document.getElementById(
'featureToast'
);

const toast =
new bootstrap.Toast(
toastElement
);

featureButtons.forEach(
(button) => {

button.addEventListener(
'click',
(e) => {

e.preventDefault();

toast.show();

});

});