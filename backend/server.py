from flask import Flask, request, jsonify, json, g
from flask_cors import CORS
from time import sleep
import sqlite3
import os
import random
import string

from scripts.temperature_and_humidity import get_sensor_data
from scripts.security_system import SecuritySystem
from scripts.rgb import Led_rgb
import database.db as db


app = Flask(__name__)
CORS(app)


# create device instances and other required data
security_system = SecuritySystem(0.2,4)
rgb_1 = Led_rgb(17,27,22)
rgb_2 = Led_rgb(5,6,26)
device_refs = {'RNRYZBQWWCNM': rgb_1, 'JN49SZUFJXFB': rgb_2} # {device_adress: object Ref}
scenes = ['DXS7J49YFO9C', '0WR3KU9V7A1B', 'XG0XNVTA6CV8', 'A6JZXKBT0Q80']


@app.route("/connection", methods=["GET"])
def check_connection():
    return jsonify('Online')


@app.route("/state", methods=["GET"])
def get_device_state():
    entity_adress = request.args.get("entity_adress")
    return jsonify(db.get_state(entity_adress))


@app.route("/attributes", methods=["GET"])
def get_device_attributes():
    entity_adress = request.args.get("entity_adress")
    return jsonify(db.get_attributes(entity_adress))


@app.route("/temperature_and_humidity", methods=["GET"])
def temperature_and_humidity():
    return jsonify(get_sensor_data())


@app.route("/scene", methods=["POST"])
def set_scene():
    data = json.loads(request.data)
    
    if data.get("current_scene_adress") is None:
        return jsonify({"error": f"Error: Missing 'current_scene_adress' key in JSON data."}), 400
    current_scene_adress = data.get("current_scene_adress")
    
    if data.get("state") is None:
        return jsonify({"error": f"Error: Missing 'state' key in JSON data."}), 400
    state = data.get("state")
    
    # prevent selecting more than one scene at once 
    if state == 'on':
        for scene_adress in scenes:
            if scene_adress != current_scene_adress:
              db.update_state(scene_adress, 'off')
    
    db.update_state(current_scene_adress, state)
    return jsonify(f'scene {current_scene_adress} active')


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
    
    if data.get("device_adress") is None:
        return jsonify({"error": f"Error: Missing 'device_name' key in JSON data."}), 400
    device_adress = data.get("device_adress")
    
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
            db.update_attributes(device_adress, f'"color": [{red},{green},{blue}]')
        else:
            diode.stop_pwn()
            
    diode_ref = device_refs[device_adress]
    handle_color_change(diode_ref)
    db.update_state(device_adress, state)
    
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


