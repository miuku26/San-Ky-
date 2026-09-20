document.addEventListener('DOMContentLoaded', () => {

    const MAX_MEMORIES = 4;

    const uploadBox = document.getElementById('uploadBox');
    const uploadCount = document.getElementById('uploadCount');
    const fileInput = document.getElementById('fileInput');
    const slots = [...document.querySelectorAll('.memory-slot')];

    const memoryModal = document.getElementById('memoryModal');
    const modalImage = document.getElementById('modalImage');
    const memoryTitle = document.getElementById('memoryTitle');
    const memoryNote = document.getElementById('memoryNote');
    const modalClose = document.getElementById('modalClose');
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const removePhotoBtn = document.getElementById('removePhotoBtn');
    const saveMemoryBtn = document.getElementById('saveMemoryBtn');

    const continueBtn = document.getElementById('continueBtn');

    const memoryField = document.getElementById('memoryField');
    const floatingMemories = document.getElementById('floatingMemories');
    const backArchiveBtn = document.getElementById('backArchiveBtn');
    const addMemoryBtn = document.getElementById('addMemoryBtn');
    const fieldContinueBtn = document.getElementById('fieldContinueBtn');

    const viewer = document.getElementById('viewer');
    const viewerImage = document.getElementById('viewerImage');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerNote = document.getElementById('viewerNote');
    const viewerClose = document.getElementById('viewerClose');

    const customMealPhoto = document.getElementById('customMealPhoto');
    const customMealImage = document.getElementById('customMealImage');

    let memories = [];
    let editingIndex = null;
    let draftImage = null;
    let replaceMode = false;

    const positions = [
        {
            x: '50%',
            y: '20%',
            size: '310px',
            rx: '1deg',
            ry: '-3deg',
            rz: '-2deg',
            duration: '9.4s',
            delay: '-2s',
            z: 15,
            center: true
        },
        {
            x: '14%',
            y: '31%',
            size: '260px',
            rx: '-2deg',
            ry: '5deg',
            rz: '3deg',
            duration: '10s',
            delay: '-4s',
            z: 10
        },
        {
            x: '69%',
            y: '27%',
            size: '265px',
            rx: '2deg',
            ry: '-5deg',
            rz: '-3deg',
            duration: '8.8s',
            delay: '-6s',
            z: 11
        },
        {
            x: '39%',
            y: '55%',
            size: '245px',
            rx: '-2deg',
            ry: '4deg',
            rz: '2deg',
            duration: '9s',
            delay: '-7s',
            z: 13
        }
    ];

    loadCustomMealPhoto();

    memories = [];

    try {
        localStorage.removeItem('san-memories');
    } catch (error) {
        console.warn(error);
    }

    renderSlots();

    function loadCustomMealPhoto() {

        if (!customMealPhoto || !customMealImage) {
            return;
        }

        try {

            const savedMealPhoto =
                localStorage.getItem('archiveMealPhoto');

            if (!savedMealPhoto) {
                customMealPhoto.hidden = true;
                return;
            }

            customMealImage.src = savedMealPhoto;
            customMealPhoto.hidden = false;

        } catch (error) {

            customMealPhoto.hidden = true;

        }

    }

    if (customMealPhoto) {

        customMealPhoto.addEventListener('click', () => {

            if (!customMealImage.src) {
                return;
            }

            openViewer({
                image: customMealImage.src,
                title: 'My meal',
                note: ''
            });

        });

    }

    uploadBox.addEventListener('click', () => {

        if (memories.length >= MAX_MEMORIES) {
            return;
        }

        editingIndex = null;
        replaceMode = false;

        fileInput.value = '';
        fileInput.multiple = true;
        fileInput.click();

    });

    uploadBox.addEventListener('dragover', event => {

        event.preventDefault();

        if (memories.length < MAX_MEMORIES) {
            uploadBox.classList.add('is-dragging');
        }

    });

    uploadBox.addEventListener('dragleave', () => {

        uploadBox.classList.remove('is-dragging');

    });

    uploadBox.addEventListener('drop', async event => {

        event.preventDefault();

        uploadBox.classList.remove('is-dragging');

        if (memories.length >= MAX_MEMORIES) {
            return;
        }

        const files =
            [...event.dataTransfer.files]
                .filter(file =>
                    file.type.startsWith('image/')
                );

        await addMultipleImages(files);

    });

    fileInput.addEventListener('change', async () => {

        const files =
            [...fileInput.files]
                .filter(file =>
                    file.type.startsWith('image/')
                );

        if (!files.length) {
            return;
        }

        if (
            replaceMode &&
            editingIndex !== null
        ) {

            try {

                const image =
                    await compressImage(files[0]);

                draftImage = image;
                modalImage.src = image;

            } catch (error) {

                console.error(error);

            }

            replaceMode = false;
            fileInput.multiple = true;
            fileInput.value = '';

            return;
        }

        await addMultipleImages(files);

        fileInput.value = '';

    });

    slots.forEach(slot => {

        slot.addEventListener('click', () => {

            const index =
                Number(slot.dataset.index);

            if (memories[index]) {

                openExistingMemory(index);
                return;

            }

            if (memories.length >= MAX_MEMORIES) {
                return;
            }

            editingIndex = null;
            replaceMode = false;

            fileInput.value = '';
            fileInput.multiple = true;
            fileInput.click();

        });

    });

    modalClose.addEventListener(
        'click',
        closeModal
    );

    document
        .querySelectorAll('[data-close-modal]')
        .forEach(element => {

            element.addEventListener(
                'click',
                closeModal
            );

        });

    changePhotoBtn.addEventListener('click', () => {

        if (editingIndex === null) {
            return;
        }

        replaceMode = true;

        fileInput.value = '';
        fileInput.multiple = false;
        fileInput.click();

    });

    removePhotoBtn.addEventListener('click', () => {

        if (editingIndex === null) {

            closeModal();
            return;

        }

        memories.splice(
            editingIndex,
            1
        );

        renderSlots();
        closeModal();

    });

    saveMemoryBtn.addEventListener('click', () => {

        if (
            editingIndex === null ||
            !draftImage
        ) {
            return;
        }

        memories[editingIndex] = {
            image: draftImage,
            title: memoryTitle.value.trim(),
            note: memoryNote.value.trim()
        };

        renderSlots();
        closeModal();

    });


    backArchiveBtn.addEventListener('click', () => {

        memoryField.classList.remove('is-active');

        document.body.style.overflow = '';

        document
            .getElementById('shareSection')
            .scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

    });

    addMemoryBtn.addEventListener('click', () => {

        memoryField.classList.remove('is-active');

        document.body.style.overflow = '';

        document
            .getElementById('shareSection')
            .scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

    });

    fieldContinueBtn.addEventListener('click', () => {

        goToNextScene();

    });

    viewerClose.addEventListener(
        'click',
        closeViewer
    );

    document
        .querySelectorAll('[data-close-viewer]')
        .forEach(element => {

            element.addEventListener(
                'click',
                closeViewer
            );

        });

    document.addEventListener('keydown', event => {

        if (event.key !== 'Escape') {
            return;
        }

        if (
            viewer.classList.contains('is-open')
        ) {

            closeViewer();
            return;

        }

        if (
            memoryModal.classList.contains('is-open')
        ) {

            closeModal();

        }

    });

    async function addMultipleImages(files) {

        if (!files.length) {
            return;
        }

        const remaining =
            MAX_MEMORIES -
            memories.length;

        if (remaining <= 0) {
            return;
        }

        const selectedFiles =
            files.slice(
                0,
                remaining
            );

        const images = [];

        for (
            const file of selectedFiles
        ) {

            try {

                const image =
                    await compressImage(file);

                images.push(image);

            } catch (error) {

                console.error(error);

            }

        }

        images.forEach(image => {

            memories.push({
                image,
                title: '',
                note: ''
            });

        });

        renderSlots();

    }

    function openExistingMemory(index) {

        const memory =
            memories[index];

        if (!memory) {
            return;
        }

        editingIndex = index;
        draftImage = memory.image;
        replaceMode = false;

        modalImage.src =
            memory.image;

        memoryTitle.value =
            memory.title || '';

        memoryNote.value =
            memory.note || '';

        memoryModal.classList.add(
            'is-open'
        );

        document.body.style.overflow =
            'hidden';

    }

    function closeModal() {

        memoryModal.classList.remove(
            'is-open'
        );

        editingIndex = null;
        draftImage = null;
        replaceMode = false;

        memoryTitle.value = '';
        memoryNote.value = '';
        modalImage.src = '';

        fileInput.multiple = true;
        fileInput.value = '';

        document.body.style.overflow =
            '';

    }

    function renderSlots() {

        slots.forEach(
            (slot, index) => {

                const oldImage =
                    slot.querySelector(
                        '.slot-image'
                    );

                if (oldImage) {
                    oldImage.remove();
                }

                slot.classList.remove(
                    'has-image'
                );

                const memory =
                    memories[index];

                if (!memory) {
                    return;
                }

                const image =
                    document.createElement(
                        'img'
                    );

                image.className =
                    'slot-image';

                image.src =
                    memory.image;

                image.alt =
                    memory.title ||
                    `Memory ${index + 1}`;

                slot.prepend(image);

                slot.classList.add(
                    'has-image'
                );

            }
        );

        const remaining =
            MAX_MEMORIES -
            memories.length;

        if (remaining <= 0) {

            uploadBox.classList.add(
                'is-full'
            );

            uploadCount.textContent =
                '4 / 4 photos';

        } else {

            uploadBox.classList.remove(
                'is-full'
            );

            if (memories.length === 0) {

                uploadCount.textContent =
                    'Up to 4 photos';

            } else {

                uploadCount.textContent =
                    `${memories.length} / ${MAX_MEMORIES} photos`;

            }

        }

    }

    function openMemoryField() {

        if (!memories.length) {

            goToNextScene();
            return;

        }

        renderFloatingMemories();

        memoryField.classList.add(
            'is-active'
        );

        document.body.style.overflow =
            'hidden';

    }

    function renderFloatingMemories() {

        floatingMemories.innerHTML = '';

        memories.forEach(
            (memory, index) => {

                const position =
                    positions[index];

                if (!position) {
                    return;
                }

                const item =
                    document.createElement(
                        'article'
                    );

                item.className =
                    `floating-memory${position.center ? ' is-center' : ''}`;

                item.style.setProperty(
                    '--x',
                    position.x
                );

                item.style.setProperty(
                    '--y',
                    position.y
                );

                item.style.setProperty(
                    '--size',
                    position.size
                );

                item.style.setProperty(
                    '--rx',
                    position.rx
                );

                item.style.setProperty(
                    '--ry',
                    position.ry
                );

                item.style.setProperty(
                    '--rz',
                    position.rz
                );

                item.style.setProperty(
                    '--duration',
                    position.duration
                );

                item.style.setProperty(
                    '--delay',
                    position.delay
                );

                item.style.setProperty(
                    '--z',
                    position.z
                );

                const inner =
                    document.createElement(
                        'div'
                    );

                inner.className =
                    'floating-memory-inner';

                const image =
                    document.createElement(
                        'img'
                    );

                image.src =
                    memory.image;

                image.alt =
                    memory.title ||
                    `Memory ${index + 1}`;

                const copy =
                    document.createElement(
                        'div'
                    );

                copy.className =
                    'floating-memory-copy';

                const title =
                    document.createElement(
                        'h4'
                    );

                title.textContent =
                    memory.title ||
                    `Memory ${index + 1}`;

                copy.appendChild(title);

                if (memory.note) {

                    const note =
                        document.createElement(
                            'p'
                        );

                    note.textContent =
                        memory.note;

                    copy.appendChild(note);

                }

                inner.appendChild(image);
                inner.appendChild(copy);

                item.appendChild(inner);

                item.addEventListener(
                    'click',
                    () => {

                        openViewer(memory);

                    }
                );

                floatingMemories.appendChild(
                    item
                );

            }
        );

    }

    function openViewer(memory) {

        if (
            !viewer ||
            !viewerImage ||
            !viewerTitle ||
            !viewerNote
        ) {
            return;
        }

        viewerImage.src =
            memory.image;

        viewerTitle.textContent =
            memory.title ||
            'Memory';

        viewerNote.textContent =
            memory.note ||
            '';

        viewer.classList.add(
            'is-open'
        );

    }

    function closeViewer() {

        viewer.classList.remove(
            'is-open'
        );

    }

    function compressImage(file) {

        return new Promise(
            (resolve, reject) => {

                const reader =
                    new FileReader();

                reader.onload =
                    event => {

                        const image =
                            new Image();

                        image.onload =
                            () => {

                                const maxSize =
                                    1600;

                                let width =
                                    image.width;

                                let height =
                                    image.height;

                                if (
                                    width > maxSize ||
                                    height > maxSize
                                ) {

                                    const ratio =
                                        Math.min(
                                            maxSize / width,
                                            maxSize / height
                                        );

                                    width =
                                        Math.round(
                                            width *
                                            ratio
                                        );

                                    height =
                                        Math.round(
                                            height *
                                            ratio
                                        );

                                }

                                const canvas =
                                    document.createElement(
                                        'canvas'
                                    );

                                canvas.width =
                                    width;

                                canvas.height =
                                    height;

                                const context =
                                    canvas.getContext(
                                        '2d'
                                    );

                                context.drawImage(
                                    image,
                                    0,
                                    0,
                                    width,
                                    height
                                );

                                resolve(
                                    canvas.toDataURL(
                                        'image/jpeg',
                                        0.86
                                    )
                                );

                            };

                        image.onerror =
                            reject;

                        image.src =
                            event.target.result;

                    };

                reader.onerror =
                    reject;

                reader.readAsDataURL(
                    file
                );

            }
        );

    }

    function goToNextScene() {

        console.log(
            'Next SAN scene'
        );

    }
    
    

});
const continueBtn =
    document.getElementById('continueBtn');

const fieldContinueBtn =
    document.getElementById('fieldContinueBtn');

function backToStart() {
    window.location.href = '../../index.html';
}

if (continueBtn) {
    continueBtn.addEventListener('click', backToStart);
}

if (fieldContinueBtn) {
    fieldContinueBtn.addEventListener('click', backToStart);
}