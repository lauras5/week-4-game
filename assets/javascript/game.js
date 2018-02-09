$(document).ready(function(){
    //1. When the game starts, player will choose a character by clicking on the fighter's picture. 
    //-The player will fight as that character for the rest of the game.
    //olympus falling - zeus, hedes, titan, hercules
    //2. The player must then defeat all remaining fighters. 
    //-Enemies should be moved to a different area of the screen
    //create backstories on popup

    //array of char objs
    var charArr = [
        {
            name: "Zeus", 
            hp : 50,
            image : "assets/images/zeus.jpg"
        }, 
        {
            name: "Neptune", 
            hp : 50,
            image : "assets/images/neptune.jpg"            
        }, 
        {
            name: "Siren", 
            hp : 50,
            image : "assets/images/siren.jpg"
        }, 
        {
            name: "Aphrodite", 
            hp : 50,
            image : "assets/images/aphrodite.png"   
        }, 
        {
            name: "Hercules", 
            hp : 50,
            image : "assets/images/hercules.jpg"
        }, 
        {
            name: "Medusa", 
            hp : 50,
            image : "assets/images/medusa.jpg"
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

    function initGame () {
        isHeroChosen = false
        isEnemyChosen = false
        //dynamically change bootstrap with for loop
        var num = Math.floor(12 / charArr.length)
        for ( var i = 0; i <charArr.length; i++) {
            //concat the var 
            var charThing = $("<div id='character-"+i+"' class = 'char col-md-"+ num +"' value='"+i+"'></div>")
            charThing.html("<img src='" + charArr[i].image + "' style = 'width:150px; height:180px;'/><h3>"+charArr[i].name+"</h3>")
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
            var myHero = $("<div id = 'myHeroSpot' class = 'myHero'></div>")
            myHero.html("<h2 id='heroName' >HERO : " +chosenHero.name+"</h2><img src='" + chosenHero.image + "' style = 'width:300px; height:360px;'/>")
            $(".gameplayHero").append(myHero)
            myHealth = $("<div id = 'progressBar' class = 'myHealth'></div>")
            myHealth.html("<progress id='progress' value='"+chosenHero.hp+"' </progress>")
            console.log(myHealth)
        }
        
        else if (!isEnemyChosen) {
            chosenEnemy = charArr[$(this).attr("value")]
            isEnemyChosen = true
            $(this).addClass("fader")
            // console.log(chosenEnemy)
            //get chosenEnemy to arena
            var myEnemy = $("<div id = 'myEnemySpot' class = 'myHero'></div>")
            myEnemy.html("<h2 id='enemyName' >ENEMY : " +chosenEnemy.name+ "</h2><img src='" + chosenEnemy.image + "' style = 'width:300px; height:360px;'/>")
            $(".gameplayEnemy").append(myEnemy)
        }
        
    })
    
    $("#fightBtn").on("click", function() {
        // console.log("fight!")
        // console.log(chosenHero)
        if (chosenEnemy.hp > 0) {
            console.log("hello")
            attack()
            //show hp, 

        }
        else if (chosenEnemy.hp = 0) {
            alert("YOU WIN!")

        }
        return
        
    function attack () {
        var attackPower = Math.floor(Math.random()* 15)
        console.log(attackPower)
    }
        //subtract random hp from Enemy
        //enemy attacks yuy back
        // if ( chosenEnemy.hp > 0 ) {
        //     //when you press the button attack
        //     //subract random hp on attack
        // }
    })
    
    initGame()


    
})

