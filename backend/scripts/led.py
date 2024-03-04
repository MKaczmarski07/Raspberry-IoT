import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
Led_pin = 16
GPIO.setup(Led_pin,GPIO.OUT)

def led_on():
    GPIO.output(Led_pin,GPIO.HIGH)

def led_off():
    GPIO.output(Led_pin,GPIO.LOW)
    