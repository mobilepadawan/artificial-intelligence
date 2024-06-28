# Testing Hugging Face AI with Node.js

This is a very simple project where I'm using two models of AI taken from the Hugging Face website.

## Translatation

The first one is a model where I send a simple text message in `spanish` and the app return me the text translated to `english`. In this app I'm using `facebook/nllb-200-distilled-600M` model.

The results are good but not promising. Another models for translation should be better than this. I will digg more deeply in this field to get a better sample project.

## Image description

The other project is a model where I send an image and the model return me a captioned description of it. I use for this project the `Salesforce/blip-image-captioning-large` model.

### How to start

Create an account in https://huggingface.io/ and login into the platform. After that you can generate a TOKEN KEY for starting using any of the available models.

### Installation

This app is a node.js app and I will evolutionate in the near future, creating and endpoint for send texts and images for image captioning and text translation. Be patient, please.