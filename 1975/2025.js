document.addEventListener('DOMContentLoaded', () => {

    const menuBtn =
        document.getElementById('menuBtn');

    const btnBack =
        document.getElementById('btnBack');

    const btnNext =
        document.getElementById('btnNext');


    if (menuBtn) {

        menuBtn.setAttribute(
            'data-property-1',
            'Default'
        );

        menuBtn.addEventListener('click', () => {

            const currentState =
                menuBtn.getAttribute(
                    'data-property-1'
                );

            if (currentState === 'Active') {

                menuBtn.setAttribute(
                    'data-property-1',
                    'Default'
                );

            } else {

                menuBtn.setAttribute(
                    'data-property-1',
                    'Active'
                );

            }

        });

    }


    if (btnBack) {

        btnBack.addEventListener('click', () => {

            window.location.href =
                '1990.html';

        });

    }


    if (btnNext) {

        btnNext.addEventListener('click', () => {

            btnNext.setAttribute(
                'data-property-1',
                'Active'
            );

            setTimeout(() => {

                window.location.href =
                    '../pick đồ ăn/index.html';

            }, 350);

        });

    }


    const revealElements =
        document.querySelectorAll(
            '.txt-app-delivery, ' +
            '.txt-quick-food, ' +
            '.txt-busy-life, ' +
            '.txt-own-life, ' +
            '.txt-family-meals, ' +
            '.txt-life-changes, ' +
            '.txt-not-burden, ' +
            '.txt-eat-what-we-like, ' +
            '.txt-happy-satisfied, ' +
            '.txt-meal-changed, ' +
            '.txt-what-matters'
        );


    revealElements.forEach(element => {

        element.style.opacity = '0';

        element.style.transform =
            'translateY(25px)';

        element.style.transition =
            'opacity 0.8s ease, transform 0.8s ease';

    });


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            '1';

                        entry.target.style.transform =
                            'translateY(0)';

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.2
            }

        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    const phoneOrder =
        document.getElementById(
            'phoneOrder'
        );

    const phoneHand =
        document.getElementById(
            'phoneHand'
        );

    const foodItems =
        document.querySelectorAll(
            '.img-18, .img-19, .img-24'
        );


    let isOrdering = false;

    let shakeTimer1 = null;
    let shakeTimer2 = null;
    let shakeTimer3 = null;


    function clearHandTimers() {

        clearTimeout(shakeTimer1);
        clearTimeout(shakeTimer2);
        clearTimeout(shakeTimer3);

        shakeTimer1 = null;
        shakeTimer2 = null;
        shakeTimer3 = null;

    }


    if (phoneOrder && phoneHand) {

        phoneOrder.addEventListener(
            'mouseenter',
            () => {

                if (isOrdering) {
                    return;
                }

                isOrdering = true;

                clearHandTimers();

                phoneHand.style.transform =
                    'rotate(-1.5deg)';


                shakeTimer1 =
                    setTimeout(() => {

                        phoneHand.style.transform =
                            'rotate(1.5deg)';

                    }, 130);


                shakeTimer2 =
                    setTimeout(() => {

                        phoneHand.style.transform =
                            'rotate(0deg)';

                    }, 260);


                shakeTimer3 =
                    setTimeout(() => {

                        phoneHand.style.transform =
                            'rotate(0deg)';

                        phoneHand.src =
                            './image 2025/tay2.png';


                        foodItems.forEach(food => {

                            food.classList.add(
                                'food-moving'
                            );

                        });


                    }, 390);

            }
        );


        phoneOrder.addEventListener(
            'mouseleave',
            () => {

                clearHandTimers();

                phoneHand.style.transform =
                    'rotate(0deg)';

                phoneHand.src =
                    './image 2025/tay1.png';


                foodItems.forEach(food => {

                    food.classList.remove(
                        'food-moving'
                    );

                });


                isOrdering = false;

            }
        );

    }


    const tableFoods =
        document.querySelectorAll(
            '.table-food'
        );

    const tableFoodDialogue =
        document.getElementById(
            'tableFoodDialogue'
        );


    if (tableFoodDialogue) {

        tableFoods.forEach(food => {

            food.addEventListener(
                'mouseenter',
                () => {

                    const dialogueImage =
                        food.getAttribute(
                            'data-dialogue'
                        );

                    if (!dialogueImage) {
                        return;
                    }


                    tableFoodDialogue.src =
                        dialogueImage;


                    if (
                        food.classList.contains('img-2')
                    ) {

                        tableFoodDialogue.style.left =
                            '110px';

                        tableFoodDialogue.style.top =
                            '1070px';

                        tableFoodDialogue.style.width =
                            '430px';

                    }

                    else if (
                        food.classList.contains('img-9')
                    ) {

                        tableFoodDialogue.style.left =
                            '545px';

                        tableFoodDialogue.style.top =
                            '1010px';

                        tableFoodDialogue.style.width =
                            '430px';

                    }

                    else if (
                        food.classList.contains('img-8')
                    ) {

                        tableFoodDialogue.style.left =
                            '150px';

                        tableFoodDialogue.style.top =
                            '1730px';

                        tableFoodDialogue.style.width =
                            '430px';

                    }

                    else if (
                        food.classList.contains('img-10')
                    ) {

                        tableFoodDialogue.style.left =
                            '570px';

                        tableFoodDialogue.style.top =
                            '1740px';

                        tableFoodDialogue.style.width =
                            '430px';

                    }

                    else if (
                        food.classList.contains('img-11')
                    ) {

                        tableFoodDialogue.style.left =
                            '980px';

                        tableFoodDialogue.style.top =
                            '1080px';

                        tableFoodDialogue.style.width =
                            '430px';

                    }


                    tableFoodDialogue.classList.add(
                        'is-visible'
                    );

                }
            );


            food.addEventListener(
                'mouseleave',
                () => {

                    tableFoodDialogue.classList.remove(
                        'is-visible'
                    );

                }
            );

        });

    }


    const deliveryScene =
        document.getElementById(
            'deliveryScene'
        );

    const deliveryBag =
        document.getElementById(
            'deliveryBag'
        );

    let deliveryRunning = false;


    if (deliveryScene && deliveryBag) {

        deliveryBag.addEventListener(
            'click',
            () => {

                if (deliveryRunning) {
                    return;
                }

                deliveryRunning = true;

                deliveryScene.classList.add(
                    'is-changing'
                );


                setTimeout(() => {

                    deliveryScene.classList.remove(
                        'is-changing'
                    );

                    deliveryScene.classList.add(
                        'is-complete'
                    );

                }, 700);

            }
        );

    }


    const chickenBox =
        document.getElementById(
            'chickenBox'
        );

    const chickenBoxImage =
        document.getElementById(
            'chickenBoxImage'
        );

    let chickenOpened = false;


    if (chickenBox && chickenBoxImage) {

        chickenBox.addEventListener(
            'click',
            () => {

                chickenOpened =
                    !chickenOpened;

                chickenBoxImage.src =
                    chickenOpened
                        ? './image 2025/garan 2.png'
                        : './image 2025/garan.png';

            }
        );

    }


    const memoryFriends =
        document.getElementById(
            'memoryFriends'
        );

    const memoryFamily =
        document.getElementById(
            'memoryFamily'
        );

    const friendsText =
        document.getElementById(
            'friendsText'
        );

    const familyText =
        document.getElementById(
            'familyText'
        );


    function resetMemories() {

        if (
            !memoryFriends ||
            !memoryFamily ||
            !friendsText ||
            !familyText
        ) {
            return;
        }

        memoryFriends.classList.remove(
            'is-active',
            'is-dim'
        );

        memoryFamily.classList.remove(
            'is-active',
            'is-dim'
        );

        friendsText.classList.remove(
            'memory-text-show'
        );

        familyText.classList.remove(
            'memory-text-show'
        );

    }


    if (
        memoryFriends &&
        memoryFamily &&
        friendsText &&
        familyText
    ) {

        memoryFriends.addEventListener(
            'mouseenter',
            () => {

                resetMemories();

                memoryFriends.classList.add(
                    'is-active'
                );

                memoryFamily.classList.add(
                    'is-dim'
                );

                friendsText.classList.add(
                    'memory-text-show'
                );

            }
        );


        memoryFamily.addEventListener(
            'mouseenter',
            () => {

                resetMemories();

                memoryFamily.classList.add(
                    'is-active'
                );

                memoryFriends.classList.add(
                    'is-dim'
                );

                familyText.classList.add(
                    'memory-text-show'
                );

            }
        );


        memoryFriends.addEventListener(
            'mouseleave',
            resetMemories
        );


        memoryFamily.addEventListener(
            'mouseleave',
            resetMemories
        );

    }


    const scheduleTitle =
        document.querySelector(
            '.txt-work-schedule'
        );

    const scheduleImage1 =
        document.querySelector(
            '.img-3'
        );

    const scheduleImage2 =
        document.querySelector(
            '.img-4'
        );

    const scheduleImage3 =
        document.querySelector(
            '.img-5'
        );

    const scheduleEnding =
        document.querySelector(
            '.txt-same-house'
        );

    const canvas =
        document.querySelector(
            '.canvas-container'
        );

    let scheduleStarted = false;


    if (
        scheduleTitle &&
        scheduleImage1 &&
        scheduleImage2 &&
        scheduleImage3 &&
        scheduleEnding
    ) {

        const scheduleObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !scheduleStarted
                        ) {

                            scheduleStarted = true;


                            scheduleTitle.classList.add(
                                'schedule-visible'
                            );


                            setTimeout(() => {

                                scheduleImage1.classList.add(
                                    'schedule-visible'
                                );

                            }, 500);


                            setTimeout(() => {

                                scheduleImage2.classList.add(
                                    'schedule-visible'
                                );

                            }, 950);


                            setTimeout(() => {

                                scheduleImage3.classList.add(
                                    'schedule-visible'
                                );

                            }, 1400);


                            setTimeout(() => {

                                scheduleEnding.classList.add(
                                    'schedule-visible'
                                );

                                if (canvas) {

                                    canvas.classList.add(
                                        'schedule-finished'
                                    );

                                }

                            }, 2100);


                            scheduleObserver.unobserve(
                                scheduleTitle
                            );

                        }

                    });

                },

                {
                    threshold: 0.6
                }

            );


        scheduleObserver.observe(
            scheduleTitle
        );

    }

});