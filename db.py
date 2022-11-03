import sqlite3
import datetime

class dbConnection():

    #Connect to db    
    def connect_to_db(self,path:str) -> sqlite3.Connection:
        conn = None

        try:
            conn = sqlite3.connect(path,check_same_thread=False)
            print("Connected to db")
        except sqlite3.Error as error:
            print(f"Connection error: {error}")


        return conn

    #Run sql script
    def run_sql_script(self,con:sqlite3.Connection,script_path:str) -> None:
        cur = con.cursor()

        with open(script_path,"r") as sql:
            cur.executescript(sql.read())
            con.commit()
            print("Script executed")

    #User related functions
    def add_user_to_db(self,con:sqlite3.Connection,username:str,password:str,email:str) -> None:
        cur = con.cursor()

        cur.execute("""
        INSERT INTO users (username,password,email) VALUES (?,?,?)
        """,(username,password,email))
        con.commit()
        print("User added to db")

    def get_user_exist_by_username(self,con:sqlite3.Connection,username:str) -> bool:
        cur = con.cursor()

        user = cur.execute("""
        SELECT username FROM users WHERE username = ?
        """,(username,)).fetchone()

        if user == None:
            return False
        else:
            return True

    def get_user_login_data_by_username(self,con:sqlite3.Connection,username:str) -> tuple:
        cur = con.cursor()

        user = cur.execute("""
        SELECT username,password FROM users WHERE username = ?
        """,(username,)).fetchone()

        return user

    def get_user_data_by_username(self,con:sqlite3.Connection,username:str) -> tuple:
        cur = con.cursor()

        user = cur.execute("""
        SELECT username,email FROM users WHERE username = ?
        """,(username,)).fetchone()

        return list(user)

    #Quetions adding and getting functions
    def add_questions_to_questions(self,con:sqlite3.Connection,title:str,createdBy:str,question1:str,question2:str,question3:str,question4:str,question5:str,question6:str,question7:str,question8:str,question9:str,question10:str) -> None:
        cur = con.cursor()

        createdAt = datetime.datetime.now()

        cur.execute("""
        INSERT INTO questions (title,createdBy,question1,question2,question3,question4,question5,question6,question7,question8,question9,question10,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
        """,(title,createdBy,question1,question2,question3,question4,question5,question6,question7,question8,question9,question10,createdAt))
        con.commit()
        print("Questionaire added to db")

    def get_all_questionaries_with_title_createdBy_createdAt(self,con:sqlite3.Connection) -> list:
        cur = con.cursor()

        questionaire = cur.execute("""
        SELECT title,createdBy,createdAt from questions
        """).fetchall()

        questionaries = []
        for q in questionaire:
            questionaries.append(list(q))


        return questionaries

    def get_questions_for_questionnare_by_title(self,con:sqlite3.Connection,title:str) -> list:
        cur = con.cursor()

        questions = cur.execute("""
        SELECT title,question1,question2,question3,question4,question5,question6,question7,question8,question9,question10 FROM questions WHERE title = ?
        """,(title,)).fetchone()

        return list(questions)

    def check_user_answered_questionnaire(self,con:sqlite3.Connection,title:str,user:str) -> bool:
        cur = con.cursor()

        answered =  cur.execute("""
        SELECT answeredAt FROM answers WHERE answeredBy = ? and title = ?
        """,(user,title)).fetchone()

        if answered == None:
            return False
        else:
            return True


    #Answers adding and getting functions
    def add_answers_to_answers(self,con:sqlite3.Connection,title:str,answeredBy:str,answer1:str,answer2:str,answer3:str,answer4:str,answer5:str,answer6:str,answer7:str,answer8:str,answer9:str,answer10:str):
        cur = con.cursor()

        answeredAt = datetime.datetime.now()

        cur.execute("""
        INSERT INTO answers (title,answeredBy,answer1,answer2,answer3,answer4,answer5,answer6,answer7,answer8,answer9,answer10,answeredAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
        """,(title,answeredBy,answer1,answer2,answer3,answer4,answer5,answer6,answer7,answer8,answer9,answer10,answeredAt))
        con.commit()
        print("Answers saved to db")

    def get_all_answers_by_user(self,con:sqlite3.Connection,user:str):
        cur = con.cursor()

        answer = cur.execute("""
        SELECT title,answeredBy,answeredAt FROM answers WHERE answeredBy = ?
        """,(user,)).fetchall()

        answers = []
        for q in answer:
            answers.append(list(q))


        return answers

    def get_answers_from_user_by_username_and_title(self,con:sqlite3.Connection,user:str,title:str) -> list:
        cur = con.cursor()

        answers = cur.execute("""
        SELECT title,answer1,answer2,answer3,answer4,answer5,answer6,answer7,answer8,answer9,answer10 FROM answers WHERE title = ? and answeredBy = ?
        """,(title,user)).fetchone()

        return list(answers)

    #Getting own questionnaries



if __name__ == "__main__":
    conn = dbConnection()
    p = "db/database.db"
    con =  conn.connect_to_db(p)

    conn.add_questions_to_questions(con,"123's questionnarie","123","question1","question2","question3","question4","question5","question6","question7","question8","question9","question10")

    con.close()
    print("db closed")




