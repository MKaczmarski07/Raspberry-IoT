from flask import Flask, request, jsonify, json
from flask_cors import CORS
from dht11 import get_sensor_data


app = Flask(__name__)
CORS(app)


@app.route("/temperature_and_humidity", methods=["GET"])
def dht11_api():
    return jsonify(get_sensor_data())

        
if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000)


