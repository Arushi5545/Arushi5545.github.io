
                //function to enter value of GDP
                console.log("enter function changeFillRed() to update to Red")
                console.log("enter function changeFillGreen() to update to Green")
                console.log("enter function increaseRadius() to increase by 10")
                //var colorCode;
                //function changes fill to red
                var changeFillRed=function(){
                    document.getElementById("circleGDP").style.fill = "red";
                }
                //function changes fill to green
                var changeFillGreen=function(){
                    document.getElementById("circleGDP").style.fill = "green";
                }

                var changeShapeFill = function(colorCode){
                    document.getElementById("circleGDP").style.fill = colorCode;
                }

                //function changes radius
                var increaseRadius=function(){
                    document.getElementById("circleGDP").style.r = 10;
                }
                // if (document.getElementById("buttonRed").onclick == true) {
                //     changeShapeFill("red");
                // }
               //document.getElementById("buttonRed").onclick = changeFillRed;
               document.getElementById("buttonRed").onclick = function(){
                   changeShapeFill("red");
               };

               document.getElementById("buttonGreen").onclick = function(){
                changeShapeFill("green");
            };
               
               //document.getElementById("buttonGreen").onclick = changeFillGreen;
