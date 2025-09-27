
var introElements = [];
var introInstructions;
var introSampleWindow;
var introTitleDisplay;
var introArrow;
var introFinger;

function commongameintro() {
  removeGameIntro();

  introElements = [];

  if (typeof Title !== "undefined" && Title) {
    introTitleDisplay = Title.clone();
    introTitleDisplay.visible = true;
  } else {
    introTitleDisplay = new createjs.Text("Sparrow Hunt", "700 56px 'Baloo 2'", "#ffffff");
    introTitleDisplay.textAlign = "center";
  }
  introTitleDisplay.x = canvas.width / 2;
  introTitleDisplay.y = 120;
  introElements.push(introTitleDisplay);
  container.parent.addChild(introTitleDisplay);

  introInstructions = new createjs.Text(
    "Watch all ten windows open together. Remember where the sparrow hides, then tap that window to score 10 points! You can exit any time with the close button.",
    "400 26px 'Baloo 2'",
    "#ffffff"
  );
  introInstructions.textAlign = "center";
  introInstructions.lineWidth = 760;
  introInstructions.x = canvas.width / 2;
  introInstructions.y = 230;
  introInstructions.shadow = new createjs.Shadow("rgba(0,0,0,0.35)", 0, 4, 12);
  introElements.push(introInstructions);
  container.parent.addChild(introInstructions);

  introSampleWindow = createIntroWindow();
  introSampleWindow.x = canvas.width / 2 - 120;
  introSampleWindow.y = 420;
  introSampleWindow.scaleX = introSampleWindow.scaleY = 1.1;
  introElements.push(introSampleWindow);
  container.parent.addChild(introSampleWindow);

  if (typeof arrow1 !== "undefined" && arrow1) {
    introArrow = arrow1.clone();
    introArrow.x = canvas.width / 2 + 60;
    introArrow.y = 360;
    introArrow.rotation = -30;
    introArrow.visible = true;
    introElements.push(introArrow);
    container.parent.addChild(introArrow);
  }

  if (typeof fingure !== "undefined" && fingure) {
    introFinger = fingure.clone();
    introFinger.x = canvas.width / 2 + 130;
    introFinger.y = 470;
    introFinger.rotation = 12;
    introFinger.visible = true;
    introElements.push(introFinger);
    container.parent.addChild(introFinger);
  }
}

function createIntroWindow() {
  var sample = new createjs.Container();

  var windowFrame = new createjs.Shape();
  windowFrame.graphics
    .beginLinearGradientFill(["#a8dadc", "#48cae4"], [0, 1], -80, -90, 80, 90)
    .drawRoundRect(-90, -110, 180, 220, 24);
  sample.addChild(windowFrame);

  var sparrow = createSparrow();
  sparrow.x = 0;
  sparrow.y = 0;
  sample.addChild(sparrow);

  var caption = new createjs.Text("Sparrow", "600 24px 'Baloo 2'", "#0d1b2a");
  caption.textAlign = "center";
  caption.y = 140;
  sample.addChild(caption);

  return sample;
}

function removeGameIntro() {
  if (!introElements) {
    introElements = [];
    return;
  }

  for (var i = 0; i < introElements.length; i++) {
    var item = introElements[i];
    if (item && item.parent) {
      item.parent.removeChild(item);
    }
  }
  introElements = [];

  if (introArrow && introArrow.parent) {
    introArrow.parent.removeChild(introArrow);
  }
  introArrow = null;

  if (introFinger && introFinger.parent) {
    introFinger.parent.removeChild(introFinger);
  }
  introFinger = null;
}
