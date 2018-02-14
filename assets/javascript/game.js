$(document).ready(function(){
    //array of character objects
    var charArr = [
        {
            name: "Chun Li", 
            hp : 100,
            image : "assets/images/chunli.png",
            heroGif : "assets/images/chunli.gif",
            enemyGif : "assets/images/chunlienemy.gif",
            background : "assets/images/background/ehondastage.jpg", 
            music : "assets/sounds/chunli-theme.mp3"       
        }, 
        {
            name: "Mega Man", 
            hp : 100,
            image : "assets/images/megaman.png", 
            heroGif : "assets/images/megamanhero.gif",
            enemyGif : "assets/images/megaman.gif",
            background : "assets/images/background/megaman.jpg",
            music : "assets/sounds/megaman-theme.mp3"
            
        }, 
        {
            name: "Saitama", 
            hp : 100,
            image : "assets/images/Saitama.png",
            heroGif : "assets/images/saitamahero.gif",
            enemyGif : "assets/images/saitamaenemy.png", 
            background : "assets/images/background/saitama.png",
            music : "assets/sounds/opm-theme.mp3"
        }, 
        {
            name : "Naruto",
            hp : 100,
            image : "assets/images/naruto.png",
            heroGif : "assets/images/narutohero.gif",
            enemyGif : "assets/images/narutoenemy.gif_c200",
            background : "assets/images/background/narutopractice.png",
            music : "assets/sounds/naruto-theme.mp3"
        },
        {
            name : "Ang",
            hp : 100,
            image : "assets/images/ang.png",
            heroGif : "assets/images/ang.gif",
            enemyGif : "assets/images/ang.gif",
            background : "assets/images/background/angback.jpg",
            music : "assets/sounds/ang-theme.mp3"
        },
        {
            name : "Goku", 
            hp : 100,
            image : "assets/images/goku.png",
            heroGif : "assets/images/gokuhero.gif",
            enemyGif : "assets/images/gokuenemy.gif",
            background : "assets/images/background/gokuhome.png",
            music : "assets/sounds/goku-theme.mp3"
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
    //enemy & hero image/gif holder
    var myEnemy = $("<div id = 'myEnemySpot' class = 'myEnemy'></div>")
    var myHero = $("<div id = 'myHeroSpot' class = 'myHero'></div>")
    var wins = 0

    $(".characters").show('1000');
    $(".gameplay").hide('1000')
    //initiate game function
    function initGame () {
        isHeroChosen = false
        isEnemyChosen = false
        //dynamically change bootstrap with for loop to evenly produce characters, only works with 12 or less characters, will round down columns
        var num = Math.floor(12 / charArr.length)
        for ( var i = 0; i <charArr.length; i++) {
            //concat the var 
            var charThing = $("<div id='character-" + i + "' class = 'char col-md-" + num + "' value='" + i + "'></div>")
            charThing.html("<img src='" + charArr[i].image + "' style = 'width:95px; height:155px;'/><h3>" + charArr[i].name + "</h3>")
            $(".characters").append(charThing)
        }
    }
    
    //get value of item you are clicking onss
    $(document).on("click", ".char", function(){
        $(".gameplay").show('1000')
        if(!isHeroChosen) {
            chosenHero = charArr[$(this).attr("value")]
            isHeroChosen = true
            $(this).addClass("fader")
            chosenHero.hp = 100
            // console.log(chosenHero)
            //get chosenHero to arena
            //player will choose a character by clicking on the fighter's picture
            myHero.html("<h2 id='heroName' >HERO : " + chosenHero.name +"</h2><img src='" + chosenHero.image + "' style = 'width:290px; height:375px;'/>")
            $(".gameplayHero").append(myHero)
            myHeroHealth = $("<div id = 'progressBar' class = 'myHeroHealth'></div>")
            myHeroHealth.html("<p>Hero HP : " + chosenHero.hp + "</p><progress id='progress' value='"+ chosenHero.hp +"' max='100'> </progress>")
            $("#heroHP").html(myHeroHealth)
            //.gameplay background switches
            $(".gameplay").css("background-image", "url('"+ chosenHero.background +"')")
            $(".music").html("<audio autoplay = 'true' src='" + chosenHero.music + "' type='audio/mp3' controls='controls'></audio>")              
            // console.log(chosenHero.hp) 
        }

        else if (!isEnemyChosen) {
            chosenEnemy = charArr[$(this).attr("value")]
            isEnemyChosen = true
            $(this).addClass("fader")
            chosenEnemy.hp = 100
            // console.log(chosenEnemy)
            //get chosenEnemy to arena
            myEnemy.html("<h2 id='enemyName'>ENEMY : " + chosenEnemy.name + "</h2><img src='" + chosenEnemy.image + "' style = 'width:290px; height:375px;'/>")
            $(".gameplayEnemy").append(myEnemy)
            myEnemyHealth = $("<div id = 'progressBar' class = 'myHealth'></div>")
            myEnemyHealth.html("<p>Hero HP : " + chosenEnemy.hp + "</p><progress id='progress' value='" + chosenEnemy.hp + "' max='100'> </progress>")
            $("#enemyHP").html(myEnemyHealth)
            $('.characters').hide('2000');
            $('.road').hide('2000')
            $("#fightBtn").show('2000')

        }      
    })

    $("#fightBtn").on("click", function() {
        $("#fightBtn").hide('fast')
        setTimeout(function(){
            $("#fightBtn").show('fast')
        }, 2000)
        //if enemy is alive, attack
        heroAttack()

        if (chosenEnemy.hp <= 0) {
            alert("YOU WIN!")
            chosenHero.hp = chosenHero.hp + 25
            myHeroHealth.html("<p> Hero HP : " + chosenHero.hp + "</p><progress id='progress' value='"+ chosenHero.hp  +"' max='100'> </progress>")
            myHero.html("<h2 id='heroName'> HERO : " + chosenHero.name +"</h2><img src='" + chosenHero.image + "' style = 'width:290px; height:375px;'/>")
            $(".gameplayHero").append(myHero)
            $("#fightBtn").hide('2000')
            $("#enemyHP").empty()
            myEnemy.html("<h2>PICK A NEW OPPONENT!</h2>")
            $(".gameplayEnemy").append(myEnemy)
            wins++
            //call function newEnemy
            newEnemy()
            
            // console.log("hello")    
        }
        
        if (chosenEnemy.hp > 0) {
            //delay enemy attack
            if (chosenEnemy.hp <= 0) {
                alert("YOU WIN!")
                chosenHero.hp = chosenHero.hp + 15
                myHeroHealth.html("<p>Hero HP : " + chosenHero.hp + "</p><progress id='progress' value='"+ chosenHero.hp  +"' max='100'> </progress>")
                myHero.html("<h2 id='heroName'> HERO : " + chosenHero.name +"</h2><img src='" + chosenHero.image + "' style = 'width:290px; height:375px;'/>")
                $(".gameplayHero").append(myHero)
                $("#fightBtn").hide('2000')
                //call function newEnemy
                newEnemy()
                // console.log("hello")    
            }

            if (chosenHero.hp <= 0) {
                alert("YOU LOSE! CHOOSE A NEW PLAYER AND TRY AGAIN!")
                reset()
                
            }

            setTimeout (function(){
                enemyAttack() 
            }, 1000)
        }
        
        if (wins >= 5) {
            alert ("WINNER! YOU MADE IT TO THE TOP! PLAY AGAIN!")
            reset()
            wins = 0
        }
        
        return
        
        function heroAttack () {
            //generate random attack power
            attackPower = Math.floor(Math.random()* 40)
            //subtacts the random number from the enemy hp
            chosenEnemy.hp = (chosenEnemy.hp - attackPower)            
            myEnemyHealth.html("<p>Enemy HP : " + chosenEnemy.hp + "</p><progress id='progress' value='"+ chosenEnemy.hp +"' max='100'> </progress>")
            $("#enemyHP").push(myEnemyHealth)
            //display attack and damage
            $(".allAttacks").html("<h2>"+ chosenHero.name +" attacked and inflicted " + attackPower + " hp damage!</h2>")
            //shows gif as soon as button is pressed
            myHero.html("<h2 id='heroName'> HERO : " + chosenHero.name +"</h2><img src='" + chosenHero.heroGif + "' style = 'width:350px; height:350px;'/>")
            $(".gameplayHero").append(myHero)  
        }
        
        function enemyAttack () {
            //generate random attack power
            attackPower = Math.floor(Math.random()* 25)
            //hero hp lowers with attack power
            chosenHero.hp = (chosenHero.hp - attackPower)
            myHeroHealth.html("<p>Hero HP : " + chosenHero.hp + "</p><progress id='progress' value='"+ chosenHero.hp +"' max='100'></progress>")
            $("#heroHP").push(myHeroHealth)
            //display attack and damage
            $(".allAttacks").html("<h2>" + chosenEnemy.name + " attacked and inflicted " + attackPower + " hp damage!</h2>")
            //show gif on attack
            myEnemy.html("<h2 id='enemyName'> ENEMY : " + chosenEnemy.name + "</h2><img src='" + chosenEnemy.enemyGif + "' style = 'width:350px; height:350px;'/>")
            $(".gameplayEnemy").append(myEnemy)
            // console.log(attackPower)
        }
        
        function newEnemy () {
            $('.characters').show(2000);
            isEnemyAlive = false
            isEnemyChosen = false
        }

        function reset() {
            $('.characters').show('2000');
                isHeroChosen = false
                isEnemyChosen = false
                $(".heroHP").empty()
                $(".enemyHP").empty()
                myEnemy.html('')
                myHero.html('')
                $(".char").removeClass("fader")
                for ( i = 0; i < charArr; i++) {
                    charArr[i].hp = 100
                }
                //dynamically change bootstrap with for loop to evenly produce characters, only works with 12 or less characters, will round down columns
                
            }
        })
    
    initGame()
    //need to disable character after chosen, so you cant choose him twice
    //after all characters are beat, do alert and restart game  
    })

