import adafruit_dht
import board
import time
import os
import subprocess

# The Adafruit_Python_DHT library has been abandoned and is no longer supported.
# The only version compatible with rasbpberry pi 4b is Adafruit_CircuitPython_DHT, imported as adafruit_dht.
# However, this version has a bug that sometimes causes the script to run properly only once.
# The cause of this error is the libgpiod_pulsei system process.
# Killing this process is necessary for the program to run properly.

def kill_pulsei_process():
    # Get process PID 
    process_name = "libgpiod_pulsei"
    # check if the process exist
    try:
        pid = subprocess.check_output(["pgrep", process_name]).decode().strip()
    except subprocess.CalledProcessError:
        print(f"The process {process_name} could not be found.")
    else:
        # if found, kill the process
        os.system("kill " + pid)
        print(f"The process {process_name} was killed.")
        

def get_sensor_data():
    kill_pulsei_process()
    # Sensor data pin is connected to GPIO 4
    sensor = adafruit_dht.DHT11(board.D4)
    while True:
        try:
            temperature_c = sensor.temperature
            humidity = sensor.humidity
            sensor.exit() 
            return temperature_c, humidity
        except RuntimeError as error:
            # Errors happen fairly often, DHT's are hard to read
            print(error.args[0])
            time.sleep(2.0)
            continue
        except Exception as error:
            sensor.exit()
            raise error
    




