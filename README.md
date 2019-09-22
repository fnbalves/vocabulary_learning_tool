# Vocabulary learning tool

This tool aims to help to memorize vocabulary and gender differences among different foreign languages.

# Adding new words 

First, put an image of each one of the words you want to practice inside a folder. The first time you run the program, it will ask for the source folder, which will be this folder you used to store the images. The images should be named as follows:

``
[Gender indicator][space][Name of the image]
``

For example, for german, if I wanted to add the word "Chair", I could create an image called "Der Stuhl.PNG". The software will separate the image name using the space to fetch the gender indicator.

# Features

Currently, there are two games implemented. At the first one, the player must guess the correct word for a picture, and at the second one, the player must guess the gender indicator. (For example, Der, Die and Das for German)

# Usage

(For Windows)
Download a release from the [release page](https://github.com/fnbalves/vocabulary_learning_tool/releases), unzip the file and run the vocabulary_learning_tool.exe file inside of the unzipped folder.

# Creating a package for other OS

Just use the electron-packager tool as pointed out by [this tutorial](https://www.christianengvall.se/electron-packager-tutorial/).