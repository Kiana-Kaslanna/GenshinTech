tree = html.fromstring(open('dd.html', 'r', encoding='utf-8').read())
tt = tree.xpath('//*[@class="icon-name"]/span/text()')
print(tt)

ts = tree.xpath('//svg[@class="icon"]')


for i in range(len(tt)):
    x = etree.tostring(ts[i]).decode("utf-8")

    x = re.sub(r"\bclass=\".+?\"","", x)
    x = re.sub(r"\bstyle=\".+?\"","", x)
    x = re.sub(r"\bfill=\".+?\"","", x)
    x = re.sub(r"\bp\-id=\".+?\"","", x)
    while "  " in x:
        x=x.replace("  "," ")
    with open('svgdown/{}.svg'.format(tt[i]), 'w+') as f:
        f.write(x)