from classes.config import Config


class Payment:
    def __init__(self):
        self.createTable()

    # CREATE PAYMENT TABLE
    def createTable(self):
        return Config.run_query('''
            CREATE TABLE IF NOT EXISTS payment(
                payment_id BIGINT PRIMARY KEY, 
                date BIGINT,
                business_id BIGINT,
                payment_receipt LONGTEXT,
                method TEXT,
                FOREIGN KEY (business_id) REFERENCES business(business_id)
            );
        ''')
    

    # INSERT PAYMENT
    def insertPayment(self, payment_details):
        return Config.run_query("INSERT INTO payment (payment_id, date, business_id, payment_receipt, method) VALUES (?, ?, ?, ?, ?)", payment_details)
    

    #GET PAYMENT DATA
    def getPaymentData(self, id):
        return Config.run_query(f'''
            SELECT * FROM payment WHERE payment_id = {id};
        ''')
    

    # REMOVE PAYMENT RECORD
    def remove(self, id):
        return Config.run_query(F'''
                            DELETE FROM payment WHERE payment_id = {id}        
        ''')