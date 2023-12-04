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

    return f"added {item}"


@app.route("/removeOneTodo", methods=["POST"])
def removeOneTodo():
    request_data = request.get_json()
    item_id = request_data["id"]

    cursor = mysql.connection.cursor()
    command = f""" delete from todolist where id={item_id} """

    cursor.execute(command)
    mysql.connection.commit()
    cursor.close()

    return f"deleted {item_id}"


@app.route("/getLastId", methods=["GET"])
def getLastId():
    cursor = mysql.connection.cursor()
    command = f""" SELECT * FROM todolist ORDER BY ID DESC LIMIT 1 """

    cursor.execute(command)
    data = cursor.fetchall()
    cursor.close()

    try:
        item_id = jsonify(data[0][0])
    except:
        item_id = jsonify(1)

    return item_id


@app.route("/reset_the_DB", methods=["PUT"])
def resetDB():
    cursor = mysql.connection.cursor()
    command = f"""

    drop table todolist;
    
    create table  todolist (
    id int AUTO_INCREMENT,
	item varchar(255) ,
	createdDate DATETIME DEFAULT now(),
	primary key (id)
    );

    
    """

    cursor.execute(command)
    cursor.close()

    return jsonify({"Response": "Complete"})


app.run(debug=True)


# create table  todolist (
#     id int AUTO_INCREMENT,
# 	item varchar(255) ,
# 	createdDate DATETIME DEFAULT now(),
# 	primary key (id)
# );

# INSERT INTO todolist (item)
# VALUES ("helllllo");
