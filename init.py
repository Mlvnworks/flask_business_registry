from classes.config import Config
from classes.business import Business
from classes.payment import Payment



business = Business()
payment = Payment()



res = Config.run_query('''
   
    DELETE FROM business;
''')

print(res)