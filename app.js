
const tab = [];//the tab that will contain all the data of the json file
let removeValueLink = "REMOVE SLIDESHOW";//this is the value of the link when the slideshow is displayed
let addValueLink = "START SLIDESHOW";//this is the value of the link when the slideshow is not displayed

let ul = document.querySelector('.global-section');//the ul that contains all the li
let a = document.querySelector(".linkSlideR");//the link that will be used to display the slideshow
let container = document.querySelector(".container");//the container that contains the slideshow

var next =null;//the next button
var prev =null;//the previous button

let res;//the variable that will contain the setInterval function

let counter = 1;//the counter that will be used to display the next image

fetch("./fichier.json")//the json file that contains all the data
    .then(data=> data.json())//we convert the data into json
    .then(data=>{data.forEach(el=>//we loop through the json file
        {
            //we create an object that will contain all the data of the json file
            let o = {};
            o.Author_name = el["Author"];
            o.Author_img = el["Author-img"];
            o.Manga_name = el["Manga"];
            o.Manga_img = el["Manga-img"];
            o.Creation_year = el["Year"];
            o.descript = el["Description"];
            
            tab.push(o);//we push the object into the tab
        }
        
        );
        
        createElementFromTab(tab);//we call the function that will create the li and the img
        selectImg();//we call the function that will select the img when we click on it and
                                                                                //print the slideshow
    });


function createElementFromTab(newTab)//the function that will create the li and the img;
//this function creates all the image that will be displayed at the beginning of the page
{
    newTab.forEach(el =>{//we loop through the tab
        let li = document.createElement("li");//we create the li
        let img = document.createElement("img");//we create the img

        img.setAttribute("src",el.Manga_img);//we set the src of the img
        img.setAttribute("alt",el.Author_img);//we set the alt of the img

        let div = document.createElement("div");//we create the div that will contain the name of the author and the name of the manga
        div.setAttribute("class","description_img");//we set the class of the div
        let p1 = document.createElement("p");//we create the p that will contain the name of the author

        p1.innerText=el.Author_name;//we set the text of the p to the name of the author
        p1.setAttribute("class","author_name");

        let p2 = document.createElement("p");
        p2.innerText=el.Manga_name;//we set the text of the p to the name of the manga
        p2.setAttribute("class","manga_name");

        div.appendChild(p1);//we append the p1 to the div
        div.appendChild(p2);//we append the p2 to the div

        li.appendChild(img);//we append the img to the li
        li.appendChild(div);//we append the div to the li

        ul.appendChild(li);//we append the li that we generate to the <ul class="global-section"></ul> tag to style it in the css file
    })
}

function selectImg()//the function that will select the img when we click on it, by giving more information about the manga
//and print the slideshow by the way
{
    let allLi = document.querySelectorAll(".global-section li");//we select all the li
    let ind = 0;//the index of the li that we will use to display the slideshow
    allLi.forEach((el,i)=>{
        el.addEventListener("click",()=>{
            el.classList.add("active");
            ind=i;//we set the index of the li to the index of the li that we clicked on
            for(let j=0;j<allLi.length;j++)
            {
                if (j!=ind)
                    allLi[j].classList.remove("active");//we remove the class active from all the li that we didn't click on
            }
            counter=ind;
            // console.log("le compteur vaut "+counter);
            printDiapo(ind);//we call the function that will print the slideshow base on the cliked img

            needToWork();//we call the function that will add the event listener to the next and previous button
            
        
        })

    })
    
    actualize();//it will get rid of the slideshow when we click on the link "remove slideshow" in the nav tag  of the page
}

function needToWork()
{
    prev = document.querySelector(".prev");
    next = document.querySelector(".next");
    prev.addEventListener("click",()=>{
        unrollSlide("prev");//we call the function that will display all the previous images
    })
    next.addEventListener("click",()=>{
        unrollSlide("next");//we call the function that will display all the next images
     })

}

function unrollSlide(direction)//the function that will display all the images based on the direction that we give to it ( prev or next)
{
    if (direction=="prev")
    {
        res=setInterval(()=>{//we set the interval to 2 seconds
        
            counter-=1;//we decrement the counter      
            if (counter<=0)//if the counter is less than 0 or equals to it, we set the counter to 0
            {
                counter=0;
                clearInterval(res);// and we clear the interval
            }
            // console.log(counter)              
        
        update();//we call the function that will update the slideshow
        actualizeSlide()//we call the function that will update the slide number
    },2000);
        
    }
    else
    {
        res=setInterval(()=>{
            
            counter+=1;//we increment the counter      
            if (counter>=tab.length-1)//if the counter is greater than the length of the tab or equals to it, we set the counter to the length of the tab
            {
                counter=tab.length-1;
                clearInterval(res);//and we clear the interval
            }           
            update();//we call the function that will update the slideshow
            actualizeSlide()//we call the function that will update the slide number
        },2000);
    }
}

function actualizeSlide()//the function that will update the slide number
{
    let div_footer = document.querySelector(".div_footer");
    let container_right =  document.querySelector(".container_right");
    let container_middle = document.querySelector(".container_middle");

    div_footer.removeChild(container_right);//we remove the container_right
    container_middle.innerText = counter+1;//we set the text of the container_middle to the counter+1
}

function actualize()//the function that will get rid of the slideshow when we click on the link "remove slideshow" in the nav tag  of the page
{
    a.addEventListener("click",()=>{
        changeValue();//we call the function that will change the value of the link "remove slideshow" to "display all the images" like the first time
    });
}

function printDiapo(k)//the function that will print the slideshow
{
    try {
        let theDiv = document.querySelector('.the_img');//we select the div that contains the slideshow
        container.removeChild(theDiv);//we remove the div that contains the slideshow
    } catch (error) {
        //console.log("it is not an object");
    }
    a.innerText = removeValueLink;//we set the text of the link "remove slideshow" to "remove slideshow"
    ul.style.display = "none";//we set the display of the <ul class="global-section"></ul> tag to none
    let obj = tab[k];//we set the obj to the object that we clicked on...

    //this is the code that will print the slideshow (version html...)

    /*
    <div class="the_img">
        <div class="div_imgDescript">
            <div class="div_img">
            <img class="Manga_img" src="${obj.img}">
            </div>
            <div class="div_author">
                <div class="div_title">
                    <span class="Manga_title">Title: ${obj.title}</span>
                    <span class="Manga_title">Chapter: ${obj.chapter}</span>
                </div>
                <div class="div_authorImg">
                    <img class="Manga_author" src="${obj.author}">
                </div>
            </div>
        </div>
        <div class="div_txt">
            <span class="Manga_txt">${obj.txt}</span>
            <p class="Manga_txt">${obj.txt}</p>
            <a class="Manga_txt">${obj.txt}</a>
        </div>

        <div class="div_footer">
            <div class="progress"></div>
            <div class="container_left">
                <span>${obj.Manga_name}</span>
                <span>${obj.Author_name}</span>
            </div>

            <div class="container_middle">
                <span class="slideNumber">${counter+1}</span>
            </div>
            <div class="container_right">
                <button class="prev">
                    <img src="https://img.icons8.com/ios/50/000000/previous.png"/>
                </button>*
                <button class="next">
                    <img src="https://img.icons8.com/ios/50/000000/next.png"/>
                </button>
            </div>
        </div>
    </div>
    */


    let div = document.createElement("div");//we create the div that will contain the slideshow
    div.setAttribute("class","the_img");

    let div_imgDescript = document.createElement("div");//we create the div that will contain the description of the manga
    div_imgDescript.setAttribute("class","div_imgDescript");

    let div_img = document.createElement("div");//we create the div that will contain the image of the manga
    div_img.setAttribute("class","div_img");

    let img = document.createElement("img");//we create the img tag that will contain the image of the manga
    img.setAttribute("src",obj.Manga_img);
    div_img.appendChild(img);

    div_imgDescript.appendChild(div_img);//we append the div_img to the div_imgDescript

    let div_author = document.createElement("div");//we create the div that will contain the author of the manga
    div_author.setAttribute("class","div_author");

    let div_title = document.createElement("div");//we create the div that will contain the title of the manga
    div_title.setAttribute("class","div_title");

    let span1 = document.createElement("span");//we create the span that will contain the title of the manga
    span1.innerText = obj.Manga_name;
    let span2 = document.createElement("span");//we create the span that will contain the chapter of the manga
    span2.innerText = obj.Author_name;

    div_title.appendChild(span1);
    div_title.appendChild(span2);

    let div_authorImg = document.createElement("div");//we create the div that will contain the image of the author of the manga
    div_authorImg.setAttribute("class","div_authorImg");

    let img_author = document.createElement("img");//we create the img tag that will contain the image of the author of the manga
    img_author.setAttribute("src",obj.Author_img);
    div_authorImg.appendChild(img_author);

    div_author.appendChild(div_title);
    div_author.appendChild(div_authorImg);

    div_imgDescript.appendChild(div_author);

    let div_txt = document.createElement("div");//we create the div that will contain the description of the manga
    div_txt.setAttribute("class","div_txt");
    
    let span = document.createElement("span");//we create the span that will contain the creation year of the manga
    span.innerText = obj.Creation_year;

    let p = document.createElement("p");//we create the p tag that will contain the description of the manga
    p.innerText =  obj.descript;

    let lk = document.createElement("a");//we create the link that will contain the link to the source of the manga
    lk.setAttribute("src","#");
    lk.innerText = "Go To Source";

    div_txt.appendChild(span);
    div_txt.appendChild(p);
    div_txt.appendChild(lk);

    let div_container = document.createElement("div");//we create the div that will contain the div_imgDescript and the div_txt
    div_container.setAttribute("class","div_container");

    div_container.appendChild(div_imgDescript);
    div_container.appendChild(div_txt);

    div.appendChild(div_container);

    let div_footer = document.createElement("div");//we create the div that will contain the footer of the slideshow
    div_footer.setAttribute("class","div_footer");

    let progress = document.createElement("div");//we create the div that will contain the progress bar
    progress.setAttribute("class","progress");
    if (counter==0)//if the counter is 0, we set the width of the progress bar to 0.5%
        progress.style.width = `${Math.ceil(0.5)}%`;

    progress.style.width = `${Math.ceil((counter+2/tab.length-1)*8)}%`;//we set the width of the progress bar to the percentage of the current slide
    // console.log(counter);

    div_footer.appendChild(progress);

    let container_footer = document.createElement("div");//we create the div that will contain the container_left, container_middle and container_right
    container_footer.setAttribute("class","container_footer");

    let container_left = document.createElement("div");//we create the div that will contain the title and the author of the manga
    container_left.setAttribute("class","container_left");

    let span3 = document.createElement("span");//we create the span that will contain the title of the manga
    span3.innerText = obj.Manga_name;
    let span4 = document.createElement("span");//we create the span that will contain the author of the manga
    span4.innerText = obj.Author_name;

    container_left.appendChild(span3);
    container_left.appendChild(span4);

    let container_middle = document.createElement("div");//we create the div that will contain the buttons to navigate between the slides
    container_middle.setAttribute("class","container_middle");

    let container_right = document.createElement("div");//we create the div that will contain the buttons to navigate between the slides
    container_right.setAttribute("class","container_right");

    let btn1 = document.createElement("button");//we create the button that will contain the image of the previous slide
    btn1.setAttribute("class","prev");
    let btn2 = document.createElement("button");//we create the button that will contain the image of the next slide
    btn2.setAttribute("class","next");

    let img1 = document.createElement("img");//we create the img tag that will contain the image of the previous slide
    img1.setAttribute("src","./images/prev_image.png");
    let img2 = document.createElement("img");//we create the img tag that will contain the image of the next slide
    img2.setAttribute("src","./images/next_img.png");

    btn1.appendChild(img1);
    btn2.appendChild(img2);

    container_right.appendChild(btn1);
    container_right.appendChild(btn2);

    div_footer.appendChild(container_left);
    div_footer.appendChild(container_middle);
    div_footer.appendChild(container_right);

    div.appendChild(div_footer);

    container.appendChild(div);
}

function changeValue()//we change the value of the counter to navigate between the slides
{
    let theDiv = document.querySelector('.the_img');//we get the div that contains the current slide
    
    if (a.innerText==removeValueLink)
    {
        clearInterval(res);//we stop the interval
        container.removeChild(theDiv);//we remove the current slide
        ul.style.display = "flex";//we display the ul that contains the links to the slides
        a.innerText=addValueLink;//we change the text of the link
        counter=1;//we set the counter to 1
    }
}

function update()
{
    let theDiv = document.querySelector('.the_img');//we get the div that contains the current slide
    let allLi = document.querySelectorAll(".global-section li");//we get all the li that contains the links to the slides
    allLi.forEach(el=>{//we remove the class active from all the li
        el.classList.remove("active");
    })

    for(let k=0;k<tab.length;k++)//we add the class active to the li that contains the link to the current slide
    {
        if (k==counter)
            allLi[k].classList.add("active");
    }
    container.removeChild(theDiv);//we remove the current slide
    printDiapo(counter);//we print the current slide based on the counter
}