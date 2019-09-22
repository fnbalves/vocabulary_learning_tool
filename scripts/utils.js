const fs = require('fs');
const dialog = require('electron').remote.dialog;
const settings = require('electron-settings');

function selectAndSaveImageFolder(callback){    
    dialog.showOpenDialog({ properties: ["openDirectory"] }, (dir)=> {
        if(callback){
            callback(dir);
        }
        else{
            settings.set('image_folder', dir);
        }
    });
}

function runForImageFolder(my_function){
    if (!settings.has('image_folder')){
        alert("The source image folder was not set! Set it now.");
        selectAndSaveImageFolder((dir) => {
            settings.set('image_folder', dir);
            my_function(dir);
        });
    }else{
        my_folder = settings.get('image_folder')[0];
        
        if (!fs.existsSync(my_folder)){
            alert("The source image folder doen't exist anymore. Please choose a new one");
            selectAndSaveImageFolder((dir) => {
                settings.set('image_folder', dir);
                my_function(dir);
            });
        }

        my_function(settings.get('image_folder')[0]);
    }
}

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