
                document.getElementById("title").style.color = "red";
                document.getElementById("title").inn="Check out my javascript page"
                var MyVariable=42;
                MyVariable=MyVariable+10;
                // console.log(MyVariable);
                var UserName="Arushi Singh";
                // console.log(UserName);
                var bigNumber=MyVariable === 100;
                // console.log(bigNumber);
                var Users=["Annie", "Arushi" , "Aditya", "Lia"];
                // console.log(Users[1]);
                var MyObject ={
                    name: "Arushi",
                    color: "red"
                };
                var ComplexObject ={
                    name: "Arushi",
                    color: "red",
                    zip: 0123456,
                    dog: true,
                    greet: function(greeting){
                        console.log(greeting+"arushi")
                    }
                };
                var sayHello=function(){
                    // console.log("hello!");
                }
                sayHello(); 
                console.log(ComplexObject.color);
                var sayText=function(txt){
                    // console.log("Hello "+txt);
                }
                var plusTen =function(num){
                    return num+30;
                }
                var newNum = plusTen(20);
                console.log("newNum"+ newNum);
                sayText("Arushi");
                sayText(Users[2]);
                if (newNum>100){
                    console.log("Big Number!")
                }
                else if(newNum==50){
                    console.log("not so bad!")
                }
                else{
                    console.log("ooh..not so big!!")
                }
                var checkNumber= function(num){
                    if(num>10){
                        console.log("yes!!");
                    }
                    else {
                        console.log("No!!");
                    }
                    return num>10;
                }
                checkNumber(5);

                // console.log(MyObject.name);
    