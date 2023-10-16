//if first time visit add localStorage for alert
if(!localStorage.getItem("visited")){
    localStorage.setItem('visited', 1);
    alertLoading();
}
function alertLoading(){
    alert('Occasionally, certain days or images may require additional loading time');
}


let yyyymmdd = ''
let currentDate =''
//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
let day = 0 //day bennenung kann problematisch werden 
        function dayConverter(dayy){
             day = dayy
             //console.log(day)
             day = day.split('')
             //console.log(day)
             //day =day.lastIndexOf('-')

             if(day.lastIndexOf('-') !== 7){
                day.splice(5, 0, '0')
             }
             if(!day[9]){
                day.splice(8,0,'0')
             }
            day = day.join('')
            //console.log(day)
            
            day = day.split("-").reverse()//dd-mm-yyyy

            

            // change mm to month using replace
            if(day[1]=== "01"){
                day.splice(1, 1, "January")
            }else if(day[1]=== "02"){
                day.splice(1, 1, "February")
            }else if(day[1]=== "03"){
                day.splice(1, 1, "March")
            }else if(day[1]=== "04"){
                day.splice(1, 1, "April")
            }else if(day[1]=== "05"){
                day.splice(1, 1, "May")
            }else if(day[1]=== "06"){
                day.splice(1, 1, "June")
            }else if(day[1]=== "07"){ 
                day.splice(1, 1, "July")
            }else if(day[1]=== "08"){
                day.splice(1, 1, "August")
            }else if(day[1]=== "09"){
                day.splice(1, 1, "September")
            }else if(day[1]=== "10"){
                day.splice(1, 1, "October")
            }else if(day[1]=== "11"){
                day.splice(1, 1, "November")
            }else if(day[1]=== "12"){
                day.splice(1, 1, "December")
            }
            //day.splice(1,0,".")
            let arr = []
            arr.push(`${day[0]}.`,`${day[1]}`,`${day[2]}`)
            //console.log(arr)
            day = arr.join(' ')
            //console.log(arr)
           // console.log(day)
        }
//PageLoad fetch = current date 
function onPageLoad(){
    //get today's day
    const date = new Date();
    let dayday = date.getDate(); //day bennenung kann problematisch werden 
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
// This arrangement can be altered based on how we want the date's format to appear.yyyy-mm-dd
     currentDate = `${year}-${month}-${dayday}`;
   // console.log(currentDate); 

    let url = `https://api.nasa.gov/planetary/apod?api_key=vB6eGSL4qjYgHFxotuudjO9dQR6H1Jt1ksWO4Muu&date=${currentDate}`

    fetch(url)
    .then(res => res.json()) //parse response as JSON
    .then(data => {
       // console.log(data)
       // console.log(data.media_type)
        dayConverter(data.date)
        yyyymmdd = data.date
       // console.log(`aktuelles datum ${yyyymmdd}`)
        //hide imgage and iframe
        
        
        // document.querySelector('#by').classList.add('.hidden')
        // if(data.copyright){
        //     document.querySelector('#by').classList.toggle('.hidden')
        // }


        if(data.media_type == "video"){
            document.querySelector('#main-img').classList.add('hidden')
            document.querySelector('iframe').classList.remove('hidden')
            document.querySelector('#iframe').src = data.url
           // console.log(data.url)
            document.querySelector('#explanation').innerText = data.explanation
            document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
            document.querySelector('#title').innerText = data.title
               
        }
        else if(data.media_type == 'image'){
            document.querySelector('#iframe').classList.add('hidden')
            document.querySelector('#main-img').classList.remove('hidden')
            document.querySelector('#main-img').src = data.hdurl
            document.querySelector('#explanation').innerText = data.explanation
            document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
            document.querySelector('#title').innerText = data.title
            
        }
       

    }) 
    .catch(err => {
        //console.log(`error ${err}`)
    })
}
onPageLoad()

//fetch onClick calendar
document.querySelector('#get-picture').addEventListener('click', getFetch) 
//fetch onClick feeling lucky
document.querySelector('#random').addEventListener('click', getRandom)
//fetch recommendation
document.querySelector('#recommendation').addEventListener('click', getRecommendation)


function getFetch(){
    
    
    let inputDate = document.querySelector('input').value
        
       // console.log(inputDate)
        const url = `https://api.nasa.gov/planetary/apod?api_key=BuTYtawElpBA0WWaEVAPGqZ0RkBETqldN1G2uUv1&date=${inputDate}`
        //console.log(url)
    
    

    fetch(url)
    .then(res => res.json()) //parse response as JSON
    .then(data => {
       // console.log(data)
       // console.log(data.media_type)
        yyyymmdd = data.date
       // console.log(`aktuelles datum ${yyyymmdd}`)
        //document.querySelector('iframe').classList.add('hidden')
        //document.querySelector('#main-img').classList.add('hidden')
        

        if(inputDate){
            dayConverter(inputDate)

       
            

        if(data.msg){//date <1995
            document.querySelector('#explanation').innerText= data.msg
        }else{
            if(data.media_type == "video"){
                document.querySelector('#main-img').classList.add('hidden')
                document.querySelector('#iframe').classList.remove('hidden')
                document.querySelector('iframe').src = data.url
               // console.log(data.url)
                document.querySelector('#explanation').innerText = data.explanation
                document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
                document.querySelector('#title').innerText = data.title
             
                
            }
            else{
                document.querySelector('iframe').classList.add('hidden')
                document.querySelector('#main-img').classList.remove('hidden')
                document.querySelector('#main-img').src = data.hdurl
                document.querySelector('#explanation').innerText = data.explanation
                document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
                document.querySelector('#title').innerText = data.title
                
            }
        }
        }else{
            alert('Please put in a valid date. Click the calendar icon or enter a dd.mm.yyyy')
        }
        
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}
function getRandom(){
    const url = `https://api.nasa.gov/planetary/apod?api_key=BuTYtawElpBA0WWaEVAPGqZ0RkBETqldN1G2uUv1&count=1`

    fetch(url)
    .then(res => res.json()) //parse response as JSON
    .then(data => {
       
        

        //console.log(data)
       // console.log(data[0])
        dayConverter(data[0].date)
      //  console.log(data[0].media_type)

        yyyymmdd = data[0].date
      //  console.log(`aktuelles datum ${yyyymmdd}`)
        
        
        if(data[0].media_type == "video"){
          //  console.log('video boys')
            document.querySelector('#main-img').classList.add('hidden')
            document.querySelector('#iframe').classList.remove('hidden')
            document.querySelector('#iframe').src = data[0].url
            //console.log(data[0].url)
           
        }
        else if(data[0].media_type == 'image'){
            document.querySelector('#iframe').classList.add('hidden')
            document.querySelector('#main-img').classList.remove('hidden')
            document.querySelector('#main-img').src = data[0].hdurl
           // console.log(data[0].media_type)
            //console.log(data[0].url)
        }
       
        document.querySelector('#explanation').innerText = data[0].explanation
        document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
         document.querySelector('#title').innerText = data[0].title
        

    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}
function getRecommendation(){
    const recomArr = ["2022-02-02" ,"2022-01-24","2022-05-05","2020-05-05", "2020-10-15","2020-12-24","2016-07-06","2013-10-13","2020-01-23", "2016-06-22", "2021-10-15", "2022-09-23", "2012-12-11","2005-12-17", "2012-10-26", "2018-08-30","2022-05-18","2004-07-12", "2014-12-26","2015-09-05", "2022-08-24", "2021-10-15", "2006-07-27", "2000-03-04", "2019-11-25", "2022-11-03", "2022-10-22", "2022-10-20", "2022-10-09", "2022-09-28", "2022-09-16", "2022-09-09", "2022-09-05", "2022-08-30"]
    let random = recomArr[Math.floor(Math.random()*recomArr.length)];
    //console.log(random)

    let inputDate = random
    //console.log(inputDate)
    const url = `https://api.nasa.gov/planetary/apod?api_key=BuTYtawElpBA0WWaEVAPGqZ0RkBETqldN1G2uUv1&date=${inputDate}`
    
    fetch(url)
    .then(res => res.json()) //parse response as JSON
    .then(data => {
       // console.log(data)
       // console.log(data.media_type)
        dayConverter(inputDate)
        
        yyyymmdd = data.date
       // console.log(`aktuelles datum ${yyyymmdd}`)




            if(data.media_type == "video"){
                document.querySelector('#main-img').classList.add('hidden')
                document.querySelector('#iframe').classList.remove('hidden')
                document.querySelector('iframe').src = data.url
                //console.log(data.url)
                document.querySelector('#explanation').innerText = data.explanation
                document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
                document.querySelector('#title').innerText = data.title
                
                
            }
            else{
                document.querySelector('#iframe').classList.add('hidden')
                document.querySelector('#main-img').classList.remove('hidden')
                document.querySelector('#main-img').src = data.hdurl
                document.querySelector('#explanation').innerText = data.explanation
                document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
                document.querySelector('#title').innerText = data.title
                
            }
        })
    .catch(err => {
        console.log(`error ${err}`)
    })
}


// image carousel lets gooo soon moon


// on page load


 // get current date
        // change current date yyyy-mm-dd to epoch 
        // add one/subtract one day (86400*1000 = 86400000)
        // change epoch to yyyy-mm-dd
     

       
        function timeConverter(UNIX_timestamp){
            var a = new Date(UNIX_timestamp);
            
            var year = a.getFullYear();
            var month = a.getMonth() +1;
            var day = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = `${year}-${month}-${day}`
            return time;
          }
          

        document.querySelector('#back').addEventListener('click', back)
        document.querySelector('#forward').addEventListener('click', forward)

        function back(){

            

            let date = new Date (yyyymmdd)
            date = date.setDate(date.getDate())
            //console.log(date)
            // let dazzz = new Date(date)
            //   console.log(dazzz)
            // date = date 
            // console.log(date)

            date = date - 86400000
            //console.log(date)
            date = timeConverter(date)
            yyyymmdd = date
           // console.log(`aktuelles datum back ${yyyymmdd}`)
           // console.log(date)
            
                
           
            const url = `https://api.nasa.gov/planetary/apod?api_key=BuTYtawElpBA0WWaEVAPGqZ0RkBETqldN1G2uUv1&date=${date}`
             //console.log(url)
        
        
    
        fetch(url)
        .then(res => res.json()) //parse response as JSON
        .then(data => {
            //console.log(data)
            //console.log(data.media_type)
    
            
            dayConverter(yyyymmdd)
    
           
               
    
            if(data.msg){//date <1995
                document.querySelector('#explanation').innerText= data.msg
            }else{
                if(data.media_type == "video"){
                    document.querySelector('#main-img').classList.add('hidden')
                    document.querySelector('#iframe').classList.remove('hidden')
                    document.querySelector('iframe').src = data.url
                   // console.log(data.url)
                    document.querySelector('#explanation').innerText = data.explanation
                    document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
                    document.querySelector('#title').innerText = data.title
                 
                    
                }
                else{
                    document.querySelector('iframe').classList.add('hidden')
                    document.querySelector('#main-img').classList.remove('hidden')
                    document.querySelector('#main-img').src = data.hdurl
                    document.querySelector('#explanation').innerText = data.explanation
                    document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
                    document.querySelector('#title').innerText = data.title
                    
                }
            }
            
            
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
            
        }

        function forward(){


           // console.log(`${yyyymmdd} yyyymmdd`)
            //console.log(`${currentDate} current dato `)
           
            let date = new Date (yyyymmdd)
            date = date.setDate(date.getDate())
            //console.log(date)
            let epochCurrent = new Date(currentDate)
            epochCurrent = epochCurrent.setDate(epochCurrent.getDate())
           // console.log(`${epochCurrent} current Epoch`)
            // let dazzz = new Date(date)
            //   console.log(dazzz)
            // date = date 
            // console.log(date)


            // date = new Date().toISOString().substr(0, 19)
            // console.log(date)


            date = date + 86400000
           // console.log(date)
            let epochDate = date
            //console.log(`${epochDate} date epoch`)
            date = timeConverter(date)
            yyyymmdd = date
           // console.log(`aktuelles datum back ${yyyymmdd}`)
           // console.log(`current date back ${currentDate}  `)
           // console.log(date)
            
           // console.log(epochCurrent - epochDate)
          //  console.log(typeof epochDate)
            if(epochCurrent - epochDate < 0){
              //  console.log('epochdate bigger')
               // console.log(epochCurrent)
              //  console.log(currentDate)
              //  console.log(date)
              //  console.log(epochDate)
                dayConverter(currentDate)
              //  console.log(currentDate)
                onPageLoad()
                
            }else{
              //  console.log('epcohdate less')
              //  console.log(epochCurrent)
               // console.log(currentDate)
               // console.log(date)
               // console.log(epochDate)
                const url = `https://api.nasa.gov/planetary/apod?api_key=BuTYtawElpBA0WWaEVAPGqZ0RkBETqldN1G2uUv1&date=${date}`
            //console.log(url)
           
           // console.log(url)
           
        
    
        fetch(url)
        .then(res => res.json()) //parse response as JSON
        .then(data => {
           // console.log(data)
            //console.log(data.media_type)
    
            
            dayConverter(yyyymmdd)

    
           
               
    
            if(data.msg){//date <1995
                document.querySelector('#explanation').innerText= data.msg
            }else{
                if(data.media_type == "video"){
                    document.querySelector('#main-img').classList.add('hidden')
                    document.querySelector('#iframe').classList.remove('hidden')
                    document.querySelector('iframe').src = data.url
                   // console.log(data.url)
                    document.querySelector('#explanation').innerText = data.explanation
                    document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
                    document.querySelector('#title').innerText = data.title
                 
                    
                }
                else{
                    document.querySelector('iframe').classList.add('hidden')
                    document.querySelector('#main-img').classList.remove('hidden')
                    document.querySelector('#main-img').src = data.hdurl
                    document.querySelector('#explanation').innerText = data.explanation
                    document.querySelector('h1').innerText = `Astronomy Picture of the day ${day}`
                    document.querySelector('#title').innerText = data.title
                    
                }
            }
            
            
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
            
        }


            }
            
            


