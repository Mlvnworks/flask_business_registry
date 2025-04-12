from classes.config import Config
from classes.business import Business


business = Business()

response =Config.run_query('''
    DELETE FROM business;
''')

print(response)
