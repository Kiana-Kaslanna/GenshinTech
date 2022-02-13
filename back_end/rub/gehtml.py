import os
ls = os.listdir('svgdown')
print(ls)
with open('displaysvg.html', 'w+') as f:
    f.write("""
            <style>
            
            .display{
                display: inline-flex;
                flex-direction: column;
                align-content: center;
                border: 1px solid black;
                padding: 10px;
                margin: 10px;
                align-items: center;
            }
            
            .display svg{
                width:100px;height:100px;
                fill:black;
            }
            </style>
            
            """)
    for i in ls:
        f.write("""
                <div class="display">
                    {}
                    {}
                </div>
                """.format(open('svgdown/'+i, 'r').read(), i))
