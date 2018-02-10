$(document).ready(function(){
    //1. When the game starts, player will choose a character by clicking on the fighter's picture. 
    //-The player will fight as that character for the rest of the game.
    //olympus falling - zeus, hedes, titan, hercules
    //2. The player must then defeat all remaining fighters. 
    //-Enemies should be moved to a different area of the screen
    //create backstories on popup
//.gameplay background switches
    //array of char objs
    var charArr = [
        {
            name: "Chun Li", 
            hp : 100,
            image : "assets/images/Chun-Li_tatsunoko.png",
            heroGif : "assets/images/chunli.gif"
            // enemyGif : "assets/imags/chunlienemy.gif"
        }, 
        {
            name: "Pikachu", 
            hp : 100,
            image : "assets/images/pikachu.png", 
            heroGif : "assets/images/pikachu.gif", 
            enemyGif : "assets/images/pikachuenemy.gif"
        }, 
        {
            name: "Mega Man", 
            hp : 100,
            image : "assets/images/megaman.png", 
            heroGif : "assets/images/megamanherogif.gif"
        }, 
        {
            name: "Kirby", 
            hp : 100,
            image : "assets/images/kirby.png", 
            heroGif : "assets/images/kirbyhero.gif", 
            enemyGif : "assets/images/kirbywinning.gif"
        }, 
        {
            name: "Saitama", 
            hp : 150,
            image : "assets/images/Saitama.png",
            heroGif : "assets/images/saitamahero.gif"
        }, 
        {
            name: "Mario", 
            hp : 100,
            image : "assets/images/mario.png"
        }, 
    ]

    //chosen hero obj
    var chosenHero
    //is hero chosen boolean
    var isHeroChosen
    //is he alive
    var isHeroAlive
    //chosen enemy obj
    var chosenEnemy
    //is enemy chosen boolean
    var isEnemyChosen
    //is enemy alive boolean
    var isEnemyAlive
    //attack function
    var myHealth
    
    var attackPower
    
    var myEnemy = $("<div id = 'myEnemySpot' class = 'myEnemy'></div>")

    var myHero = $("<div id = 'myHeroSpot' class = 'myHero'></div>")
    
    var backArr = [
        {
            name : "bg1",
            image : "../images/background/sakura.png" 
            //sound : 
        },
        {
            name : "bg2",
            image : "../images/background/hondeStage.jpg"
            // sound : 
        },
        {
            name : "bg3", 
            image : "../images/background/kenstage.png"
            //sound : 
        }
    ]

    function initGame () {
        isHeroChosen = false
        isEnemyChosen = false
        //dynamically change bootstrap with for loop
        var num = Math.floor(12 / charArr.length)
        for ( var i = 0; i <charArr.length; i++) {
            //concat the var 
            var charThing = $("<div id='character-"+i+"' class = 'char col-md-"+ num +"' value='"+i+"'></div>")
            charThing.html("<img src='" + charArr[i].image + "' style = 'width:140px; height:180px;'/><h3>"+charArr[i].name+"</h3>")
            $(".characters").append(charThing)
        }
    }

    //get value of item you are clicking onss
    $(document).on("click", ".char", function(){
        if(!isHeroChosen) {
            chosenHero = charArr[$(this).attr("value")]
            isHeroChosen = true
            $(this).addClass("fader")
            // console.log(chosenHero)
            //get chosenHero to arena
            myHero.html("<h2 id='heroName' >HERO : " +chosenHero.name+"</h2><img src='" + chosenHero.image + "' style = 'width:300px; height:300px;'/>")
            $(".gameplayHero").append(myHero)
            myHeroHealth = $("<div id = 'progressBar' class = 'myHeroHealth'></div>")
            myHeroHealth.html("<progress id='progress' value='"+chosenHero.hp+"' max='100'> </progress>")
            $("#heroHP").append(myHeroHealth)
            // console.log(chosenHero.hp)
        }
        
        else if (!isEnemyChosen) {
            chosenEnemy = charArr[$(this).attr("value")]
            isEnemyChosen = true
            $(this).addClass("fader")
            // console.log(chosenEnemy)
            //get chosenEnemy to arena
            myEnemy.html("<h2 id='enemyName' >ENEMY : " +chosenEnemy.name+ "</h2><img src='" + chosenEnemy.image + "' style = 'width:300px; height:360px;'/>")
            $(".gameplayEnemy").append(myEnemy)
            myEnemyHealth = $("<div id = 'progressBar' class = 'myHealth'></div>")
            myEnemyHealth.html("<progress id='progress' value='"+chosenEnemy.hp+"' max='100'> </progress>")
            $("#enemyHP").append(myEnemyHealth)
        }      
    })

    $("#newArena").on("click", function () {
        var randBackground = Math.floor(Math.random()* backArr.length)
        chosenBG = backArr[$(this).attr("value")]
        console.log(randBackground)
        console.log(chosenBG)
           $(".gameplay").css("background-image", "url('"+ backArr[i].image +"')") 

    })

    $("#fightBtn").on("click", function() {
        // console.log("fight!")
        // console.log(chosenHero)
        if (chosenEnemy.hp > 0) {
            heroAttack()
            myHero.html("<h2 id='heroName' >HERO : " +chosenHero.name+"</h2><img src='" + chosenHero.heroGif + "' style = 'width:300px; height:360px;'/>")
            $(".gameplayHero").append(myHero)
            $(".heroAttacks").html("<h2>You attacked & caused " +attackPower+ " hp damage!</h2>")
            //enter a 'setTimeout' for time lapse between first and second attack
            if (chosenHero.hp>0) {
                enemyAttack()
                $(".enemyAttacks").html("Enemy attacked, caused "+attackPower+" hp damage!</h2>")
                myHeroHealth.html("<progress id='progress' value='"+(chosenHero.hp - attackPower)+"' max='100'> </progress>")
                myEnemy.html("<h2 id='enemyName' >ENEMY : " +chosenEnemy.name+ "</h2><img src='" + chosenEnemy.enemyGif + "' style = 'width:300px; height:360px;'/>")
                $(".gameplayEnemy").append(myEnemy)
                $("#heroHP").push(myHeroHealth)       
            }
            else if (chosenHero.hp <= 0) {
                alert("YOU LOST! PLAY AGAIN!")
                myHero.html("<h2 id='heroName' >HERO : " +chosenHero.name+"</h2><img src='" + chosenHero.image + "' style = 'width:300px; height:360px;'/>")
                $(".gameplayHero").append(myHero)
            }
            // console.log("hello")
            // heroAttack()
            //show hp     
        }
        else if (chosenEnemy.hp <= 0) {
            alert("YOU WIN!")
            isEnemyAlive = false
            isEnemyChosen = false
            $("#enemyHP").html(' ')
            myEnemy.html('<h2>PICK A NEW OPPONENT!</h2>')
            myHeroHealth.html("<progress id='progress' value='"+(chosenHero.hp + 20)+"' max='100'> </progress>")
            myHero.html("<h2 id='heroName' >HERO : " +chosenHero.name+"</h2><img src='" + chosenHero.image + "' style = 'width:300px; height:360px;'/>")
            $(".gameplayHero").append(myHero)

            newEnemy()
            //remove enemy from arena
            //click on new enemy
            //increase hp by 10%
        }
        else if (chosenHero.hp <= 0) {
            alert("YOU LOSE! TRY AGAIN!")
            
        }
        
        return
        
        function heroAttack () {
            attackPower = Math.floor(Math.random()* 40)
            // var totalAttack = attackPower[]
            //subtract random hp from Enemy
            myEnemyHealth.html("<progress id='progress' value='"+(chosenEnemy.hp - attackPower)+"' max='100'> </progress>")
            $("#enemyHP").push(myEnemyHealth)
            chosenEnemy.hp = (chosenEnemy.hp - attackPower)
            console.log("enemy hp " + chosenEnemy.hp)
            // console.log(attackPower)
            //if enemy is still alive, they attack
            //enemy attacks you back
        }
        
        function enemyAttack () {
            attackPower = Math.floor(Math.random()* 15)
            // var totalAttack = attackPower[]
            //subtract random hp from Enemy
            myHeroHealth.html("<progress id='progress' value='"+(chosenHero.hp - attackPower)+"' max='100'> </progress>")
            $("#heroHP").push(myHeroHealth)
            chosenHero.hp = (chosenHero.hp - attackPower)        
            console.log("hero hp " + chosenHero.hp)
            // console.log(attackPower)
            //if enemy is still alive, they attack
            //enemy attacks yuy back
        }
        
        function newEnemy () {

            $(document).on("click", ".char", function(){
            if (isEnemyAlive = false) {
                if (!isEnemyChosen) {
                    chosenEnemy = charArr[$(this).attr("value")]
                    isEnemyChosen = true
                    $(this).addClass("fader")
                    // console.log(chosenEnemy)
                    //get chosenEnemy to arena
                    myEnemy.html("<h2 id='enemyName' >ENEMY : " +chosenEnemy.name+ "</h2><img src='" + chosenEnemy.image + "' style = 'width:300px; height:360px;'/>")
                    $(".gameplayEnemy").html(myEnemy)
                    myEnemyHealth.html("<progress id='progress' value='"+chosenEnemy.hp+"' max='100'> </progress>")
                    $("#enemyHP").append(myEnemyHealth)
                    
                }
            }
        })
        }

        //create function for movement
    })
    
    initGame()


    
})

