from flask import *
app = Flask(__name__)

maps = []


@app.route("/", methods=["GET"])
def problem():
    for i in range(1, 4):
        with open(f'data/map/{i}.txt') as f:
            maps.append(f.read())
    return render_template('mkd-debugger.html', maps=maps)


@app.route("/editor", methods=["GET", "POST"])
def editor():
    if maps == []:
        for i in range(1, 4):
            with open(f'data/map/{i}.txt') as f:
                maps.append(f.read())
    if request.method == "POST":
        form_data = request.form.to_dict()
        print(form_data, maps)
        maps[int(form_data['tab']) - 1] = form_data['map'].replace('\r\n', '\n')
        with open(f'data/map/{form_data["tab"]}.txt', 'wt') as f:
            f.write(form_data['map'])
    return render_template('mkd-debugger-editor.html', maps=maps)
