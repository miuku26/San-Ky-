const assets = {
  food: [
    {
      name: "Bánh mì",
      src: "assets/food/banh-my.png",
      size: 1,
      type: "food"
    },
    {
      name: "Bát cơm",
      src: "assets/food/bat-com.png",
      size: 2,
      type: "food"
    },
    {
      name: "Cá pha muối",
      src: "assets/food/ca-pha-muoi.png",
      size: 6,
      type: "food"
    },
    {
      name: "Cá rô rán",
      src: "assets/food/ca-ro-ran.png",
      size: 8,
      type: "food"
    },
    {
      name: "Canh rau",
      src: "assets/food/canh-rau.png",
      size: 5,
      type: "food"
    },
    {
      name: "Đậu luộc",
      src: "assets/food/dau-luoc.png",
      size: 6,
      type: "food"
    },
    {
      name: "Đậu phụ tẩm hành",
      src: "assets/food/dau-phu-tam-hanh.png",
      size: 7,
      type: "food"
    },
    {
      name: "Gà rán",
      src: "assets/food/ga-ran.png",
      size: 1,
      type: "food"
    },
    {
      name: "Khoai tây chiên",
      src: "assets/food/khoai-tay-chien.png",
      size: 5,
      type: "food"
    },
    {
      name: "Lạc",
      src: "assets/food/lac.png",
      size: 3,
      type: "food"
    },
    {
      name: "Lẩu",
      src: "assets/food/lau.png",
      size: 4,
      type: "food"
    },
    {
      name: "Milk Tea",
      src: "assets/food/milktea.png",
      size: 4,
      type: "food"
    },
    {
      name: "Mì tôm",
      src: "assets/food/mi-tom.png",
      size: 4,
      type: "food"
    },
    {
      name: "Nước mắm",
      src: "assets/food/nuoc-mam.png",
      size: 9,
      type: "food"
    },
    {
      name: "Rau muống luộc",
      src: "assets/food/rau-muong-luoc.png",
      size: 5,
      type: "food"
    },
    {
      name: "Rau tập tàng",
      src: "assets/food/rau-tap-tang.png",
      size: 6,
      type: "food"
    },
    {
      name: "Sườn xào",
      src: "assets/food/suon-xao.png",
      size: 7,
      type: "food"
    },
    {
      name: "Tép rang",
      src: "assets/food/tep-rang.png",
      size: 1,
      type: "food"
    },
    {
      name: "Thịt ba chỉ kho tiêu",
      src: "assets/food/thit-ba-chi-kho-tieu.png",
      size: 2,
      type: "food"
    },
    {
      name: "Thịt nướng",
      src: "assets/food/thit-nuong.png",
      size: 4,
      type: "food"
    },
    {
      name: "Tóp mỡ",
      src: "assets/food/top-mo.png",
      size: 6,
      type: "food"
    }
  ],

  materials: [
    {
      name: "Đũa",
      src: "assets/materials/dua.png",
      size: 3,
      type: "materials"
    },
    {
      name: "Muôi",
      src: "assets/materials/muoi.png",
      size: 3,
      type: "materials"
    }
  ],

  table: [
    {
      name: "Bàn oval",
      src: "assets/table/ban.png",
      type: "table",
      width: 700,
      height: 450
    },
    {
      name: "Bàn chữ nhật",
      src: "assets/table/ban-2.png",
      type: "table",
      width: 720,
      height: 475
    },
    {
      name: "Mâm đồng",
      src: "assets/table/mam-dong.png",
      type: "table",
      width: 520,
      height: 520
    }
  ],

  other: []
};


const workspace =
  document.getElementById("workspace");

const assetList =
  document.getElementById("assetList");

const assetScroller =
  document.getElementById("assetScroller");

const categories =
  document.querySelectorAll(".category");

const undoBtn =
  document.getElementById("undoBtn");

const saveBtn =
  document.getElementById("saveBtn");

const saveMessage =
  document.getElementById("saveMessage");

const scrollLeft =
  document.getElementById("scrollLeft");

const scrollRight =
  document.getElementById("scrollRight");

const cameraFlash =
  document.getElementById("cameraFlash");

const photoPreview =
  document.getElementById("photoPreview");

const photoPreviewImage =
  document.getElementById("photoPreviewImage");


let currentCategory = "food";

let placedItems = [];

let history = [];

let selectedItem = null;

let nextId = 1;

let dragPreview = null;

let draggedAsset = null;

let isSaved = false;


const figmaSizes = {
  1: {
    width: 205,
    height: 121
  },

  2: {
    width: 134,
    height: 134
  },

  3: {
    width: 149,
    height: 145
  },

  4: {
    width: 149,
    height: 149
  },

  5: {
    width: 167,
    height: 151
  },

  6: {
    width: 154,
    height: 149
  },

  7: {
    width: 148,
    height: 145
  },

  8: {
    width: 220,
    height: 200
  },

  9: {
    width: 85,
    height: 85
  }
};


function getAssetSize(asset) {
  if (
    asset.type === "table" &&
    asset.width &&
    asset.height
  ) {
    return {
      width: asset.width,
      height: asset.height
    };
  }

  return (
    figmaSizes[asset.size] ||
    figmaSizes[3]
  );
}


function getThumbnailSize(asset) {
  if (asset.type === "table") {
    return {
      width: 190,
      height: 150
    };
  }

  if (asset.size === 9) {
    return {
      width: 130,
      height: 130
    };
  }

  return (
    figmaSizes[asset.size] ||
    figmaSizes[3]
  );
}


function renderAssets(category) {
  assetList.innerHTML = "";

  const list =
    assets[category] || [];

  list.forEach((asset) => {
    const button =
      document.createElement("button");

    button.type = "button";
    button.title = asset.name;

    if (asset.type === "table") {
      button.className =
        "asset-item table-thumbnail";
    } else {
      button.className =
        `asset-item size-${asset.size}`;
    }

    if (asset.size === 9) {
      button.style.width = "130px";
      button.style.height = "130px";
    }

    const image =
      document.createElement("img");

    image.src = asset.src;
    image.alt = asset.name;
    image.draggable = false;

    button.appendChild(image);

    button.addEventListener(
      "pointerdown",
      (event) => {
        startAssetDrag(
          event,
          asset
        );
      }
    );

    assetList.appendChild(button);
  });

  assetScroller.scrollLeft = 0;

  requestAnimationFrame(
    updateScrollArrows
  );
}


categories.forEach((button) => {
  button.addEventListener(
    "click",
    () => {
      categories.forEach(
        (item) => {
          item.classList.remove(
            "active"
          );
        }
      );

      button.classList.add(
        "active"
      );

      currentCategory =
        button.dataset.category;

      renderAssets(
        currentCategory
      );
    }
  );
});


function startAssetDrag(
  event,
  asset
) {
  if (isSaved) return;

  if (event.button !== 0) return;

  event.preventDefault();

  draggedAsset = asset;

  const thumbnailSize =
    getThumbnailSize(asset);

  dragPreview =
    document.createElement("img");

  dragPreview.src =
    asset.src;

  dragPreview.alt =
    asset.name;

  dragPreview.draggable =
    false;

  dragPreview.className =
    "drag-preview";

  let previewWidth =
    thumbnailSize.width;

  let previewHeight =
    thumbnailSize.height;

  if (asset.type === "table") {
    const realSize =
      getAssetSize(asset);

    previewWidth =
      realSize.width;

    previewHeight =
      realSize.height;

    const maxPreview = 320;

    if (
      previewWidth >
      maxPreview
    ) {
      const ratio =
        maxPreview /
        previewWidth;

      previewWidth *= ratio;
      previewHeight *= ratio;
    }

    if (
      previewHeight >
      maxPreview
    ) {
      const ratio =
        maxPreview /
        previewHeight;

      previewWidth *= ratio;
      previewHeight *= ratio;
    }
  }

  dragPreview.style.width =
    `${previewWidth}px`;

  dragPreview.style.height =
    `${previewHeight}px`;

  document.body.appendChild(
    dragPreview
  );

  moveAssetPreview(event);

  document.addEventListener(
    "pointermove",
    moveAssetPreview
  );

  document.addEventListener(
    "pointerup",
    finishAssetDrag
  );

  document.addEventListener(
    "pointercancel",
    cancelAssetDrag
  );
}


function moveAssetPreview(event) {
  if (!dragPreview) return;

  dragPreview.style.left =
    `${event.clientX}px`;

  dragPreview.style.top =
    `${event.clientY}px`;
}


function finishAssetDrag(event) {
  if (isSaved) {
    clearAssetDrag();
    return;
  }

  if (
    !dragPreview ||
    !draggedAsset
  ) {
    clearAssetDrag();
    return;
  }

  const boardRect =
    workspace.getBoundingClientRect();

  const insideWorkspace =
    event.clientX >=
      boardRect.left &&
    event.clientX <=
      boardRect.right &&
    event.clientY >=
      boardRect.top &&
    event.clientY <=
      boardRect.bottom;

  if (insideWorkspace) {
    const size =
      getAssetSize(
        draggedAsset
      );

    pushHistory();

    let x =
      event.clientX -
      boardRect.left -
      size.width / 2;

    let y =
      event.clientY -
      boardRect.top -
      size.height / 2;

    x = Math.max(
      0,
      Math.min(
        x,
        workspace.clientWidth -
          size.width
      )
    );

    y = Math.max(
      0,
      Math.min(
        y,
        workspace.clientHeight -
          size.height
      )
    );

    const item = {
      id: nextId++,

      name:
        draggedAsset.name,

      src:
        draggedAsset.src,

      type:
        draggedAsset.type,

      width:
        size.width,

      height:
        size.height,

      x,
      y
    };

    placedItems.push(item);

    selectedItem =
      item.id;

    renderWorkspace();
  }

  clearAssetDrag();
}


function cancelAssetDrag() {
  clearAssetDrag();
}


function clearAssetDrag() {
  document.removeEventListener(
    "pointermove",
    moveAssetPreview
  );

  document.removeEventListener(
    "pointerup",
    finishAssetDrag
  );

  document.removeEventListener(
    "pointercancel",
    cancelAssetDrag
  );

  if (dragPreview) {
    dragPreview.remove();
  }

  dragPreview = null;

  draggedAsset = null;
}


function renderWorkspace() {
  workspace.innerHTML = "";

  const order = {
    table: 1,
    food: 2,
    materials: 3,
    other: 4
  };

  const sortedItems =
    [...placedItems].sort(
      (a, b) => {
        return (
          (order[a.type] || 5) -
          (order[b.type] || 5)
        );
      }
    );

  sortedItems.forEach(
    (item) => {
      const image =
        document.createElement(
          "img"
        );

      image.src =
        item.src;

      image.alt =
        item.name;

      image.className =
        `placed-item type-${item.type || "food"}`;

      image.dataset.id =
        item.id;

      image.draggable =
        false;

      image.style.left =
        `${item.x}px`;

      image.style.top =
        `${item.y}px`;

      image.style.width =
        `${item.width}px`;

      image.style.height =
        `${item.height}px`;

      if (isSaved) {
        image.style.cursor =
          "default";

        image.style.pointerEvents =
          "none";
      } else {
        image.style.cursor =
          "grab";

        image.addEventListener(
          "pointerdown",
          startPlacedItemDrag
        );
      }

      workspace.appendChild(
        image
      );
    }
  );
}


function startPlacedItemDrag(
  event
) {
  if (isSaved) return;

  if (event.button !== 0) return;

  event.preventDefault();

  event.stopPropagation();

  const element =
    event.currentTarget;

  const id =
    Number(
      element.dataset.id
    );

  const item =
    placedItems.find(
      (object) =>
        object.id === id
    );

  if (!item) return;

  selectedItem = id;

  const beforeMove =
    JSON.stringify(
      placedItems
    );

  const startPointerX =
    event.clientX;

  const startPointerY =
    event.clientY;

  const startItemX =
    item.x;

  const startItemY =
    item.y;

  let actuallyMoved =
    false;

  element.setPointerCapture(
    event.pointerId
  );

  function move(moveEvent) {
    if (isSaved) return;

    const boardRect =
      workspace.getBoundingClientRect();

    const scaleX =
      boardRect.width /
      workspace.offsetWidth;

    const scaleY =
      boardRect.height /
      workspace.offsetHeight;

    const deltaX =
      (
        moveEvent.clientX -
        startPointerX
      ) /
      scaleX;

    const deltaY =
      (
        moveEvent.clientY -
        startPointerY
      ) /
      scaleY;

    if (
      Math.abs(deltaX) > 1 ||
      Math.abs(deltaY) > 1
    ) {
      actuallyMoved = true;
    }

    let newX =
      startItemX +
      deltaX;

    let newY =
      startItemY +
      deltaY;

    newX = Math.max(
      0,
      Math.min(
        newX,
        workspace.clientWidth -
          item.width
      )
    );

    newY = Math.max(
      0,
      Math.min(
        newY,
        workspace.clientHeight -
          item.height
      )
    );

    item.x = newX;
    item.y = newY;

    element.style.left =
      `${newX}px`;

    element.style.top =
      `${newY}px`;
  }

  function stop(stopEvent) {
    element.removeEventListener(
      "pointermove",
      move
    );

    element.removeEventListener(
      "pointerup",
      stop
    );

    element.removeEventListener(
      "pointercancel",
      stop
    );

    if (
      actuallyMoved &&
      !isSaved
    ) {
      history.push(
        beforeMove
      );

      if (
        history.length > 100
      ) {
        history.shift();
      }
    }

    try {
      element.releasePointerCapture(
        stopEvent.pointerId
      );
    } catch (error) {}
  }

  element.addEventListener(
    "pointermove",
    move
  );

  element.addEventListener(
    "pointerup",
    stop
  );

  element.addEventListener(
    "pointercancel",
    stop
  );
}


function pushHistory() {
  if (isSaved) return;

  history.push(
    JSON.stringify(
      placedItems
    )
  );

  if (
    history.length > 100
  ) {
    history.shift();
  }
}


undoBtn.addEventListener(
  "click",
  () => {
    if (isSaved) return;

    if (
      history.length === 0
    ) {
      return;
    }

    const previousState =
      history.pop();

    placedItems =
      JSON.parse(
        previousState
      );

    selectedItem = null;

    renderWorkspace();
  }
);


function updateScrollArrows() {
  const maxScroll =
    assetScroller.scrollWidth -
    assetScroller.clientWidth;

  if (
    assetScroller.scrollLeft > 5
  ) {
    scrollLeft.classList.add(
      "visible"
    );
  } else {
    scrollLeft.classList.remove(
      "visible"
    );
  }

  if (
    maxScroll > 5 &&
    assetScroller.scrollLeft <
      maxScroll - 5
  ) {
    scrollRight.classList.add(
      "visible"
    );
  } else {
    scrollRight.classList.remove(
      "visible"
    );
  }
}


scrollRight.addEventListener(
  "click",
  () => {
    assetScroller.scrollBy({
      left: 600,
      behavior: "smooth"
    });
  }
);


scrollLeft.addEventListener(
  "click",
  () => {
    assetScroller.scrollBy({
      left: -600,
      behavior: "smooth"
    });
  }
);


assetScroller.addEventListener(
  "scroll",
  updateScrollArrows
);


assetScroller.addEventListener(
  "wheel",
  (event) => {
    if (
      Math.abs(event.deltaY) >
      Math.abs(event.deltaX)
    ) {
      event.preventDefault();

      assetScroller.scrollLeft +=
        event.deltaY;
    }
  },
  {
    passive: false
  }
);


function playCameraFlash() {
  if (!cameraFlash) return;

  cameraFlash.classList.remove(
    "active"
  );

  void cameraFlash.offsetWidth;

  cameraFlash.classList.add(
    "active"
  );

  setTimeout(
    () => {
      cameraFlash.classList.remove(
        "active"
      );
    },
    500
  );
}


async function captureMealPhoto() {
  if (
    typeof html2canvas !==
    "function"
  ) {
    return null;
  }

  try {
    const canvas =
      await html2canvas(
        workspace,
        {
          backgroundColor:
            "#ffffff",

          scale: 1,

          useCORS: true,

          logging: false
        }
      );

    return canvas.toDataURL(
      "image/png"
    );

  } catch (error) {
    console.error(
      "Không chụp được bàn ăn:",
      error
    );

    return null;
  }
}


function showPhotoPreview(
  dataURL
) {
  if (!dataURL) return;

  if (
    !photoPreview ||
    !photoPreviewImage
  ) {
    return;
  }

  photoPreviewImage.src =
    dataURL;

  photoPreview.classList.remove(
    "show"
  );

  void photoPreview.offsetWidth;

  photoPreview.classList.add(
    "show"
  );
}


function showSavedMessage() {
  if (!saveMessage) return;

  saveMessage.classList.add(
    "show"
  );

  setTimeout(
    () => {
      saveMessage.classList.remove(
        "show"
      );
    },
    1200
  );
}


saveBtn.addEventListener(
  "click",
  async () => {
    if (isSaved) return;

    const saveData = {
      version: 13,
      items: placedItems
    };

    localStorage.setItem(
      "myMealSetup",
      JSON.stringify(
        saveData
      )
    );

    isSaved = true;

    selectedItem = null;

    history = [];

    clearAssetDrag();

    renderWorkspace();

    saveBtn.textContent =
      "SAVED";

    saveBtn.classList.add(
      "saved"
    );

    const photo =
      await captureMealPhoto();

    if (photo) {
      try {
        localStorage.setItem(
          "archiveMealPhoto",
          photo
        );
      } catch (error) {
        console.error(
          "Không lưu được ảnh bàn ăn:",
          error
        );
      }
    }

    playCameraFlash();

    setTimeout(
      () => {
        if (photo) {
          showPhotoPreview(
            photo
          );
        }

        showSavedMessage();
      },
      180
    );

    setTimeout(
      () => {
        document.body.classList.add(
          "page-leaving"
        );
      },
      1700
    );

    setTimeout(
      () => {
         window.location.href =
            "./Archive/archive.html";
      },
      2900
    );
  }
);


document.addEventListener(
  "keydown",
  (event) => {
    if (isSaved) return;

    if (
      event.key !== "Delete" &&
      event.key !== "Backspace"
    ) {
      return;
    }

    if (
      selectedItem === null
    ) {
      return;
    }

    pushHistory();

    placedItems =
      placedItems.filter(
        (item) =>
          item.id !==
          selectedItem
      );

    selectedItem = null;

    renderWorkspace();
  }
);


window.addEventListener(
  "load",
  () => {
    document.body.classList.remove(
      "page-leaving"
    );

    updateScrollArrows();
  }
);


window.addEventListener(
  "pageshow",
  () => {
    document.body.classList.remove(
      "page-leaving"
    );
  }
);


placedItems = [];

history = [];

selectedItem = null;

nextId = 1;

isSaved = false;


renderAssets("food");

renderWorkspace();
const questionIntro =
    document.getElementById('questionIntro');

const questionOne =
    document.getElementById('questionOne');

const questionTwo =
    document.getElementById('questionTwo');

const mealApp =
    document.getElementById('mealApp');

let questionStep = 1;
let canScrollToMeal = false;
let isScrollingToMeal = false;
let enteredMeal = false;

if (
    questionIntro &&
    questionOne &&
    questionTwo &&
    mealApp
) {

    window.scrollTo(0, 0);

    document.body.style.overflow = 'hidden';

    questionIntro.addEventListener('click', () => {

        if (questionStep !== 1) return;

        questionStep = 2;

        questionIntro.classList.add(
            'show-question-two'
        );

        setTimeout(() => {

            document.body.style.overflow = '';
            canScrollToMeal = true;

        }, 1000);

    });

    window.addEventListener(
        'wheel',
        event => {

            if (enteredMeal) {

                if (event.deltaY < 0) {

                    event.preventDefault();

                    const mealTop =
                        mealApp.offsetTop;

                    if (window.scrollY < mealTop) {

                        window.scrollTo(
                            0,
                            mealTop
                        );

                    }

                }

                return;
            }

            if (
                questionStep !== 2 ||
                !canScrollToMeal ||
                isScrollingToMeal ||
                event.deltaY <= 0
            ) {
                return;
            }

            event.preventDefault();

            isScrollingToMeal = true;

            mealApp.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            setTimeout(() => {

                enteredMeal = true;
                isScrollingToMeal = false;

                questionIntro.style.display =
                    'none';

                window.scrollTo(0, 0);

            }, 1200);

        },
        {
            passive: false
        }
    );

}