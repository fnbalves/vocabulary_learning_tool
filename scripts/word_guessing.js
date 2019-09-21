let correct_answer;
let num_images_to_select = 4;
let names_only;
let num_correct = 0;
let num_tries = 0;
let already_evaluated = false;

function logFiles(files){
    files.forEach(file => {
        console.log('New file', file);
    });
}

function checkAnsweredOption(){
    if(correct_answer){
        //console.log('option_' + String(correct_answer + 1), document.getElementById('option_' + String(correct_answer + 1)).checked)
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
    num_tries += 1;

    clearSelection();

    random_array_indexes = fetchRandomIndexes(num_images, num_images_to_select);

    selected_image_to_query = parseInt(Math.random()*num_images_to_select);

    document.getElementById("query_img").src = '../' + available_files[random_array_indexes[selected_image_to_query]];

    correct_answer = selected_image_to_query;
    names_only = random_array_indexes.map(index => available_files[index].split('/')[1].split('.')[0]);

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

