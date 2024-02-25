import RPi.GPIO as GPIO
from time import sleep
from datetime import date
from datetime import datetime

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
PIR_PIN = 24
GPIO.setup(PIR_PIN, GPIO.IN)

def get_date():
    return date.today().strftime('%d/%m/%Y')

def get_time():
    return datetime.now().strftime('%H:%M:%S')
    
def detect_motion():
    if GPIO.input(PIR_PIN):
        print(get_date(),get_time(),' Motion Detected')          
           
            


        
     
     
        

 


