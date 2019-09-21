let correct_answer;
let num_correct = 0;
let num_tries = 0;
let already_evaluated = false;

function clearElementsFromSelect(select){
    let length = select.options.length;
    for (i = 0; i < length; i++) {
        select.remove(0);
    }
}

function addElementsToSelect(select, elements){
    num_elements = elements.length;
    for(i=0;i<num_elements;i++){
        var option = document.createElement("option");
        option.text = elements[i];
        select.add(option); 
    }
}

function populateQuestion(available_files){
    let num_images = available_files.length;
    already_evaluated = false;
    num_tries += 1;

    result_div = document.getElementById("evaluation");
    result_div.innerText = "";
    
    all_genders = available_files.map(file => file.split(' ')[0].split('/')[1].toLowerCase());
    available_genders = Array.from(new Set(all_genders));
    
    selected_image_to_query = parseInt(Math.random()*num_images);
    selected_gender = all_genders[selected_image_to_query];
    correct_answer = selected_gender;

    document.getElementById("query_img").src = '../' + available_files[selected_image_to_query];

    select_gender = document.getElementById("gender_options");
    clearElementsFromSelect(select_gender);
    addElementsToSelect(select_gender, available_genders);
}

function verifyAnswer(){
    if(already_evaluated)return;
    already_evaluated = true;

    select_gender = document.getElementById("gender_options");
    result_div = document.getElementById("evaluation");

    var selected_answer = select_gender.options[select_gender.selectedIndex].text;

    if (selected_answer == selected_gender){
        num_correct += 1;
        result_div.innerText = "(correct)";
    }else{
        result_div.innerText = "(wrong)";
    }

    updateScore(num_correct, num_tries);
}