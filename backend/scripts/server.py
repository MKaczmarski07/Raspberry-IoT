from flask import Flask, request, jsonify, json
from flask_cors import CORS
from time import sleep
from temperature_and_humidity import get_sensor_data
from motion_detector import detect_motion
from led import led_on, led_off
from timer import RepeatedTimer


app = Flask(__name__)
CORS(app)


motion_sensor = RepeatedTimer(1, detect_motion) 


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
        motion_sensor.start()
        led_on()
        return jsonify('House armed')
    else:
        led_off()
        motion_sensor.stop()
        return jsonify('House unarmed')

        
if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000)


