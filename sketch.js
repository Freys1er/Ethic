//p5.disableFriendlyErrors = true;
let loadingdata = true;
let scroll = {
  position: 0,
  velocity: 0,
};
let sign_in_field;
let images = {};

function setup() {
  data = loadTable(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRduFxvAWf-KVSQ0OTYEc4e9QQaISR5qsVBgkMEtVcNNFvPFho6DOS40MZnNhm-ECcvcfurJERjHHax/pub?gid=1848718501&single=true&output=csv",
    "header",
    "csv",
    () => (loadingdata = false)
  );
  font("Roboto");
  images.google = loadImage("images/Google_logo.svg");
  images.account = loadImage("images/Account_icon.svg");
  images.home = loadImage("images/Home_icon.svg");
  images.vote = loadImage("images/Vote_icon.svg");
  images.chat = loadImage("images/Chat_icon.svg");
  images.people = loadImage("images/Group_icon.svg");
  images.status = loadImage("images/Status.svg");
  images.event = loadImage("images/Calender.svg");
  images.secret = loadImage("images/Secret.svg");
  images.cancel = loadImage("images/Cancel.svg");

  createCanvas(windowWidth, windowHeight);

  style = {
    background: "rgb(19,20,24)",
    icongrey: "rgb(70,70,80)",
  };

  animation = {
    open: 0,
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function sendData(datatosend) {
  window.location.replace(
    "https://docs.google.com/forms/d/e/1FAIpQLSerkXh288OIkpgtKUYdE8KUTAVg9rUSYo7rkjYtx1l-176OJw/viewform?usp=pp_url&entry.1591610999=" +
      datatosend
  );
  print("Data sent to server");
}

function mouseinarea(x, y, w, h) {
  let a = mouseX > x && mouseY > y && mouseX < w + x && mouseY < h + y;
  if (a) {
    cursor("pointer");
  } else {
    cursor();
  }
  return a;
}

function loading() {
  background(0);
  let s = width / 5;
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = color(200, 200, 255);

  noFill();
  stroke(255);
  strokeWeight(10);
  strokeJoin(ROUND);

  push();
  translate(width / 2, height / 2);
  let x = frameCount / 20;
  rotate(1.5 * x - cos(x));
  triangle(
    s * sin(0),
    s * cos(0),
    s * sin((2 * PI) / 3),
    s * cos((2 * PI) / 3),
    s * sin((4 * PI) / 3),
    s * cos((4 * PI) / 3)
  );
  pop();

  drawingContext.shadowBlur = 0;

  noStroke();
  textSize(width / 20);
  textAlign(CENTER, CENTER);
  fill(255);
  if (frameCount > 100) {
    text("This is taking longer then usual...", width / 2, height * 0.8);
  }
}

let page = "Sign_In";
let afterloading = true;
let user_data = {};
let account = { miniview: false };
let mousehold = 0;
let redirect = "Sign_In";

function nav_bar(x) {
  fill(15, 16, 26);
  noStroke();
  rect(0, height * 0.87, width, height);
  if (mouseY > height * 0.87) {
    cursor("pointer");
  }
  imageMode(CENTER);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  textSize(height / 60);
  if (x === 3) {
    tint("#ffffff");
    fill(255);
  } else {
    tint(style.icongrey);
    fill(style.icongrey);
  }
  image(images.status, width / 2, height * 0.91, height * 0.05, height * 0.05);
  text("Home", width / 2, height * 0.945);
  if (x === 2) {
    tint("#ffffff");
    fill(255);
  } else {
    tint(style.icongrey);
    fill(style.icongrey);
  }
  image(
    images.vote,
    (width / 30) * 9,
    height * 0.91,
    height * 0.05,
    height * 0.05
  );
  text("Issues", (width / 30) * 9, height * 0.945);
  if (x === 1) {
    tint("#ffffff");
    fill(255);
  } else {
    tint(style.icongrey);
    fill(style.icongrey);
  }
  image(
    images.people,
    (width / 30) * 3,
    height * 0.91,
    height * 0.05,
    height * 0.05
  );
  text("Social", (width / 30) * 3, height * 0.945);
  if (x === 4) {
    tint("#ffffff");
    fill(255);
  } else {
    tint(style.icongrey);
    fill(style.icongrey);
  }
  image(
    images.event,
    (width / 30) * 21,
    height * 0.91,
    height * 0.05,
    height * 0.05
  );
  text("Events", (width / 30) * 21, height * 0.945);
  if (x === 5) {
    tint("#ffffff");
    fill(255);
  } else {
    tint(style.icongrey);
    fill(style.icongrey);
  }
  image(
    images.secret,
    (width / 30) * 27,
    height * 0.91,
    height * 0.05,
    height * 0.05
  );
  text("Secrets", (width / 30) * 27, height * 0.945);
  tint("white");
}
function obj(string) {
  try {
    let obj = JSON.parse(string);
    return obj;
  } catch (error) {
    return false;
  }
}
let issues = {
  list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  selected: "",
};

function mouseWheel(event) {
  scroll.velocity = -event.delta;
}
function pasteltext(txt) {
  let num = 0;
  for (let i = 0; i < txt.length; i++) {
    num += txt.charCodeAt(i) * 10;
  }
  let r = sin(num + 120) * 32 + 200;
  let g = sin(num + 60) * 32 + 200;
  let b = sin(num) * 32 + 200;
  return [r, g, b];
}
let style = {};
let animation = {};

function panel(x, y, t) {
  noStroke();
  rect(width / 20, 0, width * 0.9, height * 0.35 - y, 20);
  rect(width / 20, 0, width * 0.9 - x, height * 0.35, 20);

  rect(width / 20, 0, width * 0.9 - x / 2, height * 0.35 - y / 2, 20);

  fill(style.background);
  rect(width * 0.95 - x, height * 0.35 - y, x, y, 20);
}
function draw() {
  if (redirect !== page && !mouseIsPressed) {
    storeItem("PAGE", redirect);
    page = redirect;
    print(redirect);
    if (page === "Issues") {
      issues.list = [];
      for (let i = 0; i < data.length; i++) {
        item = obj(data[i][2]);
        if (item.type === "vote") {
          let index = issues.list.findIndex(
            (issue) => issue.name === item.type
          );
          if (index === -1) {
            issues.list.push({ name: item.Text, votes: [item.Vote] });
          } else {
            issues.list[index].votes.push(item.vote);
          }
        }
      }
      print(issues.list);
    }
  }
  if (loadingdata) {
    loading();
    animation.open = 100;
  } else {
    if (afterloading) {
      if (animation.open > max([width, height])) {
        drawingContext.shadowBlur = 0;
        data = data.getArray();
        afterloading = false;
        print("Last updated: " + data[data.length - 1][0]);

        if (getItem("SessionID")) {
          for (let i = data.length - 1; i >= 0; i--) {
            if (
              obj(data[i][2]).type === "sign_in" &&
              obj(data[i][2]).sessionid === getItem("SessionID")
            ) {
              user_data.email = data[i][1];
              redirect = "Home";
              print("Session ID found");
              break;
            }
          }
          console.log("Searched database");
        } else {
          console.log("Not signed in");
          redirect = "Sign_In";
        }

        redirect = getItem("PAGE");
        if (redirect) {
          print("Restoring previous page: " + redirect);
        } else {
          redirect = "Sign_In";
          print("Could'nt restore page");
        }
      } else {
        background(0);
        animation.open *= 1.1;
        let s = animation.open;
        drawingContext.shadowBlur = 32;
        drawingContext.shadowColor = color(200, 200, 255);

        noFill();
        stroke(255);
        strokeWeight(10);
        strokeJoin(ROUND);

        push();
        translate(width / 2, height / 2);
        let x = frameCount / 20;
        rotate(1.5 * x - cos(x));
        triangle(
          s * sin(0),
          s * cos(0),
          s * sin((2 * PI) / 3),
          s * cos((2 * PI) / 3),
          s * sin((4 * PI) / 3),
          s * cos((4 * PI) / 3)
        );
        pop();
      }
    } else if (page === "Issues") {
      background(style.background);
      if (mouseIsPressed) {
        scroll.velocity = mouseY - pmouseY;
      }
      scroll.position += scroll.velocity;
      scroll.velocity *= 0.95;
      if (scroll.position > 0) {
        scroll.position = 0;
        scroll.velocity = 0;
      }

      //draw list
      textSize(height / 30);
      textStyle(BOLD);
      if (
        height / 4 + height * 0.43 * issues.list.length <
        height - scroll.position
      ) {
        scroll.position =
          height - (height / 4 + height * 0.43 * issues.list.length);
      }
      for (let i = 0; i < issues.list.length; i++) {
        let col = pasteltext(issues.list[i].name);
        fill(col[0], col[1], col[2]);
        noStroke();

        push();
        //draw shape
        translate(0, height * 0.43 * i + scroll.position + height * 0.09);
        panel(100, 100);

        if (col[0] + col[1] + col[2] < (255 / 2) * 3) {
          fill(255);
        } else {
          fill(0);
        }
        textAlign(LEFT, TOP);
        text(
          issues.list[i].name,
          width / 10,
          height * 0.04,
          width * 0.8,
          height * 0.4
        );
        pop();
      }

      //homescreen
      fill(style.background);
      rect(
        0,
        -10,
        width,
        map(
          constrain(scroll.position, -200, 0),
          0,
          -200,
          height / 50,
          height / 200
        ) +
          10 +
          map(
            constrain(scroll.position, -200, 0),
            0,
            -200,
            height / 20,
            height / 40
          ),
        10
      );
      fill(255);
      textSize(
        map(
          constrain(scroll.position, -200, 0),
          0,
          -200,
          height / 20,
          height / 40
        )
      );
      textAlign(CENTER, TOP);
      textStyle(BOLD);
      text(
        "Issues",
        map(
          constrain(scroll.position, -200, 0),
          0,
          -200,
          height / 10,
          width / 2
        ),
        map(
          constrain(scroll.position, -200, 0),
          0,
          -200,
          height / 50,
          height / 200
        )
      );

      //bottom navbar
      nav_bar(2);
      if (mouseY > height * 0.92) {
        let icon_number = int(map(mouseX, 0, width, 1, 6));
        nav_bar(icon_number);
        if (mousehold === 1) {
          list = ["Social", "Issues", "Home", "Events", "Secrets"];
          redirect = list[icon_number - 1];
        }
      }
    } else if (page === "Home") {
      if (mouseinarea(0, 0, height / 16, height / 16) && mousehold === 1) {
        redirect = "Account";
        mousehold = 0;
      }
      background(style.background);
      //homescreen
      fill(255);
      textSize(height / 35);
      textAlign(CENTER, TOP);
      textStyle(BOLD);
      text("Home", width / 2, height / 50);

      imageMode(CORNER);
      tint("white");
      image(images.account, height / 70, height / 70, height / 15, height / 15);

      //bottom navbar
      nav_bar(3);
      if (mouseY > height * 0.92) {
        let icon_number = int(map(mouseX, 0, width, 1, 6));
        nav_bar(icon_number);
        if (mousehold === 1) {
          list = ["Social", "Issues", "Home", "Events", "Secrets"];
          redirect = list[icon_number - 1];
        }
      }
    } else if (page === "Account") {
      background(0);
      fill(255);
      textSize(height / 35);
      textAlign(CENTER, TOP);
      textStyle(BOLD);

      text("Home", width / 2, height / 50);
      textAlign(CENTER, CENTER);
      textSize(width / 20);
      fill(255);
      noStroke();
      text(user_data.email, width / 2, height * 0.28);

      stroke(255, 0, 0);
      fill(0);
      strokeWeight(3);
      if (
        mouseinarea(
          width / 10,
          height * 0.9,
          width - (width / 10) * 2,
          height / 15
        )
      ) {
        fill(30, 0, 0);
      }
      rect(width / 10, height * 0.9, width - (width / 10) * 2, height / 15, 10);

      fill(255, 0, 0);
      noStroke();
      textSize(width / 18);
      text(
        "SIGN OUT",
        width / 10,
        height * 0.9,
        width - (width / 10) * 2,
        height / 15
      );

      if (
        mouseinarea(
          width / 10,
          height * 0.9,
          width - (width / 10) * 2,
          height / 15
        ) &&
        mousehold === 1
      ) {
        redirect = "Sign_In";
        mousehold = 0;
      }

      imageMode(CORNER);
      image(images.cancel, height / 70, height / 70, height / 15, height / 15);

      imageMode(CENTER, CENTER);
      image(images.account, width / 2, height * 0.2, height / 10, height / 10);

      if (mouseinarea(0, 0, height / 14, height / 14) && mouseIsPressed) {
        redirect = "Home";
      }
    } else {
      background(255);
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = "rgb(150,150,150)";
      stroke(255);
      fill(255);
      rect(width / 10, height / 4, width - width / 5, height - height / 2, 30);
      drawingContext.shadowBlur = 0;
      rect(width / 10, height / 4, width - width / 5, height - height / 2, 30);
      imageMode(CENTER);
      image(images.google, width / 2, height / 2.9, height / 10, height / 10);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(min(width / 12, height / 10) * 0.9);
      textStyle(BOLD);
      text("Sign in to Ethic", width / 2 - 5, height / 2.1);

      //Sign In Button
      noStroke();
      if (
        mouseinarea(width / 4, height * 0.57, width - width / 2, height / 12)
      ) {
        fill(100);
        if (mouseIsPressed) {
          sessionid = random(0, 999999999999999999);
          sendData('{"sessionid":' + sessionid + ',"type":"sign_in"}');
          storeItem("SessionID", sessionid);
          storeItem("PAGE", "Home");
        }
      }

      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 5;
      drawingContext.shadowColor = "rgb(0,0,0)";
      rect(width / 4, height * 0.57, width - width / 2, height / 12, 100);
      drawingContext.shadowBlur = 0;

      fill(255);
      textAlign(CENTER, CENTER);
      textSize(height / 28);
      text("Sign In", width / 4, height * 0.57, width - width / 2, height / 12);

      if (user_data.email) {
        noStroke();
        fill(0);
        if (mouseinarea(width * 0.2, height * 0.83, width * 0.6, height / 30)) {
          fill(0);
        } else {
          fill(0, 102, 204);
        }
        textSize(height / 40);
        textAlign(CENTER);
        text("Continue with Current Account", width / 2, height * 0.85);

        strokeWeight(1);
        if (mouseinarea(width * 0.2, height * 0.83, width * 0.6, height / 30)) {
          stroke(0);
          if (mouseIsPressed) {
            redirect = "Home";
          }
        } else {
          stroke(0, 102, 204);
        }
        line(
          width / 2 + textWidth("Continue with Current Account") / 2,
          height * 0.86,
          width / 2 - textWidth("Continue with Current Account") / 2 + 3,
          height * 0.86
        );
      }
    }
  }

  if (mouseIsPressed) {
    mousehold++;
  } else {
    mousehold = 0;
  }
}
