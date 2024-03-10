import sqlite3
import os
from flask import g


currentDirectory = os.path.dirname(os.path.abspath(__file__))
DATABASE = f'{currentDirectory}/database.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def execute_query(query):
    connection = get_db()
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()
    return cursor
    
def update_state(adress, state):
    adress = str(adress)
    state = str(state)
    query = "UPDATE states SET state = '" + state + "' WHERE adress = '" + adress + "'"
    execute_query(query)
    
def update_attributes(adress, attributes):
    adress = str(adress)
    attributes = str(attributes)
    query = "UPDATE states SET attributes = '" + attributes + "' WHERE adress = '" + adress + "'"
    execute_query(query)

def get_state(adress):
    adress = str(adress)
    query = "SELECT state FROM states WHERE adress = '" + adress + "'"
    cursor = execute_query(query)
    return cursor.fetchall()

def get_attributes(adress):
    adress = str(adress)
    query = "SELECT attributes FROM states WHERE adress = '" + adress + "'"
    cursor = execute_query(query)
    return cursor.fetchall()

# Function used to generate unique device addresses
def generate_adress():
    characters = string.ascii_uppercase + string.digits
    adress = ''.join(random.choice(characters) for _ in range(12))
    return adress





