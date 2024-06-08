var field = document.getElementById("field");
var speed = 1;
var updateObjs = [];
var bulletsID = 0
var enemyBuletsID = 0
var enemysID = 0
var gameOver = document.getElementById("gameover")
var levelComplete = document.getElementById("levelcomplete")
var score = 0

class Enemy {
    constructor(x, y, ID, size = 5, color = [219, 20, 20], HP = 1, speed = 5) {
        var newEnemyBody = document.createElement("div");
        field.appendChild(newEnemyBody); 
        this.body = newEnemyBody;
        this.ID = ID
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.HP = HP;
        this.speed = speed;
        this.timer = 100

        this.body.style.left = x + "%";
        this.body.style.top = y + "%";
        this.body.style.width =  size + "%"
        this.body.style.height =  size + "%";
        this.body.style.position = "absolute";
        this.body.style.backgroundColor = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
        this.body.style.transform = "translate(-50%, -50%)";
        this.body.style.zindex = "1";

    }

    EnemyShoot(delay){
        if (this.timer != 0){
            this.timer -= 1
        }
        else{
            if (player.HP > 0) {
                if (player.x >= this.x && player.x <= this.x + this.size){
                    if (Math.random() < 0.05){
                        enemyBuletsID -= 1
                        updateObjs.push(new BulletU(this.x, this.y, enemyBuletsID))
                        this.timer = 400
                    }
                }  
            }
        }
    }   
    

    Death() {
        if (this.HP == 0) {
            this.body.remove()
            for (let j = 0; j < enemys.length; j++){
                if (enemys[j].ID == this.ID){
                    enemys.splice(j,1)
                    break
                }
            }
            score += 15
            document.getElementById('score').textContent = score;
        }
    }
}

var enemys = [];

class Protagonist {
    constructor(x, y, HP = 3, size = 7, color = [73, 48, 214], speed = 5) {
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
        this.body.style.width =  size + "%"
        this.body.style.height =  size + "%";
        this.body.style.position = "absolute";
        this.body.style.backgroundColor = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
        this.body.style.transform = "translate(-50%, -50%)";
        this.body.style.zindex = "10";

        var heart1 = document.createElement("img");
        var heart2 = document.createElement("img");
        var heart3 = document.createElement("img");
        heart1.src = "heart.png";
        heart2.src = "heart.png";
        heart3.src = "heart.png";
        field.appendChild(heart1);
        field.appendChild(heart2);
        field.appendChild(heart3);
        this.heart1 = heart1
        this.heart2 = heart2
        this.heart3 = heart3

        this.heart1.style.display = "none"
        this.heart1.style.position = "absolute";
        this.heart1.style.top = "10px"; // Расположение от верхнего края
        this.heart1.style.right = "10px"; // Расположение от правого края
        this.heart1.style.width = "50px"; // Ширина изображения (можете настроить под свои нужды)
        this.heart1.style.height = "50px";
        this.heart1.style.zindex = '10'
        this.heart1.style.align = "center";

        this.heart2.style.display = "none"
        this.heart2.style.position = "absolute";
        this.heart2.style.top = "10px"; // Расположение от верхнего края
        this.heart2.style.right = "50px"; // Расположение от правого края
        this.heart2.style.width = "50px"; // Ширина изображения (можете настроить под свои нужды)
        this.heart2.style.height = "50px";
        this.heart2.style.zindex = '10'
        this.heart2.style.align = "center";

        this.heart3.style.display = "none"
        this.heart3.style.position = "absolute";
        this.heart3.style.top = "10px"; // Расположение от верхнего края
        this.heart3.style.right = "90px"; // Расположение от правого края
        this.heart3.style.width = "50px"; // Ширина изображения (можете настроить под свои нужды)
        this.heart3.style.height = "50px";
        this.heart3.style.zindex = '10'
        this.heart3.style.align = "center";
    }


    Move(x,y){
        this.x += x;
        this.y += y;
        this.body.style.top = this.y + "%";
        this.body.style.left = this.x + "%";

    }

    Shoot(){
        bulletsID ++
        updateObjs.push(new BulletU(this.x, this.y, bulletsID))
    }

    EndGame() {
        if (this.HP == 0) {
            this.body.remove()
            gameOver.classList.remove('Hide');
            gameOver.classList.add("Show")
            console.log("Tragic end of your cosmic trip")
        }
        }

    HPCheck() {
        if (this.HP == 3){
            this.heart1.style.display = "flex"
            this.heart2.style.display = "flex"
            this.heart3.style.display = "flex"
        }   
        else if (this.HP == 2) {
            this.heart1.style.display = "flex"
            this.heart2.style.display = "flex"
            this.heart3.style.display = "none"
        } 
        else if (this.HP == 1) {
            this.heart1.style.display = "flex"
            this.heart2.style.display = "none"
            this.heart3.style.display = "none"
        }
        else if (this.HP == 0) {
            this.heart1.style.display = "none"
            this.heart2.style.display = "none"
            this.heart3.style.display = "none"       
        }
        }       
    }


class BulletU {
    constructor(x, y, id, speed = 2, color = [230,166,15], size = 10){
        var newBody = document.createElement("div");
        field.appendChild(newBody);
        this.body = newBody;
        this.x = x;
        this.y = y;
        this.id = id
        this.size = size
        this.speed = speed

        this.body.style.left = x + "%";
        this.body.style.top = y + "%";
        this.body.style.width =  size + "px"
        this.body.style.height =  size + "px";
        this.body.style.position = "absolute";
        this.body.style.borderRadius = size/4 + "px"
        this.body.style.backgroundColor = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
        this.body.style.transform = "translate(-50%, -50%)";
        this.body.style.zindex = "2";
        this.body.style.animation = "glow 1s infinite alternate"
        this.body.classList.add("glow");

    }

    Update(){
        if (enemys.length != 0){
            if (this.id > 0){
                this.y -= speed
                this.body.style.top = this.y + "%"
            }
            else if (this.id < 0){
                this.y += speed/2
                this.body.style.top = this.y + "%"
            }
        }

    }

    HitsChecks () {
        if (this.id > 0){
            for (let i = 0; i < enemys.length; i++) {
                if (this.x <= enemys[i].x + enemys[i].size/2 &&
                    this.x >= enemys[i].x - enemys[i].size/2 &&
                    this.y <= enemys[i].y + enemys[i].size/2
                    ){
                    // console.log(enemys[i])
                    // enemys[i].body.remove();
                    // console.log(enemys[i];)
                    for (let j = 0; j < updateObjs.length ; j++){
                        // console.log(j)
                        if (updateObjs[j].id == this.id){
                            // console.log(this.x, this.y);
                            updateObjs[j].body.remove()
                            updateObjs.splice(j, 1);
                            break
                        }
                    }
                    enemys[i].HP -= 1;
                    return;
                    // console.log(enemys[i].HP)
                }
                    // console.log(updateObjs)
                //    console.log(this.x, this.y);
            } 
        }
        else if (this.id < 0){
            if (this.x <= player.x + player.size/2 &&
                 this.x >= player.x - player.size/2 &&
                 this.y >= player.y - player.size/2 ){
                     // console.log(enemys[i])
                     // enemys[i].body.remove();
                     // console.log(enemys[i];)
                    for (let j = 0; j < updateObjs.length ; j++){
                         // console.log(j)
                        if (updateObjs[j].id == this.id){
                             // console.log(this.x, this.y);
                            updateObjs[j].body.remove()
                            updateObjs.splice(j, 1);
                            break;
                         }
                     }
                    player.HP -= 1;
                    player.HPCheck()
                    //console.log(player.HP)
                     return;
                     // console.log(enemys[i].HP)
             }
        }    
    }

    OutOfFealdCheks(){
        if (this.y < 0 || this.y > 99) {
            for (let j = 0; j < updateObjs.length ; j++){
                // console.log(j)
                if (updateObjs[j].id == this.id){
                    // console.log(this.x, this.y);
                    updateObjs[j].body.remove()
                    updateObjs.splice(j,1)
                    break;
                }
            }     
        } 
    }
}

var player = new Protagonist(50, 90);
const keys = {};

function Keys(event){
    // console.log("\"" + event.key + "\"")
    // if (event.key == "ArrowUp") {
    //     player.Move(0,-speed);
    // }
    // else if (event.key == "ArrowDown") {
    //     player.Move(0,speed);
    // }

    if (player.HP > 0 && enemys.length != 0){
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
    if (event.key == "q") {
        console.log(player.HP)
        console.log(enemys)
    }
    if (event.key == "w") {
        KillAllEnemys()
    }

}

// function Hit()
var flag = 0

function GlobalUpdate(){
    // console.log("Hey")
    player.EndGame()
    if (flag == 0){
        CompleteLevelCheck()
    }
    updateObjs.forEach(function(obj){
        obj.Update()
        obj.HitsChecks()
        obj.OutOfFealdCheks()
    })
    enemys.forEach(function(enm){
        enm.Death()
        enm.EnemyShoot()
    }
    )
}

function CreateEnemys(num1, num2 ){
    if (num1<2){
        return
    }
    if (num2<1){
        return
    }
    var flag = 0
    var B = 10
    var C = 5
    for (let j = 0; j < num2; j++){
        for (let i = 0; i < num1 - flag; i++){
            var A = (100 - num1*5 - 5)/(num1-1)
            enemysID ++
            enemys.push(new Enemy(i*(A + 5) + C, B, enemysID))
        }
        B += 10
        if (flag == 0){
            flag = 1
            C = 12
        }
        else if (flag == 1){
            flag = 0
            C = 5
        }
    }
}


function CreateGame(){
    CreateEnemys(7, 3)
    player.HPCheck()
    // console.log(Enemys)


}

function Restart(NewHP = 3, Newscore = 0){
    gameOver.classList.add("Hide");
    player.body.remove()
    player.heart1.remove()
    player.heart2.remove()
    player.heart3.remove()
    player = new Protagonist(50, 90, HP = NewHP);
    score = Newscore;
    document.getElementById('score').textContent = score;
    enemys.forEach ((I) => I.body.remove());
    enemys = [];
    updateObjs.forEach ((I) => I.body.remove());
    updateObjs = [];
    CreateGame();
}


// var timer = 2000

function CompleteLevelCheck(){
    if (enemys.length == 0){
        flag = 1

        // if (levelComplete.display == "none"){
        //     levelComplete.classList.remove("Hide");
        // }
        levelComplete.classList.add("Show");
        setTimeout(() => {
            levelComplete.classList.remove("Show");
            Restart(player.HP, score);
            flag = 0;
        }, 3000);

    }
}

function KillAllEnemys(){
    enemys.forEach ((I) => I.body.remove());
    enemys = []; 
}

setInterval(console.log(updateObjs, enemys), 1);
setInterval(GlobalUpdate, 1);
document.addEventListener("DOMContentLoaded", CreateGame);
document.addEventListener("keydown", Keys);
document.addEventListener("keyup", (event) => {event.key = false});