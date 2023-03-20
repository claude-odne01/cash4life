
// start javascript call to 5 000 lottery results
startUp(5000);
    
//mycard.addEventListener("mouseover", myScript);
//mycard.addEventListener("mouseout", myScript2);

function myScript() {
    var x = document.getElementById("mycard");
    x.style.opacity = "0.5";
}
function myScript2() {
    var x = document.getElementById("mycard");
    x.style.opacity = "1.0";
}


function startUp(limitVal) {
    $.ajax({
        url: "https://data.ny.gov/resource/kwxv-fwze.json",
        type: "GET",
        data: {
        "$limit" : limitVal,
        "$$app_token" : "zTJ1Zl68wnPmx8r0LmmB3FuJi"
        }
    }).done(function(data) {
    //alert("Retrieved " + data.length + " records from the dataset!");
        console.log(data);

        //});
        const ball01Array=[Number(0)];
        const ball02Array=[Number(0)];
        const ball03Array=[Number(0)];
        const ball04Array=[Number(0)];
        const ball05Array=[Number(0)];
        const cashballArray=[Number(0), Number(0), Number(0), Number(0), Number(0)];
        const allTimeArray=[Number(0)];

        for (let i = 1; i <= 60; i++) {
            ball01Array.push(0);
            ball02Array.push(0);
            ball03Array.push(0);
            ball04Array.push(0);
            ball05Array.push(0);
            allTimeArray.push(0);
        }   

            // for each loop
        $.each(data, function(index, value) {

            var date = value.draw_date;
    //            console.log(date);
            var num = value.winning_numbers;
    //           console.log(num);
            var cash = value.cash_ball;
    //           console.log(cash);

            let finalDate = date.substring(0,10);

            // Load values from each ball position column into corresponding array
            ball01Array[ Number( value.winning_numbers.substring(0,2) ) ]+=1;
            ball02Array[ Number( value.winning_numbers.substring(3,5) ) ]+=1;
            ball03Array[ Number( value.winning_numbers.substring(6,8) ) ]+=1;
            ball04Array[ Number( value.winning_numbers.substring(9,11) ) ]+=1;
            ball05Array[ Number( value.winning_numbers.substring(12,14) ) ]+=1;            
            cashballArray[ Number(cash)]+=1;
            // load values for all time selected numbers
            allTimeArray[ Number( cash )] += 1;



            if(index <= 6) {        
                $('.output').append(
                '<svg class="bd-placeholder-img rounded-5" width="120" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Example rounded image: 150x75" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Date</title><rect width="100%" height="100%" fill="#057CFA"></rect><text x="50%" y="50%" fill="#FFFFFF" dy=".3em">' + `${finalDate}` +' </text></svg>' + 
                '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${num[0]}${num[1]}` + '</text></svg>' +
                '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${num[3]}${num[4]}` + '</text></svg>' +    
                '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${num[6]}${num[7]}` + '</text></svg>' +
                '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${num[9]}${num[10]}` + '</text></svg>' +
                '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${num[12]}${num[13]}` + '</text></svg>' +
                '<svg class="mt-2 mb-2 bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#FA2605"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">'+ `${Number(cash)}` + '</text></svg><br>'
                )
            }
        });

        for(let num = 0; num <= 60; num++) {
            allTimeArray[num] = ball01Array[num] + ball02Array[num] + ball03Array[num] + ball04Array[num] + ball05Array[num];
        }

        let topFive = getTopFive(allTimeArray);
        let bottomFive = getBottomFive(allTimeArray);

        $('.coldball').append('<svg class="bd-placeholder-img rounded-5" width="100" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">Cold Picks</text></svg>');
        $('.coldballs').append( 
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${bottomFive[0]}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${bottomFive[1]}` +  '</text></svg>' +    
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${bottomFive[2]}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${bottomFive[3]}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${bottomFive[4]}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#FA2605"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${coldMode(cashballArray, true)}` +  '</text></svg><br>'
        )

        $('.hotball').append('<svg class="bd-placeholder-img rounded-5" width="100" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">By Position</text></svg>');
        $('.hotballs').append( 
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(ball01Array)}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(ball02Array)}` +  '</text></svg>' +    
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(ball03Array)}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(ball04Array)}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(ball05Array)}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#FA2605"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(cashballArray, true)}`+  '</text></svg><br>'

        );

        $('.allball').append('<svg class="bd-placeholder-img rounded-5" width="100" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">All Time</text></svg>');
        $('.allballs').append( 
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${topFive[0]}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${topFive[1]}` +  '</text></svg>' +    
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${topFive[2]}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${topFive[3]}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${topFive[4]}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#FA2605"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(cashballArray, true)}`+  '</text></svg><br>'

        );
        
        $('.monthlyball').append('<svg class="bd-placeholder-img rounded-5" width="100" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">Past Month</text></svg>');
        $('.monthlyballs').append( 
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(ball01Array.splice(0,30))}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(ball02Array.splice(0,30))}` +  '</text></svg>' +    
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(ball03Array.splice(0,30))}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(ball04Array.splice(0,30))}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#05FA9A"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(ball05Array.splice(0,30))}` +  '</text></svg>' +
        '<svg class="bd-placeholder-img rounded-5" width="30" height="30" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Game Ball" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Game Ball</title><rect width="100%" height="100%" fill="#FA2605"></rect><text x="50%" y="50%" fill="#000000" dy=".3em">' + `${getMode(cashballArray.splice(0,30), true)}`+  '</text></svg><br>'
        ) 


    });
}

function checkElement(element, max) {
    return element < max;
  }

function getTopFive(array) {
    let max = 0;
    let topFiveIndex = [0, 0, 0, 0, 0];
    let topIndex = 0;

    for(let x = 0; x < topFiveIndex.length; x++) {
        for(let i = 1; i < array.length+1; i++) {
            if(array[i] >= max && !topFiveIndex.includes(i)) {
                max = Number(array[i]);
                topIndex = i;
            }
        }
        topFiveIndex[x] = topIndex;
        max = 0;
    };

    topFiveIndex.sort( function (a, b) {
        return(a-b);
    });

    for( var s = 0; s < 4; s++) {
        topFiveIndex[s] = twoDigit(topFiveIndex[s]);
    }
    
    return topFiveIndex;
}

function getBottomFive(array) {
    let min = Infinity;
    let bottomFiveIndex = [0, 0, 0, 0, 0];
    let bottomIndex = 0;

    for(let x = 0; x < bottomFiveIndex.length; x++) {
        for(let i = 1; i < array.length+1; i++) {
            if(Number(array[i]) < min && !bottomFiveIndex.includes(i)) {
                min = Number(array[i]);
                bottomIndex = i;
            }
        }
        bottomFiveIndex[x] = bottomIndex;
        min = Infinity;
    };

    bottomFiveIndex.sort( function (a, b) {
        return(a-b);
    });

    for( var s = 0; s < 5; s++) {
        bottomFiveIndex[s] = twoDigit(bottomFiveIndex[s]);
    }
    
    return bottomFiveIndex;
}

function getMode(array, boolBall=false) {
    let maxMode = 0;
    console.log("Array", array);
    array.forEach(element=> {   
           if(element > maxMode) {
                maxMode = element;
           } 
    });

    for(let i = 1; i <= array.length; i++) {
        if(array[i] == maxMode)
            return  twoDigit(i, boolBall);
    }
}

function coldMode(array, boolBall=false) {
    let minMode = Infinity;
    console.log(array);
    array.forEach(element=> {   
           if(Number(element) < minMode && Number(element) != 0) {
                minMode = element;
                console.log("Min mode", element)
           } 
    });

    for(let i = 1; i <= array.length; i++) {
        if(Number(array[i]) == minMode)
            return  i;
    }

}

function twoDigit(num, boolBall=false) {
    let formattedNumber = num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
/*     console.log(
      'Input:    ' + num + '\n' +
      'Output:   ' + formattedNumber
    );
  */   if(!boolBall) {
        return formattedNumber;
    } else {
        return num;
    }
  
}

// BUTTON Function
function myFunction1() {

    var x = document.getElementById("myDIV1");

    if (x.style.display == "none") {
        x.style.display = "inline-block";
        // ✅ Change button text on click
        mybtn1.textContent = 'Hide';
    } else {
        x.style.display = "none";
        // ✅ Change button text on click
        mybtn1.textContent = 'Show Hot Balls';
    }
}
  
function myFunction2() {
    var x = document.getElementById("myDIV2");

    if (x.style.display == "none") {
        x.style.display = "inline-block";
        // ✅ Change button text on click
        mybtn2.textContent = 'Hide';
    } else {
        x.style.display = "none";
        // ✅ Change button text on click
        mybtn2.textContent = 'Show All Time';
       
      }
 }

 function myFunction3() {

    var x = document.getElementById("myDIV3");

    if (x.style.display == "none") {
        x.style.display = "inline-block";
        // ✅ Change button text on click
        mybtn3.textContent = 'Hide';
    } else {
        x.style.display = "none";
        // ✅ Change button text on click
        mybtn3.textContent = 'Show Hot Month';
       
      }
 }

 function myFunction4() {

    var x = document.getElementById("myDIV4");

    if (x.style.display == "none") {
        x.style.display = "inline-block";
        // ✅ Change button text on click
        mybtn4.textContent = 'Hide';
    } else {
        x.style.display = "none";
        // ✅ Change button text on click
        mybtn4.textContent = 'Show Hot Month';
       
      }
 }

 // Access Key 3zB1rVfX1XZE26qCEJ-QvorHchbAB99AKkYYY_EPQhY
/// API Key ID 35ng7fpkjyf88u1cm7f4bu820
/// API Secret Key m94opu4xp8sg1wv0nssxodq6rayiy52mdrgqmb8y02qd58xiu
/// APP Token zTJ1Zl68wnPmx8r0LmmB3FuJi
