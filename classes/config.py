import sqlite3

class Config:
    DB_LOCALE = "br.db"

    conn = sqlite3.connect(DB_LOCALE)
    
    def run_query(query, params=None):
        try:
            conn = sqlite3.connect(Config.DB_LOCALE)
            cursor = conn.cursor()
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            
            data = cursor.fetchall()

            conn.commit()
            conn.close()

            return {
                "data" : data,
                "err": False
            }

        except sqlite3.Error as e:
            return {
                "data" : e,
                "err": True
            }

