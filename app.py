from flask import Flask, url_for,request,redirect,render_template,flash
import flask
from werkzeug.security import generate_password_hash, check_password_hash
from db import dbConnection
import uuid

app = Flask(__name__)
app.config['SECRET_KEY'] = uuid.uuid4().hex
app.config['db_path'] = "db/database.db"


db_con = dbConnection()
con = db_con.connect_to_db(app.config["db_path"])
db_con.run_sql_script(con,"db/initialize.sql")

@app.route("/")
def start():
    return redirect("/login_home")

@app.route("/login_home")
def login_home():
    return render_template('login_home.html')

@app.route("/login",methods=["GET","POST"])
def login():
    return render_template('login.html')

@app.route("/signup",methods=["GET","POST"])
def signup():
    return render_template('signup.html')

@app.route("/signup_post",methods=["POST"])
def signup_post():
    email = request.form.get('email')
    username = request.form.get('username')
    password = request.form.get('password')

    user = db_con.get_user_exist_by_username(con,username)

    if user:
        flash("User already exists")
        return redirect("/signup")

    hashed_password=generate_password_hash(password, method='sha256')

    db_con.add_user_to_db(con,username,hashed_password,email)
    con.commit()

    return redirect("/login")

@app.route("/login_post",methods=["POST"])
def login_post():
    username = request.form.get('username')
    password = request.form.get('password')

    user = db_con.get_user_data_by_username(con,username)

    if user == None:
        flash("User not found \n Check your username and password")
        return redirect("/login")

    if check_password_hash(user[1],password):
        return redirect("/index")
    else:
        flash("User not found \n Check your username and password")
        return redirect("/login")



@app.route("/index")
def index():
    return render_template('index.html')










if __name__ == "__main__":
    app.run(debug=True,host="localhost",port=5000)