const fs = require('fs');

function getFilesInFolder(folder, callback){
    fs.readdir(folder, (err, files) => {
        if (err){
            throw (err);
        }else{
            concated_files = files.map(file => folder + '/' + file);
            callback(concated_files);
        }
    });
}

function fetchRandomIndexes(list_size, num_elements){
    let sampled_indexes = [];
    
    while(sampled_indexes.length < num_elements){
        let random_index = parseInt(Math.random()*list_size);
        if (!(sampled_indexes.includes(random_index))){
            sampled_indexes.push(random_index)
        }
    }

    return sampled_indexes;
}

function updateScore(num_correct_answers, tries){
    document.getElementById('score').innerHTML = '<h2>' + String(num_correct_answers)+ '/' +String(tries) + '</h2>'
}