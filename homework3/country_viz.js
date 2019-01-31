
                //function to enter value of GDP
                console.log("enter function changeFillRed() to update to Red")
                console.log("enter function changeFillGreen() to update to Green")
                console.log("enter function increaseRadius() to increase by 10")
                //function changes fill to red
                var changeFillRed=function(){
                    document.getElementById("circleGDP").style.fill = "red";
                }
                //function changes fill to green
                var changeFillGreen=function(){
                    document.getElementById("circleGDP").style.fill = "green";
                }
                //function changes radius
                var increaseRadius=function(){
                    document.getElementById("circleGDP").style.r = 10;
                }
                if (document.getElementById("buttonRed").onclick = true) {
                    changeFillRed();
                }
               
