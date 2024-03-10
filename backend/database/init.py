import sqlite3
import os

# Script used to create database, states table and insert default values

currentDirectory = os.path.dirname(os.path.abspath(__file__))
DATABASE = f'{currentDirectory}/database.db'

def create_connection():
    conn = None
    try:
        conn = sqlite3.connect(DATABASE)
    except Error as e:
        print(e)
    return conn

def create_states_table(conn):
    conn.execute("CREATE TABLE states (id INT PRIMARY KEY, adress TEXT UNIQUE, state TEXT, attributes TEXT)")
    conn.commit()

def insert_states_data(conn, id, adress, state, attributes):
    conn.execute("INSERT INTO states (id, adress, state, attributes) VALUES (?,?,?,?)",(id, adress, state, attributes))
    conn.commit()
    
data = [
    (1, 'RNRYZBQWWCNM', 'off','"color": [255,255,255]'),
    (2, 'JN49SZUFJXFB', 'off','"color": [255,255,255]'),
    (3, 'F6KAW20CNQJP', 'off', '"covering": 100'),
    (4, 'WNZ65WDYJSFO', 'off', '"notifications": true, "siren": true'),
    (5, 'DXS7J49YFO9C', 'off', '"colors": [[102, 3, 0],[102, 3, 0]]'),
    (6, '0WR3KU9V7A1B', 'off', '"colors": [[74, 0, 5],[37, 0, 112]]'),
    (7, 'XG0XNVTA6CV8', 'off', '"colors": [[4, 0, 133],[50, 36, 255]]'),
    (8, 'A6JZXKBT0Q80', 'off', '"colors": [[255, 4, 0],[250, 21, 0]]'),
    ]

def main():
    connection = create_connection()
    if connection is not None:
        create_states_table(connection)
        for entity in data:
            insert_states_data(connection, *entity)
        connection.close()
        print("Completed successfully")
    else:
        print("Failed to connect to the database")

if __name__ == '__main__':
    main()
