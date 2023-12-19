import sqlite3


class Db():

    def __init__(self):
        self.conn = sqlite3.connect("./database/database.db")
        self.conn.row_factory = sqlite3.Row

        self.cur = self.conn.cursor()


    # Utils
    def _to_dict_one(self, rows):
        return [dict(row) for row in rows][0]
    

    def _to_dict_all(self, rows):
        return [dict(row) for row in rows]


    # User
    def get_user(self, uid):
        result = self.cur.execute(""" SELECT * FROM users WHERE id=? """, (uid, )).fetchall()

        return self._to_dict_one(result)
    
    def get_user_info(self, uid):
        result = self.cur.execute(""" SELECT id, login, name, role_id FROM users WHERE id=? """, (uid, )).fetchall()

        return self._to_dict_one(result)

    def get_all_users(self):
        result = self.cur.execute(""" SELECT * FROM users """).fetchall()

        return self._to_dict_all(result)
      
    def get_maker_id(self, name, role_id, ):
        result = self.cur.execute(""" SELECT id FROM users WHERE name=? AND role_id=?""", (name, role_id, )).fetchall()

        return self._to_dict_one(result)
    

    def get_taker_id(self, name, role_id):
        result = self.cur.execute(""" SELECT id FROM users WHERE name=? AND role_id=?""", (name, role_id, )).fetchall()

        return self._to_dict_one(result)


    # Role      
    def get_role(self, id):
        result = self.cur.execute(""" SELECT * FROM roles WHERE id=? """, (id, )).fetchall()

        return self._to_dict_one(result)
    
    
    # Application
    def get_all_application_user(self, uid):
        result = self.cur.execute(""" SELECT id, status_id, date, name, maker_id, taker_id, description FROM applications WHERE maker_id=?""", (uid, )).fetchall()

        return self._to_dict_all(result)
      
    def get_all_application_admin(self, uid):
        result = self.cur.execute(""" SELECT id, status_id, date, name, maker_id, taker_id, description FROM applications WHERE taker_id=?""", (uid, )).fetchall()

        return self._to_dict_all(result)
    
    def get_application_info(self, aid):
        result = self.cur.execute(""" SELECT id, status_id, date, name, maker_id, taker_id, description FROM applications WHERE id=?""", (aid, )).fetchall()

        return self._to_dict_one(result)
    
    def get_application_info_user(self, uid, aid):
        result = self.cur.execute(""" SELECT id, status_id, date, name, maker_id, taker_id, description FROM applications WHERE id=? AND maker_id=?""", (aid, uid)).fetchall()

        return self._to_dict_one(result)
    
    def add_application(self, status_id, date, name, maker_id, taker_id, description):
        self.cur.execute(""" INSERT INTO applications (status_id, date, name, maker_id, taker_id, description) VALUES (?, ?, ?, ?, ?, ?) """, (status_id, date, name, maker_id, taker_id, description, ))
        self.conn.commit()

    def get_last_application_id(self):
        result = self.cur.execute(""" SELECT MAX(id) AS id FROM applications """).fetchall()

        return self._to_dict_one(result)
    

    # Status
    def get_status(self, id):
        result = self.cur.execute(""" SELECT * FROM statuses WHERE id=?""", (id, )).fetchall()

        return self._to_dict_one(result)

    def get_status_id(self, name):
        result = self.cur.execute(""" SELECT id FROM statuses WHERE name=?""", (name, )).fetchall()

        return self._to_dict_one(result)

    def update_status_id(self, aid, status_id):
        self.cur.execute(""" UPDATE applications SET status_id=? WHERE id=? """, (status_id, aid, ))
        self.conn.commit()
        
    # Message
    def get_messages_by_application(self, uid):
        result = self.cur.execute(""" SELECT * FROM messages WHERE application_id=? """, (uid, )).fetchall()

        return self._to_dict_all(result)
    
    def add_message(self, text, sender_id, application_id):
        self.cur.execute(""" INSERT INTO messages (text, sender_id, application_id) VALUES (?, ?, ?) """, (text, sender_id, application_id, ))
        self.conn.commit()