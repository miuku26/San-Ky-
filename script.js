const DESIGN_WIDTH = 1512;
const DESIGN_HEIGHT = 982;


const heroSection =
    document.getElementById('heroSection');

const storyScreen =
    document.getElementById('storyScreen');

const questionStage =
    document.getElementById('questionStage');

const seatStage =
    document.getElementById('seatStage');

const discoverStage =
    document.getElementById('discoverStage');

const startButton =
    document.getElementById('startButton');

const startButtonImage =
    document.getElementById('startButtonImage');

const memoryScreen =
    document.getElementById('memoryScreen');

const memoryMessage1 =
    document.getElementById('memoryMessage1');

const memoryMessage2 =
    document.getElementById('memoryMessage2');

const memoryMessage3 =
    document.getElementById('memoryMessage3');

const memoryScrollHint =
    document.getElementById('memoryScrollHint');

const journeySection =
    document.getElementById('journeySection');

const openAlbum =
    document.getElementById('openAlbum');

const trailContainer =
    document.getElementById('cursorTrail');


const kitchenReveal =
    document.getElementById('kitchenReveal');

const kitchenSource =
    document.getElementById('kitchenSource');

const kitchenCanvas =
    document.getElementById('kitchenCanvas');

const journeyText2 =
    document.getElementById('journeyText2');


const START_DEFAULT =
    './assets/button/START.png';

const START_HOVER =
    './assets/button/START.png';

const START_CLICK =
    './assets/button/START.png';


const imageSources =
    Array.from(
        { length: 27 },

        (_, index) => {

            const number =
                String(index + 1)
                    .padStart(2, '0');

            return (
                `./assets/images/${number}.jpg`
            );
        }
    );


function getJourneyScale() {

    return Math.min(
        window.innerWidth /
        DESIGN_WIDTH,

        1
    );
}


function updateScale() {

    const scaleX =
        window.innerWidth /
        DESIGN_WIDTH;

    const scaleY =
        window.innerHeight /
        DESIGN_HEIGHT;

    const assetScale =
        Math.min(
            scaleX,
            scaleY
        );

    const journeyScale =
        getJourneyScale();

    document
        .documentElement
        .style
        .setProperty(
            '--asset-scale',
            assetScale
        );

    document
        .documentElement
        .style
        .setProperty(
            '--journey-scale',
            journeyScale
        );
}


updateScale();


let lastX = null;
let lastY = null;

let imgIndex = 0;


if (
    heroSection &&
    trailContainer
) {

    heroSection.addEventListener(
        'mousemove',

        event => {

            const rect =
                heroSection
                    .getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;


            if (
                lastX === null ||
                lastY === null
            ) {

                lastX = x;
                lastY = y;

                createTrailImage(
                    x,
                    y
                );

                return;
            }


            const distance =
                Math.hypot(
                    x - lastX,
                    y - lastY
                );


            if (distance >= 60) {

                lastX = x;
                lastY = y;

                createTrailImage(
                    x,
                    y
                );
            }
        }
    );


    heroSection.addEventListener(
        'mouseleave',

        () => {

            lastX = null;
            lastY = null;
        }
    );
}


function createTrailImage(
    x,
    y
) {

    if (!trailContainer) {
        return;
    }


    const img =
        document.createElement('img');


    img.src =
        imageSources[imgIndex];


    img.className =
        'trail-img';


    img.style.left =
        `${x}px`;

    img.style.top =
        `${y}px`;


    img.style.setProperty(
        '--rotation',

        `${
            (Math.random() - .5) *
            30
        }deg`
    );


    trailContainer
        .appendChild(img);


    requestAnimationFrame(
        () => {

            img.classList
                .add('show');
        }
    );


    imgIndex =
        (
            imgIndex + 1
        ) %
        imageSources.length;


    setTimeout(
        () => {

            img.classList
                .remove('show');


            setTimeout(
                () => {

                    img.remove();

                },
                400
            );

        },
        800
    );
}


imageSources.forEach(
    src => {

        const img =
            new Image();

        img.src = src;
    }
);


const stages = [
    questionStage,
    seatStage,
    discoverStage
];


let currentStage = 0;

let startTimer = null;


function resetReveal(stage) {

    if (!stage) {
        return;
    }

    if (
        stage ===
        questionStage
    ) {
        return;
    }


    const line =
        stage.querySelector(
            '.reveal-line'
        );


    if (!line) {
        return;
    }


    line.style.animation =
        'none';


    void line.offsetWidth;


    line.style.animation =
        '';
}


function showStage(index) {

    stages.forEach(
        (
            stage,
            indexStage
        ) => {

            if (!stage) {
                return;
            }


            stage.classList
                .remove('active');


            if (
                indexStage ===
                index
            ) {

                resetReveal(stage);

                stage.classList
                    .add('active');
            }
        }
    );


    currentStage =
        index;
}


showStage(0);


function nextStory() {

    if (
        currentStage >=
        stages.length - 1
    ) {
        return;
    }


    stages[currentStage]
        .classList
        .remove('active');


    currentStage++;


    const next =
        stages[currentStage];


    resetReveal(next);


    next.classList
        .add('active');


    if (startButton) {

        startButton
            .classList
            .remove('show');
    }


    if (startTimer) {

        clearTimeout(
            startTimer
        );

        startTimer = null;
    }


    if (
        currentStage === 2 &&
        startButton
    ) {

        startTimer =
            setTimeout(
                () => {

                    if (
                        currentStage === 2
                    ) {

                        startButton
                            .classList
                            .add('show');
                    }

                },
                1000
            );
    }
}


if (storyScreen) {

    storyScreen.addEventListener(
        'click',

        event => {

            if (
                event.target.closest(
                    '.start-btn'
                )
            ) {
                return;
            }


            if (
                event.target.closest(
                    '.menu-btn'
                )
            ) {
                return;
            }


            nextStory();
        }
    );
}


const memoryMessages = [
    memoryMessage1,
    memoryMessage2,
    memoryMessage3
];


let memoryStep = 0;

let memoryReadyToScroll =
    false;


function resetMemory(
    message
) {

    if (!message) {
        return;
    }

    message
        .classList
        .remove('is-visible');
}


function hideMemory(
    message
) {

    if (!message) {
        return;
    }

    message
        .classList
        .remove('is-visible');
}


function showMemory(
    index
) {

    const message =
        memoryMessages[index];


    if (!message) {
        return;
    }


    requestAnimationFrame(
        () => {

            message
                .classList
                .add('is-visible');
        }
    );
}


let mode = 'hero';

let transitionRunning =
    false;


function openMemory() {

    mode = 'memory';

    memoryStep = 0;

    memoryReadyToScroll =
        false;


    memoryMessages.forEach(
        message => {

            resetMemory(
                message
            );
        }
    );


    if (memoryScrollHint) {

        memoryScrollHint
            .classList
            .remove('show');
    }


    if (memoryScreen) {

        memoryScreen
            .classList
            .remove('leave');


        memoryScreen.style.transition =
            '';

        memoryScreen.style.transform =
            '';

        memoryScreen.style.opacity =
            '';


        memoryScreen
            .classList
            .add('active');
    }


    setTimeout(
        () => {

            showMemory(0);

        },
        250
    );
}


function nextMemory() {

    if (
        memoryStep >=
        memoryMessages.length - 1
    ) {
        return;
    }


    hideMemory(
        memoryMessages[
            memoryStep
        ]
    );


    memoryStep++;


    setTimeout(
        () => {

            showMemory(
                memoryStep
            );

        },
        280
    );


    if (
        memoryStep === 2
    ) {

        memoryReadyToScroll =
            false;


        setTimeout(
            () => {

                if (
                    memoryStep !== 2
                ) {
                    return;
                }


                memoryReadyToScroll =
                    true;


                if (
                    memoryScrollHint
                ) {

                    memoryScrollHint
                        .classList
                        .add('show');
                }

            },
            2000
        );
    }
}


if (memoryScreen) {

    memoryScreen.addEventListener(
        'pointerdown',

        event => {

            if (
                event.target.closest(
                    '.memory-menu-btn'
                )
            ) {
                return;
            }


            nextMemory();
        }
    );
}


if (
    startButton &&
    startButtonImage
) {

    startButton.addEventListener(
        'mouseenter',

        () => {

            startButtonImage.src =
                START_HOVER;
        }
    );


    startButton.addEventListener(
        'mouseleave',

        () => {

            startButtonImage.src =
                START_DEFAULT;
        }
    );


    startButton.addEventListener(
        'mousedown',

        () => {

            startButtonImage.src =
                START_CLICK;
        }
    );


    startButton.addEventListener(
        'mouseup',

        () => {

            startButtonImage.src =
                START_HOVER;
        }
    );


    startButton.addEventListener(
        'click',

        event => {

            event.stopPropagation();

            startButtonImage.src =
                START_CLICK;

            openMemory();
        }
    );
}


function easeInOutCubic(t) {

    return (
        t < .5
            ?
            4 * t * t * t
            :
            1 -
            Math.pow(
                -2 * t + 2,
                3
            ) / 2
    );
}


function animatePageTo(
    targetY,
    duration,
    callback
) {

    if (
        transitionRunning
    ) {
        return;
    }


    transitionRunning =
        true;


    const startY =
        window.scrollY;


    const distance =
        targetY -
        startY;


    let startTime =
        null;


    function frame(time) {

        if (
            startTime === null
        ) {

            startTime =
                time;
        }


        const elapsed =
            time -
            startTime;


        const progress =
            Math.min(
                elapsed /
                duration,
                1
            );


        const eased =
            easeInOutCubic(
                progress
            );


        window.scrollTo(
            0,
            startY +
            distance *
            eased
        );


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                frame
            );

            return;
        }


        window.scrollTo(
            0,
            targetY
        );


        transitionRunning =
            false;


        if (callback) {

            callback();
        }
    }


    requestAnimationFrame(
        frame
    );
}
function enterStory() {

    if (
        mode !== 'hero'
    ) {
        return;
    }


    if (!storyScreen) {
        return;
    }


    mode =
        'hero-to-story';


    animatePageTo(
        storyScreen.offsetTop,
        1800,

        () => {

            mode =
                'story';
        }
    );
}


function enterJourney() {

    if (
        mode !== 'memory'
    ) {
        return;
    }


    if (
        memoryStep !== 2
    ) {
        return;
    }


    if (
        !memoryReadyToScroll
    ) {
        return;
    }


    if (!journeySection) {
        return;
    }


    memoryReadyToScroll =
        false;


    const journeyTop =
        journeySection.offsetTop;


    if (memoryScreen) {

        memoryScreen.style.transition =
            'none';

        memoryScreen
            .classList
            .remove('active');

        memoryScreen
            .classList
            .remove('leave');

        memoryScreen.style.transform =
            '';

        memoryScreen.style.opacity =
            '';
    }


    window.scrollTo(
        0,
        journeyTop
    );


    mode =
        'journey';


    document.body.style.overflowY =
        'auto';


    document.documentElement.style.overflowY =
        'auto';


    if (memoryScrollHint) {

        memoryScrollHint
            .classList
            .remove('show');
    }
}


let wheelLocked =
    false;


window.addEventListener(
    'wheel',

    event => {

        if (
            transitionRunning
        ) {

            event.preventDefault();

            return;
        }


        if (
            wheelLocked
        ) {

            event.preventDefault();

            return;
        }


        const delta =
            event.deltaY;


        if (
            mode === 'hero'
        ) {

            if (
                delta > 0
            ) {

                event.preventDefault();


                wheelLocked =
                    true;


                enterStory();


                setTimeout(
                    () => {

                        wheelLocked =
                            false;

                    },
                    1900
                );
            }


            return;
        }


        if (
            mode === 'hero-to-story'
        ) {

            event.preventDefault();

            return;
        }


        if (
            mode === 'story'
        ) {

            event.preventDefault();

            return;
        }


        if (
            mode === 'memory'
        ) {

            event.preventDefault();


            if (
                delta > 0 &&
                memoryStep === 2 &&
                memoryReadyToScroll
            ) {

                wheelLocked =
                    true;


                enterJourney();


                setTimeout(
                    () => {

                        wheelLocked =
                            false;

                    },
                    800
                );
            }


            return;
        }


        if (
            mode === 'journey'
        ) {

            return;
        }
    },

    {
        passive: false
    }
);


let touchStartY =
    null;


window.addEventListener(
    'touchstart',

    event => {

        if (
            !event.touches ||
            !event.touches.length
        ) {
            return;
        }


        touchStartY =
            event.touches[0]
                .clientY;
    },

    {
        passive: true
    }
);


window.addEventListener(
    'touchend',

    event => {

        if (
            touchStartY === null
        ) {
            return;
        }


        if (
            !event.changedTouches ||
            !event.changedTouches.length
        ) {

            touchStartY =
                null;

            return;
        }


        const touchEndY =
            event.changedTouches[0]
                .clientY;


        const delta =
            touchStartY -
            touchEndY;


        touchStartY =
            null;


        if (
            Math.abs(delta) <
            50
        ) {
            return;
        }


        if (
            transitionRunning ||
            wheelLocked
        ) {
            return;
        }


        if (
            mode === 'hero' &&
            delta > 0
        ) {

            wheelLocked =
                true;


            enterStory();


            setTimeout(
                () => {

                    wheelLocked =
                        false;

                },
                1900
            );


            return;
        }


        if (
            mode === 'memory' &&
            delta > 0 &&
            memoryStep === 2 &&
            memoryReadyToScroll
        ) {

            wheelLocked =
                true;


            enterJourney();


            setTimeout(
                () => {

                    wheelLocked =
                        false;

                },
                800
            );
        }
    },

    {
        passive: true
    }
);


document.addEventListener(
    'keydown',

    event => {

        if (
            transitionRunning
        ) {
            return;
        }


        if (
            event.key ===
            'ArrowDown' ||
            event.key ===
            'PageDown'
        ) {

            if (
                mode === 'hero'
            ) {

                event.preventDefault();

                enterStory();

                return;
            }


            if (
                mode === 'memory' &&
                memoryStep === 2 &&
                memoryReadyToScroll
            ) {

                event.preventDefault();

                enterJourney();

                return;
            }
        }


        if (
            event.key ===
            ' ' &&
            mode === 'hero'
        ) {

            event.preventDefault();

            enterStory();
        }
    }
);


function clamp(
    value,
    min,
    max
) {

    return Math.min(
        Math.max(
            value,
            min
        ),
        max
    );
}


let smoothScrollTarget =
    window.scrollY;

let smoothScrollCurrent =
    window.scrollY;

let smoothScrollRAF =
    null;

let smoothScrollEnabled =
    false;


function updateSmoothScroll() {

    if (
        !smoothScrollEnabled
    ) {

        smoothScrollRAF =
            null;

        return;
    }


    const difference =
        smoothScrollTarget -
        smoothScrollCurrent;


    smoothScrollCurrent +=
        difference *
        0.085;


    if (
        Math.abs(difference) <
        0.1
    ) {

        smoothScrollCurrent =
            smoothScrollTarget;
    }


    window.scrollTo(
        0,
        smoothScrollCurrent
    );


    smoothScrollRAF =
        requestAnimationFrame(
            updateSmoothScroll
        );
}


function enableSmoothScroll() {

    if (
        smoothScrollEnabled
    ) {
        return;
    }


    smoothScrollEnabled =
        true;


    smoothScrollTarget =
        window.scrollY;


    smoothScrollCurrent =
        window.scrollY;


    if (
        !smoothScrollRAF
    ) {

        smoothScrollRAF =
            requestAnimationFrame(
                updateSmoothScroll
            );
    }
}


function disableSmoothScroll() {

    smoothScrollEnabled =
        false;


    if (
        smoothScrollRAF
    ) {

        cancelAnimationFrame(
            smoothScrollRAF
        );


        smoothScrollRAF =
            null;
    }
}


window.addEventListener(
    'wheel',

    event => {

        if (
            mode !== 'journey'
        ) {
            return;
        }


        if (
            transitionRunning
        ) {
            return;
        }


        event.preventDefault();


        enableSmoothScroll();


        const journeyTop =
            journeySection
                ?
                journeySection.offsetTop
                :
                0;


        const journeyHeight =
            journeySection
                ?
                journeySection.offsetHeight
                :
                document.body.scrollHeight;


        const maxScroll =
            Math.max(
                journeyTop,
                journeyTop +
                journeyHeight -
                window.innerHeight
            );


        smoothScrollTarget +=
            event.deltaY *
            0.82;


        smoothScrollTarget =
            clamp(
                smoothScrollTarget,
                journeyTop,
                maxScroll
            );
    },

    {
        passive: false
    }
);


let journeyTouchStartY =
    null;

let journeyTouchLastY =
    null;


window.addEventListener(
    'touchstart',

    event => {

        if (
            mode !== 'journey'
        ) {
            return;
        }


        if (
            !event.touches ||
            !event.touches.length
        ) {
            return;
        }


        enableSmoothScroll();


        journeyTouchStartY =
            event.touches[0]
                .clientY;


        journeyTouchLastY =
            journeyTouchStartY;
    },

    {
        passive: true
    }
);


window.addEventListener(
    'touchmove',

    event => {

        if (
            mode !== 'journey'
        ) {
            return;
        }


        if (
            journeyTouchLastY ===
            null
        ) {
            return;
        }


        if (
            !event.touches ||
            !event.touches.length
        ) {
            return;
        }


        event.preventDefault();


        const currentY =
            event.touches[0]
                .clientY;


        const delta =
            journeyTouchLastY -
            currentY;


        journeyTouchLastY =
            currentY;


        const journeyTop =
            journeySection
                ?
                journeySection.offsetTop
                :
                0;


        const journeyHeight =
            journeySection
                ?
                journeySection.offsetHeight
                :
                document.body.scrollHeight;


        const maxScroll =
            Math.max(
                journeyTop,
                journeyTop +
                journeyHeight -
                window.innerHeight
            );


        smoothScrollTarget +=
            delta;


        smoothScrollTarget =
            clamp(
                smoothScrollTarget,
                journeyTop,
                maxScroll
            );
    },

    {
        passive: false
    }
);


window.addEventListener(
    'touchend',

    () => {

        journeyTouchStartY =
            null;

        journeyTouchLastY =
            null;
    },

    {
        passive: true
    }
);


window.addEventListener(
    'scroll',

    () => {

        if (
            mode !== 'journey'
        ) {
            return;
        }


        if (
            !smoothScrollEnabled
        ) {

            smoothScrollTarget =
                window.scrollY;

            smoothScrollCurrent =
                window.scrollY;
        }
    }
);


function syncJourneyScroll() {

    if (
        mode !== 'journey'
    ) {
        return;
    }


    const journeyTop =
        journeySection
            ?
            journeySection.offsetTop
            :
            0;


    const journeyHeight =
        journeySection
            ?
            journeySection.offsetHeight
            :
            document.body.scrollHeight;


    const maxScroll =
        Math.max(
            journeyTop,
            journeyTop +
            journeyHeight -
            window.innerHeight
        );


    smoothScrollTarget =
        clamp(
            smoothScrollTarget,
            journeyTop,
            maxScroll
        );


    smoothScrollCurrent =
        clamp(
            smoothScrollCurrent,
            journeyTop,
            maxScroll
        );
}


window.addEventListener(
    'resize',

    () => {

        updateScale();

        syncJourneyScroll();
    }
);


function resetJourneyText2() {

    if (!journeyText2) {
        return;
    }


    journeyText2
        .classList
        .remove(
            'is-visible'
        );
}
function enterStory() {

    if (
        mode !== 'hero'
    ) {
        return;
    }


    if (!storyScreen) {
        return;
    }


    mode =
        'hero-to-story';


    animatePageTo(
        storyScreen.offsetTop,
        1800,

        () => {

            mode =
                'story';
        }
    );
}


function enterJourney() {

    if (
        mode !== 'memory'
    ) {
        return;
    }


    if (
        memoryStep !== 2
    ) {
        return;
    }


    if (
        !memoryReadyToScroll
    ) {
        return;
    }


    if (!journeySection) {
        return;
    }


    memoryReadyToScroll =
        false;


    const journeyTop =
        journeySection.offsetTop;


    if (memoryScreen) {

        memoryScreen.style.transition =
            'none';

        memoryScreen
            .classList
            .remove('active');

        memoryScreen
            .classList
            .remove('leave');

        memoryScreen.style.transform =
            '';

        memoryScreen.style.opacity =
            '';
    }


    window.scrollTo(
        0,
        journeyTop
    );


    smoothCurrent =
        journeyTop;

    smoothTarget =
        journeyTop;


    mode =
        'journey';


    startJourneySmoothLoop();
}


let smoothCurrent =
    window.scrollY;

let smoothTarget =
    window.scrollY;

let smoothLoopRunning =
    false;


function getJourneyBounds() {

    if (!journeySection) {

        return {
            top: 0,
            bottom: 0
        };
    }


    const top =
        journeySection.offsetTop;


    const bottom =
        Math.max(
            top,

            top +
            journeySection.offsetHeight -
            window.innerHeight
        );


    return {
        top,
        bottom
    };
}


function startJourneySmoothLoop() {

    if (
        smoothLoopRunning
    ) {
        return;
    }


    smoothLoopRunning =
        true;


    function frame() {

        if (
            mode !== 'journey'
        ) {

            smoothLoopRunning =
                false;

            return;
        }


        const difference =
            smoothTarget -
            smoothCurrent;


        smoothCurrent +=
            difference *
            .055;


        if (
            Math.abs(
                difference
            ) < .15
        ) {

            smoothCurrent =
                smoothTarget;
        }


        window.scrollTo(
            0,
            smoothCurrent
        );


        requestAnimationFrame(
            frame
        );
    }


    requestAnimationFrame(
        frame
    );
}


window.addEventListener(
    'wheel',

    event => {

        if (
            mode === 'hero'
        ) {

            if (
                event.deltaY > 0
            ) {

                event.preventDefault();

                enterStory();
            }

            return;
        }


        if (
            mode ===
                'hero-to-story' ||
            mode ===
                'memory-to-journey'
        ) {

            event.preventDefault();

            return;
        }


        if (
            mode === 'story'
        ) {

            event.preventDefault();

            return;
        }


        if (
            mode === 'memory'
        ) {

            event.preventDefault();


            if (
                memoryStep === 2 &&
                memoryReadyToScroll &&
                event.deltaY > 0
            ) {

                enterJourney();
            }

            return;
        }


        if (
            mode === 'journey'
        ) {

            event.preventDefault();


            const bounds =
                getJourneyBounds();


            const normalizedDelta =
                Math.max(
                    -120,

                    Math.min(
                        120,
                        event.deltaY
                    )
                );


            smoothTarget +=
                normalizedDelta *
                .9;


            smoothTarget =
                Math.max(
                    bounds.top,

                    Math.min(
                        smoothTarget,
                        bounds.bottom
                    )
                );


            startJourneySmoothLoop();
        }
    },

    {
        passive: false
    }
);


function initKitchenReveal() {

    if (
        !kitchenReveal ||
        !kitchenSource ||
        !kitchenCanvas
    ) {
        return;
    }


    let kitchenReady = false;
    let kitchenDialogueShown = false;


    const visitedCells =
        new Set();


    const GRID_COLS = 12;
    const GRID_ROWS = 10;


    function setupKitchenCanvas() {

        if (
            !kitchenSource.naturalWidth ||
            !kitchenSource.naturalHeight
        ) {
            return;
        }


        kitchenCanvas.width =
            kitchenSource.naturalWidth;


        kitchenCanvas.height =
            kitchenSource.naturalHeight;


        const ctx =
            kitchenCanvas.getContext('2d');


        ctx.clearRect(
            0,
            0,
            kitchenCanvas.width,
            kitchenCanvas.height
        );


        kitchenReady = true;
    }


    if (
        kitchenSource.complete &&
        kitchenSource.naturalWidth
    ) {

        setupKitchenCanvas();

    } else {

        kitchenSource.addEventListener(
            'load',
            setupKitchenCanvas,
            {
                once: true
            }
        );
    }


    function showKitchenDialogue() {

        if (
            kitchenDialogueShown
        ) {
            return;
        }


        if (
            !journeyText2
        ) {
            return;
        }


        kitchenDialogueShown = true;


        journeyText2
            .classList
            .add(
                'is-visible'
            );
    }


    function revealKitchen(event) {

        if (
            !kitchenReady ||
            !kitchenReveal ||
            !kitchenCanvas ||
            !kitchenSource
        ) {
            return;
        }


        const rect =
            kitchenReveal
                .getBoundingClientRect();


        const mouseX =
            event.clientX -
            rect.left;


        const mouseY =
            event.clientY -
            rect.top;


        if (
            mouseX < 0 ||
            mouseY < 0 ||
            mouseX > rect.width ||
            mouseY > rect.height
        ) {
            return;
        }


        const canvasX =
            (
                mouseX /
                rect.width
            ) *
            kitchenCanvas.width;


        const canvasY =
            (
                mouseY /
                rect.height
            ) *
            kitchenCanvas.height;


        const ctx =
            kitchenCanvas
                .getContext('2d');


        const radius =
            kitchenCanvas.width *
            0.13;


        ctx.save();


        ctx.beginPath();


        ctx.arc(
            canvasX,
            canvasY,
            radius,
            0,
            Math.PI * 2
        );


        ctx.clip();


        ctx.drawImage(
            kitchenSource,
            0,
            0,
            kitchenCanvas.width,
            kitchenCanvas.height
        );


        ctx.restore();


        let col =
            Math.floor(
                mouseX /
                rect.width *
                GRID_COLS
            );


        let row =
            Math.floor(
                mouseY /
                rect.height *
                GRID_ROWS
            );


        col =
            Math.max(
                0,
                Math.min(
                    GRID_COLS - 1,
                    col
                )
            );


        row =
            Math.max(
                0,
                Math.min(
                    GRID_ROWS - 1,
                    row
                )
            );


        visitedCells.add(
            `${col}-${row}`
        );


        const percent =
            visitedCells.size /
            (
                GRID_COLS *
                GRID_ROWS
            );


        if (
            percent >= 0.20
        ) {

            showKitchenDialogue();
        }
    }


    kitchenReveal.addEventListener(
        'mousemove',
        revealKitchen
    );
}


window.addEventListener(
    'resize',

    () => {

        updateScale();


        if (
            mode === 'journey'
        ) {

            const bounds =
                getJourneyBounds();


            smoothCurrent =
                Math.max(
                    bounds.top,

                    Math.min(
                        window.scrollY,
                        bounds.bottom
                    )
                );


            smoothTarget =
                smoothCurrent;
        }
    }
);
if (openAlbum) {

    openAlbum.addEventListener(
        'click',
        event => {

            event.stopPropagation();

            window.location.href =
                './album/1975/index.html';
        }
    );
}

window.addEventListener(
    'load',

    () => {

        updateScale();


        if (
            journeyText2
        ) {

            journeyText2
                .classList
                .remove(
                    'is-visible'
                );
        }


        window.scrollTo(
            0,
            0
        );


        smoothCurrent = 0;
        smoothTarget = 0;


        initKitchenReveal();
    }
);