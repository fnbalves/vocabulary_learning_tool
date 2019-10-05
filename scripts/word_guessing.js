let correct_answer;
let num_images_to_select = 4;
let names_only;
let num_correct = 0;
let num_tries = 0;
let current_correct_name = null;

let already_evaluated = false;

function logFiles(files){
    files.forEach(file => {
        console.log('New file', file);
    });
}

function speakCorrectWord(){
    if(current_correct_name != null){
        speakSomething(current_correct_name);
    }
}

function checkAnsweredOption(){
    if(correct_answer != null){
        
        if(document.getElementById("opt_" + String(correct_answer + 1)).checked){
            num_correct += 1;
        }

        updateScore(num_correct, num_tries);
    }
}

function clearSelection(){
    for(i=0;i<num_images_to_select;i++){
        document.getElementById("opt_" + String(i + 1)).checked = false;
    }
}

function populateQuestion(available_files){
    let num_images = available_files.length;
    
    already_evaluated = false;
    updateScore(num_correct, num_tries);
    num_tries += 1;

    clearSelection();

    random_array_indexes = fetchRandomIndexes(num_images, num_images_to_select);

    selected_image_to_query = parseInt(Math.random()*num_images_to_select);

    document.getElementById("query_img").src = available_files[random_array_indexes[selected_image_to_query]];

    correct_answer = selected_image_to_query;
    
    get_name = (str) => {
        splitted_s = str.split('/')
        file_name = splitted_s[splitted_s.length - 1];
        name_only = file_name.split('.')[0];
        return name_only;
    };

    names_only = random_array_indexes.map(index => get_name(available_files[index]));
    current_correct_name = names_only[selected_image_to_query];

    for(i=0;i<num_images_to_select;i++){
        document.getElementById("option_" + String(i + 1)).innerText = names_only[i];
    }
    
}

function verifyAnswer(){
    if(already_evaluated)return;
    already_evaluated = true;

    for(i=0;i<num_images_to_select;i++){
        let text_to_put = ' (wrong)'
        if (i == correct_answer){
            text_to_put = ' (correct)'
        }
        
        document.getElementById("option_" + String(i + 1)).innerText = names_only[i] + text_to_put;
    }

    checkAnsweredOption();
}

