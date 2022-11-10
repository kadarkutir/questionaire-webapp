from flask import Flask, url_for,request,redirect,render_template,flash,session
import flask
from werkzeug.security import generate_password_hash, check_password_hash
from db import dbConnection
import uuid
from flask_session import Session

#app config
app = Flask(__name__)
app.config['SECRET_KEY'] = uuid.uuid4().hex
app.config['db_path'] = "db/database.db"
app.config['SESSION_TYPE'] = "filesystem"
Session(app)


#Connect to db
db_con = dbConnection()
con = db_con.connect_to_db(app.config["db_path"])
db_con.run_sql_script(con,"db/initialize.sql")

#Base temlate rendering
@app.route("/")
def start():
    return redirect("/signup")

@app.route("/login",methods=["GET","POST"])
def login():
    return render_template('login.html')

@app.route("/signup",methods=["GET","POST"])
def signup():
    return render_template('signup.html')

@app.route("/signup_post_screen")
def signup_post_screen():
    return render_template('signup_redirect.html')

@app.route("/logout")
def logout():
    session["username"] = None
    return redirect("/login")

@app.route("/index")
def index():
    if not session.get('username'):
        return redirect("/login")

    print(session['username'])
    return render_template('index.html')


#Signup and login routes
@app.route("/signup_post",methods=["POST"])
def signup_post():
    email = request.form.get('email')
    username = request.form.get('username')
    password = request.form.get('password')
    password_again = request.form.get('password_again')

    user = db_con.get_user_exist_by_username(con,username)

    if user:
        flash("""User already exists.""")
        return redirect("/signup")

    if password != password_again:
        flash("The passwords dont match.")
        return redirect("/signup")

    hashed_password=generate_password_hash(password, method='sha256')

    db_con.add_user_to_db(con,username,hashed_password,email)
    con.commit()

    return redirect("/signup_post_screen")

@app.route("/login_post",methods=["POST"])
def login_post():
    username = request.form.get('username')
    password = request.form.get('password')

    session["username"] = username

    user = db_con.get_user_login_data_by_username(con,username)

    if user == None:
        flash("User not found \n Check your username and password")
        return redirect("/login")

    if check_password_hash(user[1],password):
        return redirect("/index")
    else:
        flash("User not found \n Check your username and password")
        return redirect("/login")

#Profile data 
@app.route("/get_user_data")
def get_user_data():
    username = session.get('username')

    user = db_con.get_user_data_by_username(con,username)

    return flask.jsonify(user)


#Get and fill questionnaries
@app.route("/get_all_questionaries")
def get_all_questionaries():
    questionaries = db_con.get_all_questionaries_with_title_createdBy_createdAt(con)

    return flask.jsonify(questionaries)

@app.route("/get_questions_for_questionnaire/<title>")
def get_questions_for_questionnaire(title):
    questions = db_con.get_questions_for_questionnare_by_title(con,title)

    return flask.jsonify(questions)

#Filling questionnaire routes
@app.route("/check_user_filled/<title>")
def check_user_filled(title):
    filled = db_con.check_user_answered_questionnaire(con,title,session.get('username'))

    if filled:
        return flask.jsonify('True')
    else:
        return flask.jsonify('False')

@app.route("/fill_post/<title>", methods=["POST"])
def fill_post(title):
    answer1 = request.form.get("answer1")
    answer2 = request.form.get("answer2")
    answer3 = request.form.get("answer3")
    answer4 = request.form.get("answer4")
    answer5 = request.form.get("answer5")
    answer6 = request.form.get("answer6")
    answer7 = request.form.get("answer7")
    answer8 = request.form.get("answer8")
    answer9 = request.form.get("answer9")
    answer10 = request.form.get("answer10")

    user = session.get("username")
    db_con.add_answers_to_answers(con,title,user,answer1,answer2,answer3,answer4,answer5,answer6,answer7,answer8,answer9,answer10)

    return redirect("/index")

#Library functions to show answers
@app.route("/get_all_answer_by_user")
def get_all_answer_by_user():
    answers = db_con.get_all_answers_by_user(con,session.get('username'))

    if answers == None:
        return flask.jsonify("None")

    return flask.jsonify(answers)

@app.route("/get_answers_by_user_and_title/<title>")
def get_answers_by_user_and_title(title):

    questions = db_con.get_questions_for_questionnare_by_title(con,title)
    answers = db_con.get_answers_from_user_by_username_and_title(con,session.get('username'),title)

    result = [0 for i in range(0,(len(questions)+len(answers))-1)]
    result[0] = questions[0]

    dif = 0
    for i in range(1,len(result),2):
        result[i] = questions[i-dif]
        dif += 1

    dif = 1
    for j in range(2,len(result),2):
        result[j] = answers[j-dif]
        dif+=1
    
    return flask.jsonify(result)

#User's own questionnares functions
@app.route("/get_own_questionnaries_by_user")
def get_own_questionnaries_by_user():
    user = session.get('username')

    questions = db_con.get_own_questionnaries(con,user)

    if questions == None:
        return flask.jsonify("None")

    return flask.jsonify(questions)

@app.route("/get_answers_by_user_and_title_my_questionnare/<title>/<user>")
def get_answers_by_user_and_title_my_questionnare(title,user):

    questions = db_con.get_questions_for_questionnare_by_title(con,title)
    answers = db_con.get_answers_from_user_by_username_and_title(con,user,title)

    result = [0 for i in range(0,(len(questions)+len(answers)))]
    result[0] = questions[0]
    result[1] = user

    dif = 1
    for i in range(2,len(result),2):
        result[i] = questions[i-dif]
        dif += 1

    dif = 2
    for j in range(3,len(result),2):
        result[j] = answers[j-dif]
        dif+=1
    
    return flask.jsonify(result)

@app.route("/get_all_answers_on_questionnare/<title>")
def get_all_answers_on_questionnare(title):
    
    answers = db_con.get_all_answers_on_questionnare(con,title)

    if answers == None:
        return flask.jsonify("None")

    return flask.jsonify(answers)


#Questionnare creator function
@app.route("/add_question", methods=["POST"])
def add_question():
    title = request.form.get("title")
    user = session.get("username")

    question1 = request.form.get("question1")
    question2 = request.form.get("question2")
    question3 = request.form.get("question3")
    question4 = request.form.get("question4")
    question5 = request.form.get("question5")
    question6 = request.form.get("question6")
    question7 = request.form.get("question7")
    question8 = request.form.get("question8")
    question9 = request.form.get("question9")
    question10 = request.form.get("question10")

    db_con.add_questions_to_questions(con,title,user,question1,question2,question3,question4,question5,question6,question7,question8,question9,question10)

    return redirect("/index")

#Main function
if __name__ == "__main__":
    app.run(debug=True,host="localhost",port=5000)
