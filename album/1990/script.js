document.addEventListener('DOMContentLoaded', () => {
    let activeElement = null;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let highestZIndex = 100;

    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(element => {
        element.addEventListener('dragstart', event => {
            event.preventDefault();
        });

        element.addEventListener('mousedown', startDrag);

        element.addEventListener('touchstart', startDrag, {
            passive: false
        });
    });

    function startDrag(event) {
        if (event.button !== undefined && event.button !== 0) {
            return;
        }

        activeElement = event.currentTarget;

        const point =
            event.type === 'touchstart'
                ? event.touches[0]
                : event;

        startX = point.clientX;
        startY = point.clientY;

        const computedStyle =
            window.getComputedStyle(activeElement);

        initialLeft =
            parseFloat(computedStyle.left) || 0;

        initialTop =
            parseFloat(computedStyle.top) || 0;

        highestZIndex++;

        activeElement.style.zIndex =
            highestZIndex;

        activeElement.style.transition =
            'none';

        document.addEventListener(
            'mousemove',
            onDrag
        );

        document.addEventListener(
            'mouseup',
            stopDrag
        );

        document.addEventListener(
            'touchmove',
            onDrag,
            {
                passive: false
            }
        );

        document.addEventListener(
            'touchend',
            stopDrag
        );

        document.addEventListener(
            'touchcancel',
            stopDrag
        );
    }

    function onDrag(event) {
        if (!activeElement) {
            return;
        }

        if (event.cancelable) {
            event.preventDefault();
        }

        const point =
            event.type === 'touchmove'
                ? event.touches[0]
                : event;

        const deltaX =
            point.clientX - startX;

        const deltaY =
            point.clientY - startY;

        activeElement.style.left =
            `${initialLeft + deltaX}px`;

        activeElement.style.top =
            `${initialTop + deltaY}px`;
    }

    function stopDrag() {
        if (activeElement) {
            activeElement.style.transition = '';
        }

        activeElement = null;

        document.removeEventListener(
            'mousemove',
            onDrag
        );

        document.removeEventListener(
            'mouseup',
            stopDrag
        );

        document.removeEventListener(
            'touchmove',
            onDrag
        );

        document.removeEventListener(
            'touchend',
            stopDrag
        );

        document.removeEventListener(
            'touchcancel',
            stopDrag
        );
    }

    const tab1975 =
        document.querySelector('.tab-1975');

    const tab1990 =
        document.querySelector('.tab-1990');

    const tab2025 =
        document.querySelector('.tab-2025');

    if (tab1990) {
        tab1990.setAttribute(
            'data-property-1',
            'Active'
        );
    }

    if (tab1975) {
        tab1975.addEventListener(
            'click',
            () => {
                window.location.href =
                    '../1975/index.html';
            }
        );
    }

    if (tab2025) {
        tab2025.addEventListener(
            'click',
            () => {
                window.location.href =
                    '../2025/index.html';
            }
        );
    }

    const timeline1990 =
        document.querySelector('#timeline1990');

    if (timeline1990) {
        timeline1990.addEventListener(
            'click',
            () => {
                timeline1990.dispatchEvent(
                    new CustomEvent(
                        'openTimeline',
                        {
                            bubbles: true,
                            detail: {
                                year: 1990
                            }
                        }
                    )
                );
            }
        );
    }
});
const timeline1990 =
    document.getElementById('timeline1990');

if (timeline1990) {

    timeline1990.addEventListener('click', () => {

        timeline1990.classList.add('is-opening');

        setTimeout(() => {

            window.location.href =
                '../../1975/1990.html';

        }, 550);

    });

}