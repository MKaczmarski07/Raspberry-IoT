from flask import Flask, request, jsonify, json
from flask_cors import CORS
from time import sleep
from temperature_and_humidity import get_sensor_data
from security_system import SecuritySystem
from rgb import Led_rgb


app = Flask(__name__)
CORS(app)


# create instances of object type elements
security_system = SecuritySystem(0.2,4)
rgb_1 = Led_rgb(17,27,22)
rgb_leds = [rgb_1]


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
    
    if data.get("diode_number") is None:
        return jsonify({"error": f"Error: Missing 'diode_number' key in JSON data."}), 400
    diode_number = data.get("diode_number")
    
    if data.get("is_on") is None:
        return jsonify({"error": f"Error: Missing 'state' key in JSON data."}), 400
    is_on = data.get("is_on")
    
    color = data.get("color")
    red = 255
    green = 255
    blue = 255
    
    if color is not None:
        red = color[0]
        green = color[1]
        blue = color[2]

    def handle_state(diode):
        if is_on:
            diode.set_color(red, green, blue)
        else:
            diode.stop_pwn()
    
    handle_state(rgb_leds[diode_number-1])
            
    return jsonify('rgb')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)


