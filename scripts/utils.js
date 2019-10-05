const fs = require('fs');
const dialog = require('electron').remote.dialog;
const settings = require('electron-settings');

function selectAndSaveImageFolder(callback){    
    dialog.showOpenDialog({ properties: ["openDirectory"] }, (dir)=> {
        console.log("DIR", dir);

        if(callback){
            if (dir.length){
                callback(dir);
            }
        }
        else if(dir.length){
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
            are_usable = concated_files.map(file => isUsableImageFile(file));
            actual_files = [];
            num_files = concated_files.length;
            //console.log('INITIAL FILES AVAILABLE', concated_files);

            for(var i=0;i<num_files;i++){
                if(are_usable[i]){
                    actual_files.push(concated_files[i]);
                }
            }

            //console.log('ACTUAL FILES AVAILABLE', actual_files);
            callback(actual_files);
        }
    });
}

function isUsableImageFile(file){
    possible_extensions = ['gif', 'jpeg', 'jpg', 'png']

    splitted_file = file.split('/')
    last_part = splitted_file[splitted_file.length - 1];
    splitted_by_punct = last_part.split('.')
    extension = splitted_by_punct[splitted_by_punct.length - 1].toLowerCase();
    num_spaces = last_part.split(' ').length

    return (possible_extensions.includes(extension) && (num_spaces > 1))
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


function speakSomething(text, lang='de-DE'){
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = lang;

    speechSynthesis.speak(msg);
}