$(document).ready(function () {
    $(".loadingscreen i").fadeOut(500, function () {
        $(".loadingscreen").fadeOut(500, function () {
            $(".loadingscreen").remove();
            $("body").css("overflow", "auto")
        })
    })
})
async function findid() {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let result = await meals.json()
    let lenght = Object.keys(result.meals).length
    let cartona = ""
    for (let i = 0; i < lenght; i++) {
        cartona += `<div class="col-md-3">
        <div class=" my-3 photo position-relative overflow-hidden" onclick=showdetails("${result.meals[i].idMeal}")>
            <img class="w-100 rounded-1" src="${result.meals[i].strMealThumb}">
            <div class="w-100 position-absolute layer d-flex p-2 align-items-center rounded-1"><h1 class="lead fs-1">${result.meals[i].strMeal}</h1></div>
        </div>
    </div>`
    }
    document.getElementById("images").innerHTML = cartona;
}
findid()
$("#category").click(async function () {
    let category = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let categoryresult = await category.json();
    let cartona = "";
    for (let i = 0; i < 14; i++) {
        arr = categoryresult.categories
        cartona += `<div class="col-md-3 p-4">
        <div class=" my-3 photo position-relative overflow-hidden" onclick=showcategory("${arr[i].strCategory}")>
            <img class="w-100 rounded-1" src="${arr[i].strCategoryThumb}">
            <div class="w-100 position-absolute layer text-center rounded-1"><h2 class=" lead text-black fs-3 ">${arr[i].strCategory}</h2>
             <p class="lead fs-5">${arr[i].strCategoryDescription.split(" ").splice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>`

    }
    document.getElementById("images").innerHTML = cartona;

})
async function showcategory(category) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let result = await data.json()
    let lenght = Object.keys(result.meals).length
    let cartona = ''
    for (let i = 0; i < lenght; i++) {
        cartona += `<div class="col-md-3">
            <div class=" my-3 photo position-relative overflow-hidden" onclick=showdetails("${result.meals[i].idMeal}") >
                <img class="w-100 rounded-1" src="${result.meals[i].strMealThumb}">
                <div class="w-100 position-absolute layer d-flex justify-content-center align-items-center fs-1 text-center rounded-1"><h2 class="lead fs-2">${result.meals[i].strMeal}</h2>
                
                </div>
            </div>
        </div>`
    }
    document.getElementById("images").innerHTML = cartona;
}
async function showdetails(id) {
    console.log("hello")
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let result = await data.json()
    console.log(result)
    meal=result.meals[0]
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded list-unstyled d-inline-block fs-6">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    document.getElementById("images").innerHTML = `<div class="col-md-4 p-2 text-white"> 
        <img class="w-100 " src="${result.meals[0].strMealThumb}">
        <h2 class="lead fs-1 pt-2">     ${result.meals[0].strMeal}   </h2>
        </div >
        <div class="col-md-8 ps-2 text-white lead" >
        <h3 class="lead fs-2"> Instructions</h3>
        <p class="lead fs-6"> ${result.meals[0].strInstructions}</P>
        <p>Area:  ${result.meals[0].strArea}</p>
        <p>Caregory:  ${result.meals[0].strCaregory}</p>
        <p>Recipes:${recipes} </p><br>
        <p>Tages:<li class="my-3 mx-1 p-2 bg-success rounded list-unstyled d-inline-block fs-6"> Source</li> <li class="my-3 mx-1 p-2 bg-danger rounded list-unstyled d-inline-block fs-6">  Youtube</li> </p><br>
        </div>`
}
$("#area").click(async function () {
    let area = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let arearesult = await area.json();
    let lenght = Object.keys(arearesult.meals).length
    let cartona = "";
    for (let i = 0; i < lenght; i++) {
        cartona += `<div class="col-md-3 text-white">
        <div class=" my-3 photo position-relative overflow-hidden text-center  lead p-1" onclick= showarea("${arearesult.meals[i].strArea}")>
        <i class="fa-solid fa-city fa-3x  mb-1 areaicon"></i>
        <h2 class="lead fs-3 pt-1">${arearesult.meals[i].strArea}</h2>    
        </div>
    </div>`

    }
    document.getElementById("images").innerHTML = cartona;
})
async function showarea ( country){
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    let result= await data.json();
    let lenght = Object.keys(result.meals).length
    let cartona = ''
    for (let i = 0; i < lenght; i++) {
        cartona += `<div class="col-md-3">
            <div class=" my-3 photo position-relative overflow-hidden" onclick=showdetails("${result.meals[i].idMeal}") >
                <img class="w-100 rounded-1" src="${result.meals[i].strMealThumb}">
                <div class="w-100 position-absolute layer d-flex justify-content-center text-center align-items-center rounded-1"><h2 class=" fs-2 lead">${result.meals[i].strMeal}</h2>
                
                </div>
            </div>
        </div>`
    }
    document.getElementById("images").innerHTML = cartona;
}
$("#ingredients").click(async function () {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let result = await data.json();
    let lenght = Object.keys(result.meals).length
    let cartona = "";
    for (let i = 0; i <20; i++) {
        cartona += `<div class="col-md-3 text-white">
        <div class=" my-3 photo position-relative overflow-hidden text-center  lead p-1" onclick= showingradient("${result.meals[i].strIngredient}")>
        <i class="fa-sharp fa-solid fa-cart-shopping fa-2x ingredienticon"></i>
        <h2 class="lead fs-2">${result.meals[i].strIngredient}</h2>
         <p class="text-white fs-6">${result.meals[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
            
        </div>
    </div>`

    }
    document.getElementById("images").innerHTML = cartona;
})
async function showingradient ( x){
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`)
    let result= await data.json();
    let lenght = Object.keys(result.meals).length
    let cartona = ''
    for (let i = 0; i < lenght; i++) {
        cartona += `<div class="col-md-3">
            <div class=" my-3 photo position-relative overflow-hidden" onclick=showdetails("${result.meals[i].idMeal}") >
                <img class="w-100 rounded-1" src="${result.meals[i].strMealThumb}">
                <div class="w-100 position-absolute layer d-flex justify-content-center align-items-center text-center rounded-1"><h2 class=" fs-2 lead">${result.meals[i].strMeal}</h2>
                
                </div>
            </div>
        </div>`

    }
    document.getElementById("images").innerHTML = cartona;
}
$("#search").click(function(){

    document.getElementById("images").innerHTML = `<div class="row">
    <div class="col-md-6 p-3 pt-1 ">
    <input id="nameinput" class="form-control mb-2  " placeholder="Search By Name" onkeyUp=searchname()>
    </div>
    <div class="col-md-6 p-3 pt-1 ">
    <input id="letterinput" class="form-control mb-2 " placeholder="Search By Letter" maxlength="1" onkeyUp=searchletter()>
    </div>
    </div>
    <div class="row" id="searchcontainer"></div>`;
    


})
async function searchname(){
    let x=document.getElementById("nameinput")
    let name=x.value
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let result=await data.json()
    let lenght = Object.keys(result.meals).length
    let cartona = ""
    for (let i = 0; i < lenght; i++) {
        cartona += `<div class="col-md-3">
        <div class=" my-3 photo position-relative overflow-hidden" onclick=showdetails("${result.meals[i].idMeal}")>
            <img class="w-100 rounded-1" src="${result.meals[i].strMealThumb}">
            <div class="w-100 position-absolute layer d-flex p-2 align-items-center rounded-1"><h2 class="lead fs-1">${result.meals[i].strMeal}</h2></div>
        </div>
    </div>`

    }
    document.getElementById("searchcontainer").innerHTML = cartona;
}
async function searchletter(){
    let x=document.getElementById("letterinput")
    let letter=x.value
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let result=await data.json()
    let lenght = Object.keys(result.meals).length
    let cartona = ""
    for (let i = 0; i < lenght; i++) {
        cartona += `<div class="col-md-3">
        <div class=" my-3 photo position-relative overflow-hidden" onclick=showdetails("${result.meals[i].idMeal}")>
            <img class="w-100 rounded-1" src="${result.meals[i].strMealThumb}">
            <div class="w-100 position-absolute layer d-flex justify-content-center align-items-center rounded-1"><h2 class="lead">${result.meals[i].strMeal}</h2></div>
        </div>
    </div>`

    }
    document.getElementById("searchcontainer").innerHTML = cartona;
}
$("#contact").click(function(){
    document.getElementById("images").innerHTML=` 
    <div id="contactsec " class="w-75 m-auto row justify-content-center align-items-center text-center text-white">
           
     <div class="col-12">
    <h2 class="lead fs-1"> Contact Us</h2>
</div>
<div class="col-md-6 p-3 position-relative">
    <input id="name" class="form-control shadow-lg mb-2   " placeholder="Enter Your Name" onkeyUp=validation() >
<i class="fa-solid fa-check position-absolute checkicon d-none" id="nameicon"></i>
   
    <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
	</div>
</div> 
<div class="col-md-6 p-3 position-relative">
    <input id="email" class="form-control shadow-lg mb-2   " placeholder="Enter Your Email" onkeyUp=validation()>
<i class="fa-solid fa-check position-absolute checkicon d-none " id="emailicon"></i>
    
    <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
</div>
 <div class="col-md-6 p-3 position-relative">
    <input id="phone" class="form-control shadow-lg mb-2 " placeholder="Enter Your Phone" onkeyUp=validation() >
<i class="fa-solid fa-check position-absolute checkicon d-none" id="phoneicon"></i>
    
    <div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
</div> 
<div class="col-md-6 p-3 position-relative">
    <input id="age" class="form-control shadow-lg mb-2   " placeholder="Enter Your Age" onkeyUp=validation()>
<i class="fa-solid fa-check position-absolute checkicon d-none" id="ageicon"></i>
    
    <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
Enter valid Age
</div>
</div> 
<div class="col-md-6 p-3 position-relative">
<input id="password" class="form-control shadow-lg mb-2   " type="password" placeholder="Enter Password" onkeyUp=validation() >
<i class="fa-solid fa-check position-absolute checkicon d-none" id="passwordicon"></i>
<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
</div>
 <div class="col-md-6 p-3 position-relative ">
    <input id="repassword" class="form-control shadow-lg mb-2  " type="password" placeholder="Enter RePassword" onkeyUp=validation() >
    <i class="fa-solid fa-check position-absolute checkicon d-none"  id="repasswordicon"></i>
    <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
</div>
<button type="submit" disabled="" id="submitbtn" class="btn btn-outline-danger w-auto">Submit</button>
</div>`

})
function validatename(x) {
    let regex =/^[a-zA-Z ]+$/
    if (regex.test(x) == true)  
        return true
    else
        return false;
}
function validateemail(x) {
    let regex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regex.test(x) == true)  
        return true
    else
        return false;
}
function validatephone(x) {
    let regex =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (regex.test(x) == true)  
        return true
    else
        return false;
}
function validateage(x) {
    let regex =/^[1-9][0-9]?$|^100$/
    if (regex.test(x) == true)  
        return true
    else
        return false;
}
function validatepassword(x) {
    let regex =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (regex.test(x) == true)  
        return true
    else
        return false;
}
function validation( ){
   let name=$("#name").val()
   let email=$("#email").val()
   let phone=$("#phone").val()
   let age=$("#age").val()
   let password=$("#password").val()
   let repassword=$("#repassword").val()
   if(validatename(name)==false){
        document.getElementById("namealert").classList.replace("d-none", "d-block")
        document.getElementById("nameicon").classList.replace("d-block", "d-none")
        document.getElementById("name").classList.remove("border-success")

   }
    else {
        document.getElementById("nameicon").classList.replace("d-none", "d-block")
        document.getElementById("namealert").classList.replace("d-block", "d-none")
        document.getElementById("name").classList.add("border-success")
        

    }
    if(validateemail(email)==true){
        document.getElementById("emailicon").classList.replace("d-none", "d-block")
        document.getElementById("emailalert").classList.replace("d-block", "d-none")
        document.getElementById("email").classList.add("border-success")
        

    }
    else {
        document.getElementById("emailalert").classList.replace("d-none", "d-block")
        document.getElementById("emailicon").classList.replace("d-block", "d-none")
        document.getElementById("email").classList.remove("border-success")
    }
    if(validatephone(phone)==true){
        document.getElementById("phoneicon").classList.replace("d-none", "d-block")
        document.getElementById("phonealert").classList.replace("d-block", "d-none")
        document.getElementById("phone").classList.add("border-success")
        

    }
    else {
        document.getElementById("phonealert").classList.replace("d-none", "d-block")
        document.getElementById("phoneicon").classList.replace("d-block", "d-none")
        document.getElementById("phone").classList.remove("border-success")
    }
    if(validateage(age)==true){
        document.getElementById("ageicon").classList.replace("d-none", "d-block")
        document.getElementById("agealert").classList.replace("d-block", "d-none")
        document.getElementById("age").classList.add("border-success")
        

    }
    else {
        document.getElementById("agealert").classList.replace("d-none", "d-block")
        document.getElementById("ageicon").classList.replace("d-block", "d-none")
        document.getElementById("age").classList.remove("border-success")
    }
    if(validatepassword(password)==true){
        document.getElementById("passwordicon").classList.replace("d-none", "d-block")
        document.getElementById("passwordalert").classList.replace("d-block", "d-none")
        document.getElementById("password").classList.add("border-success")
    }
    else {
        document.getElementById("passwordalert").classList.replace("d-none", "d-block")
        document.getElementById("passwordicon").classList.replace("d-block", "d-none")
        document.getElementById("password").classList.remove("border-success")
    }
    if(password==repassword){
        document.getElementById("repasswordicon").classList.replace("d-none", "d-block")
        document.getElementById("repasswordalert").classList.replace("d-block", "d-none")
        document.getElementById("repassword").classList.add("border-success")
    }
    else {
        document.getElementById("repasswordalert").classList.replace("d-none", "d-block")
        document.getElementById("repasswordicon").classList.replace("d-block", "d-none")
        document.getElementById("repassword").classList.remove("border-success")
    }
    if(password==repassword &&validatepassword(password)==true && validateage(age)==true && validatephone(phone)==true && validatename(name)==true && validateemail(email)==true){
        document.getElementById("submitbtn").removeAttribute("disabled")
    }
    else{
        document.getElementById("submitbtn").setAttribute("disabled","true")
    }
}
$(".closeicon").fadeOut(100)

$(".animateicon").click(function () {
    let inwidth = $(".sidebar .left").outerWidth(true);
    if ($(".sidebar").css("left") === "0px") {
        $(".sidebar").animate({ left: -inwidth }, 500)
        $(".animateicon").fadeIn(100)
        $(".closeicon").fadeOut(100)
    }
    else {
        $(".sidebar").animate({ left: "0px" }, 500)
        $(".animateicon").fadeOut(100)
        $(".closeicon").fadeIn(100)
    }
})
$(".closeicon").click(function () {
    let inwidth = $(".sidebar .left").outerWidth(true);
    if ($(".sidebar").css("left") === "0px") {
        $(".sidebar").animate({ left: -inwidth }, 500)
        $(".animateicon").fadeIn(100)
        $(".closeicon").fadeOut(100)
    }
    else {
        $(".sidebar").animate({ left: "0px" }, 500)
        $(".animateicon").fadeOut(100)
        $(".closeicon").fadeIn(100)
    }
})
$(".animateicon").click(function(){
        $(".item1").animate({top:"0%"},300,function(){
            $(".item2").animate({top:"7%"},300,function(){
                $(".item3").animate({top:"14%"},300,function(){
                    $(".item4").animate({top:"21%"},300,function(){
                        $(".item5").animate({top:"28%"},300)
                    })
                })
            })
    
        })
    })

$(".closeicon").click(function(){
    $(".item5").animate({top:"100%"},400)
    $(".item4").animate({top:"98%"},400)
    $(".item3").animate({top:"95%"},400)
    $(".item2").animate({top:"93%"},400)
     $(".item1").animate({top:"90%"},400)
})









