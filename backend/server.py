from flask import Flask, request, jsonify, json, g
from flask_cors import CORS
from time import sleep
import sqlite3
import os

from scripts.temperature_and_humidity import get_sensor_data
from scripts.security_system import SecuritySystem
from scripts.rgb import Led_rgb
from database.db import get_db, get_state, update_state


app = Flask(__name__)
CORS(app)


# create instances of object type elements
security_system = SecuritySystem(0.2,4)
rgb_1 = Led_rgb(17,27,22)
rgb_2 = Led_rgb(5,6,26)
rgb_leds = [rgb_1, rgb_2]


@app.route("/temperature_and_humidity", methods=["GET"])
def temperature_and_humidity():
    return jsonify(get_sensor_data())


@app.route("/detect_motion", methods=["POST"])
def detect_motion():
    data = json.loads(request.data)
    
    if data.get("is_allowed") is None:
        return jsonify({"error": f"Error: Missing 'is_allowed' key in JSON data."}), 400
    is_allowed = data.get("is_allowed")
    
    if is_allowed:
        security_system.start_system()
        return jsonify('House armed')
    else:
        security_system.stop_system()
        return jsonify('House unarmed')
    

@app.route("/rgb", methods=["POST"])
def handle_rgb():
    data = json.loads(request.data)
    
    if data.get("diode_id") is None:
        return jsonify({"error": f"Error: Missing 'diode_id' key in JSON data."}), 400
    diode_id = data.get("diode_id")
    
    if data.get("state") is None:
        return jsonify({"error": f"Error: Missing 'state' key in JSON data."}), 400
    state = data.get("state")
    
    color = data.get("color")
    red = 255
    green = 255
    blue = 255
    
    if color is not None:
        red = color[0]
        green = color[1]
        blue = color[2]

    def handle_color_change(diode):
        if state == 'on':
            diode.set_color(red, green, blue)
        else:
            diode.stop_pwn()
            
    diode_ref = rgb_leds[diode_id-1]
    handle_color_change(diode_ref)
    
    # even after str() it is reference to the object, not a string !
    print(diode_ref)
    update_state('rgb_1', state)
    test = get_state('rgb_1')
    print(test)
            
    return jsonify('rgb')


@app.route("/blinds", methods=["POST"])
def handle_blinds():
    data = json.loads(request.data)
    
    if data.get("covering") is None:
        return jsonify({"error": f"Error: Missing 'covering' key in JSON data."}), 400
    covering = data.get("is_on")
    
    covering = data.get("covering")
    return jsonify(covering)





if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)


