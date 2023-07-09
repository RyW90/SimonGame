//随机数转换为颜色
const colorDic = ["green", "red", "yellow", "blue"];
//存储本次游戏的颜色序列
var colorArray = [];
//存储玩家的按键次序
var results = [];
//存储当前关卡
var level = 0;
//当前按键的index
var checkIndex = 0;

//生成随机颜色
function randomColor() {
  let index = Math.floor(Math.random() * 4);
  return colorDic[index];
}

//为start button增加监听事件，开始游戏
$("button").on("click", startGame);

//开始游戏
function startGame() {
  //为色块增加点击监听事件，点击色块
  $("div.btn").off("click");
  $("div.btn").on("click", clickColorBtn);
  console.log("normal");
  colorArray = [];
  results = [];
  level = 0;
  checkIndex = 0;
  $("button").hide();
  colorArray.push(randomColor());
  aniFun("#" + colorArray[level], "pressed");
  playSound("./sounds/" + colorArray[level] + ".mp3");
  level = level + 1;
  $("h1").text("Level " + level);
  console.log(colorArray, results, level, checkIndex);
}

//开始下一关
function nextLevel() {
  colorArray.push(randomColor());
  aniFun("#" + colorArray[level], "pressed");
  playSound("./sounds/" + colorArray[level] + ".mp3");
  level = level + 1;
  $("h1").text("Level " + level);
  results = [];
  checkIndex = 0;
  console.log(colorArray, results, level, checkIndex);
  $("div.btn").on("click", clickColorBtn);
}

//点击色块操作
function clickColorBtn() {
  aniFun("#" + this.id, "pressed");
  results.push(this.id);
  checkIndex = checkIndex + 1;
  console.log(colorArray, results, level, checkIndex);
  if (
    JSON.stringify(results.slice(0, checkIndex)) ==
    JSON.stringify(colorArray.slice(0, checkIndex))
  ) {
    playSound("./sounds/" + this.id + ".mp3");
    if (checkIndex === level) {
      $("div.btn").off("click");
      setTimeout(nextLevel, 1000);
    }
  } else {
    $("div.btn").off("click");
    $("h1").text("Game Over");
    playSound("./sounds/wrong.mp3");
    aniFun("body", "game-over");
    console.log(colorArray, results, level, checkIndex, "error");
    $("div.btn").off("click");
    $("div.btn").on("click", errorMode);
    console.log("error");
    $("button").show();
    $("button").text("RESTART");
  }
  //   const key = this.innerHTML;
  //   const path = "sounds/" + soundPaths[key];
  //   playSound(path);
  //   animationFade(key);
}

//error mode
function errorMode() {
  aniFun("#" + this.id, "pressed");
  playSound("./sounds/wrong.mp3");
  aniFun("body", "game-over");
  console.log(colorArray, results, level, checkIndex, "error");
}

//播放声音
function playSound(path) {
  var sound = new Audio(path);
  sound.play();
}

// $("body").on("keydown", function (event) {
//   const path = "sounds/" + soundPaths[event.key];
//   playSound(path);
//   animationFade(event.key);
// });

//对应元素，动画
function aniFun(tag, className) {
  $(tag).addClass(className);
  setTimeout(function () {
    $(tag).removeClass(className);
  }, 200);
}
