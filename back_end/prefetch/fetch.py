import json
import re
import sys

import requests
from lxml import etree, html


def break_url(file):
    st = open(file, 'r', encoding='utf-8').read()
    st = [i for i in st.splitlines() if i != ""]
    rt = []
    for i in st:
        if i not in rt:
            rt.append(i)
    return rt


def fetch_character(lis_of_url):
    with open('character.json', 'w+', encoding='UTF-8') as j:
        j.write("{\n")
        for url in lis_of_url:
            page = requests.get(url)
            tree = html.fromstring(page.content)
            title = tree.xpath('//div[@class="custom_title"]/text()')
            uid = title[0].replace(" ", "").lower()
            table = tree.xpath('//*[@id="live_data"]/table[1]')
            tbcontent = table[0].xpath('//tr/td//text()')
            st = """
            "{}": {{
                "name": "{}",
                "_id": "{}",
                "genre": "character",
                "title": "{}",
                "allegiance": "{}",
                "element": "",
                "birthday": "{}",
                "description": "{}",
                "price": ""
            }},
            """.format(title[0], title[0], uid, tbcontent[1], tbcontent[3], tbcontent[7], tbcontent[19].replace("\"", "\\\""))
            j.write(st)
        j.write("\n}")


def fetch_character_head():
    with open('character.json', 'r', encoding='UTF-8') as j:
        contents = json.loads(j.read())
        for ka in contents:
            k = ka.replace(" ", "").lower()
            response = requests.get(
                'https://genshin.honeyhunterworld.com/img/char/{}.png'.format(k))
            if response.status_code == 404:
                print(ka, 'not download')
            else:
                file = open("download\{}.png".format(k), "wb+")
                file.write(response.content)
                file.close()


def fetch_artifact(lis_of_url):
    with open('artifact.json', 'w+', encoding='UTF-8') as j:
        j.write("{\n")
        for url in lis_of_url:
            uri = url[-16:-9]
            page = requests.get(url)
            tree = html.fromstring(page.content)
            title = tree.xpath('//div[@class="custom_title"]/text()')

            tableInfo = tree.xpath('//*[@class="wrappercont"]//table[1]')
            tableInfo = etree.tostring(tableInfo[0]).decode('utf-8')
            tableInfo = re.sub("([<]).*?([>])", "<>", tableInfo)
            tableInfo = [i for i in tableInfo.split('<>') if i != ""]

            story = tree.xpath('//*[@class="wrappercont"]//table[3]')
            story = etree.tostring(story[0]).decode('utf-8')
            story = re.sub("([<]).*?([>])", "<>", story)
            story = [i.replace('"', '\\"')
                     for i in story.split('<>') if i != ""]
            sto = "\"" + "<br>".join(story)+"\""

            jsn = """
            "{}": {{
                "name": "{}",
                "_id": "{}",
                "genre": "artifact",
                "type": "{}",
                "set": "{}",
                "description": "{}",
                "story": {},
                "price": "6"
            }},
            """.format(title[0], title[0], uri, tableInfo[1], tableInfo[3], tableInfo[-1], sto)
            j.write(jsn)
        j.write("\n}")


def get_artifact_type():
    with open('artifact.json', 'r', encoding='UTF-8') as j:
        contents = json.loads(j.read())
        typ, sett = [], []
        for v in contents.values():
            if v['type'] not in typ:
                typ.append(v['type'])
            if v['set'] not in sett:
                sett.append(v['set'])

        sto = "[\"" + "\",\"".join(typ)+"\"]"
        ste = "[\"" + "\",\"".join(sett)+"\"]"
        with open('artifact_config.json', 'w+', encoding='UTF-8') as q:
            q.write('{\n\"type\":')
            q.write(sto)
            q.write(',\n')
            q.write('\"set\":')
            q.write(ste)
            q.write('}')


def fetch_artifact_head(lis_of_url):
    for url in lis_of_url:
        uri = url[-16:-9]
        response = requests.get(
            "https://genshin.honeyhunterworld.com/img/art/{}.png".format(uri))
        if response.status_code == 404:
            print(url, 'not download')
        else:
            file = open("download\{}.png".format(uri), "wb+")
            file.write(response.content)
            file.close()


helps = """
------
 HELP
------
char    fetch all character
-char   fetch all character img based on fetched character json file
arti    fetch all artifact
-arti   fetch all artifact img
------
You need to check the json file syntax, or if fetch img print xxx not download.
"""
num_of_args = len(sys.argv)
if num_of_args != 2:
    print(helps)
else:
    if sys.argv[1] == '-h':
        print(helps)
    elif sys.argv[1] == 'char':
        fetch_character(break_url('url_character.txt'))
    elif sys.argv[1] == '-char':
        fetch_character_head()
    elif sys.argv[1] == 'arti':
        fetch_artifact(break_url('url_artifact.txt'))
    elif sys.argv[1] == '-arti':
        fetch_artifact_head(break_url('url_artifact.txt'))
