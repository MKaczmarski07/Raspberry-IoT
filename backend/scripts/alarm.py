import RPi.GPIO as GPIO 
from time import sleep

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(12, GPIO.OUT)


def alarm(time):
    buzzer = GPIO.PWM(12, 10)
    buzzer.start(0)
    buzzer.ChangeDutyCycle(20)
    sleep(time)
    buzzer.stop(0)
   




