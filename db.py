import sqlite3

class dbConnection():
    
    def connect_to_db(self,path:str) -> sqlite3.Connection:
        conn = None

        try:
            conn = sqlite3.connect(path,check_same_thread=False)
            print("Connected to db")
        except sqlite3.Error as error:
            print(f"Connection error: {error}")


        return conn

    def run_sql_script(self,con:sqlite3.Connection,script_path:str) -> None:
        cur = con.cursor()

        with open(script_path,"r") as sql:
            cur.executescript(sql.read())
            con.commit()
            print("Script executed")

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

    def get_user_data_by_username(self,con:sqlite3.Connection,username:str) -> tuple:
        cur = con.cursor()

        user = cur.execute("""
        SELECT username,password FROM users WHERE username = ?
        """,(username,)).fetchone()

        return user






if __name__ == "__main__":
    conn = dbConnection()
    p = "db/database.db"
    con =  conn.connect_to_db(p)
    conn.run_sql_script(con,"C:\Github\szfmwebapp\db\initialize.sql")
    print(conn.get_user_data_by_username(con,"dwadadawdawd"))

    con.close()
    print("db closed")




