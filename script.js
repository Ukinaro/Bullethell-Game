var field = document.getElementById("field")
var speed = 1
var updateObjs = []

class Enemy {
    constructor(x, y, size = 5, color = [219, 20, 20], HP = 1, speed = 5) {
        var newEnemyBody = document.createElement("div");
        field.appendChild(newEnemyBody);
        this.body = newEnemyBody;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.HP = HP;
        this.speed = speed;

        this.body.style.left = x + "%";
        this.body.style.top = y + "%";
        this.body.style.width =  size + "%"
        this.body.style.height =  size + "%";
        this.body.style.position = "absolute";
        this.body.style.backgroundColor = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
        this.body.style.transform = "translate(-50%, -50%)";
        this.body.style.zindex = "9998";
    }
}

var Enemys = []

class Protagonist {
    constructor(x, y, size = 100, color = [73, 48, 214], HP = 1, speed = 5) {
        var newBody = document.createElement("div");
        field.appendChild(newBody);
        this.body = newBody;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.HP = HP;
        this.speed = speed;

        this.body.style.left = x + "%";
        this.body.style.top = y + "%";
        this.body.style.width =  size + "px"
        this.body.style.height =  size + "px";
        this.body.style.position = "absolute";
        this.body.style.backgroundColor = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
        this.body.style.transform = "translate(-50%, -50%)";
        this.body.style.zindex = "9999";
    }


    Move(x,y){
        this.x += x;
        this.y += y;
        this.body.style.top = this.y + "%";
        this.body.style.left = this.x + "%";

    }

    Shoot(){
        updateObjs.push(new BulletU(this.x, this.y))
    }


    
}
class BulletU {
    constructor(x,y,color = [230,166,15], size = 10){
        var newBody = document.createElement("div");
        field.appendChild(newBody);
        this.body = newBody;
        this.x = x;
        this.y = y;

        this.body.style.left = x + "%";
        this.body.style.top = y + "%";
        this.body.style.width =  size + "px"
        this.body.style.height =  size + "px";
        this.body.style.position = "absolute";
        this.body.style.borderRadius = size/2 + "px"
        this.body.style.backgroundColor = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
        this.body.style.transform = "translate(-50%, -50%)";
        this.body.style.zindex = "9997";
        this.body.style.animation = "glow 1s infinite alternate"
        this.body.classList.add("glow");

    }

    Update(){
        this.y -= 2

        this.body.style.top = this.y + "%"
    }

}

var player = new Protagonist(50, 90);

function Keys(event){
    console.log("\"" + event.key + "\"")
    // if (event.key == "ArrowUp") {
    //     player.Move(0,-speed);
    // }
    // else if (event.key == "ArrowDown") {
    //     player.Move(0,speed);
    // }
    if (event.key == "ArrowLeft") {
        player.Move(-speed,0);
    }
    else if (event.key == "ArrowRight") {
        player.Move(speed,0);
    }
    else if (event.key == " ") {
        player.Shoot();
    }
}

function GlobalUpdate(){
    console.log("Hey")
    updateObjs.forEach(function(obj){
        obj.Update()
    })
}

function CreateEnemys(num){
    if (num<2){
        return
    }
    for (let i = 0; i < num; i++){
        var A = (100 - num*5 - 5)/(num-1)
        Enemys.push(new Enemy(i*(A + 5) + 5, 5))
    }

}




function CreateGame(){
    CreateEnemys(7)
    // console.log(Enemys)


}
setInterval(GlobalUpdate, 5);
document.addEventListener("DOMContentLoaded", CreateGame);
document.addEventListener("keydown", Keys);