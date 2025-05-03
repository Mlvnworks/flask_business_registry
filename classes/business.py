from classes.config import Config

class Business:
    def __init__(self):
        self.createTable()

    # CREATE BUSINESS TABLE
    def createTable(self):
        return Config.run_query('''
            CREATE TABLE IF NOT EXISTS business(
                business_id BIGINT PRIMARY KEY, 
                date_registration BIGINT,
                business_name TEXT,
                type TEXT,
                owner TEXT,
                front_id LONGTEXT,
                back_id LONGTEXT,
                website TEXT,
                expiration BIGINT
            );
        ''')
    
    # INSERT BUSINESS
    def insertBusiness(self, business_details):
        return Config.run_query("INSERT INTO business (business_id, date_registration, business_name, type, owner, front_id, back_id, website, expiration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", business_details)
    
    # FETCH BUSINESS
    def getBusinessesList(sefl):
        return Config.run_query('''
            SELECT *,
                    payment.payment_id
            FROM business
            LEFT JOIN payment ON payment.business_id = business.business_id 
            ORDER BY date_registration DESC;
        ''')
    
    # FETCH BUSINESS'S DATA BY ID
    def getBusinessById(self, id):
        return Config.run_query(f'''
            SELECT * FROM business WHERE business_id = {id};
        ''')
    
    # REMOVE/DELETE BUSINESS
    def remove(self, id):
        return Config.run_query(f'''
                DELETE FROM business WHERE business_id = {id};
        ''')    
        

    # GET OVERALL BUSINESS REPORTS
    def getReports(self):
        total_business_number =  Config.run_query('''
            SELECT 
                    count(*) AS total_business_number
            from business;
        ''')["data"]
    
        business_type_sumarry = Config.run_query(f'''
            SELECT 
                COUNT(*) AS total_business_number,
                b.type,
                CAST((CAST((SELECT COUNT(*) FROM business WHERE type = b.type) AS FLOAT) / CAST((SELECT COUNT(*) FROM business) AS FLOAT)) AS FLOAT(10, 2)) * 100 AS percentage
            FROM business b
            GROUP BY b.type
            ORDER BY total_business_number DESC;
        ''')["data"]


        return (total_business_number, business_type_sumarry)