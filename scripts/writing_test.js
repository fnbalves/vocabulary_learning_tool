let correct_answer=null;
let num_correct = 0;
let num_tries = 0;
let already_evaluated = false;


function speakCorrectWord(){
    if(correct_answer != null){
        speakSomething(correct_answer);
    }
}


function populateQuestion(available_files){
    let num_images = available_files.length;
    already_evaluated = false;
    updateScore(num_correct, num_tries);
    num_tries += 1;

    get_name = (str) => {
        splitted_s = str.split('/')
        file_name = splitted_s[splitted_s.length - 1];
        name_only = file_name.split('.')[0];
        return name_only;
    };

    names_only = available_files.map(file => get_name(file));
    
    selected_image_to_query = parseInt(Math.random()*num_images);
    correct_answer = names_only[selected_image_to_query];

    document.getElementById("query_img").src = available_files[selected_image_to_query];
    result_div = document.getElementById("correct_answer");
    answer_txt = document.getElementById("txt_answer");

    result_div.innerText = "";
    answer_txt.value = "";
}

function verifyAnswer(){
    if(already_evaluated)return;
    already_evaluated = true;

    result_div = document.getElementById("correct_answer");
    answer_txt = document.getElementById("txt_answer");
    var answer = answer_txt.value;

    if (answer == correct_answer){
        num_correct += 1;
        result_div.innerText = correct_answer + " (correct)";
    }else{
        result_div.innerText = correct_answer + " (wrong)";
    }

    updateScore(num_correct, num_tries);
}