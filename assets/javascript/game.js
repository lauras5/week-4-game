$(document).ready(function(){

    //array of character objects
    var charArr = [
        {
            name: "Chun Li", 
            hp : 100,
            image : "assets/images/chunli.png",
            heroGif : "assets/images/chunli.gif",
            enemyGif : "assets/imags/chunli.gif",
            background : "assets/images/background/japan.gif", 
            music : "assets/sounds/chunli-theme.mp3"       
        }, 
        {
            name: "Mega Man", 
            hp : 100,
            image : "assets/images/megaman.png", 
            heroGif : "assets/images/megamanhero.gif",
            enemyGif : "assets/images/megaman.gif",
            background : "assets/images/background/megaman.jpg"
            
        }, 
        {
            name: "Saitama", 
            hp : 100,
            image : "assets/images/Saitama.png",
            heroGif : "assets/images/saitamahero.gif",
            enemyGif : "assets/images/saitamahero.gif", 
            background : "assets/images/background/saitama.png"
        }, 
        {
            name : "Naruto",
            hp : 100,
            image : "assets/images/naruto.png",
            heroGif : "assets/images/narutohero.gif",
            enemyGif : "assets/images/narutohero.gif",
            background : "assets/images/background/narutopractice.png"
        },
        {
            name : "Rick",
            hp : 100,
            image : "assets/images/rick.png",
            heroGif : "assets/images/rick.gif",
            enemyGif : "assets/images/rick.gif",
            background : "assets/images/background/ricknmorty.jpg"
        },
        {
            name : "Inuyasha", 
            hp : 100,
            image : "assets/images/inuyasha.png",
            heroGif : "assets/images/inuyasha.gif",
            enemyGif : "assets/images/inuyasha.gif",
            background : "assets/images/background/inuyashaback.jpg"
        }
        
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
    //hero attack power
    var attackPower
    var myEnemy = $("<div id = 'myEnemySpot' class = 'myEnemy'></div>")
    var myHero = $("<div id = 'myHeroSpot' class = 'myHero'></div>")

    $('.characters').show(1000);
    //initiate game function
    function initGame () {
        isHeroChosen = false
        isEnemyChosen = false
        //dynamically change bootstrap with for loop to evenly produce characters, only works with 12 or less characters, will round down columns
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
            //player will choose a character by clicking on the fighter's picture
            myHero.html("<h2 id='heroName' >HERO : " + chosenHero.name +"</h2><img src='" + chosenHero.image + "' style = 'width:280px; height:300px;'/>")
            $(".gameplayHero").append(myHero)
            myHeroHealth = $("<div id = 'progressBar' class = 'myHeroHealth'></div>")
            myHeroHealth.html("<progress id='progress' value='"+ chosenHero.hp +"' max='100'> </progress>")
            $("#heroHP").append(myHeroHealth)
            //.gameplay background switches
            $(".gameplay").css("background-image", "url('"+ chosenHero.background +"')")
            function play(){
                var audio = $(".music").html("<audio src='" + chosenHero.music + "' type='audio/mp3'></audio>") 
                          }
            console.log(chosenHero.hp)
            audio.play()
        }
        else if (!isEnemyChosen) {
            chosenEnemy = charArr[$(this).attr("value")]
            isEnemyChosen = true
            $(this).addClass("fader")
            // console.log(chosenEnemy)
            //get chosenEnemy to arena
            myEnemy.html("<h2 id='enemyName'>ENEMY : " +chosenEnemy.name+ "</h2><img src='" + chosenEnemy.image + "' style = 'width:300px; height:360px;'/>")
            $(".gameplayEnemy").append(myEnemy)
            myEnemyHealth = $("<div id = 'progressBar' class = 'myHealth'></div>")
            myEnemyHealth.html("<progress id='progress' value='"+chosenEnemy.hp+"' max='100'> </progress>")
            $("#enemyHP").append(myEnemyHealth)
            $('.characters').hide('2000');
        }      
    })


 

    $("#fightBtn").on("click", function() {
        //if enemy is alive, attack
        if (chosenEnemy.hp > 0) {
            heroAttack()
            //delay counter attack
            setTimeout (function(){
                enemyAttack() 
            }, 2000)
            //activate the gif with the on click event
            
            if (chosenHero.hp <= 0) {
                alert("YOU LOSE! CHOOSE A NEW PLAYER AND TRY AGAIN!")
                $('.characters').show('2000');
                isHeroChosen = false
                isEnemyChosen = false
                //dynamically change bootstrap with for loop
                $("#enemyHP").empty()
                $("#heroHP").empty()
                $(".gameplayEnemy").empty()
                $(".gameplayHero").empty()
            }
            // console.log("hello")
            // heroAttack()
            //show hp     
        }

        else if (chosenEnemy.hp <= 0) {
            alert("YOU WIN!")
            isEnemyAlive = false
            isEnemyChosen = false
            $("#enemyHP").empty()
            myEnemy.html('<h2>PICK A NEW OPPONENT!</h2>')
            chosenHero.hp = chosenHero.hp + 30
            myHeroHealth.push("<progress id='progress' value='"+chosenHero.hp +"' max='100'> </progress>")
            myHero.html("<h2 id='heroName' >HERO : " +chosenHero.name+"</h2><img src='" + chosenHero.image + "' style = 'width:300px; height:360px;'/>")
            $(".gameplayHero").append(myHero)
            newEnemy()
            //remove enemy from arena
            //click on new enemy
            //increase hp by 10%
        }

        return
        
        function heroAttack () {
            //generate random attack power
            attackPower = Math.floor(Math.random()* 40)
            //subtacts the random number from the enemy hp
            chosenEnemy.hp = (chosenEnemy.hp - attackPower)            
            myEnemyHealth.html("<progress id='progress' value='"+ chosenEnemy.hp +"' max='100'> </progress>")
            $("#enemyHP").push(myEnemyHealth)
            //display attack and damage
            $(".allAttacks").html("<h2>You attacked & caused " + attackPower + " hp damage!</h2>")
            //shows gif as soon as button is pressed
            myHero.html("<h2 id='heroName'> HERO : " + chosenHero.name +"</h2><img src='" + chosenHero.heroGif + "' style = 'width:450px; height:400px;'/>")
            $(".gameplayHero").append(myHero)
            //after 2 seconds, goes back to image
            setTimeout (function() {
                myHero.html("<h2 id='heroName'> HERO : " + chosenHero.name +"</h2><img src='" + chosenHero.image + "' style = 'width:450px; height:400px;'/>")
                $(".gameplayHero").append(myHero)
            },2000)
          
        }
        
        function enemyAttack () {
            //generate random attack power
            attackPower = Math.floor(Math.random()* 25)
            chosenHero.hp = (chosenHero.hp - attackPower)
            myHeroHealth.html("<progress id='progress' value='"+ chosenHero.hp +"' max='100'> " + chosenHero.hp + "</progress>")
            $("#heroHP").push(myHeroHealth)
            //display attack and damage
            $(".allAttacks").html("<h2>Enemy attacked, caused "+attackPower+" hp damage!</h2>")
            //show gif on attack
            myEnemy.html("<h2 id='enemyName'> ENEMY : " +chosenEnemy.name+ "</h2><img src='" + chosenEnemy.enemyGif + "' style = 'width:450px; height:450px;'/>")
            $(".gameplayEnemy").append(myEnemy)
            //after 2.5 seconds go back to image
            setTimeout (function() {
                myEnemy.html("<h2 id='heroName'> HERO : " + chosenEnemy.name +"</h2><img src='" + chosenEnemy.image + "' style = 'width:450px; height:400px;'/>")
                $(".gameplayEnemy").append(myEnemy)
                },2500)        
            // console.log(attackPower)
        }
        
        function newEnemy () {
            $('.characters').show(2000);
            $(document).on("click", ".char", function(){
            if (isEnemyAlive = false) {
                if (!isEnemyChosen) {
                    chosenEnemy = charArr[$(this).attr("value")]
                    isEnemyChosen = true
                    $(this).addClass("fader")
                    // console.log(chosenEnemy)
                    //get chosenEnemy to arena
                    myEnemy.html("<h2 id='enemyName'> ENEMY : " +chosenEnemy.name+ "</h2><img src='" + chosenEnemy.image + "' style = 'width:300px; height:360px;'/>")
                    $(".gameplayEnemy").html(myEnemy)
                    myEnemyHealth.html("<progress id='progress' value='"+chosenEnemy.hp+"' max='100'> </progress>")
                    $("#enemyHP").append(myEnemyHealth)
                    if(chosenEnemy.hp <= 0) {
                        alert("This player was already beaten, choose another player!")
                    }
                }
            }
          })
        }
    })
    
    initGame()
    //need to disable character after chosen, so you cant choose him twice
    //after all characters are beat, do alert and restart game

    
})

