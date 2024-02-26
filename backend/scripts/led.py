import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(16,GPIO.OUT)

def led_on():
    GPIO.output(16,GPIO.HIGH)

def led_off():
    GPIO.output(16,GPIO.LOW)
    
