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

def create_states_table():
    connection = get_db()
    connection.execute("CREATE TABLE states (id INT PRIMARY KEY, name TEXT UNIQUE, state TEXT, attributes TEXT)")
  
def insert_states_data(id, adress, state, attributes):
    connection = get_db()
    connection.execute("INSERT INTO states (id, adress, state, attributes) VALUES (?,?,?,?)",(id, adress, state, attributes))
    connection.commit()
    
def update_state(adress, state):
    adress = str(adress)
    state = str(state)
    query = "UPDATE states SET state = '" + state + "' WHERE adress = '" + adress + "'"
    connection = get_db()
    connection.execute(query)
    connection.commit()
    
def update_attributes(adress, attributes):
    adress = str(adress)
    attributes = str(attributes)
    query = "UPDATE states SET attributes = '" + attributes + "' WHERE adress = '" + adress + "'"
    connection = get_db()
    connection.execute(query)
    connection.commit()

def get_state(adress):
    adress = str(adress)
    connection = get_db()
    cursor = connection.cursor()
    query = "SELECT state FROM states WHERE adress = '" + adress + "'"
    cursor.execute(query)
    return cursor.fetchall()

def get_attributes(adress):
    adress = str(adress)
    connection = get_db()
    cursor = connection.cursor()
    query = "SELECT attributes FROM states WHERE adress = '" + adress + "'"
    cursor.execute(query)
    return cursor.fetchall()

