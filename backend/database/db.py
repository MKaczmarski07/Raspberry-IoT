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
  
def insert_states_data(id, name, state, attributes):
    connection = get_db()
    connection.execute("INSERT INTO states (id, name, state, attributes) VALUES (?,?,?,?)",(id, name, state, attributes))
    connection.commit()
    
def update_state(name, state):
    name = str(name)
    state = str(state)
    query = "UPDATE states SET state = '" + state + "' WHERE name = '" + name + "'"
    connection = get_db()
    connection.execute(query)
    connection.commit()
    
def update_attributes(name, attributes):
    name = str(name)
    attributes = str(attributes)
    query = "UPDATE states SET attributes = '" + attributes + "' WHERE name = '" + name + "'"
    connection = get_db()
    connection.execute(query)
    connection.commit()

def get_state(name):
    name = str(name)
    connection = get_db()
    cursor = connection.cursor()
    query = "SELECT state FROM states WHERE name = '" + name + "'"
    cursor.execute(query)
    return cursor.fetchall()
    




