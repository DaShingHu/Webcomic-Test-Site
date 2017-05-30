import pymongo
import os
import pprint
import json
from pymongo import MongoClient


# Populates the database
# Place this file into the root of the comics folder
# Requires a directory structure like this:


# |-- comic_a
# |   |-- chapter_1
# |   |   |-- 01.jpg
# |   |   `-- 02.jpg
# |   |-- chapter_2
# |   |   |-- 01.jpg
# |   |   `-- 02.jpg
# |   `-- info.json
# |-- comic_b
# |   |-- chapter_1
# |   |   |-- 01.jpg
# |   |   `-- 02.jpg
# |   `-- chapter_2
# |-- comic_c
# |   |-- chapter_1
# |   `-- chapter_2
# `-- database.py

client = MongoClient('localhost').comics


series = [x for x in os.listdir(".") if not os.path.isfile(x)];
chapters = []

listOfSeriesTitles = [x['title'] for x in client.series.find()];


for serial in series:
    if (serial not in listOfSeriesTitles):
        client.series.insert({"title": serial});


for serial in series:
    chapterList = [x for x in os.listdir("./" + serial) if os.path.isdir("./" + serial + "/" + x)]
    chapters.append(chapterList)
    for chapter in chapterList:
        query = client.chapters.find({'title': chapter, 'series': serial})
        if (query.count() == 0):
            client.chapters.insert({"title": chapter, "series": serial})
        
        pageList = [x for x in os.listdir("./" + serial + "/" + chapter) if os.path.isfile("./" + serial + "/" + chapter + "/" + x)]

        for page in pageList:
            query = client.pages.find({"title": page, "series": serial, "chapter": chapter});
            
            if (query.count() == 0 and page != ".DS_Store"):

                client.pages.insert({"title": page, "series": serial, "chapter": chapter, "page number" : int(page.strip(".jpg"))});






