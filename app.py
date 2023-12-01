from flask import Flask, render_template, jsonify, request

from flask_mysqldb import MySQL

app = Flask(__name__)

app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "todo"

mysql = MySQL(app)


@app.route("/")
def hello():
    return render_template("index.html")


@app.route("/alltodos", methods=["GET"])
def getTodos():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * from todolist;")
    data = cursor.fetchall()
    cursor.close()

    return jsonify(data)


@app.route("/addtodo", methods=["POST"])
def addTodo():
    request_data = request.get_json()
    item = request_data["item"]

    cursor = mysql.connection.cursor()
    command = f"""INSERT INTO todolist (item) VALUES ("{item}");"""

    cursor.execute(command)
    mysql.connection.commit()
    cursor.close()

    return f"0{item}"


app.run(debug=True)


# create table  todolist (
#     id int AUTO_INCREMENT,
# 	item varchar(255) ,
# 	createdDate DATETIME DEFAULT now(),
# 	primary key (id)
# );

# INSERT INTO todolist (item)
# VALUES ("helllllo");
