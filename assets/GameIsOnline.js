var canvas = document.getElementById("gameCanvas");

if (canvas) {
  var fallbackStage = null;
  var activeStageRef = null;
  var overlayVisible = false;
  var reloadTimer = null;

  var offlineContainer = new createjs.Container();
  offlineContainer.mouseEnabled = false;
  offlineContainer.mouseChildren = false;
  offlineContainer.visible = false;

  var fallbackBackdrop = new createjs.Shape();
  offlineContainer.addChild(fallbackBackdrop);

  var fallbackHeadline = new createjs.Text(
    "Please check your internet connectivity!",
    "700 42px 'Baloo 2'",
    "#F7F3FF"
  );
  fallbackHeadline.textAlign = "center";
  fallbackHeadline.textBaseline = "middle";
  fallbackHeadline.shadow = new createjs.Shadow("rgba(8,12,36,0.55)", 0, 8, 20);
  offlineContainer.addChild(fallbackHeadline);

  function getStageReference() {
    var stageRef = null;
    if (typeof stage !== "undefined" && stage && stage.canvas === canvas) {
      stageRef = stage;
      if (fallbackStage) {
        createjs.Ticker.removeEventListener("tick", fallbackStage);
        fallbackStage.removeAllChildren();
        fallbackStage = null;
      }
    } else {
      if (!fallbackStage) {
        fallbackStage = new createjs.Stage(canvas);
        createjs.Ticker.addEventListener("tick", fallbackStage);
      }
      stageRef = fallbackStage;
    }

    if (stageRef && activeStageRef !== stageRef) {
      if (offlineContainer.parent) {
        offlineContainer.parent.removeChild(offlineContainer);
      }
      stageRef.addChild(offlineContainer);
      stageRef.setChildIndex(offlineContainer, stageRef.numChildren - 1);
      activeStageRef = stageRef;
    }

    return stageRef;
  }

  function layoutFallback(stageRef) {
    if (!stageRef || !stageRef.canvas) {
      return;
    }

    var width = stageRef.canvas.width || 1280;
    var height = stageRef.canvas.height || 720;
    var radius = Math.min(42, Math.max(width, height) * 0.05);

    offlineContainer.x = width / 2;
    offlineContainer.y = height / 2;

    fallbackBackdrop.graphics
      .clear()
      .beginFill("rgba(12,10,40,0.78)")
      .drawRoundRect(-width / 2, -height / 2, width, height, radius);

    fallbackHeadline.lineWidth = Math.max(320, width * 0.65);
    fallbackHeadline.x = 0;
    fallbackHeadline.y = 0;
  }

  function getLanguageKey() {
    return typeof assetsPathLang === "string" ? assetsPathLang : "";
  }

  function getOfflineCopy() {
    if (typeof SAUIX_getConnectivityCopy === "function") {
      return SAUIX_getConnectivityCopy("offline", getLanguageKey());
    }
    return null;
  }

  function showOfflineOverlay() {
    var stageRef = getStageReference();
    layoutFallback(stageRef);

    var copy = getOfflineCopy();
    var hasEnhancedPanel =
      typeof SAUIX_showConnectivityOverlay === "function" && copy;

    if (hasEnhancedPanel) {
      SAUIX_showConnectivityOverlay({
        stage: stageRef,
        message: copy.title,
        detail: copy.detail,
        iconType: copy.iconType,
      });
      offlineContainer.visible = false;
    } else {
      fallbackHeadline.text =
        copy && copy.title
          ? copy.title
          : "Please check your internet connectivity!";
      offlineContainer.visible = true;
    }

    overlayVisible = true;
  }

  function hideOfflineOverlay(immediate) {
    if (!overlayVisible) {
      return;
    }

    overlayVisible = false;
    offlineContainer.visible = false;

    if (typeof SAUIX_hideConnectivityOverlay === "function") {
      var stageRef = getStageReference();
      SAUIX_hideConnectivityOverlay({
        stage: stageRef,
        immediate: !!immediate,
      });
    }
  }

  function startReloadTimer() {
    if (reloadTimer) {
      return;
    }
    reloadTimer = setInterval(function () {
      if (!navigator.onLine) {
        window.location.reload(true);
      }
    }, 3000);
  }

  function stopReloadTimer() {
    if (!reloadTimer) {
      return;
    }
    clearInterval(reloadTimer);
    reloadTimer = null;
  }

  function updateOfflineState(isOnline) {
    if (!isOnline) {
      if (!overlayVisible) {
        showOfflineOverlay();
      } else if (typeof SAUIX_refreshConnectivityOverlayLayout === "function") {
        SAUIX_refreshConnectivityOverlayLayout(activeStageRef);
      }
      startReloadTimer();
    } else {
      hideOfflineOverlay();
      stopReloadTimer();
    }
  }

  function tickHandler() {
    var stageRef = getStageReference();
    layoutFallback(stageRef);
    updateOfflineState(navigator.onLine);
  }

  createjs.Ticker.addEventListener("tick", tickHandler);

  window.addEventListener("online", function () {
    updateOfflineState(true);
  });

  window.addEventListener("offline", function () {
    updateOfflineState(false);
  });

  updateOfflineState(navigator.onLine);
}
