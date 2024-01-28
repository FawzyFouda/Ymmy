
$('.open-close-icon').click(() => {
    if($('.open-close-icon').hasClass('fa-align-justify')){
        openNavBar()
    }else if($('.open-close-icon').hasClass('fa-x')){
        closeNavBar()
    }
})
$('.open-close-icon.fa-x').click(() => {
        $(`.list-unstyled li:nth-of-type(1)`).css({'top':'300','transition':'none'})
})
getHomeData()
//   -----------------------------------------Display Search meals -------------------------------------------
async function DisplaySearchMeals(e){
    let searchMeals = ``
    let inputText = $(e.target).val() 
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`),
    searchMealsDetails = await result.json(),
    searchMealData = searchMealsDetails.meals
    console.log(searchMealData)
        if(searchMealsDetails.meals != null){
            for(let i=0; i < searchMealData.length; i++){
                searchMeals +=`
                <div class="col-md-3">
                <div onclick ="getMealDetails('${searchMealData[i].idMeal}')" class="get meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${searchMealData[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${searchMealData[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            `
            }
            $('#rowData').html(
                `
                ${searchMeals}
                `
            )
        }else{
            searchMeals =``
            $('#rowData').html(
                `
                ${searchMeals}
                `
            )
        }
}
//   -----------------------------------------Display Search Inputs-------------------------------------------
$('#searchBtn').click(() =>{
    showSearchInputs()
    closeNavBar()
    $("#searchName").keyup(async (e) =>{
        DisplaySearchMeals(e)
    });
    $("#searchFirstLetter").keyup(async (e) =>{
        DisplaySearchMeals(e)
    });
    $('#rowData').empty()
})
//   -----------------------------------------Display categories Inputs-------------------------------------------
$('#categoriesBtn').click(() => {
    $('#searchContainer').empty()
    getCategories()
    closeNavBar()
})
//-----------------------------------------All Used Functions -------------------------------------------

//----------------------------------------- Navbar openNavBar function-------------------------
function openNavBar(){
    $('.open-close-icon').removeClass('fa-align-justify')
    $('.open-close-icon').addClass('fa-x')
    $('.side-nav-menu').animate({left:'0'},500)
    $('.list-unstyled li').animate({top:'0'},200)
    for(i=1; i <= $(`.list-unstyled li`).length; i++){
        $(`.list-unstyled li:nth-of-type(${i})`).css({'top':'0','transition':`top ${0.2*i}s 0.1s`})
    }
}
 //-----------------Navbar closeNavBar Function-------------------------
function closeNavBar(){
    $('.open-close-icon').removeClass('fa-x')
    $('.open-close-icon').addClass('fa-align-justify')
    $('.side-nav-menu').animate({left:'-256'},500)
    for(i=1; i <= $(`.list-unstyled li`).length; i++){
        $(`.list-unstyled li:nth-of-type(${i})`).css({'top':'300px','transition':`top ${0.2*i}s 0.1s`})
    }
}
 //------------------Get & Display Home page Function ------------------------
async function getHomeData(){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let home = await result.json()
    let homeMeals = home.meals
    let homeMealsContainer=``
    for(let i=0; i < homeMeals.length; i++){
        homeMealsContainer +=
        `
            <div class="col-md-3">
                <div onclick ="getMealDetails('${homeMeals[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${homeMeals[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${homeMeals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    }
    $('#rowData').html(
        `
        ${homeMealsContainer}
        `
    )
}

//------------------Display Search Inputs Function------------------------
function showSearchInputs(){
    $('#searchContainer').html(
        `
        <div class="row py-4 ">
            <div class="col-md-6 ">
                <input  class="form-control bg-transparent text-white" type="text" id='searchName' placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input maxlength="1" class="form-control bg-transparent text-white" type="text" id='searchFirstLetter' placeholder="Search By First Letter">
            </div>
        </div>
        `
    )
}
 //------------------Get & Display Categories  ------------------------
 async function getCategories(){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let Category = await result.json()
    let CategoryMeals = Category.categories
    let CategoryMealsContainer=``
    console.log(CategoryMeals)
    for(let i=0; i < CategoryMeals.length; i++){
        CategoryMealsContainer +=
        `
            <div class="col-md-3">
                <div onclick="getCategoryMeals('${CategoryMeals[i].strCategory}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${CategoryMeals[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3 class='catHeader'>${CategoryMeals[i].strCategory}</h3>
                        <p>${CategoryMeals[i].strCategoryDescription.substring(0,120)}</p>
                    </div>
                </div>
            </div>
        `
    }
    $('#rowData').html(
        `
        ${CategoryMealsContainer}
        `
    )
}

async function getCategoryMeals(strCategory){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
    let Category = await result.json()
    let CategoryMeals = Category.meals
    console.log(CategoryMeals)

    let CategoryMealsContainer=``
    for(let i=0; i < CategoryMeals.length; i++){
        CategoryMealsContainer +=
        `
        <div class="col-md-3">
            <div onclick="getMealDetails('${CategoryMeals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${CategoryMeals[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${CategoryMeals[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `
    }
    $('#rowData').html(
        `
        ${CategoryMealsContainer}
        `
    )
}

$('#areaBtn').click(async () =>{
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let area = await result.json()
    let areaMeals = area.meals
    let areaMealsContainer=``
    for(let i=0; i < areaMeals.length; i++){
        areaMealsContainer +=
        `
        <div class="col-md-3">
            <div onclick="displayAreaInfo('${areaMeals[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                    <div><i class="fa-solid fa-house-laptop fa-4x"></i></div>
                    <h3>${areaMeals[i].strArea}</h3>
            </div>
        </div>
        `
    }
    $('#rowData').html(
        `
        ${areaMealsContainer}
        `
    )
    closeNavBar()
})


async function displayAreaInfo(mealArea){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealArea}`)
    let area = await result.json()
    let areaMeals = area.meals
    let areaMealsContainer=``
    for(let i=0; i < areaMeals.length; i++){
        areaMealsContainer +=
        `
        <div class="col-md-3">
            <div onclick="getMealDetails('${areaMeals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${areaMeals[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${areaMeals[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `
    }
    $('#rowData').html(
        `
        ${areaMealsContainer}
        `
    )
    
}
async function getMealDetails(idMeal){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    let home = await result.json()
    let homeMeals = home.meals
    let mealData = home.meals[0]
    let homeMealsContainer=``
    console.log(mealData)
    let strMeasure = Object.entries(mealData).filter(([key]) => key.includes('strMeasure'))
    let strIngredient = Object.entries(mealData).filter(([key]) => key.includes('strIngredient'))
    let  str = ``
    let  strTagContainer = ``
    console.log(strMeasure)
    console.log(strIngredient)
    if(mealData.strTags != null){
        for(let x=0; x < (mealData.strTags.split(',').length); x++){
                strTagContainer +=`
                <li class="alert alert-danger m-2 p-1">${mealData.strTags.split(',')[x]}</li>
            `
        }
    }
    for(let i=0; i < strMeasure.length; i++){
        if(strMeasure[i][1] != '' && strIngredient[i][1] != ''){
            str +=`
            <li class="alert alert-info m-2 p-1">${strMeasure[i][1]} ${strIngredient[i][1]}</li>
            `
        }
            
    }
    for(let i=0; i < homeMeals.length; i++){
        homeMealsContainer +=
        `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${homeMeals[i].strMealThumb}" alt="${homeMeals[i].strMeal}">
            <h2>${homeMeals[i].strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${homeMeals[i].strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${homeMeals[i].strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${homeMeals[i].strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${str}
            </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${strTagContainer}
            </ul>
            <a target="_blank" href="${homeMeals[i].strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${homeMeals[i].strYoutube}" class="btn btn-danger">Youtube</a>
        </div>
        `
    }
    $('#rowData').html(
        `
        ${homeMealsContainer}
        `
    )
}

$('#ingredientsBtn').click(async () =>{
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let ingredients = await result.json()
    let ingredientsMeals = ingredients.meals
    let ingredientsMealsContainer=``
   
    for(let i=0; i < 20; i++){
    
        if(ingredientsMeals[i].strDescription != null){
            
        console.log(ingredientsMeals[i].strDescription)
        ingredientsMealsContainer +=
        `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${ingredientsMeals[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredientsMeals[i].strIngredient}</h3>
                        <p>${ingredientsMeals[i].strDescription.substring(0, 125)}</p>
                </div>
        </div>
        `
        }
        
    }
    $('#rowData').html(
        `
        ${ingredientsMealsContainer}
        `
    )
    closeNavBar()
})

async function getIngredientsMeals(inredientName){
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inredientName}`)
    let home = await result.json()
    let homeMeals = home.meals
    let homeMealsContainer=``
    for(let i=0; i < homeMeals.length; i++){
        homeMealsContainer +=
        `
        <div class="col-md-3">
            <div onclick="getMealDetails('${homeMeals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${homeMeals[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${homeMeals[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `
    }
    $('#rowData').html(
        `
        ${homeMealsContainer}
        `
    )
    
}

// ----------------------------------------------------------------------------------------
$('#contactsBtn').click(() => {
    $('#rowData').html(
        `
        <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3 disabled">Submit</button>
    </div>
</div>
        `
    )
    closeNavBar()
    let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g
    let regPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g
    $("#emailInput").keyup(function (e){
        let inputText = $(e.target).val()
        if(!regEmail.test(inputText)){
            $('#emailAlert').removeClass('d-none')
        }else{
            $('#emailAlert').addClass('d-none')

        }
});
    $("#phoneInput").keyup(function (e){
        let inputText = $(e.target).val()
        console.log(inputText)
        if(!regPhone.test(inputText)){
            $('#phoneAlert').removeClass('d-none')
        }else{
            $('#phoneAlert').addClass('d-none')

        }

});
    $("#passwordInput").keyup(function(e){
        let passText = $(e.target).val()
        console.log(passText)
        if(!regPass.test(passText)){
            $('#passwordAlert').removeClass('d-none')
        }else{
            $('#passwordAlert').addClass('d-none')
            
        }
})

$("#repasswordInput").keyup(function inputsValidation(e){
    let inputText = $(e.target).val()
    if(inputText !== $('#passwordInput').val()){
        $('#repasswordAlert').removeClass('d-none')
    }else{
        $('#repasswordAlert').addClass('d-none')

    }
});
});
if(regPass.test($('#passwordInput').val()) && regPass.test($('#repasswordInput').val()) && regEmail.test($('#emailInput').val())){
    $('#submitBtn').removeClass('disabled')
}
